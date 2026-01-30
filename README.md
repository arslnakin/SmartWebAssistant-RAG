# SmartWebAssistant-RAG 🤖🚀

**Yapay Zekâ ile Dijital Dönüşüm: Kişiselleştirilmiş Akıllı Web Asistanları**

Bu depo, TMMOB Elektrik Mühendisleri Odası (EMO) İstanbul Şubesi için hazırlanan "Kişiselleştirilmiş Akıllı Web Asistanları" webinarı kapsamında geliştirilen RAG (Retrieval-Augmented Generation) tabanlı asistan projesinin kaynak kodlarını ve dokümantasyonunu içerir.
<img width="1080" height="1350" alt="image" src="https://github.com/user-attachments/assets/6fc5146b-7214-4c7b-805d-949a6cc4201d" />

Youtube Yayını:
[![YouTube Yayını](https://img.youtube.com/vi/DZFdDCO64tY/maxresdefault.jpg)](https://www.youtube.com/watch?v=DZFdDCO64tY)

## 🌟 Öne Çıkan Özellikler

- **RAG Mimarisi:** Harici bilgi tabanından (Knowledge Base) anlık veri çekerek güncel ve doğru yanıt üretimi.
- **Vektör Veritabanı:** Semantik arama için optimize edilmiş veri saklama katmanı (ChromaDB).
- **Çoklu Model Desteği:** OpenRouter üzerinden Qwen-3-Max, Gemini 2.0 ve GPT-4o entegrasyonu.
- **Modern UI:** Next.js ve Tailwind CSS 4.0 ile güçlendirilmiş, responsive ve premium chatbot arayüzü.
- **Agentic Özellikler:** Satış odaklı persona ve teknik dökümanlara sadık yanıt mekanizması.

## 🛠️ Teknoloji Yığını

- **Backend:** FastAPI (Python 3.10+)
- **Frontend:** Next.js 15, Tailwind CSS 4.0, Framer Motion
- **LLM Orchestration:** OpenRouter API / LangChain
- **Vector Store:** ChromaDB
- **Embeddings:** HuggingFace Multilingual (Turkish Support)

## 📁 Proje Yapısı

```text
├── chatbot-backend/    # FastAPI Backend
│   ├── data/           # Bilgi tabanı dokümanları (PDF, Markdown)
│   ├── main.py         # API ve Uygulama mantığı
│   ├── rag_service.py  # Vektörleştirme ve Arama servisi
│   └── requirements.txt
├── luxivolt-site/      # Next.js Frontend
│   ├── src/            # Uygulama kaynak kodları
│   └── package.json
├── data/               # Veri seti dökümanları
└── PROMPTS.md          # Geliştirme sürecinin promptları
```

## 🚀 Hızlı Başlangıç

### 1. Depoyu Klonlayın
```bash
git clone https://github.com/arslnakin/SmartWebAssistant-RAG.git
cd SmartWebAssistant-RAG
```

### 2. Backend'i Hazırlayın
```bash
cd chatbot-backend
python -m venv venv
# Windows: venv\Scripts\activate | macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
# .env dosyasını oluşturun ve OPENROUTER_API_KEY ekleyin
uvicorn main:app --reload --port 8000
```

### 3. Frontend'i Çalıştırın
```bash
cd ../luxivolt-site
npm install
# Uygulamayı başlatın (localhost:3000)
npm run dev
```

## 👨‍💻 Hazırlayan
**Akın ARSLAN,MSc(c)** - *IoT Proje Mühendisi*
LinkedIn: [akinarslan](https://www.linkedin.com/in/akinarslan)

## 📄 Lisans
Bu proje MIT Lisansı ile lisanslanmıştır.
