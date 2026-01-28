# Luxivolt Mühendislik Chatbot Backend

Luxivolt Mühendislik için Python ve FastAPI kullanılarak geliştirilmiş **RAG destekli** AI chatbot backend'i.

## 🚀 Özellikler

- **FastAPI** tabanlı modern REST API
- **OpenRouter API** entegrasyonu (OpenAI kütüphanesi ile)
- **RAG (Retrieval-Augmented Generation)** desteği
  - LangChain ile döküman işleme
  - ChromaDB vektör veritabanı
  - HuggingFace multilingual embeddings (Türkçe destekli)
- Conversation history desteği
- Otomatik döküman indeksleme
- CORS middleware
- Pydantic ile tip güvenliği

## 📁 Proje Yapısı

```
chatbot-backend/
├── main.py              # Ana FastAPI uygulaması
├── config.py            # Konfigürasyon ayarları
├── rag_service.py       # RAG servisi (LangChain + ChromaDB)
├── requirements.txt     # Python bağımlılıkları
├── .env.example         # Örnek environment değişkenleri
├── .gitignore           # Git ignore dosyası
├── README.md            # Bu dosya
└── chroma_db/           # ChromaDB vektör veritabanı (otomatik oluşur)

../data/                 # Dökümanlar (RAG için)
├── sirket_profili.md    # Şirket profili
├── teknik_hizmetler.md  # Teknik hizmet kataloğu
└── sss.md               # Sıkça sorulan sorular
```

## 🔧 Kurulum

### 1. Sanal ortam oluşturun (önerilir)

```bash
cd chatbot-backend
python -m venv venv

# Windows
.\venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

### 2. Bağımlılıkları yükleyin

```bash
pip install -r requirements.txt
```

### 3. Environment değişkenlerini ayarlayın

```bash
# .env.example dosyasını .env olarak kopyalayın
copy .env.example .env

# .env dosyasını düzenleyip OpenRouter API key'inizi ekleyin
```

### 4. OpenRouter API Key Alma

1. [OpenRouter](https://openrouter.ai/) sitesine gidin
2. Hesap oluşturun veya giriş yapın
3. API Keys bölümünden yeni bir key oluşturun
4. `.env` dosyasındaki `OPENROUTER_API_KEY` değerini güncelleyin

## ▶️ Çalıştırma

```bash
# Development mode
python main.py

# Veya uvicorn ile
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

API şu adreste çalışacaktır: `http://localhost:8000`

**İlk çalıştırmada:**
- `data/` klasöründeki dökümanlar otomatik olarak yüklenir
- Dökümanlar chunk'lara ayrılır
- ChromaDB'ye indekslenir (bu işlem birkaç dakika sürebilir)

## 📚 API Endpoints

### `GET /`
Health check ve hoşgeldin mesajı.

### `GET /health`
Detaylı health check - RAG durumu dahil.

### `POST /chat`
Ana chat endpoint'i - RAG destekli.

**Request Body:**
```json
{
    "message": "Luxivolt hangi hizmetleri sunuyor?",
    "conversation_history": [],
    "use_rag": true
}
```

**Response:**
```json
{
    "response": "Luxivolt Mühendislik olarak size geniş bir hizmet yelpazesi sunuyoruz...",
    "model": "google/gemini-2.0-flash-exp:free",
    "sources": ["teknik_hizmetler.md", "sirket_profili.md"]
}
```

### `POST /search`
Döküman arama endpoint'i.

**Request Body:**
```json
{
    "query": "trafo merkezi",
    "k": 4
}
```

**Response:**
```json
[
    {
        "content": "Trafo Merkezleri: 36kV'a kadar modüler hücreli...",
        "source": "teknik_hizmetler.md",
        "score": 0.8542
    }
]
```

### `POST /index`
Dökümanları yeniden indeksle.

**Request Body:**
```json
{
    "force_reindex": true
}
```

### `GET /rag/stats`
RAG istatistiklerini gösterir.

## 🤖 RAG Nasıl Çalışır?

1. **Döküman Yükleme:** `data/` klasöründeki `.md`, `.pdf`, `.txt` dosyaları yüklenir
2. **Chunking:** Dökümanlar 500 karakterlik parçalara ayrılır (100 karakter overlap)
3. **Embedding:** Her chunk multilingual model ile vektöre dönüştürülür
4. **İndeksleme:** Vektörler ChromaDB'ye kaydedilir
5. **Sorgu:** Kullanıcı sorusu vektöre dönüştürülür
6. **Arama:** En benzer chunk'lar bulunur
7. **Bağlam Enjeksiyonu:** Bulunan bilgiler LLM prompt'una eklenir
8. **Yanıt:** LLM, zenginleştirilmiş bağlamla yanıt üretir

## 🔧 RAG CLI Araçları

```bash
# Dökümanları indeksle
python rag_service.py --index

# Zorla yeniden indeksle
python rag_service.py --index --force

# Arama yap
python rag_service.py --search "PLC programlama"

# İstatistikleri göster
python rag_service.py --stats
```

## 📖 API Dokümantasyonu

FastAPI otomatik olarak API dokümantasyonu oluşturur:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## ⚙️ Konfigürasyon

| Değişken             | Açıklama                | Varsayılan                         |
| -------------------- | ----------------------- | ---------------------------------- |
| `OPENROUTER_API_KEY` | OpenRouter API anahtarı | (zorunlu)                          |
| `OPENROUTER_MODEL`   | Kullanılacak model      | `google/gemini-2.0-flash-exp:free` |
| `DEBUG`              | Debug modu              | `True`                             |
| `APP_NAME`           | Uygulama adı            | `Luxivolt Chatbot`                 |

## 📊 Embedding Modeli

Varsayılan olarak `sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2` modeli kullanılır:
- ✅ Türkçe dahil 50+ dil desteği
- ✅ Ücretsiz ve açık kaynak
- ✅ CPU üzerinde çalışır
- ✅ Hızlı ve verimli


## 📝 Döküman Ekleme

Yeni döküman eklemek için:
1. Dosyayı `data/` klasörüne kopyalayın (`.md`, `.pdf`, `.txt` desteklenir)
2. API'yi yeniden başlatın veya `/index` endpoint'ini çağırın

