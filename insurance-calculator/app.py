"""
Insurance Needs & Premium Estimator
A Streamlit-based tool for business case competitions
Built for Waterloo-Laurier Double Degree Program

Features:
- Risk Scoring (0-100 Framework)
- Coverage Recommendations (Life & Disability)
- Premium Estimation (Ontario Benchmarks)
- Sensitivity Analysis
"""

import streamlit as st
import pandas as pd
import plotly.graph_objects as go
import plotly.express as px
from datetime import datetime

# ==========================================
# PAGE CONFIGURATION
# ==========================================
st.set_page_config(
    page_title="Insurance Needs Estimator",
    page_icon="🛡️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for professional styling
st.markdown("""
<style>
    .main-header {
        font-size: 2.5rem;
        font-weight: 700;
        color: #1E3A5F;
        text-align: center;
        margin-bottom: 0.5rem;
    }
    .sub-header {
        font-size: 1.1rem;
        color: #666;
        text-align: center;
        margin-bottom: 2rem;
    }
    .metric-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 1.5rem;
        border-radius: 1rem;
        color: white;
        text-align: center;
    }
    .risk-low { color: #28a745; font-weight: bold; }
    .risk-medium { color: #ffc107; font-weight: bold; }
    .risk-high { color: #dc3545; font-weight: bold; }
    .stProgress > div > div > div > div {
        background: linear-gradient(90deg, #28a745, #ffc107, #dc3545);
    }
    .live-indicator {
        display: inline-block;
        width: 8px;
        height: 8px;
        background: #28a745;
        border-radius: 50%;
        margin-right: 8px;
        animation: pulse 1.5s infinite;
    }
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
</style>
""", unsafe_allow_html=True)

# ==========================================
# LIVE ACTUARIAL BENCHMARKS (Editable)
# ==========================================

# Initialize session state for live benchmarks
if 'last_update' not in st.session_state:
    st.session_state.last_update = datetime.now()

# Default risk scoring weights (can be adjusted)
DEFAULT_RISK_WEIGHTS = {
    "income_dependency": 0.30,
    "liabilities": 0.20,
    "dependents": 0.20,
    "coverage_gaps": 0.20,
    "health_trigger": 0.10
}

# Ontario premium benchmarks (defaults)
DEFAULT_LIFE_BASE_RATE = 0.20  # per $1,000 coverage (Term 20)
DEFAULT_SMOKER_MULTIPLIER = 2.0
DEFAULT_AGE_INCREMENT_RATE = 0.05  # 5% increase per year over 30

# Disability insurance range
DEFAULT_DISABILITY_LOW_RATE = 0.015  # 1.5% for low risk
DEFAULT_DISABILITY_HIGH_RATE = 0.035  # 3.5% for high risk

# Occupation class multipliers
OCCUPATION_MULTIPLIERS = {
    "Professional/White Collar": 1.0,
    "Skilled Trade": 1.5,
    "Manual Labor": 2.0,
    "Hazardous Occupation": 3.0
}

# ==========================================
# CALCULATION FUNCTIONS
# ==========================================

def calculate_risk_score(income_dep, liabilities, dependents, coverage_gaps, health_trigger, weights):
    """Calculate weighted risk score (0-100) using provided weights"""
    # Each input is 0-5, convert to 0-20 scale for weighting
    raw_scores = {
        "income_dependency": income_dep * 20,
        "liabilities": liabilities * 20,
        "dependents": dependents * 20,
        "coverage_gaps": coverage_gaps * 20,
        "health_trigger": health_trigger * 20
    }
    
    weighted_score = sum(raw_scores[k] * weights[k] for k in weights)
    return min(100, max(0, weighted_score))

def get_risk_category(score):
    """Categorize risk level"""
    if score < 33:
        return "Low Risk", "risk-low", "🟢"
    elif score < 66:
        return "Medium Risk", "risk-medium", "🟡"
    else:
        return "High Risk", "risk-high", "🔴"

def calculate_life_coverage(annual_income, total_liabilities, existing_coverage):
    """Calculate recommended life insurance coverage"""
    recommended = (annual_income * 10) + total_liabilities - existing_coverage
    return max(0, recommended)

def calculate_disability_coverage(annual_income):
    """Calculate disability insurance need (70% income replacement)"""
    return annual_income * 0.70

def calculate_life_premium(coverage_amount, age, is_smoker, base_rate, age_rate, smoker_mult):
    """Calculate annual life insurance premium (Term 20)"""
    rate = base_rate
    
    # Age adjustment (increase per year over 30)
    if age > 30:
        years_over_30 = age - 30
        rate *= (1 + age_rate) ** years_over_30
    
    # Smoker penalty
    if is_smoker:
        rate *= smoker_mult
    
    annual_premium = (coverage_amount / 1000) * rate * 12
    return annual_premium

def calculate_disability_premium(annual_income, risk_score, occupation_multiplier, low_rate, high_rate):
    """Calculate disability insurance premium range"""
    # Interpolate between low and high rates based on risk score
    rate = low_rate + (risk_score / 100) * (high_rate - low_rate)
    rate *= occupation_multiplier
    
    disability_benefit = annual_income * 0.70
    low_premium = disability_benefit * (rate * 0.8)
    high_premium = disability_benefit * (rate * 1.2)
    
    return low_premium, high_premium

# ==========================================
# MAIN APPLICATION
# ==========================================

def main():
    # Header
    st.markdown('<h1 class="main-header">🛡️ Insurance Needs & Premium Estimator</h1>', unsafe_allow_html=True)
    st.markdown('<p class="sub-header">Ontario-Based Actuarial Calculator for Business Case Analysis</p>', unsafe_allow_html=True)
    
    # Live status indicator
    st.markdown(f'''
        <div style="text-align: center; margin-bottom: 1rem;">
            <span class="live-indicator"></span>
            <span style="color: #28a745; font-size: 0.9rem;">LIVE</span>
            <span style="color: #666; font-size: 0.85rem;"> | Benchmarks updated: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}</span>
        </div>
    ''', unsafe_allow_html=True)
    
    # Sidebar - Client Information
    st.sidebar.header("📋 Client Information")
    
    col1, col2 = st.sidebar.columns(2)
    with col1:
        age = st.number_input("Age", min_value=18, max_value=80, value=35)
    with col2:
        gender = st.selectbox("Gender", ["Male", "Female", "Other"])
    
    is_smoker = st.sidebar.checkbox("🚬 Smoker", value=False)
    
    occupation = st.sidebar.selectbox(
        "Occupation Class",
        list(OCCUPATION_MULTIPLIERS.keys())
    )
    
    st.sidebar.divider()
    st.sidebar.header("💰 Financial Information")
    
    annual_income = st.sidebar.number_input(
        "Annual Income ($)", 
        min_value=0, 
        max_value=1000000, 
        value=75000,
        step=5000
    )
    
    total_liabilities = st.sidebar.number_input(
        "Total Liabilities ($)",
        min_value=0,
        max_value=5000000,
        value=300000,
        step=10000,
        help="Include mortgage, loans, debts"
    )
    
    existing_coverage = st.sidebar.number_input(
        "Existing Coverage ($)",
        min_value=0,
        max_value=5000000,
        value=50000,
        step=10000,
        help="Current life insurance coverage"
    )
    
    # ==========================================
    # LIVE ACTUARIAL BENCHMARKS (Sidebar)
    # ==========================================
    st.sidebar.divider()
    st.sidebar.header("⚙️ Live Actuarial Benchmarks")
    st.sidebar.caption("Adjust benchmarks in real-time")
    
    # Initialize with defaults (always available)
    risk_weights = DEFAULT_RISK_WEIGHTS.copy()
    life_base_rate = DEFAULT_LIFE_BASE_RATE
    smoker_multiplier = DEFAULT_SMOKER_MULTIPLIER
    age_increment = DEFAULT_AGE_INCREMENT_RATE
    disability_low_rate = DEFAULT_DISABILITY_LOW_RATE
    disability_high_rate = DEFAULT_DISABILITY_HIGH_RATE
    
    with st.sidebar.expander("📊 Risk Weight Distribution", expanded=False):
        w_income = st.slider("Income Dependency Weight", 0.0, 0.5, DEFAULT_RISK_WEIGHTS["income_dependency"], 0.05, key="w_income")
        w_liabilities = st.slider("Liabilities Weight", 0.0, 0.5, DEFAULT_RISK_WEIGHTS["liabilities"], 0.05, key="w_liab")
        w_dependents = st.slider("Dependents Weight", 0.0, 0.5, DEFAULT_RISK_WEIGHTS["dependents"], 0.05, key="w_dep")
        w_gaps = st.slider("Coverage Gaps Weight", 0.0, 0.5, DEFAULT_RISK_WEIGHTS["coverage_gaps"], 0.05, key="w_gaps")
        w_health = st.slider("Health Urgency Weight", 0.0, 0.5, DEFAULT_RISK_WEIGHTS["health_trigger"], 0.05, key="w_health")
        
        # Normalize weights to sum to 1
        total_weight = w_income + w_liabilities + w_dependents + w_gaps + w_health
        if total_weight > 0:
            risk_weights = {
                "income_dependency": w_income / total_weight,
                "liabilities": w_liabilities / total_weight,
                "dependents": w_dependents / total_weight,
                "coverage_gaps": w_gaps / total_weight,
                "health_trigger": w_health / total_weight
            }
        
        st.caption(f"Total: {total_weight:.0%} (auto-normalized)")
    
    with st.sidebar.expander("💵 Premium Benchmarks", expanded=False):
        life_base_rate = st.number_input("Life Base Rate (per $1k)", 0.10, 1.00, DEFAULT_LIFE_BASE_RATE, 0.05, key="life_rate")
        smoker_multiplier = st.number_input("Smoker Multiplier", 1.0, 4.0, DEFAULT_SMOKER_MULTIPLIER, 0.25, key="smoker_mult")
        age_increment = st.number_input("Age Increment Rate", 0.01, 0.15, DEFAULT_AGE_INCREMENT_RATE, 0.01, key="age_inc")
        disability_low_rate = st.number_input("Disability Low Rate", 0.005, 0.03, DEFAULT_DISABILITY_LOW_RATE, 0.005, key="dis_low")
        disability_high_rate = st.number_input("Disability High Rate", 0.02, 0.06, DEFAULT_DISABILITY_HIGH_RATE, 0.005, key="dis_high")
    
    # Main content - Risk Assessment
    st.header("📊 Risk Assessment (Five-Bucket Model)")
    
    risk_cols = st.columns(5)
    
    with risk_cols[0]:
        income_dep = st.slider(
            "Income Dependency",
            0, 5, 3,
            help="How much do dependents rely on this income? (0=None, 5=100%)"
        )
    
    with risk_cols[1]:
        liabilities = st.slider(
            "Liabilities",
            0, 5, 3,
            help="Level of debt obligations (0=None, 5=Very High)"
        )
    
    with risk_cols[2]:
        dependents = st.slider(
            "Dependents/Goals",
            0, 5, 2,
            help="Number of dependents & future goals (0=None, 5=Many)"
        )
    
    with risk_cols[3]:
        coverage_gaps = st.slider(
            "Coverage Gaps",
            0, 5, 3,
            help="Gap between current & needed coverage (0=None, 5=Large)"
        )
    
    with risk_cols[4]:
        health_trigger = st.slider(
            "Health Urgency",
            0, 5, 1,
            help="Health concerns or family history (0=None, 5=Urgent)"
        )
    
    # Calculate scores using live benchmarks
    risk_score = calculate_risk_score(income_dep, liabilities, dependents, coverage_gaps, health_trigger, risk_weights)
    risk_category, risk_class, risk_emoji = get_risk_category(risk_score)
    
    life_coverage = calculate_life_coverage(annual_income, total_liabilities, existing_coverage)
    disability_coverage = calculate_disability_coverage(annual_income)
    
    life_premium = calculate_life_premium(life_coverage, age, is_smoker, life_base_rate, age_increment, smoker_multiplier)
    disability_low_premium, disability_high_premium = calculate_disability_premium(
        annual_income, risk_score, OCCUPATION_MULTIPLIERS[occupation], disability_low_rate, disability_high_rate
    )
    
    # Results Display
    st.divider()
    st.header("📈 Results Summary")
    
    # Metrics Row
    metric_cols = st.columns(4)
    
    with metric_cols[0]:
        st.metric(
            label="Total Risk Score",
            value=f"{risk_score:.0f}/100",
            delta=f"{risk_emoji} {risk_category}"
        )
    
    with metric_cols[1]:
        st.metric(
            label="Life Coverage Needed",
            value=f"${life_coverage:,.0f}"
        )
    
    with metric_cols[2]:
        st.metric(
            label="Disability Coverage",
            value=f"${disability_coverage:,.0f}/yr"
        )
    
    with metric_cols[3]:
        total_premium = life_premium + (disability_low_premium + disability_high_premium) / 2
        st.metric(
            label="Est. Total Annual Premium",
            value=f"${total_premium:,.0f}"
        )
    
    # Detailed breakdown
    st.divider()
    detail_cols = st.columns(2)
    
    with detail_cols[0]:
        st.subheader("🏥 Life Insurance (Term 20)")
        st.write(f"**Recommended Coverage:** ${life_coverage:,.0f}")
        st.write(f"**Base Rate:** ${life_base_rate:.0f} per $1,000")
        if is_smoker:
            st.write(f"**Smoker Penalty:** {smoker_multiplier}x applied ⚠️")
        if age > 30:
            age_factor = (1 + age_increment) ** (age - 30)
            st.write(f"**Age Adjustment:** {age_factor:.0f}x (age {age})")
        st.write(f"**Estimated Annual Premium:** ${life_premium:,.0f}")
    
    with detail_cols[1]:
        st.subheader("🩺 Disability Insurance")
        st.write(f"**Income Replacement (70%):** ${disability_coverage:,.0f}/year")
        st.write(f"**Occupation Class:** {occupation}")
        st.write(f"**Premium Range:** ${disability_low_premium:,.0f} - ${disability_high_premium:,.0f}/year")
        avg_disability = (disability_low_premium + disability_high_premium) / 2
        st.write(f"**Estimated Annual Premium:** ${avg_disability:,.0f}")
    
    # Visualization
    st.divider()
    st.header("📊 Visual Analysis")
    
    viz_cols = st.columns(2)
    
    with viz_cols[0]:
        # Risk breakdown radar chart
        categories = ['Income Dependency', 'Liabilities', 'Dependents', 'Coverage Gaps', 'Health Urgency']
        values = [income_dep, liabilities, dependents, coverage_gaps, health_trigger]
        
        fig_radar = go.Figure()
        fig_radar.add_trace(go.Scatterpolar(
            r=values + [values[0]],  # Close the polygon
            theta=categories + [categories[0]],
            fill='toself',
            fillcolor='rgba(102, 126, 234, 0.3)',
            line=dict(color='#667eea', width=2),
            name='Risk Profile'
        ))
        fig_radar.update_layout(
            polar=dict(radialaxis=dict(visible=True, range=[0, 5])),
            showlegend=False,
            title="Risk Factor Breakdown"
        )
        st.plotly_chart(fig_radar, use_container_width=True)
    
    with viz_cols[1]:
        # Premium breakdown pie chart
        fig_pie = go.Figure(data=[go.Pie(
            labels=['Life Insurance', 'Disability Insurance'],
            values=[life_premium, avg_disability],
            hole=0.4,
            marker_colors=['#667eea', '#764ba2']
        )])
        fig_pie.update_layout(title="Premium Allocation")
        st.plotly_chart(fig_pie, use_container_width=True)
    
    # Sensitivity Analysis
    st.divider()
    st.header("🔬 Sensitivity Analysis")
    st.write("See how premiums change with different risk scenarios:")
    
    sensitivity_delta = st.slider("Adjust Risk Score by:", -20, 20, 0, 5)
    new_risk_score = max(0, min(100, risk_score + sensitivity_delta))
    
    new_disability_low_prem, new_disability_high_prem = calculate_disability_premium(
        annual_income, new_risk_score, OCCUPATION_MULTIPLIERS[occupation], disability_low_rate, disability_high_rate
    )
    new_avg_disability = (new_disability_low_prem + new_disability_high_prem) / 2
    
    sens_cols = st.columns(3)
    with sens_cols[0]:
        st.metric("Original Risk Score", f"{risk_score:.0f}")
    with sens_cols[1]:
        st.metric("Adjusted Risk Score", f"{new_risk_score:.0f}", delta=f"{sensitivity_delta:+}")
    with sens_cols[2]:
        premium_change = new_avg_disability - avg_disability
        st.metric(
            "Disability Premium Change", 
            f"${new_avg_disability:,.0f}/yr",
            delta=f"${premium_change:+,.0f}"
        )
    
    # Export Summary
    st.divider()
    st.header("📄 Summary Report")
    
    summary = f"""
    ## Insurance Needs Assessment Summary
    
    **Client Profile:**
    - Age: {age} | Gender: {gender} | Smoker: {'Yes ⚠️' if is_smoker else 'No'}
    - Annual Income: ${annual_income:,}
    - Total Liabilities: ${total_liabilities:,}
    - Occupation: {occupation}
    
    **Risk Assessment:**
    - Total Risk Score: {risk_score:.0f}/100 ({risk_category})
    - Weight Distribution: Income (30%), Liabilities (20%), Dependents (20%), Gaps (20%), Health (10%)
    
    **Coverage Recommendations:**
    - Life Insurance (Term 20): ${life_coverage:,}
    - Disability Insurance: ${disability_coverage:,}/year (70% income replacement)
    
    **Premium Estimates (Annual):**
    - Life Insurance: ${life_premium:,.0f}
    - Disability Insurance: ${disability_low_premium:,.0f} - ${disability_high_premium:,.0f}
    - **Total Estimated Premium: ${total_premium:,.0f}/year**
    
    ---
    *Generated by Insurance Needs Estimator | Ontario Benchmarks*
    """
    
    st.markdown(summary)
    
    # Download button
    st.download_button(
        label="📥 Download Report",
        data=summary,
        file_name="insurance_assessment.md",
        mime="text/markdown"
    )

if __name__ == "__main__":
    main()
