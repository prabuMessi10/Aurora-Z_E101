import sys
import json
import ollama

# CRITICAL FIX: Force UTF-8 encoding for Windows console output
sys.stdout.reconfigure(encoding='utf-8')

def audit_trip():
    try:
        # 1. Receive JSON Data from Node.js
        input_json = sys.argv[1]
        data = json.loads(input_json)
        
        metrics = data['metrics']
        pay = float(metrics['total_pay'])
        dist = float(metrics['distance_km'])
        duration = float(metrics['duration_min'])
        wait_time = float(metrics.get('wait_time_min', 0))
        total_time_min = duration + wait_time
        
        vehicle_type = data.get('vehicle_type', 'Bike')
        mood = data['context'].get('mood', 'Neutral')

        # 2. COST ASSUMPTIONS (Indian Cities Context)
        # Cost includes: Fuel + Maintenance + Depreciation
        cost_card = {
            "Bike": 2.5,   # Rs 2.5/km
            "Auto": 4.5,   # Rs 4.5/km
            "Car": 8.0     # Rs 8.0/km (AC/Sedan)
        }
        
        cost_per_km = cost_card.get(vehicle_type, 3.0)
        estimated_expense = dist * cost_per_km
        
        # 3. NET EARNINGS CALCULATION
        net_profit = pay - estimated_expense
        
        # Avoid division by zero
        gross_hourly_wage = (pay / total_time_min) * 60 if total_time_min > 0 else 0
        net_hourly_wage = (net_profit / total_time_min) * 60 if total_time_min > 0 else 0
        
        pay_per_km = pay / dist if dist > 0 else 0

        # 4. THE "FORENSIC AUDITOR" PROMPT
        prompt = f"""
        You are a Labor Rights Forensic Auditor for Gig Workers in India. 
        Your job is to expose unfair pay by looking at NET PROFIT, not just gross pay.

        TRIP DNA:
        - Platform: {data['platform']}
        - Vehicle: {vehicle_type} (Est. Expense: Rs {cost_per_km}/km)
        - Driver Mood: {mood}
        
        RAW METRICS:
        - Gross Pay: Rs {pay}
        - Distance: {dist} km
        - Total Time: {total_time_min} min (Wait: {wait_time} min)

        FINANCIAL AUTOPSY:
        - Estimated Fuel/Maint Cost: Rs {estimated_expense:.2f}
        - NET PROFIT (Take Home): Rs {net_profit:.2f}
        - Real Hourly Wage (Net): Rs {net_hourly_wage:.2f}/hr

        VERDICT ALGORITHM:
        1. CRITICAL: If Net Hourly Wage < Rs 60 (Min Wage territory), immediate "UNFAIR".
        2. If Net Profit is negative, "UNFAIR" (Driver paid to work).
        3. If Pay/KM < Rs 12 (Bike) or Rs 15 (Car), suspect "Low Base Fare".
        4. If large Wait Time (>5 min) and Pay is low, suspect "Unpaid Wait Time".

        OUTPUT FORMAT (JSON ONLY):
        {{
            "verdict": "FAIR" or "UNFAIR",
            "reason": "Clear explanation citing NET earnings.",
            "hidden_trick": "One phrase detection (e.g., 'Negative Margins', 'Predatory Pricing', 'Unpaid Waiting', 'Fuel Burnout')"
        }}
        """

        # 5. Call Ollama
        response = ollama.chat(
            model='gemma:2b',
            messages=[{'role': 'user', 'content': prompt}],
            format='json' # Forces JSON mode
        )
        
        # 6. Print JSON Response
        print(response['message']['content'])

    except Exception as e:
        # Fallback error JSON
        error_response = {
            "verdict": "ERROR", 
            "reason": str(e), 
            "hidden_trick": "Algorithm Crash"
        }
        print(json.dumps(error_response))

if __name__ == "__main__":
    audit_trip()
