# Luxivolt RAG Chatbot Geliştirme Promptları

Bu dosya, Luxivolt Mühendislik için geliştirilen RAG (Retrieval-Augmented Generation) özellikli chatbot backend sisteminin oluşturulma sürecinde kullanılan iteratif promptları içermektedir.

## 🚀 Aşama 1: Temel FastAPI ve OpenRouter Kurulumu

**Prompt 1 (Proje Başlatma):**
> "Python ve FastAPI kullanarak bir chatbot backend projesi oluştur. OpenRouter API'ını kullanacak bir yapı kur. Klasör yapısı, `.env` yönetimi ve `pydantic-settings` kullanarak konfigürasyon yapısı olsun. openai kütüphanesini OpenRouter base url ile kullan."

**Prompt 2 (Hata Yönetimi ve Model Seçimi):**
> "Chat endpoint'i için gerekli Pydantic modellerini tanımla. OpenRouter'da 'google/gemini-2.0-flash-exp:free' modelini varsayılan yap. CORS ayarlarını ekle."

---

## 📚 Aşama 2: RAG (Retrieval-Augmented Generation) Entegrasyonu

**Prompt 3 (Döküman İşleme):**
> "LangChain kullanarak `data/` klasöründeki .md ve .pdf dökümanlarını yükleyen, bunları 500 karakterlik parçalara (chunk) bölen bir `rag_service.py` servisi yaz. Embedding modeli olarak Türkçe desteği iyi olan bir HuggingFace multilingual modeli kullan."

**Prompt 4 (Vektör Veritabanı):**
> "ChromaDB kullanarak dökümanları indeksle. `similarity_search` fonksiyonu ekle. FastAPI startup event'inde dökümanları otomatik olarak bir kez indeksleyen bir lifespan mekanizması kur."

---

## 🛠️ Aşama 3: Teknik İyileştirmeler ve Hata Giderme

**Prompt 5 (Strict RAG ve Fallback):**
> "Sistem prompt'unu güncelle: LLM sadece sağlanan dökümanlardaki bilgileri kullanmalı. Eğer bilgi yoksa 'Bu konuda uzman mühendislerimize yönlendirebilirim' şeklinde standart bir profesyonel yanıt vermeli. Bilgi uydurmamalı."

**Prompt 6 (Hata Tespiti - NameError):**
> "FastAPI'da `@app.post` üzerinde kullandığın model sınıfları (ChatResponse vb.) fonksiyonun üzerinde tanımlanmalı. Kodun çalışma sırasını Python kurallarına göre düzelt."

**Prompt 7 (ChromaDB Stabilizasyonu):**
> "ChromaDB telemetri hatalarını önlemek için `.env` üzerinden telemetriyi kapat. `similarity_search_with_relevance_scores` yerine daha stabil olan `similarity_search` metoduna geç ve skorları manuel filtrele."

---

## 💼 Aşama 4: Satış Odaklı Persona ve Memory

**Prompt 8 (Satış Asistanı Persona):**
> "Chatbot'un sistem prompt'unu şu şekilde özelleştir: 'Sen Luxivolt Mühendislik'in uzman teknik satış asistanısın. Tonun profesyonel ve kurumsal olmalı. Eğer kullanıcı bir projeden bahsediyorsa, onlardan iletişim bilgilerini isteyerek bir teklif taslağı oluşturmaya çalış.'"

**Prompt 9 (Chat Geçmişi - Memory):**
> "/chat endpoint'ine `conversation_history` listesi kabul edecek bir yapı ekle. Gelen geçmişi LLM'e gönderirken system prompt ile birleştirerek bağlamı koru."

---

## 🌐 Aşama 5: Frontend ve API Uyumluluğu

**Prompt 10 (Direct Request Yapısı):**
> "OpenAI kütüphanesi bazen OpenRouter'da header çakışması yaratabiliyor. `main.py` içindeki API çağrısını `requests` kütüphanesini kullanarak manuel HTTP POST isteğine çevir. `HTTP-Referer` ve `X-Title` header'larını ekle."

**Prompt 11 (CORS Genişletme):**
> "Frontend (localhost:3000) ile Backend (localhost:8000) arasındaki iletişimde CORS hatası alıyorum. `allow_origins=["*"]` yaparak geliştirme aşamasındaki engelleri kaldır."

---

## 📝 Son Not
Bu promptlar, sistemin sırayla **Temel -> Zeka -> Bilgi -> Kararlılık -> Persona** aşamalarından geçerek profesyonel bir kurumsal chatbot'a dönüşmesini sağlamıştır.
