from fastapi import APIRouter
import logging
from pydantic import BaseModel
from app.services.langgraph_bot.agent import LangGraphChatManager

logger = logging.getLogger(__name__)

router = APIRouter()
chat_bot = LangGraphChatManager()

class ChatMessage(BaseModel):
    message: str
    
@router.post("/chat")
async def chat(request: ChatMessage):
    try:
        response = chat_bot.chat(request.message)
        return response
    
    except Exception as e:
        logger.error(f"Chat API error: {e}")