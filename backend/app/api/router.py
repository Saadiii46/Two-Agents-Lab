from fastapi import APIRouter
from app.api.routes.chatbot import chat

api_router = APIRouter()

api_router.include_router(chat.router)