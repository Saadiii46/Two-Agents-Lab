import logging
from langchain_groq import ChatGroq
from langgraph.graph import add_messages, StateGraph, START, END
from dotenv import load_dotenv
import os
from typing import TypedDict, Annotated, List, Dict

logger = logging.getLogger(__name__)

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")

# Graph State
class State(TypedDict):
    messages: Annotated[List[Dict], add_messages]

class LangGraphChatManager:
    """Owns the LLM and chat system"""
    
    def __init__(self, model: str = "llama-3.1-8b-instant", temperature: float = 0.7, max_tokens: int = 80):
        self.model = model
        self.temperature = temperature
        self.max_tokens = max_tokens
        
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
            llm = self._llm
            
            def chat_node(state: State):
                user_message = state["messages"]
                
                response = llm.invoke(user_message)
                
                return {"messages": [response]}
            
            graph = StateGraph(State)
            graph.add_node("chat", chat_node)
            graph.add_edge(START, "chat")
            graph.add_edge("chat", END)
            
            app = graph.compile()
            
            llm_respone = app.invoke({"messages": [user_message]})
            
            final_response = llm_respone["messages"][-1].content
            
            return final_response
        
        except Exception as e:
            logger.error("Failed to chat with Groq: ", e)