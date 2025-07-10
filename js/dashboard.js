// Dashboard functionality for Credit Core

// Dashboard data and state
let dashboardData = {
    creditScore: 720,
    scoreHistory: [],
    utilizationHistory: [],
    paymentHistory: [],
    accounts: []
};

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    setupDashboardEventListeners();
    generateSampleData();
    updateAllVisualizations();
});

// Initialize dashboard components
function initializeDashboard() {
    // Load saved data
    const savedData = localStorage.getItem('creditCoreDashboardData');
    if (savedData) {
        dashboardData = { ...dashboardData, ...JSON.parse(savedData) };
    }
    
    // Initialize credit score factors
    initializeCreditFactors();
    
    // Initialize utilization gauge
    initializeUtilizationGauge();
    
    // Initialize debt payoff calculator
    initializeDebtCalculator();
}

// Setup event listeners for dashboard interactions
function setupDashboardEventListeners() {
    // Credit score factor sliders
    const factorSliders = document.querySelectorAll('.factor .slider');
    factorSliders.forEach(slider => {
        slider.addEventListener('input', function() {
            updateFactorValue(this);
            calculateCreditScore();
            updateScoreVisualization();
        });
    });
    
    // Utilization inputs
    const utilizationInputs = ['currentBalance', 'creditLimit'];
    utilizationInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', function() {
                updateUtilizationVisualization();
                saveDashboardData();
            });
        }
    });
    
    // Debt payoff inputs
    const debtInputs = ['totalDebt', 'interestRate', 'monthlyPayment'];
    debtInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', function() {
                calculateDebtPayoff();
            });
        }
    });
}

// Initialize credit score factors
function initializeCreditFactors() {
    const factors = {
        paymentHistory: { weight: 0.35, value: 85, label: 'Payment History' },
        creditUtilization: { weight: 0.30, value: 25, label: 'Credit Utilization' },
        creditHistory: { weight: 0.15, value: 70, label: 'Credit History Length' },
        creditMix: { weight: 0.10, value: 60, label: 'Credit Mix' },
        newCredit: { weight: 0.10, value: 80, label: 'New Credit' }
    };
    
    // Load saved values
    if (window.CreditCore && window.CreditCore.userPreferences) {
        Object.keys(factors).forEach(key => {
            if (window.CreditCore.userPreferences[key] !== undefined) {
                factors[key].value = window.CreditCore.userPreferences[key];
            }
        });
    }
    
    // Update sliders and displays
    Object.keys(factors).forEach(factorId => {
        const slider = document.getElementById(factorId);
        const valueDisplay = slider?.parentElement.querySelector('.factor-value');
        
        if (slider) {
            slider.value = factors[factorId].value;
            if (valueDisplay) {
                valueDisplay.textContent = factors[factorId].value + '%';
            }
        }
    });
    
    dashboardData.creditFactors = factors;
}

// Update factor value display
function updateFactorValue(slider) {
    const value = parseInt(slider.value);
    const valueDisplay = slider.parentElement.querySelector('.factor-value');
    
    if (valueDisplay) {
        valueDisplay.textContent = value + '%';
    }
    
    // Update dashboard data
    dashboardData.creditFactors[slider.id].value = value;
    
    // Save to user preferences
    if (window.CreditCore && window.CreditCore.userPreferences) {
        window.CreditCore.userPreferences[slider.id] = value;
        window.CreditCore.saveUserPreferences();
    }
    
    saveDashboardData();
}

// Calculate credit score based on factors
function calculateCreditScore() {
    const factors = dashboardData.creditFactors;
    let score = 0;
    
    // Calculate weighted score
    Object.keys(factors).forEach(key => {
        const factor = factors[key];
        let factorScore = factor.value;
        
        // Invert utilization (lower is better)
        if (key === 'creditUtilization') {
            factorScore = 100 - factor.value;
        }
        
        score += factorScore * factor.weight;
    });
    
    // Convert to FICO scale (300-850)
    const creditScore = Math.round(300 + (score / 100) * 550);
    dashboardData.creditScore = Math.max(300, Math.min(850, creditScore));
    
    // Update display
    const scoreElement = document.getElementById('creditScore');
    if (scoreElement) {
        scoreElement.textContent = dashboardData.creditScore;
    }
    
    // Add to history
    const now = new Date();
    dashboardData.scoreHistory.push({
        date: now.toISOString(),
        score: dashboardData.creditScore
    });
    
    // Keep only last 12 months of history
    const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
    dashboardData.scoreHistory = dashboardData.scoreHistory.filter(
        entry => new Date(entry.date) > oneYearAgo
    );
    
    saveDashboardData();
}

// Update credit score visualization
function updateScoreVisualization() {
    const score = dashboardData.creditScore;
    const progressCircle = document.getElementById('scoreProgress');
    
    if (progressCircle) {
        // Calculate progress (0-100%)
        const progress = ((score - 300) / (850 - 300)) * 100;
        const circumference = 2 * Math.PI * 80; // radius = 80
        const offset = circumference - (progress / 100) * circumference;
        
        // Animate the progress
        progressCircle.style.transition = 'stroke-dashoffset 1s ease-in-out';
        progressCircle.style.strokeDashoffset = offset;
        
        // Update color based on score range
        let strokeColor = '#ef4444'; // Poor (red)
        if (score >= 750) strokeColor = '#22c55e'; // Excellent (green)
        else if (score >= 670) strokeColor = '#eab308'; // Good (yellow)
        else if (score >= 580) strokeColor = '#f97316'; // Fair (orange)
        
        progressCircle.style.stroke = strokeColor;
    }
    
    // Update score display with animation
    const scoreElement = document.getElementById('creditScore');
    if (scoreElement) {
        animateNumber(scoreElement, parseInt(scoreElement.textContent) || 0, score, 1000);
    }
}

// Initialize utilization gauge
function initializeUtilizationGauge() {
    const currentBalance = document.getElementById('currentBalance');
    const creditLimit = document.getElementById('creditLimit');
    
    if (currentBalance && creditLimit) {
        // Load saved values
        if (window.CreditCore && window.CreditCore.userPreferences) {
            currentBalance.value = window.CreditCore.userPreferences.currentBalance || 2500;
            creditLimit.value = window.CreditCore.userPreferences.creditLimit || 10000;
        }
        
        updateUtilizationVisualization();
    }
}

// Update utilization visualization
function updateUtilizationVisualization() {
    const currentBalance = parseFloat(document.getElementById('currentBalance')?.value) || 0;
    const creditLimit = parseFloat(document.getElementById('creditLimit')?.value) || 1;
    
    const utilization = Math.min(100, (currentBalance / creditLimit) * 100);
    
    // Update percentage display
    const utilizationPercent = document.getElementById('utilizationPercent');
    if (utilizationPercent) {
        utilizationPercent.textContent = Math.round(utilization) + '%';
    }
    
    // Update gauge fill
    const gaugeFill = document.getElementById('utilizationFill');
    if (gaugeFill) {
        // Calculate rotation (0-180 degrees)
        const rotation = (utilization / 100) * 180;
        gaugeFill.style.transform = `rotate(${rotation}deg)`;
        gaugeFill.style.transformOrigin = 'center bottom';
    }
    
    // Update gauge color based on utilization level
    updateUtilizationColor(utilization);
    
    // Save data
    dashboardData.currentUtilization = utilization;
    dashboardData.currentBalance = currentBalance;
    dashboardData.creditLimit = creditLimit;
    
    // Add to history
    const now = new Date();
    dashboardData.utilizationHistory.push({
        date: now.toISOString(),
        utilization: utilization,
        balance: currentBalance,
        limit: creditLimit
    });
    
    // Keep only last 12 months
    const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
    dashboardData.utilizationHistory = dashboardData.utilizationHistory.filter(
        entry => new Date(entry.date) > oneYearAgo
    );
    
    saveDashboardData();
}

// Update utilization color indicators
function updateUtilizationColor(utilization) {
    const tips = document.querySelectorAll('.utilization-tips .tip');
    
    tips.forEach(tip => {
        tip.style.opacity = '0.5';
        tip.style.transform = 'scale(0.95)';
    });
    
    // Highlight current range
    let activeIndex = 3; // Default to poor
    if (utilization < 10) activeIndex = 0; // Excellent
    else if (utilization < 30) activeIndex = 1; // Good
    else if (utilization < 50) activeIndex = 2; // Fair
    
    if (tips[activeIndex]) {
        tips[activeIndex].style.opacity = '1';
        tips[activeIndex].style.transform = 'scale(1.05)';
        tips[activeIndex].style.transition = 'all 0.3s ease';
    }
}

// Initialize debt calculator
function initializeDebtCalculator() {
    calculateDebtPayoff();
}

// Calculate debt payoff timeline
function calculateDebtPayoff() {
    const totalDebt = parseFloat(document.getElementById('totalDebt')?.value) || 5000;
    const interestRate = parseFloat(document.getElementById('interestRate')?.value) || 18.5;
    const monthlyPayment = parseFloat(document.getElementById('monthlyPayment')?.value) || 200;
    
    const monthlyRate = (interestRate / 100) / 12;
    const minimumPayment = totalDebt * monthlyRate;
    
    let payoffTime, totalInterest, totalPaid;
    
    if (monthlyPayment <= minimumPayment) {
        // Payment too low
        payoffTime = 'Never';
        totalInterest = 'N/A';
        totalPaid = 'N/A';
    } else {
        // Calculate using amortization formula
        const months = Math.ceil(-Math.log(1 - (totalDebt * monthlyRate) / monthlyPayment) / Math.log(1 + monthlyRate));
        totalPaid = months * monthlyPayment;
        totalInterest = totalPaid - totalDebt;
        
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        
        if (years > 0) {
            payoffTime = `${years} year${years > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
        } else {
            payoffTime = `${months} month${months !== 1 ? 's' : ''}`;
        }
    }
    
    // Update display
    const payoffTimeElement = document.getElementById('payoffTime');
    const totalInterestElement = document.getElementById('totalInterest');
    const totalPaidElement = document.getElementById('totalPaid');
    
    if (payoffTimeElement) payoffTimeElement.textContent = payoffTime;
    if (totalInterestElement) {
        totalInterestElement.textContent = totalInterest === 'N/A' ? 'N/A' : formatCurrency(totalInterest);
    }
    if (totalPaidElement) {
        totalPaidElement.textContent = totalPaid === 'N/A' ? 'N/A' : formatCurrency(totalPaid);
    }
    
    // Generate payment timeline
    if (monthlyPayment > minimumPayment) {
        generatePaymentTimeline(totalDebt, monthlyRate, monthlyPayment);
    }
}

// Generate payment timeline visualization
function generatePaymentTimeline(principal, monthlyRate, payment) {
    const timeline = [];
    let balance = principal;
    let month = 0;
    
    while (balance > 0.01 && month < 360) { // Max 30 years
        const interestPayment = balance * monthlyRate;
        const principalPayment = Math.min(payment - interestPayment, balance);
        balance -= principalPayment;
        
        timeline.push({
            month: month + 1,
            balance: Math.max(0, balance),
            interestPayment: interestPayment,
            principalPayment: principalPayment,
            totalPayment: interestPayment + principalPayment
        });
        
        month++;
    }
    
    dashboardData.paymentTimeline = timeline;
    saveDashboardData();
}

// Generate sample historical data
function generateSampleData() {
    if (dashboardData.scoreHistory.length === 0) {
        const now = new Date();
        for (let i = 11; i >= 0; i--) {
            const date = new Date(now.getTime() - i * 30 * 24 * 60 * 60 * 1000);
            const baseScore = 680 + Math.random() * 80;
            const score = Math.round(baseScore + (11 - i) * 2); // Gradual improvement
            
            dashboardData.scoreHistory.push({
                date: date.toISOString(),
                score: Math.max(300, Math.min(850, score))
            });
        }
    }
    
    if (dashboardData.utilizationHistory.length === 0) {
        const now = new Date();
        for (let i = 11; i >= 0; i--) {
            const date = new Date(now.getTime() - i * 30 * 24 * 60 * 60 * 1000);
            const utilization = 35 - (11 - i) * 1.5 + Math.random() * 10; // Gradual improvement
            
            dashboardData.utilizationHistory.push({
                date: date.toISOString(),
                utilization: Math.max(0, Math.min(100, utilization)),
                balance: 2500 + Math.random() * 1000,
                limit: 10000
            });
        }
    }
}

// Update all visualizations
function updateAllVisualizations() {
    calculateCreditScore();
    updateScoreVisualization();
    updateUtilizationVisualization();
    calculateDebtPayoff();
}

// Animate number changes
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const difference = end - start;
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(start + difference * easeOutQuart);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Save dashboard data to localStorage
function saveDashboardData() {
    localStorage.setItem('creditCoreDashboardData', JSON.stringify(dashboardData));
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

// Export dashboard functions
window.CreditDashboard = {
    updateAllVisualizations,
    calculateCreditScore,
    updateScoreVisualization,
    updateUtilizationVisualization,
    calculateDebtPayoff,
    dashboardData,
    saveDashboardData
};

