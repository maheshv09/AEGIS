from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services.social_listener import fetch_recent_posts
from ai.analyzer import analyze_post, analyze_posts_batch
import asyncio

app = FastAPI(title="AEGIS API", description="Real-Time Social Listening for Patient Safety")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "AEGIS Monitoring Engine is running."}

@app.get("/api/signals")
def get_signals():
    # Fetch mock data
    posts = fetch_recent_posts(limit=5)
    analyzed_signals = []
    
    # Perform batch analysis (1 API call instead of 5)
    batch_results = analyze_posts_batch(posts)
    
    for i, post in enumerate(posts):
        # Match batch results by index
        analysis = batch_results[i] if i < len(batch_results) else {}
        
        analyzed_signals.append({
            "id": post["id"],
            "source": post["source"],
            "text": post["text"],
            "author": post["author"],
            "timestamp": post["timestamp"],
            "drug": analysis.get("drug"),
            "symptom": analysis.get("symptom"),
            "is_adverse_event": analysis.get("is_adverse_event", False),
            "confidence": analysis.get("confidence", 0.0),
            "sentiment": analysis.get("sentiment", "Neutral"),
            "has_phi": analysis.get("has_phi", False),
            "explanation": analysis.get("explanation")
        })
            
    # Sort by confidence descending
    analyzed_signals.sort(key=lambda x: x["confidence"], reverse=True)
    
    return {
        "signals": analyzed_signals
    }
