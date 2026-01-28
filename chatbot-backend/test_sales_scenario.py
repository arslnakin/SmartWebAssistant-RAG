import requests
import json
import time
import sys

# Encoding ayari
sys.stdout.reconfigure(encoding='utf-8')

API_URL = "http://localhost:8000/chat"

def chat(message, history=[]):
    print(f"\n[Kullanici]: {message}")
    payload = {
        "message": message,
        "use_rag": True,
        "conversation_history": history
    }
    try:
        response = requests.post(API_URL, json=payload)
        response.raise_for_status()
        data = response.json()
        print(f"[Asistan]: {data['response']}")
        return data["response"]
    except Exception as e:
        print(f"[Hata]: {e}")
        return None

if __name__ == "__main__":
    history = []
    
    # Adım 1: Teknik soru (RAG testi)
    resp1 = chat("Merhaba, trafo kurulum hizmetiniz var mı?", history)
    if resp1:
        history.append({"role": "user", "content": "Merhaba, trafo kurulum hizmetiniz var mı?"})
        history.append({"role": "assistant", "content": resp1})
    
    time.sleep(1)
    
    # Adım 2: Proje sinyali (Satış asistanı testi)
    resp2 = chat("Evet, Tekirdag'daki yeni fabrikamiz icin 1600 kVA trafo dusunuyoruz.", history)
