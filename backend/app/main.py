from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config.config import ALLOWED_ORIGINS
from app.api.router import api_router

app = FastAPI()

# Corse middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )