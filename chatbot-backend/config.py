"""
Luxivolt Mühendislik Chatbot Backend
Configuration settings using Pydantic
"""

from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # OpenRouter API Configuration
    openrouter_api_key: str = ""
    openrouter_base_url: str = "https://openrouter.ai/api/v1"
    openrouter_model: str = "google/gemini-2.0-flash-exp:free"
    
    # Application Settings
    app_name: str = "Luxivolt Chatbot"
    debug: bool = True
    
    # CORS Settings
    allowed_origins: list[str] = ["*"]

    # RAG Settings
    chunk_size: int = 500
    chunk_overlap: int = 100
    
    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "extra": "ignore"
    }


@lru_cache
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()
