# SmartWebAssistant-RAG 🤖🚀

**Yapay Zekâ ile Dijital Dönüşüm: Kişiselleştirilmiş Akıllı Web Asistanları**

Bu depo, TMMOB Elektrik Mühendisleri Odası (EMO) İstanbul Şubesi için hazırlanan "Kişiselleştirilmiş Akıllı Web Asistanları" webinarı kapsamında geliştirilen RAG (Retrieval-Augmented Generation) tabanlı asistan projesinin kaynak kodlarını ve dokümantasyonunu içerir.

## 🌟 Öne Çıkan Özellikler

> [!IMPORTANT]
> **Not:** Bu repo şu an için webinar sunum materyallerini içermektedir. Projenin çalışan kaynak kodları, sunum sonrasında toplulukla paylaşılmak üzere eşzamanlı olarak yüklenecektir.

- **RAG Mimarisi:** Harici bilgi tabanından (Knowledge Base) anlık veri çekerek güncel ve doğru yanıt üretimi.
- **Vektör Veritabanı:** Semantik arama için optimize edilmiş veri saklama katmanı.
- **Çoklu Model Desteği:** OpenRouter üzerinden Llama 3, Claude 3.5 ve GPT-4o entegrasyonu.
- **Streaming (SSE):** Kullanıcı deneyimini iyileştiren token-bazlı anlık metin akışı.
- **Agentic UI:** Fonksiyon çağırma (Tool Calling) ile web sitesi üzerinde aksiyon alabilen asistan.

## 🛠️ Teknoloji Yığını

- **Backend:** FastAPI (Python)
- **Frontend:** Vanilla JS, HTML5, CSS3
- **LLM Orchestration:** OpenRouter API
- **Vector Store:** ChromaDB / Pinecone
- **Embeddings:** HuggingFace / OpenAI

## 📁 Proje Yapısı

```text
├── server/             # FastAPI Backend
│   ├── app.py          # Ana uygulama ve API uç noktaları
│   ├── ingestion.py    # Veri işleme ve vektörleştirme (Chunking & Embedding)
│   ├── database.py     # Vektör veritabanı bağlantısı
│   └── requirements.txt
├── client/             # Web Frontend
│   ├── index.html
│   ├── style.css
│   └── script.js
├── data/               # Bilgi tabanı dokümanları (PDF, Markdown)
└── docs/               # Sunum ve teknik şemalar
```

## 🚀 Hızlı Başlangıç

### 1. Depoyu Klonlayın
```bash
git clone https://github.com/akinarslan/SmartWebAssistant-RAG.git
cd SmartWebAssistant-RAG
```

### 2. Bağımlılıkları Yükleyin
```bash
cd server
pip install -r requirements.txt
```

### 3. Ortam Değişkenlerini Ayarlayın
`.env.example` dosyasını `.env` olarak kopyalayın ve OpenRouter API anahtarınızı ekleyin.

### 4. Uygulamayı Çalıştırın
```bash
uvicorn app:app --reload
```

## 👨‍💻 Hazırlayan
**Akın ARSLAN** - *IoT Proje Mühendisi*
LinkedIn: [akinarslan](https://www.linkedin.com/in/akinarslan)

## 📄 Lisans
Bu proje MIT Lisansı ile lisanslanmıştır.
