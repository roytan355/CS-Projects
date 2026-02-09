"""
Trading Signals Module
Generates entry/exit points, stop-loss, and target prices
"""
import os

class TradingSignals:
    def __init__(self, account_size=10000, max_risk_percent=0.02):
        self.account_size = float(os.getenv('ACCOUNT_SIZE', account_size))
        self.max_risk_percent = float(os.getenv('MAX_RISK_PER_TRADE', max_risk_percent))
    
    def generate_signal(self, stock_data):
        """
        Generate trading signal based on technical analysis
        Returns: signal dict with entry, target, stop_loss, etc.
        """
        if not stock_data:
            return None
        
        price = stock_data['price']
        rsi = stock_data['rsi']
        macd_signal = stock_data['macd_signal']
        trend = stock_data['trend']
        volume_ratio = stock_data['volume_ratio']
        atr_percent = stock_data.get('atr_percent', 2.0)
        
        # Score the setup (0-100)
        score = self._calculate_score(stock_data)
        
        # Determine signal type
        signal_type = self._determine_signal_type(score, rsi, macd_signal, trend)
        
        # Calculate entry, target, stop-loss
        if signal_type in ['STRONG_BUY', 'BUY']:
            entry = price
            stop_loss = price * (1 - (atr_percent * 1.5 / 100))  # 1.5x ATR stop
            target = price * (1 + (atr_percent * 3 / 100))  # 3x ATR target (2:1 R/R)
            
            # Aggressive targets for strong setups
            if signal_type == 'STRONG_BUY':
                target = price * 1.10  # 10% target
                stop_loss = price * 0.95  # 5% stop
            else:
                target = price * 1.06  # 6% target
                stop_loss = price * 0.97  # 3% stop
                
        elif signal_type in ['STRONG_SELL', 'SELL']:
            entry = price
            stop_loss = price * (1 + (atr_percent * 1.5 / 100))
            target = price * (1 - (atr_percent * 3 / 100))
            
            if signal_type == 'STRONG_SELL':
                target = price * 0.90
                stop_loss = price * 1.05
            else:
                target = price * 0.94
                stop_loss = price * 1.03
        else:
            entry = price
            target = price
            stop_loss = price
        
        # Calculate position size
        position = self._calculate_position_size(entry, stop_loss)
        
        return {
            'symbol': stock_data['symbol'],
            'signal': signal_type,
            'score': score,
            'entry': round(entry, 2),
            'target': round(target, 2),
            'stop_loss': round(stop_loss, 2),
            'risk_reward': round(abs(target - entry) / abs(entry - stop_loss), 2) if entry != stop_loss else 0,
            'position_size': position['shares'],
            'position_value': position['value'],
            'max_loss': position['max_loss'],
            'potential_profit': position['potential_profit'],
            'confidence': self._get_confidence_level(score),
            'reasons': self._get_signal_reasons(stock_data, signal_type)
        }
    
    def _calculate_score(self, data):
        """Calculate overall score 0-100"""
        score = 50  # Base score
        
        # RSI contribution (momentum)
        rsi = data['rsi']
        if rsi > 60 and rsi < 80:
            score += 15  # Strong momentum
        elif rsi > 50 and rsi < 60:
            score += 10  # Moderate momentum
        elif rsi < 40 and rsi > 20:
            score += 10  # Oversold bounce potential
        elif rsi >= 80:
            score -= 10  # Overbought
        elif rsi <= 20:
            score += 5  # Extremely oversold
        
        # MACD contribution
        if data['macd_signal'] == 'bullish':
            score += 10
        else:
            score -= 5
        
        # Trend contribution
        if data['trend'] == 'strong_uptrend':
            score += 15
        elif data['trend'] == 'uptrend':
            score += 10
        elif data['trend'] == 'strong_downtrend':
            score -= 10
        elif data['trend'] == 'downtrend':
            score -= 5
        
        # Volume contribution
        if data['volume_ratio'] > 2:
            score += 10
        elif data['volume_ratio'] > 1.5:
            score += 5
        
        # Price movement
        change = abs(data['change_percent'])
        if change > 5:
            score += 10
        elif change > 3:
            score += 5
        
        return min(100, max(0, score))
    
    def _determine_signal_type(self, score, rsi, macd_signal, trend):
        """Determine the type of signal"""
        if score >= 80 and trend in ['strong_uptrend', 'uptrend']:
            return 'STRONG_BUY'
        elif score >= 65 and macd_signal == 'bullish':
            return 'BUY'
        elif score <= 30 and trend in ['strong_downtrend', 'downtrend']:
            return 'STRONG_SELL'
        elif score <= 40 and macd_signal == 'bearish':
            return 'SELL'
        elif score >= 55:
            return 'WATCH_LONG'
        elif score <= 45:
            return 'WATCH_SHORT'
        return 'NEUTRAL'
    
    def _calculate_position_size(self, entry, stop_loss):
        """Calculate position size based on risk management"""
        risk_amount = self.account_size * self.max_risk_percent
        risk_per_share = abs(entry - stop_loss)
        
        if risk_per_share == 0:
            return {'shares': 0, 'value': 0, 'max_loss': 0, 'potential_profit': 0}
        
        shares = int(risk_amount / risk_per_share)
        value = shares * entry
        
        # Don't exceed 25% of account on single trade
        max_position = self.account_size * 0.25
        if value > max_position:
            shares = int(max_position / entry)
            value = shares * entry
        
        return {
            'shares': shares,
            'value': round(value, 2),
            'max_loss': round(shares * risk_per_share, 2),
            'potential_profit': round(shares * risk_per_share * 2, 2)  # Assuming 2:1 R/R
        }
    
    def _get_confidence_level(self, score):
        """Get confidence level string"""
        if score >= 80:
            return 'HIGH'
        elif score >= 65:
            return 'MEDIUM-HIGH'
        elif score >= 50:
            return 'MEDIUM'
        elif score >= 35:
            return 'MEDIUM-LOW'
        return 'LOW'
    
    def _get_signal_reasons(self, data, signal_type):
        """Get reasons for the signal"""
        reasons = []
        
        if signal_type in ['STRONG_BUY', 'BUY']:
            if data['trend'] in ['strong_uptrend', 'uptrend']:
                reasons.append(f"📈 {data['trend'].replace('_', ' ').title()}")
            if data['rsi'] > 50 and data['rsi'] < 70:
                reasons.append(f"💪 RSI momentum ({data['rsi']})")
            if data['macd_signal'] == 'bullish':
                reasons.append("📊 MACD bullish crossover")
            if data['volume_ratio'] > 1.5:
                reasons.append(f"📢 High volume ({data['volume_ratio']}x avg)")
            if data['change_percent'] > 0:
                reasons.append(f"🚀 Up {data['change_percent']}% today")
        
        elif signal_type in ['STRONG_SELL', 'SELL']:
            if data['trend'] in ['strong_downtrend', 'downtrend']:
                reasons.append(f"📉 {data['trend'].replace('_', ' ').title()}")
            if data['rsi'] > 70:
                reasons.append(f"⚠️ Overbought RSI ({data['rsi']})")
            if data['macd_signal'] == 'bearish':
                reasons.append("📊 MACD bearish crossover")
            if data['change_percent'] < -3:
                reasons.append(f"🔻 Down {data['change_percent']}% today")
        
        return reasons if reasons else ['No strong signals']


if __name__ == '__main__':
    # Test
    sample_data = {
        'symbol': 'AAPL',
        'price': 185.50,
        'change_percent': 3.5,
        'volume_ratio': 2.1,
        'rsi': 62,
        'macd_signal': 'bullish',
        'trend': 'uptrend',
        'atr_percent': 1.8
    }
    
    signals = TradingSignals()
    result = signals.generate_signal(sample_data)
    print(f"Signal: {result['signal']}")
    print(f"Entry: ${result['entry']} | Target: ${result['target']} | Stop: ${result['stop_loss']}")
    print(f"R/R Ratio: {result['risk_reward']}")
    print(f"Position: {result['position_size']} shares (${result['position_value']})")
