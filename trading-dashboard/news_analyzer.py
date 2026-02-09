"""
News Analyzer Module
Fetches news and uses Gemini AI for sentiment analysis
"""
import os
import requests
import google.generativeai as genai
from datetime import datetime, timedelta

class NewsAnalyzer:
    def __init__(self):
        self.finnhub_key = os.getenv('FINNHUB_KEY', 'demo')
        self.gemini_key = os.getenv('GEMINI_API_KEY', '')
        
        # Initialize Gemini
        if self.gemini_key:
            genai.configure(api_key=self.gemini_key)
            self.model = genai.GenerativeModel('gemini-pro')
        else:
            self.model = None
    
    def fetch_news(self, symbol, days=3):
        """Fetch news from Finnhub"""
        try:
            end_date = datetime.now()
            start_date = end_date - timedelta(days=days)
            
            url = f"https://finnhub.io/api/v1/company-news"
            params = {
                'symbol': symbol,
                'from': start_date.strftime('%Y-%m-%d'),
                'to': end_date.strftime('%Y-%m-%d'),
                'token': self.finnhub_key
            }
            
            response = requests.get(url, params=params, timeout=10)
            if response.status_code == 200:
                news = response.json()
                return news[:10]  # Limit to 10 articles
            return []
        except Exception as e:
            print(f"Error fetching news: {e}")
            return []
    
    def analyze_sentiment_gemini(self, symbol, news_items):
        """Use Gemini to analyze news sentiment and trading impact"""
        if not self.model or not news_items:
            return self._default_analysis(symbol)
        
        # Prepare news summary for AI
        news_text = "\n".join([
            f"- {item.get('headline', 'No headline')} ({item.get('source', 'Unknown')})"
            for item in news_items[:5]
        ])
        
        prompt = f"""You are an aggressive day trading analyst. Analyze these news headlines for {symbol} and provide a trading recommendation.

Recent News:
{news_text}

Respond in this EXACT JSON format:
{{
    "sentiment": "bullish" or "bearish" or "neutral",
    "sentiment_score": number from -100 to 100 (negative is bearish, positive is bullish),
    "trading_action": "BUY", "SELL", or "WAIT",
    "confidence": "HIGH", "MEDIUM", or "LOW",
    "key_catalyst": "brief description of main news catalyst",
    "price_impact": "expected short-term price movement description",
    "risk_factors": ["list", "of", "risks"]
}}

Be aggressive - we're day trading. Focus on momentum and short-term impact."""

        try:
            response = self.model.generate_content(prompt)
            text = response.text
            
            # Parse JSON from response
            import json
            # Try to extract JSON from response
            if '{' in text and '}' in text:
                json_str = text[text.find('{'):text.rfind('}')+1]
                result = json.loads(json_str)
                result['symbol'] = symbol
                result['news_count'] = len(news_items)
                return result
            
            return self._default_analysis(symbol)
        except Exception as e:
            print(f"Gemini analysis error: {e}")
            return self._default_analysis(symbol)
    
    def _default_analysis(self, symbol):
        """Default analysis when AI is unavailable"""
        return {
            'symbol': symbol,
            'sentiment': 'neutral',
            'sentiment_score': 0,
            'trading_action': 'WAIT',
            'confidence': 'LOW',
            'key_catalyst': 'No recent news available',
            'price_impact': 'Uncertain',
            'risk_factors': ['Limited news data'],
            'news_count': 0
        }
    
    def get_market_sentiment(self):
        """Get overall market sentiment from major indices news"""
        market_news = []
        
        for symbol in ['SPY', 'QQQ']:
            news = self.fetch_news(symbol, days=1)
            market_news.extend(news)
        
        if not market_news:
            return {
                'overall': 'neutral',
                'description': 'No significant market news',
                'trading_environment': 'Normal conditions'
            }
        
        # Use Gemini for market analysis
        if self.model:
            prompt = f"""Analyze today's market environment for day trading based on these headlines:

{chr(10).join([f"- {n.get('headline', '')}" for n in market_news[:5]])}

Respond briefly:
1. Market sentiment (bullish/bearish/neutral)
2. Best sectors to trade today
3. Key risks to watch
4. Overall day trading opportunity rating (1-10)"""

            try:
                response = self.model.generate_content(prompt)
                return {
                    'overall': 'analyzed',
                    'analysis': response.text,
                    'news_count': len(market_news)
                }
            except:
                pass
        
        return {
            'overall': 'neutral',
            'description': f'Analyzed {len(market_news)} market headlines',
            'trading_environment': 'Data available but AI analysis unavailable'
        }
    
    def get_full_analysis(self, symbol):
        """Get complete news analysis for a symbol"""
        news = self.fetch_news(symbol)
        sentiment = self.analyze_sentiment_gemini(symbol, news)
        
        return {
            'symbol': symbol,
            'news': news,
            'sentiment_analysis': sentiment,
            'timestamp': datetime.now().isoformat()
        }


if __name__ == '__main__':
    from dotenv import load_dotenv
    load_dotenv()
    
    analyzer = NewsAnalyzer()
    result = analyzer.get_full_analysis('AAPL')
    print(f"Sentiment: {result['sentiment_analysis']['sentiment']}")
    print(f"Action: {result['sentiment_analysis']['trading_action']}")
