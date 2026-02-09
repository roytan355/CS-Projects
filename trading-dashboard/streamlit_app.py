"""
Day Trading Dashboard - Streamlit Version
Deploy to Streamlit Cloud for free hosting
"""
import streamlit as st
import pandas as pd
import yfinance as yf
from datetime import datetime, timedelta
import os

# Page config
st.set_page_config(
    page_title="📈 Day Trading Dashboard",
    page_icon="📈",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for dark trading theme
st.markdown("""
<style>
    .stApp {
        background-color: #0d1117;
    }
    .metric-card {
        background: #161b22;
        border: 1px solid #30363d;
        border-radius: 12px;
        padding: 16px;
        text-align: center;
    }
    .bullish { color: #3fb950; }
    .bearish { color: #f85149; }
    .signal-buy {
        background: linear-gradient(135deg, #1a472a 0%, #0d1117 100%);
        border: 1px solid #3fb950;
        border-radius: 10px;
        padding: 16px;
        margin: 8px 0;
    }
    .signal-watch {
        background: #21262d;
        border: 1px solid #30363d;
        border-radius: 10px;
        padding: 16px;
        margin: 8px 0;
    }
</style>
""", unsafe_allow_html=True)

# ============ STOCK SCANNER MODULE ============
class StockScanner:
    def __init__(self):
        self.watchlist = [
            'AAPL', 'TSLA', 'NVDA', 'AMD', 'META', 'GOOGL', 'AMZN', 'MSFT',
            'SPY', 'QQQ', 'NFLX', 'COIN', 'PLTR', 'SOFI', 'NIO', 'RIVN',
            'BA', 'DIS', 'JPM', 'MARA', 'RIOT', 'HOOD', 'SNAP', 'UBER'
        ]
    
    @st.cache_data(ttl=300)  # Cache for 5 minutes
    def get_stock_data(_self, symbol, period='1mo', interval='1d'):
        try:
            ticker = yf.Ticker(symbol)
            df = ticker.history(period=period, interval=interval)
            return df
        except:
            return None
    
    def calculate_rsi(self, prices, period=14):
        delta = prices.diff()
        gain = (delta.where(delta > 0, 0)).rolling(window=period).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=period).mean()
        rs = gain / loss
        rsi = 100 - (100 / (1 + rs))
        return rsi.iloc[-1] if not rsi.empty else 50
    
    def calculate_macd(self, prices):
        exp1 = prices.ewm(span=12, adjust=False).mean()
        exp2 = prices.ewm(span=26, adjust=False).mean()
        macd = exp1 - exp2
        signal = macd.ewm(span=9, adjust=False).mean()
        histogram = macd - signal
        return 'bullish' if histogram.iloc[-1] > 0 else 'bearish'
    
    def analyze_stock(self, symbol):
        df = self.get_stock_data(symbol)
        if df is None or len(df) < 20:
            return None
        
        current_price = df['Close'].iloc[-1]
        prev_close = df['Close'].iloc[-2] if len(df) > 1 else current_price
        day_change = ((current_price - prev_close) / prev_close) * 100
        
        rsi = self.calculate_rsi(df['Close'])
        macd = self.calculate_macd(df['Close'])
        
        # Volume ratio
        avg_volume = df['Volume'].iloc[-20:].mean()
        current_volume = df['Volume'].iloc[-1]
        volume_ratio = current_volume / avg_volume if avg_volume > 0 else 1.0
        
        # ATR
        high_low = df['High'] - df['Low']
        atr = high_low.rolling(window=14).mean().iloc[-1]
        atr_percent = (atr / current_price) * 100
        
        # Trend
        ema_9 = df['Close'].ewm(span=9).mean().iloc[-1]
        ema_20 = df['Close'].ewm(span=20).mean().iloc[-1]
        if current_price > ema_9 > ema_20:
            trend = 'strong_uptrend'
        elif current_price > ema_20:
            trend = 'uptrend'
        elif current_price < ema_9 < ema_20:
            trend = 'strong_downtrend'
        else:
            trend = 'sideways'
        
        return {
            'symbol': symbol,
            'price': round(current_price, 2),
            'change_percent': round(day_change, 2),
            'volume_ratio': round(volume_ratio, 2),
            'rsi': round(rsi, 1),
            'macd_signal': macd,
            'atr_percent': round(atr_percent, 2),
            'trend': trend,
            'day_high': round(df['High'].iloc[-1], 2),
            'day_low': round(df['Low'].iloc[-1], 2)
        }

# ============ TRADING SIGNALS MODULE ============
class TradingSignals:
    def __init__(self, account_size=10000):
        self.account_size = account_size
    
    def generate_signal(self, stock_data):
        if not stock_data:
            return None
        
        price = stock_data['price']
        rsi = stock_data['rsi']
        macd_signal = stock_data['macd_signal']
        trend = stock_data['trend']
        atr_percent = stock_data.get('atr_percent', 2.0)
        
        # Score calculation
        score = 50
        if rsi > 60 and rsi < 80:
            score += 15
        elif rsi > 50:
            score += 10
        elif rsi < 40 and rsi > 20:
            score += 10
        
        if macd_signal == 'bullish':
            score += 10
        else:
            score -= 5
        
        if trend == 'strong_uptrend':
            score += 15
        elif trend == 'uptrend':
            score += 10
        elif trend == 'strong_downtrend':
            score -= 10
        
        if stock_data['volume_ratio'] > 2:
            score += 10
        elif stock_data['volume_ratio'] > 1.5:
            score += 5
        
        if abs(stock_data['change_percent']) > 5:
            score += 10
        
        score = min(100, max(0, score))
        
        # Determine signal
        if score >= 80 and trend in ['strong_uptrend', 'uptrend']:
            signal_type = 'STRONG_BUY'
            target = price * 1.10
            stop_loss = price * 0.95
        elif score >= 65 and macd_signal == 'bullish':
            signal_type = 'BUY'
            target = price * 1.06
            stop_loss = price * 0.97
        elif score >= 50:
            signal_type = 'WATCH_LONG'
            target = price * (1 + (atr_percent * 2 / 100))
            stop_loss = price * (1 - (atr_percent * 1.5 / 100))
        else:
            signal_type = 'NEUTRAL'
            target = price * (1 + (atr_percent * 2 / 100))
            stop_loss = price * (1 - (atr_percent * 1.5 / 100))
        
        # Position sizing
        risk_amount = self.account_size * 0.02
        risk_per_share = abs(price - stop_loss)
        shares = int(risk_amount / risk_per_share) if risk_per_share > 0 else 0
        
        return {
            'symbol': stock_data['symbol'],
            'signal': signal_type,
            'score': score,
            'entry': round(price, 2),
            'target': round(target, 2),
            'stop_loss': round(stop_loss, 2),
            'risk_reward': round(abs(target - price) / abs(price - stop_loss), 2) if risk_per_share > 0 else 0,
            'shares': shares,
            'position_value': round(shares * price, 2)
        }
    
    def generate_portfolio(self, stock_signals, total_capital, max_positions=5):
        actionable = [
            (stock, signal) for stock, signal in stock_signals
            if signal and signal['signal'] in ['STRONG_BUY', 'BUY', 'WATCH_LONG']
            and signal['score'] >= 50
        ]
        
        if not actionable:
            return None
        
        actionable.sort(key=lambda x: x[1]['score'], reverse=True)
        selected = actionable[:max_positions]
        
        total_score = sum(s[1]['score'] for s in selected)
        positions = []
        remaining = total_capital
        
        for i, (stock, signal) in enumerate(selected):
            weight = signal['score'] / total_score
            allocated = remaining * weight if i < len(selected) - 1 else remaining
            
            shares = int(allocated / stock['price'])
            actual_value = shares * stock['price']
            
            if shares > 0:
                risk = abs(signal['entry'] - signal['stop_loss']) * shares
                profit = abs(signal['target'] - signal['entry']) * shares
                
                positions.append({
                    'symbol': stock['symbol'],
                    'signal': signal['signal'],
                    'score': signal['score'],
                    'shares': shares,
                    'value': round(actual_value, 2),
                    'allocation': round((actual_value / total_capital) * 100, 1),
                    'entry': signal['entry'],
                    'target': signal['target'],
                    'stop_loss': signal['stop_loss'],
                    'potential_profit': round(profit, 2),
                    'max_loss': round(risk, 2)
                })
                remaining -= actual_value
        
        if not positions:
            return None
        
        return {
            'total_capital': total_capital,
            'allocated': round(total_capital - remaining, 2),
            'cash_reserve': round(remaining, 2),
            'positions': positions,
            'total_profit': round(sum(p['potential_profit'] for p in positions), 2),
            'total_risk': round(sum(p['max_loss'] for p in positions), 2)
        }

# ============ MAIN APP ============
def main():
    scanner = StockScanner()
    signals = TradingSignals()
    
    # Header
    st.title("📈 Day Trading Dashboard")
    st.caption("AI-powered aggressive day trading recommendations")
    
    # Sidebar
    with st.sidebar:
        st.header("⚙️ Settings")
        account_size = st.number_input("Account Size ($)", value=10000, step=1000)
        signals.account_size = account_size
        
        st.divider()
        st.header("🚀 Portfolio Generator")
        total_capital = st.number_input("Total Capital ($)", value=5000, step=500)
        max_positions = st.slider("Max Positions", 1, 10, 5)
        generate_btn = st.button("🎯 Generate Portfolio", type="primary", use_container_width=True)
    
    # Market Overview
    st.header("📊 Market Overview")
    col1, col2, col3, col4, col5 = st.columns(5)
    
    indices = ['SPY', 'QQQ', 'IWM', 'DIA']
    for i, (col, symbol) in enumerate(zip([col1, col2, col3, col4], indices)):
        with col:
            data = scanner.analyze_stock(symbol)
            if data:
                change_color = "🟢" if data['change_percent'] >= 0 else "🔴"
                st.metric(
                    symbol,
                    f"${data['price']}",
                    f"{data['change_percent']:+.2f}%"
                )
    
    # Get VIX
    with col5:
        try:
            vix = yf.Ticker('^VIX').history(period='1d')['Close'].iloc[-1]
            fear_level = "Low Fear" if vix < 15 else "Normal" if vix < 25 else "High Fear"
            st.metric("VIX", f"{vix:.2f}", fear_level)
        except:
            st.metric("VIX", "N/A", "")
    
    st.divider()
    
    # Portfolio Generator Results
    if generate_btn:
        with st.spinner("Scanning stocks and generating portfolio..."):
            all_signals = []
            progress = st.progress(0)
            
            for i, symbol in enumerate(scanner.watchlist[:15]):
                stock_data = scanner.analyze_stock(symbol)
                if stock_data:
                    signal = signals.generate_signal(stock_data)
                    if signal:
                        all_signals.append((stock_data, signal))
                progress.progress((i + 1) / 15)
            
            portfolio = signals.generate_portfolio(all_signals, total_capital, max_positions)
            
            if portfolio:
                st.header("🎯 Generated Portfolio")
                
                # Summary metrics
                m1, m2, m3, m4, m5 = st.columns(5)
                m1.metric("Total Capital", f"${portfolio['total_capital']:,.0f}")
                m2.metric("Allocated", f"${portfolio['allocated']:,.0f}")
                m3.metric("Cash Reserve", f"${portfolio['cash_reserve']:,.0f}")
                m4.metric("Potential Profit", f"+${portfolio['total_profit']:,.0f}", delta_color="normal")
                m5.metric("Max Risk", f"-${portfolio['total_risk']:,.0f}", delta_color="inverse")
                
                st.divider()
                
                # Position cards
                for pos in portfolio['positions']:
                    with st.container():
                        col1, col2, col3, col4 = st.columns([2, 2, 3, 3])
                        
                        with col1:
                            signal_emoji = "🟢" if "BUY" in pos['signal'] else "🟡"
                            st.markdown(f"### {signal_emoji} {pos['symbol']}")
                            st.caption(f"{pos['signal']} | Score: {pos['score']}/100")
                        
                        with col2:
                            st.metric("Investment", f"${pos['value']:,.0f}")
                            st.caption(f"{pos['shares']} shares | {pos['allocation']}%")
                        
                        with col3:
                            st.markdown("**Entry / Target / Stop**")
                            st.code(f"${pos['entry']} → ${pos['target']} | Stop: ${pos['stop_loss']}")
                        
                        with col4:
                            profit_col, risk_col = st.columns(2)
                            profit_col.metric("Profit", f"+${pos['potential_profit']:.0f}")
                            risk_col.metric("Risk", f"-${pos['max_loss']:.0f}")
                        
                        st.divider()
            else:
                st.warning("No actionable opportunities found. Try again when market has more momentum.")
    
    # Today's Top Picks
    st.header("🎯 Today's Top Picks")
    
    with st.spinner("Scanning for opportunities..."):
        recommendations = []
        
        for symbol in scanner.watchlist[:10]:
            stock_data = scanner.analyze_stock(symbol)
            if stock_data:
                signal = signals.generate_signal(stock_data)
                if signal and signal['signal'] in ['STRONG_BUY', 'BUY']:
                    recommendations.append((stock_data, signal))
        
        recommendations.sort(key=lambda x: x[1]['score'], reverse=True)
        
        if recommendations:
            for stock, signal in recommendations[:5]:
                with st.container():
                    col1, col2, col3 = st.columns([2, 2, 3])
                    
                    with col1:
                        change_emoji = "🟢" if stock['change_percent'] >= 0 else "🔴"
                        st.markdown(f"### {stock['symbol']}")
                        st.markdown(f"{change_emoji} **${stock['price']}** ({stock['change_percent']:+.2f}%)")
                        st.caption(f"RSI: {stock['rsi']} | Vol: {stock['volume_ratio']}x")
                    
                    with col2:
                        signal_color = "🟢" if signal['signal'] == 'STRONG_BUY' else "🟡"
                        st.markdown(f"{signal_color} **{signal['signal']}**")
                        st.caption(f"Score: {signal['score']}/100 | R/R: {signal['risk_reward']}")
                    
                    with col3:
                        c1, c2, c3 = st.columns(3)
                        c1.metric("Entry", f"${signal['entry']}")
                        c2.metric("Target", f"${signal['target']}")
                        c3.metric("Stop", f"${signal['stop_loss']}")
                    
                    st.divider()
        else:
            st.info("No strong buy signals at the moment. Check back later!")
    
    # Momentum Scanner
    st.header("🔍 Momentum Scanner")
    
    col1, col2 = st.columns(2)
    min_change = col1.number_input("Min Change %", value=2.0, step=0.5)
    min_volume = col2.number_input("Min Volume Ratio", value=1.3, step=0.1)
    
    if st.button("🔍 Scan", use_container_width=True):
        with st.spinner("Scanning..."):
            momentum = []
            for symbol in scanner.watchlist:
                data = scanner.analyze_stock(symbol)
                if data and abs(data['change_percent']) >= min_change and data['volume_ratio'] >= min_volume:
                    momentum.append(data)
            
            momentum.sort(key=lambda x: abs(x['change_percent']), reverse=True)
            
            if momentum:
                df = pd.DataFrame(momentum)
                df = df[['symbol', 'price', 'change_percent', 'volume_ratio', 'rsi', 'trend']]
                df.columns = ['Symbol', 'Price', 'Change %', 'Volume', 'RSI', 'Trend']
                st.dataframe(df, use_container_width=True, hide_index=True)
            else:
                st.info("No stocks match the criteria")
    
    # Footer
    st.divider()
    st.caption("⚠️ **Disclaimer:** This is for educational purposes only. Day trading involves significant risk. Never trade money you can't afford to lose.")

if __name__ == "__main__":
    main()
