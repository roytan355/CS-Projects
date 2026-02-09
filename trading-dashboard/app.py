"""
Day Trading Dashboard - Main Flask Application
"""
from flask import Flask, render_template, jsonify, request
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

from stock_scanner import StockScanner
from trading_signals import TradingSignals
from news_analyzer import NewsAnalyzer

app = Flask(__name__)

# Initialize modules
scanner = StockScanner()
signals = TradingSignals()
news_analyzer = NewsAnalyzer()

@app.route('/')
def index():
    """Main dashboard"""
    return render_template('index.html')

@app.route('/api/market-overview')
def market_overview():
    """Get market overview (SPY, QQQ, VIX)"""
    try:
        overview = scanner.get_market_overview()
        return jsonify({'success': True, 'data': overview})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/scan-momentum')
def scan_momentum():
    """Scan for momentum stocks"""
    try:
        min_change = float(request.args.get('min_change', 2.0))
        min_volume = float(request.args.get('min_volume', 1.3))
        
        stocks = scanner.scan_momentum_stocks(min_change, min_volume)
        return jsonify({'success': True, 'data': stocks})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/analyze/<symbol>')
def analyze_stock(symbol):
    """Full analysis of a single stock"""
    try:
        # Technical analysis
        tech_analysis = scanner.analyze_stock(symbol.upper())
        if not tech_analysis:
            return jsonify({'success': False, 'error': 'Could not fetch stock data'}), 404
        
        # Generate trading signal
        signal = signals.generate_signal(tech_analysis)
        
        # News sentiment (optional - can be slow)
        include_news = request.args.get('news', 'false').lower() == 'true'
        news_data = None
        if include_news:
            news_data = news_analyzer.get_full_analysis(symbol.upper())
        
        return jsonify({
            'success': True,
            'data': {
                'technical': tech_analysis,
                'signal': signal,
                'news': news_data
            }
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/recommendations')
def get_recommendations():
    """Get AI-powered trading recommendations"""
    try:
        # Scan for momentum stocks
        momentum_stocks = scanner.scan_momentum_stocks(min_change=2.0, min_volume_ratio=1.3)
        
        recommendations = []
        for stock in momentum_stocks[:5]:  # Limit to top 5
            signal = signals.generate_signal(stock)
            if signal and signal['signal'] in ['STRONG_BUY', 'BUY', 'STRONG_SELL', 'SELL']:
                recommendations.append({
                    'technical': stock,
                    'signal': signal
                })
        
        # Sort by score
        recommendations.sort(key=lambda x: x['signal']['score'], reverse=True)
        
        return jsonify({
            'success': True,
            'data': recommendations,
            'count': len(recommendations)
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/news/<symbol>')
def get_news(symbol):
    """Get news and sentiment for a symbol"""
    try:
        analysis = news_analyzer.get_full_analysis(symbol.upper())
        return jsonify({'success': True, 'data': analysis})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/market-sentiment')
def market_sentiment():
    """Get overall market sentiment"""
    try:
        sentiment = news_analyzer.get_market_sentiment()
        return jsonify({'success': True, 'data': sentiment})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/calculate-position', methods=['POST'])
def calculate_position():
    """Calculate position size for a trade"""
    try:
        data = request.json
        entry = float(data.get('entry', 0))
        stop_loss = float(data.get('stop_loss', 0))
        account_size = float(data.get('account_size', 10000))
        risk_percent = float(data.get('risk_percent', 0.02))
        
        if entry <= 0 or stop_loss <= 0:
            return jsonify({'success': False, 'error': 'Invalid entry or stop_loss'}), 400
        
        risk_amount = account_size * risk_percent
        risk_per_share = abs(entry - stop_loss)
        
        if risk_per_share == 0:
            return jsonify({'success': False, 'error': 'Entry and stop_loss cannot be equal'}), 400
        
        shares = int(risk_amount / risk_per_share)
        position_value = shares * entry
        max_loss = shares * risk_per_share
        
        return jsonify({
            'success': True,
            'data': {
                'shares': shares,
                'position_value': round(position_value, 2),
                'max_loss': round(max_loss, 2),
                'risk_amount': round(risk_amount, 2)
            }
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/watchlist')
def get_watchlist():
    """Get watchlist with current prices"""
    try:
        watchlist_data = []
        for symbol in scanner.watchlist[:15]:  # Limit to 15
            analysis = scanner.analyze_stock(symbol)
            if analysis:
                watchlist_data.append(analysis)
        
        # Sort by absolute change
        watchlist_data.sort(key=lambda x: abs(x['change_percent']), reverse=True)
        
        return jsonify({'success': True, 'data': watchlist_data})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


if __name__ == '__main__':
    print("🚀 Starting Day Trading Dashboard...")
    print("📊 Open http://localhost:5000 in your browser")
    app.run(debug=True, port=5000)
