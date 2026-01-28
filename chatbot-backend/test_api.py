import requests
import json

API_URL = "http://localhost:8000/chat"

def test_chat(message):
    print(f"\n--- Soru: {message} ---")
    payload = {
        "message": message,
        "use_rag": True,
        "conversation_history": []
    }
    try:
        response = requests.post(API_URL, json=payload)
        response.raise_for_status()
        data = response.json()
        print("Cevap:", data["response"])
        print("Kaynaklar:", data["sources"])
    except Exception as e:
        print("Hata:", e)

if __name__ == "__main__":
    # Test 1: Bilinen bir konu (Trafo)
    test_chat("Trafo bakım hizmetleriniz nelerdir?")
    
    # Test 2: Bilinmeyen bir konu (Mars Kolonisi - Alakasız)
    test_chat("Mars kolonisi projeniz var mı ve uzay madenciliği yapıyor musunuz?")
    
    # Test 3: RAG dışı genel sohbet (Selamlaşma)
    test_chat("Merhaba, nasılsın?")
