"""
Luxivolt Mühendislik Chatbot Backend
FastAPI application with OpenRouter integration and RAG support
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from config import get_settings
from rag_service import get_rag_service, RAGService

# Initialize settings
settings = get_settings()


# Request/Response Models
class ChatMessage(BaseModel):
    """Single chat message."""
    role: str
    content: str


class ChatRequest(BaseModel):
    """Chat request model."""
    message: str
    conversation_history: list[ChatMessage] = []
    use_rag: bool = True  # Enable/disable RAG


class ChatResponse(BaseModel):
    """Chat response model."""
    response: str
    model: str
    sources: list[str] = []  # RAG sources used


class SearchRequest(BaseModel):
    """Search request model."""
    query: str
    k: int = 4


class SearchResult(BaseModel):
    """Single search result."""
    content: str
    source: str
    score: float


class IndexRequest(BaseModel):
    """Index request model."""
    force_reindex: bool = False


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan context manager for startup/shutdown events."""
    # Startup: Initialize RAG service and index documents
    print("🚀 Starting Luxivolt Chatbot Backend...")
    rag = get_rag_service()
    try:
        chunk_count = rag.index_documents(force_reindex=False)
        print(f"📚 RAG service ready with {chunk_count} indexed chunks")
    except Exception as e:
        print(f"⚠️ Warning: RAG indexing failed: {e}")
        print("   The chatbot will work without RAG context.")
    
    yield
    
    # Shutdown
    print("👋 Shutting down Luxivolt Chatbot Backend...")


# Initialize FastAPI app
app = FastAPI(
    title=settings.app_name,
    description="Luxivolt Mühendislik için AI destekli chatbot API'si (RAG destekli)",
    version="2.0.0",
    debug=settings.debug,
    lifespan=lifespan,
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Her yerden gelen isteğe izin ver
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenAI client with OpenRouter base URL
client = OpenAI(
    api_key=settings.openrouter_api_key,
    base_url=settings.openrouter_base_url,
)


def get_system_prompt(context: str = "") -> str:
    """Generate system prompt with strict RAG context and Sales Persona."""
    
    # Base Persona & Tone
    base_prompt = """Sen Luxivolt Mühendislik'in uzman teknik satış asistanısın.
    
    KİMLİK VE TON:
    - Tonun profesyonel, güven verici, kurumsal ve yardımsever olmalı.
    - Luxivolt Mühendislik adına konuştuğunu unutma.
    - Yanıtlarını her zaman temiz ve okunabilir Markdown formatında ver.

    GÖREVLERİN:
    1. Kullanıcıların teknik sorularını, aşağıda sağlanan "Referans Bilgiler" ışığında yanıtla.
    2. Konuşmanın gidişatını analiz et; eğer kullanıcı bir projeden, ihaleden veya satın alma niyetinden bahsediyorsa:
       - Nazikçe iletişim bilgilerini (Ad, Telefon, E-posta) iste.
       - Proje detaylarını (Konum, Güç, Kapsam vb.) öğrenmeye çalış.
       - Amacın, satış ekibine iletilecek bir "Teklif Taslağı" oluşturmak için veri toplamaktır.

    KURALLAR:
    1. SADECE verilen referans bilgileri kullan. Dışarıdan bilgi uydurma.
    2. Eğer sorunun cevabı referans bilgilerde YOKSA:
       "Bu teknik detay hakkında size en doğru bilgiyi verebilmek için uzman mühendislerimizle görüşmenizi öneririm. Dilerseniz iletişim bilgilerinizi bırakın, sizi arayalım." şeklinde yanıt ver.
    3. Asla "bilgi yok" deme, her zaman profesyonel bir yönlendirme yap.
    4. Cevabın dilini, kullanıcının diliyle (varsayılan Türkçe) eşleştir."""

    if context:
        return f"""{base_prompt}

### Referans Bilgiler (Context):
{context}

### Müşteri Sorusu:
"""
    
    # Context yoksa
    return f"""{base_prompt}

UYARI: Şu an referans bilgi bulunamadı. Genel kurumsal nezaketle yanıt ver ve kullanıcıyı detaylı bilgi için iletişime yönlendir.

### Müşteri Sorusu:
"""


@app.get("/")
async def root():
    """Root endpoint - health check."""
    return {
        "status": "online",
        "app": settings.app_name,
        "version": "2.0.0",
        "features": ["chat", "rag", "vector-search"],
        "message": "Luxivolt Mühendislik Chatbot API'sine hoş geldiniz!"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    rag = get_rag_service()
    stats = rag.get_stats()
    return {
        "status": "healthy",
        "rag_status": "ready" if stats.get("total_chunks", 0) > 0 else "no_documents",
        "indexed_chunks": stats.get("total_chunks", 0),
    }


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Chat endpoint - processes user messages and returns AI responses.
    
    Strictly uses RAG context.
    """
    try:
        sources = []
        context = ""
        
        # Get RAG context if enabled
        if request.use_rag:
            rag = get_rag_service()
            # score_threshold=0.3 ile alakasız sonuçları eleyin
            results = rag.search(request.message, k=4, score_threshold=0.3)
            
            if results:
                # Context'i string olarak hazırla
                context_parts = []
                for res in results:
                    context_parts.append(f"- {res['content']}")
                    sources.append(res["source"])
                
                context = "\n\n".join(context_parts)
                # Tekilleştir
                sources = list(set(sources))
        
        # Build messages array with conversation history
        # Not: Context artık system prompt'un içine gömüldü
        system_prompt = get_system_prompt(context)
        
        messages = [{"role": "system", "content": system_prompt}]
        
        # Add conversation history (optional: limit history length to keep context focus)
        # Sadece son 2-3 mesajı alabiliriz
        for msg in request.conversation_history[-4:]:
            messages.append({"role": msg.role, "content": msg.content})
        
        # Add current user message
        messages.append({"role": "user", "content": request.message})
        
        # Call OpenRouter API using requests (Manual implementation)
        import requests
        import json
        
        headers = {
            "Authorization": f"Bearer {settings.openrouter_api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:8000",
            "X-Title": settings.app_name,
        }
        
        # Prepare messages
        api_messages = []
        for msg in messages:
            api_messages.append({"role": msg["role"], "content": msg["content"]})
            
        data = {
            "model": settings.openrouter_model,
            "messages": api_messages,
            "max_tokens": 1024,
            "temperature": 0.7,
        }
        
        print(f"📡 Sending request to OpenRouter ({settings.openrouter_model})...")
        response = requests.post(
            url="https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            data=json.dumps(data),
            timeout=60 # 60 seconds timeout
        )
        
        if response.status_code != 200:
            error_detail = response.text
            print(f"❌ OpenRouter API Error: {response.status_code} - {error_detail}")
            raise HTTPException(
                status_code=response.status_code,
                detail=f"OpenRouter API hatası: {error_detail}"
            )
            
        response_json = response.json()
        assistant_message = response_json["choices"][0]["message"]["content"]
        
        return ChatResponse(
            response=assistant_message,
            model=settings.openrouter_model,
            sources=sources,
        )
        
    except HTTPException as he:
        raise he
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail=f"Chat işlemi sırasında bir hata oluştu: {str(e)}"
        )


@app.post("/search", response_model=list[SearchResult])
async def search_documents(request: SearchRequest):
    """
    Search endpoint - search through indexed documents.
    
    Uses vector similarity search to find relevant document chunks.
    """
    try:
        rag = get_rag_service()
        results = rag.search(request.query, k=request.k)
        
        return [
            SearchResult(
                content=r["content"],
                source=r["source"],
                score=r["score"],
            )
            for r in results
        ]
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Arama sırasında bir hata oluştu: {str(e)}"
        )


@app.post("/index")
async def index_documents(request: IndexRequest):
    """
    Index endpoint - index or re-index documents.
    
    Loads documents from data directory and indexes them into ChromaDB.
    """
    try:
        rag = get_rag_service()
        chunk_count = rag.index_documents(force_reindex=request.force_reindex)
        
        return {
            "status": "success",
            "message": f"Başarıyla {chunk_count} chunk indekslendi.",
            "chunk_count": chunk_count,
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"İndeksleme sırasında bir hata oluştu: {str(e)}"
        )


@app.get("/rag/stats")
async def get_rag_stats():
    """
    Get RAG statistics.
    
    Returns information about the vector store and indexed documents.
    """
    rag = get_rag_service()
    return rag.get_stats()


@app.post("/chat/stream")
async def chat_stream(request: ChatRequest):
    """
    Streaming chat endpoint - returns AI responses as a stream.
    
    TODO: Implement streaming response using SSE or WebSocket.
    """
    raise HTTPException(
        status_code=501,
        detail="Streaming henüz uygulanmadı. /chat endpoint'ini kullanın."
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.debug
    )
