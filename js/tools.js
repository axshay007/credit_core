// Financial Tools for Credit Core

// Tools state
let toolsState = {
    currentCalculator: 'compound',
    calculationHistory: [],
    rewardOptimization: null,
    paymentTimeline: null
};

// Initialize tools
document.addEventListener('DOMContentLoaded', function() {
    initializeTools();
    setupToolsEventListeners();
    loadToolsData();
});

// Initialize tools functionality
function initializeTools() {
    // Set default calculator
    switchCalculator('compound');
    
    // Initialize reward optimizer with default values
    initializeRewardOptimizer();
    
    // Initialize payment timeline
    initializePaymentTimeline();
}

// Setup event listeners for tools
function setupToolsEventListeners() {
    // Interest calculator inputs
    const calculatorInputs = ['principal', 'rate', 'time', 'frequency'];
    calculatorInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', function() {
                if (toolsState.currentCalculator === 'compound' || toolsState.currentCalculator === 'simple') {
                    calculateInterest();
                }
            });
        }
    });
    
    // Reward optimizer inputs
    const rewardInputs = ['groceries', 'gas', 'dining', 'travel', 'other'];
    rewardInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', function() {
                optimizeRewards();
            });
        }
    });
    
    // Payment timeline inputs
    const timelineInputs = ['loanAmount', 'loanRate', 'loanTerm'];
    timelineInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', function() {
                generateTimeline();
            });
        }
    });
}

// Switch between compound and simple interest calculators
function switchCalculator(type) {
    toolsState.currentCalculator = type;
    
    // Update tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === type) {
            btn.classList.add('active');
        }
    });
    
    // Show/hide compound frequency
    const compoundFrequency = document.getElementById('compoundFrequency');
    if (compoundFrequency) {
        compoundFrequency.style.display = type === 'compound' ? 'block' : 'none';
    }
    
    // Recalculate
    calculateInterest();
    saveToolsData();
}

// Calculate interest (compound or simple)
function calculateInterest() {
    const principal = parseFloat(document.getElementById('principal')?.value) || 1000;
    const rate = parseFloat(document.getElementById('rate')?.value) || 5;
    const time = parseFloat(document.getElementById('time')?.value) || 5;
    const frequency = parseInt(document.getElementById('frequency')?.value) || 1;
    
    let finalAmount, interest, formula;
    
    if (toolsState.currentCalculator === 'compound') {
        // Compound Interest: A = P(1 + r/n)^(nt)
        const r = rate / 100;
        const n = frequency;
        const t = time;
        
        finalAmount = principal * Math.pow(1 + r/n, n * t);
        interest = finalAmount - principal;
        formula = `A = P(1 + r/n)^(nt)`;
    } else {
        // Simple Interest: A = P(1 + rt)
        const r = rate / 100;
        const t = time;
        
        finalAmount = principal * (1 + r * t);
        interest = finalAmount - principal;
        formula = `A = P(1 + rt)`;
    }
    
    // Display results
    displayInterestResults(principal, finalAmount, interest, formula);
    
    // Save calculation
    const calculation = {
        type: toolsState.currentCalculator,
        principal,
        rate,
        time,
        frequency: toolsState.currentCalculator === 'compound' ? frequency : 1,
        finalAmount,
        interest,
        timestamp: new Date().toISOString()
    };
    
    toolsState.calculationHistory.push(calculation);
    saveToolsData();
}

// Display interest calculation results
function displayInterestResults(principal, finalAmount, interest, formula) {
    const resultDiv = document.getElementById('interestResult');
    if (!resultDiv) return;
    
    const percentageGain = ((interest / principal) * 100).toFixed(2);
    const monthlyGain = (interest / (parseFloat(document.getElementById('time')?.value) || 5) / 12).toFixed(2);
    
    resultDiv.innerHTML = `
        <div class="result-highlight">
            ${formatCurrency(finalAmount)}
        </div>
        <div class="result-breakdown">
            <div class="result-item">
                <span class="result-label">Principal:</span>
                <span class="result-value">${formatCurrency(principal)}</span>
            </div>
            <div class="result-item">
                <span class="result-label">Interest Earned:</span>
                <span class="result-value">${formatCurrency(interest)}</span>
            </div>
            <div class="result-item">
                <span class="result-label">Total Return:</span>
                <span class="result-value">${percentageGain}%</span>
            </div>
            <div class="result-item">
                <span class="result-label">Avg Monthly Gain:</span>
                <span class="result-value">${formatCurrency(monthlyGain)}</span>
            </div>
        </div>
        <div class="formula-display">
            <strong>Formula:</strong> ${formula}
        </div>
        
        <style>
            .result-breakdown {
                display: flex;
                flex-direction: column;
                gap: 8px;
                margin: 15px 0;
                padding: 15px;
                background: #f9fafb;
                border-radius: 8px;
            }
            
            .result-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .result-label {
                color: #6b7280;
                font-weight: 500;
            }
            
            .result-value {
                color: #1f2937;
                font-weight: 600;
            }
            
            .formula-display {
                margin-top: 15px;
                padding: 10px;
                background: #e0e7ff;
                border-radius: 6px;
                font-family: monospace;
                font-size: 0.9rem;
                color: #3730a3;
            }
        </style>
    `;
    
    resultDiv.style.display = 'block';
}

// Initialize reward optimizer
function initializeRewardOptimizer() {
    // Set default spending values
    const defaultSpending = {
        groceries: 500,
        gas: 200,
        dining: 300,
        travel: 100,
        other: 400
    };
    
    Object.keys(defaultSpending).forEach(category => {
        const input = document.getElementById(category);
        if (input && !input.value) {
            input.value = defaultSpending[category];
        }
    });
    
    optimizeRewards();
}

// Optimize rewards calculation
function optimizeRewards() {
    const spending = {
        groceries: parseFloat(document.getElementById('groceries')?.value) || 0,
        gas: parseFloat(document.getElementById('gas')?.value) || 0,
        dining: parseFloat(document.getElementById('dining')?.value) || 0,
        travel: parseFloat(document.getElementById('travel')?.value) || 0,
        other: parseFloat(document.getElementById('other')?.value) || 0
    };
    
    // Define reward rates for different card types
    const cardRewards = {
        'Cash Back Card': {
            groceries: 2,
            gas: 3,
            dining: 2,
            travel: 1,
            other: 1
        },
        'Travel Card': {
            groceries: 1,
            gas: 1,
            dining: 2,
            travel: 5,
            other: 1
        },
        'Dining Card': {
            groceries: 1,
            gas: 1,
            dining: 4,
            travel: 1,
            other: 1
        },
        'Flat Rate Card': {
            groceries: 2,
            gas: 2,
            dining: 2,
            travel: 2,
            other: 2
        }
    };
    
    // Calculate rewards for each card type
    const cardResults = {};
    Object.keys(cardRewards).forEach(cardName => {
        const rates = cardRewards[cardName];
        let totalRewards = 0;
        let monthlyRewards = 0;
        
        Object.keys(spending).forEach(category => {
            const categoryRewards = (spending[category] * rates[category]) / 100;
            totalRewards += categoryRewards;
            monthlyRewards += categoryRewards;
        });
        
        cardResults[cardName] = {
            monthlyRewards,
            annualRewards: monthlyRewards * 12,
            breakdown: Object.keys(spending).map(category => ({
                category,
                spending: spending[category],
                rate: rates[category],
                rewards: (spending[category] * rates[category]) / 100
            }))
        };
    });
    
    // Find best card
    const bestCard = Object.keys(cardResults).reduce((best, current) => 
        cardResults[current].monthlyRewards > cardResults[best].monthlyRewards ? current : best
    );
    
    toolsState.rewardOptimization = {
        spending,
        cardResults,
        bestCard,
        timestamp: new Date().toISOString()
    };
    
    displayRewardResults(cardResults, bestCard);
    saveToolsData();
}

// Display reward optimization results
function displayRewardResults(cardResults, bestCard) {
    const resultDiv = document.getElementById('rewardResult');
    if (!resultDiv) return;
    
    const bestResult = cardResults[bestCard];
    const totalSpending = Object.values(toolsState.rewardOptimization.spending).reduce((sum, val) => sum + val, 0);
    
    resultDiv.innerHTML = `
        <div class="result-highlight">
            ${formatCurrency(bestResult.monthlyRewards)} / month
        </div>
        <div class="best-card-info">
            <strong>Best Card:</strong> ${bestCard}
        </div>
        <div class="reward-breakdown">
            <div class="result-item">
                <span class="result-label">Monthly Spending:</span>
                <span class="result-value">${formatCurrency(totalSpending)}</span>
            </div>
            <div class="result-item">
                <span class="result-label">Monthly Rewards:</span>
                <span class="result-value">${formatCurrency(bestResult.monthlyRewards)}</span>
            </div>
            <div class="result-item">
                <span class="result-label">Annual Rewards:</span>
                <span class="result-value">${formatCurrency(bestResult.annualRewards)}</span>
            </div>
            <div class="result-item">
                <span class="result-label">Effective Rate:</span>
                <span class="result-value">${((bestResult.monthlyRewards / totalSpending) * 100).toFixed(2)}%</span>
            </div>
        </div>
        <div class="category-breakdown">
            <h4>Category Breakdown:</h4>
            ${bestResult.breakdown.map(item => `
                <div class="category-item">
                    <span class="category-name">${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</span>
                    <span class="category-spending">${formatCurrency(item.spending)}</span>
                    <span class="category-rate">${item.rate}%</span>
                    <span class="category-rewards">${formatCurrency(item.rewards)}</span>
                </div>
            `).join('')}
        </div>
        <div class="card-comparison">
            <h4>All Cards Comparison:</h4>
            ${Object.keys(cardResults).map(cardName => `
                <div class="card-comparison-item ${cardName === bestCard ? 'best' : ''}">
                    <span class="card-name">${cardName}</span>
                    <span class="card-rewards">${formatCurrency(cardResults[cardName].monthlyRewards)}/mo</span>
                </div>
            `).join('')}
        </div>
        
        <style>
            .best-card-info {
                text-align: center;
                margin: 10px 0;
                padding: 10px;
                background: #dcfce7;
                border-radius: 6px;
                color: #166534;
                font-weight: 600;
            }
            
            .reward-breakdown {
                display: flex;
                flex-direction: column;
                gap: 8px;
                margin: 15px 0;
                padding: 15px;
                background: #f9fafb;
                border-radius: 8px;
            }
            
            .category-breakdown {
                margin: 15px 0;
            }
            
            .category-breakdown h4 {
                margin-bottom: 10px;
                color: #374151;
            }
            
            .category-item {
                display: grid;
                grid-template-columns: 1fr auto auto auto;
                gap: 10px;
                padding: 8px;
                background: #f3f4f6;
                border-radius: 4px;
                margin-bottom: 5px;
                font-size: 0.9rem;
            }
            
            .category-name {
                font-weight: 500;
            }
            
            .category-rate {
                color: #2563eb;
                font-weight: 600;
            }
            
            .category-rewards {
                color: #059669;
                font-weight: 600;
            }
            
            .card-comparison {
                margin: 15px 0;
            }
            
            .card-comparison h4 {
                margin-bottom: 10px;
                color: #374151;
            }
            
            .card-comparison-item {
                display: flex;
                justify-content: space-between;
                padding: 8px 12px;
                margin-bottom: 5px;
                background: #f9fafb;
                border-radius: 6px;
                transition: all 0.2s ease;
            }
            
            .card-comparison-item.best {
                background: #dcfce7;
                border: 2px solid #22c55e;
            }
            
            .card-name {
                font-weight: 500;
            }
            
            .card-rewards {
                font-weight: 600;
                color: #059669;
            }
        </style>
    `;
    
    resultDiv.style.display = 'block';
}

// Initialize payment timeline
function initializePaymentTimeline() {
    generateTimeline();
}

// Generate payment timeline
function generateTimeline() {
    const loanAmount = parseFloat(document.getElementById('loanAmount')?.value) || 20000;
    const loanRate = parseFloat(document.getElementById('loanRate')?.value) || 6.5;
    const loanTerm = parseFloat(document.getElementById('loanTerm')?.value) || 5;
    
    const monthlyRate = (loanRate / 100) / 12;
    const totalMonths = loanTerm * 12;
    
    // Calculate monthly payment using amortization formula
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                          (Math.pow(1 + monthlyRate, totalMonths) - 1);
    
    // Generate payment schedule
    const timeline = [];
    let remainingBalance = loanAmount;
    let totalInterest = 0;
    
    for (let month = 1; month <= totalMonths; month++) {
        const interestPayment = remainingBalance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        remainingBalance -= principalPayment;
        totalInterest += interestPayment;
        
        timeline.push({
            month,
            payment: monthlyPayment,
            principal: principalPayment,
            interest: interestPayment,
            balance: Math.max(0, remainingBalance),
            totalInterest
        });
        
        if (remainingBalance <= 0) break;
    }
    
    toolsState.paymentTimeline = {
        loanAmount,
        loanRate,
        loanTerm,
        monthlyPayment,
        totalPayments: monthlyPayment * totalMonths,
        totalInterest,
        timeline,
        timestamp: new Date().toISOString()
    };
    
    displayTimelineResults(toolsState.paymentTimeline);
    saveToolsData();
}

// Display payment timeline results
function displayTimelineResults(timelineData) {
    const chartDiv = document.getElementById('timelineChart');
    if (!chartDiv) return;
    
    const { monthlyPayment, totalPayments, totalInterest, timeline } = timelineData;
    
    // Create visual timeline chart
    chartDiv.innerHTML = `
        <div class="timeline-summary">
            <div class="summary-item">
                <span class="summary-label">Monthly Payment:</span>
                <span class="summary-value">${formatCurrency(monthlyPayment)}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Total Payments:</span>
                <span class="summary-value">${formatCurrency(totalPayments)}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Total Interest:</span>
                <span class="summary-value">${formatCurrency(totalInterest)}</span>
            </div>
        </div>
        <div class="timeline-chart-container">
            <canvas id="paymentChart" width="400" height="200"></canvas>
        </div>
        <div class="timeline-table">
            <h4>Payment Schedule (First 12 Months)</h4>
            <div class="table-header">
                <span>Month</span>
                <span>Payment</span>
                <span>Principal</span>
                <span>Interest</span>
                <span>Balance</span>
            </div>
            ${timeline.slice(0, 12).map(payment => `
                <div class="table-row">
                    <span>${payment.month}</span>
                    <span>${formatCurrency(payment.payment)}</span>
                    <span>${formatCurrency(payment.principal)}</span>
                    <span>${formatCurrency(payment.interest)}</span>
                    <span>${formatCurrency(payment.balance)}</span>
                </div>
            `).join('')}
        </div>
        
        <style>
            .timeline-summary {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 15px;
                margin-bottom: 20px;
            }
            
            .summary-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 15px;
                background: #f9fafb;
                border-radius: 8px;
            }
            
            .summary-label {
                font-size: 0.9rem;
                color: #6b7280;
                margin-bottom: 5px;
            }
            
            .summary-value {
                font-size: 1.2rem;
                font-weight: 700;
                color: #1f2937;
            }
            
            .timeline-chart-container {
                margin: 20px 0;
                background: #f9fafb;
                border-radius: 8px;
                padding: 20px;
                text-align: center;
            }
            
            .timeline-table {
                margin-top: 20px;
            }
            
            .timeline-table h4 {
                margin-bottom: 10px;
                color: #374151;
            }
            
            .table-header,
            .table-row {
                display: grid;
                grid-template-columns: 60px 1fr 1fr 1fr 1fr;
                gap: 10px;
                padding: 8px;
                border-bottom: 1px solid #e5e7eb;
            }
            
            .table-header {
                background: #f3f4f6;
                font-weight: 600;
                color: #374151;
                border-radius: 6px 6px 0 0;
            }
            
            .table-row {
                font-size: 0.9rem;
            }
            
            .table-row:nth-child(even) {
                background: #f9fafb;
            }
        </style>
    `;
    
    chartDiv.style.display = 'block';
    
    // Draw simple chart
    setTimeout(() => drawPaymentChart(timeline), 100);
}

// Draw payment chart
function drawPaymentChart(timeline) {
    const canvas = document.getElementById('paymentChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set up chart area
    const margin = 40;
    const chartWidth = width - 2 * margin;
    const chartHeight = height - 2 * margin;
    
    // Get data for first 24 months or all months if less
    const chartData = timeline.slice(0, Math.min(24, timeline.length));
    const maxBalance = Math.max(...chartData.map(p => p.balance));
    
    // Draw axes
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 1;
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(margin, height - margin);
    ctx.lineTo(width - margin, height - margin);
    ctx.stroke();
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(margin, margin);
    ctx.lineTo(margin, height - margin);
    ctx.stroke();
    
    // Draw balance line
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    chartData.forEach((payment, index) => {
        const x = margin + (index / (chartData.length - 1)) * chartWidth;
        const y = height - margin - (payment.balance / maxBalance) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Add labels
    ctx.fillStyle = '#374151';
    ctx.font = '12px Inter';
    ctx.textAlign = 'center';
    
    // X-axis label
    ctx.fillText('Months', width / 2, height - 10);
    
    // Y-axis label
    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Remaining Balance', 0, 0);
    ctx.restore();
    
    // Title
    ctx.font = '14px Inter';
    ctx.fillText('Loan Balance Over Time', width / 2, 20);
}

// Load tools data from localStorage
function loadToolsData() {
    const savedData = localStorage.getItem('creditCoreToolsData');
    if (savedData) {
        toolsState = { ...toolsState, ...JSON.parse(savedData) };
    }
}

// Save tools data to localStorage
function saveToolsData() {
    // Keep only last 50 calculations to prevent storage bloat
    if (toolsState.calculationHistory.length > 50) {
        toolsState.calculationHistory = toolsState.calculationHistory.slice(-50);
    }
    
    localStorage.setItem('creditCoreToolsData', JSON.stringify(toolsState));
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Export tools functions
window.CreditTools = {
    switchCalculator,
    calculateInterest,
    optimizeRewards,
    generateTimeline,
    toolsState,
    saveToolsData
};

