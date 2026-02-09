"""
Stock Scanner Module
Scans for day trading opportunities using technical indicators
"""
import yfinance as yf
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import requests
import os

class StockScanner:
    def __init__(self):
        self.alpha_vantage_key = os.getenv('ALPHA_VANTAGE_KEY', 'demo')
        self.finnhub_key = os.getenv('FINNHUB_KEY', 'demo')
        
        # Popular day trading stocks (high volume, liquid)
        self.watchlist = [
            'AAPL', 'TSLA', 'NVDA', 'AMD', 'META', 'GOOGL', 'AMZN', 'MSFT',
            'SPY', 'QQQ', 'NFLX', 'COIN', 'PLTR', 'SOFI', 'NIO', 'RIVN',
            'BA', 'DIS', 'JPM', 'GS', 'BABA', 'PYPL', 'SQ', 'ROKU',
            'MARA', 'RIOT', 'HOOD', 'SNAP', 'UBER', 'LYFT'
        ]
    
    def get_stock_data(self, symbol, period='5d', interval='5m'):
        """Fetch stock data using yfinance"""
        try:
            ticker = yf.Ticker(symbol)
            df = ticker.history(period=period, interval=interval)
            if df.empty:
                return None
            return df
        except Exception as e:
            print(f"Error fetching {symbol}: {e}")
            return None
    
    def calculate_rsi(self, prices, period=14):
        """Calculate Relative Strength Index"""
        delta = prices.diff()
        gain = (delta.where(delta > 0, 0)).rolling(window=period).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=period).mean()
        rs = gain / loss
        rsi = 100 - (100 / (1 + rs))
        return rsi.iloc[-1] if not rsi.empty else 50
    
    def calculate_macd(self, prices):
        """Calculate MACD indicator"""
        exp1 = prices.ewm(span=12, adjust=False).mean()
        exp2 = prices.ewm(span=26, adjust=False).mean()
        macd = exp1 - exp2
        signal = macd.ewm(span=9, adjust=False).mean()
        histogram = macd - signal
        return {
            'macd': macd.iloc[-1] if not macd.empty else 0,
            'signal': signal.iloc[-1] if not signal.empty else 0,
            'histogram': histogram.iloc[-1] if not histogram.empty else 0
        }
    
    def calculate_ema(self, prices, periods=[9, 20, 50]):
        """Calculate Exponential Moving Averages"""
        emas = {}
        for period in periods:
            ema = prices.ewm(span=period, adjust=False).mean()
            emas[f'ema_{period}'] = ema.iloc[-1] if not ema.empty else 0
        return emas
    
    def calculate_volume_ratio(self, volumes):
        """Calculate volume compared to average"""
        if len(volumes) < 20:
            return 1.0
        avg_volume = volumes.iloc[-20:].mean()
        current_volume = volumes.iloc[-1]
        return current_volume / avg_volume if avg_volume > 0 else 1.0
    
    def analyze_stock(self, symbol):
        """Full technical analysis of a stock"""
        df = self.get_stock_data(symbol, period='1mo', interval='1d')
        if df is None or len(df) < 20:
            return None
        
        current_price = df['Close'].iloc[-1]
        prev_close = df['Close'].iloc[-2] if len(df) > 1 else current_price
        day_change = ((current_price - prev_close) / prev_close) * 100
        
        # Technical indicators
        rsi = self.calculate_rsi(df['Close'])
        macd = self.calculate_macd(df['Close'])
        emas = self.calculate_ema(df['Close'])
        volume_ratio = self.calculate_volume_ratio(df['Volume'])
        
        # Daily high/low
        day_high = df['High'].iloc[-1]
        day_low = df['Low'].iloc[-1]
        
        # ATR for volatility
        high_low = df['High'] - df['Low']
        atr = high_low.rolling(window=14).mean().iloc[-1]
        atr_percent = (atr / current_price) * 100
        
        return {
            'symbol': symbol,
            'price': round(current_price, 2),
            'change_percent': round(day_change, 2),
            'volume_ratio': round(volume_ratio, 2),
            'rsi': round(rsi, 1),
            'macd': round(macd['histogram'], 3),
            'macd_signal': 'bullish' if macd['histogram'] > 0 else 'bearish',
            'ema_9': round(emas['ema_9'], 2),
            'ema_20': round(emas['ema_20'], 2),
            'day_high': round(day_high, 2),
            'day_low': round(day_low, 2),
            'atr_percent': round(atr_percent, 2),
            'trend': self._determine_trend(current_price, emas)
        }
    
    def _determine_trend(self, price, emas):
        """Determine overall trend"""
        if price > emas['ema_9'] > emas['ema_20']:
            return 'strong_uptrend'
        elif price > emas['ema_20']:
            return 'uptrend'
        elif price < emas['ema_9'] < emas['ema_20']:
            return 'strong_downtrend'
        elif price < emas['ema_20']:
            return 'downtrend'
        return 'sideways'
    
    def scan_momentum_stocks(self, min_change=3.0, min_volume_ratio=1.5):
        """Scan for stocks with momentum"""
        momentum_stocks = []
        
        for symbol in self.watchlist:
            analysis = self.analyze_stock(symbol)
            if analysis is None:
                continue
            
            # Filter for momentum criteria
            if (abs(analysis['change_percent']) >= min_change and 
                analysis['volume_ratio'] >= min_volume_ratio):
                momentum_stocks.append(analysis)
        
        # Sort by absolute change
        momentum_stocks.sort(key=lambda x: abs(x['change_percent']), reverse=True)
        return momentum_stocks[:10]  # Top 10
    
    def get_market_overview(self):
        """Get overall market status"""
        indices = ['SPY', 'QQQ', 'IWM', 'DIA']
        overview = []
        
        for symbol in indices:
            analysis = self.analyze_stock(symbol)
            if analysis:
                overview.append(analysis)
        
        # Get VIX for fear gauge
        try:
            vix = yf.Ticker('^VIX')
            vix_data = vix.history(period='2d')
            if not vix_data.empty:
                vix_value = vix_data['Close'].iloc[-1]
                overview.append({
                    'symbol': 'VIX',
                    'price': round(vix_value, 2),
                    'change_percent': 0,
                    'interpretation': 'Low Fear' if vix_value < 15 else 'Normal' if vix_value < 25 else 'High Fear'
                })
        except:
            pass
        
        return overview


if __name__ == '__main__':
    scanner = StockScanner()
    print("Scanning for momentum stocks...")
    stocks = scanner.scan_momentum_stocks()
    for stock in stocks:
        print(f"{stock['symbol']}: {stock['change_percent']}% | RSI: {stock['rsi']} | Vol: {stock['volume_ratio']}x")
