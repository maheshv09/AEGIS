# AEGIS

**AEGIS** is a high-stakes Real-Time Social Listening platform for Patient Safety. 
It monitors social data (Reddit/X) to detect early medical safety signals (adverse events) using AI, providing explainable insights for healthcare stakeholders.

## Visual Identity
**Theme:** Cyber-Medical Command Center
**Colors:** Deep Navy (`#020817`), Neon Cyan accents for safety, Surgical Crimson for alerts.
**Style:** Glassmorphism, semi-transparent cards, and glowing borders for high-confidence signals.

## Tech Stack
- **Frontend:** React (Vite/SWC), Tailwind CSS v4, Framer Motion, Lucide-react, Recharts
- **Backend:** FastAPI (Python), Groq SDK (Llama 3/DeepSeek reasoning), Gemini API (NER/embeddings)
- **Storage:** Local JSON/SQLite (Vercel/Render ready)

## Architecture
1. **Monitoring Engine:** Python service to simulate/fetch data from Reddit and X.
2. **Analysis Layer:** AI pipeline extracting Drugs, Symptoms, Conditions, flagging safety issues, and computing an 'Explainability' score.
3. **Dashboard:** 
   - Live Activity Ticker
   - Global Sentiment Trend Chart
   - High-Risk Signal Feed with 'Evidence Trail' modals.
