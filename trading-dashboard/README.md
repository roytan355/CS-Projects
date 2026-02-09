# Trading Dashboard

A comprehensive day trading dashboard with AI-powered recommendations.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set your API keys in `.env`:
```
ALPHA_VANTAGE_KEY=your_key_here
FINNHUB_KEY=your_key_here
GEMINI_API_KEY=your_key_here
```

3. Run the server:
```bash
python app.py
```

4. Open http://localhost:5000

## Features
- 📈 Daily stock scanner
- 🤖 AI-powered buy/sell recommendations
- 📊 Technical indicators (RSI, MACD, EMA)
- 🎯 Entry, target, stop-loss prices
- 💰 Position sizing calculator
