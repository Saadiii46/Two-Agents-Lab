import logging
from langchain_groq import ChatGroq
from langgraph.graph import add_messages, StateGraph, START, END
from langgraph.prebuilt import ToolNode
from langchain_core.tools import tool
from langchain_core.messages import BaseMessage, HumanMessage, SystemMessage
from dotenv import load_dotenv
from typing import TypedDict, Annotated, Sequence
from app.services.rag.rag import RAGClient
import os

logger = logging.getLogger(__name__)

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")

rag_search = RAGClient()
SYSTEM_MESSAGE: str = "You are a helpfull assisstant of an agency website. Your job is to answer the user query in concisely. You can use available tools to answer user's query."

@tool
def rag_search_tool(user_query: str) -> str:
    """
    Search the internal knowledge base.
    use this tool to search agency knowledge from database and answer the user's query
    Only use this tool when necessary.
    """
    
    logger.info("Agent is trying to call a tool.")
    result = rag_search.search(user_query)
    logger.info("Agent executed the tool successfully.")
    
    if not result:
        return "No relavent document found."
    
    logger.info("Retreived %d docs:", len(result))
    
    return "\n\n".join(
        f"Content: {doc.page_content}\nMetadata: {doc.metadata}"
        for doc in result
    )

tools = [rag_search_tool]

# Graph State
class State(TypedDict):
    messages: Annotated[Sequence[BaseMessage], add_messages]
    tool_call_count: int

class LangGraphChatManager:
    """Owns the LLM and chat system"""
    
    def __init__(self, model: str = "llama-3.1-8b-instant", temperature: float = 0.35, max_tokens: int = 900, system_message: str = SYSTEM_MESSAGE):
        self.model = model
        self.temperature = temperature
        self.max_tokens = max_tokens
        self.system_message = system_message
        
        # Initializing Groq Chat
        self._llm = ChatGroq(
            api_key=GROQ_API_KEY,
            model = model,
            temperature = temperature,
            max_tokens = max_tokens
        )
        
    def chat(self, user_message: str) -> str:
        """Build a simple chat graph"""
        
        try:
            llm = self._llm.bind_tools(tools)
            
            def chat_node(state: State):
                system_prompt = SystemMessage(content=self.system_message)
                response = llm.invoke([system_prompt] + state["messages"])
                
                return {"messages": [response]}
            
            def tool_node(state: State):
                result = ToolNode(tools=tools).invoke(state)
                
                return {
                    "messages": result["messages"],
                    "tool_call_count": state.get("tool_call_count", 0) + 1
                }
            
            def should_continue(state: State):
                last_message = state["messages"][-1]
                
                if getattr(last_message, "tool_calls", None) and state.get("tool_call_count", 0) < 4:
                    return "tool"
                
                return END
            
            
            graph = StateGraph(State)
            graph.add_node("chat", chat_node)
            graph.add_node("tool", tool_node)
            
            graph.add_edge(START, "chat")
            graph.add_conditional_edges("chat", should_continue)
            graph.add_edge("tool", "chat")
            graph.add_edge("chat", END)
            
            app = graph.compile()
            
            llm_respone = app.invoke({"messages": [HumanMessage(content=user_message)]})
            
            final_response = llm_respone["messages"][-1].content
            
            return final_response
        
        except Exception as e:
            logger.error("Failed to chat with Groq: %s", e)