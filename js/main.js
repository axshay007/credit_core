// Main JavaScript functionality for Credit Core website

// Global variables
let userPreferences = JSON.parse(localStorage.getItem('creditCorePreferences')) || {
    creditScore: 720,
    paymentHistory: 85,
    creditUtilization: 25,
    creditHistory: 70,
    creditMix: 60,
    newCredit: 80,
    chatHistory: []
};

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAnimations();
    initializeCounters();
    loadUserPreferences();
    updateCreditScore();
    updateUtilizationGauge();
    calculatePayoff();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Initialize animations
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.dashboard-card, .tool-card, .education-card, .card-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize counters for hero stats
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };

    // Trigger counter animation when hero section is visible
    const heroObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    animateCounter(counter);
                });
                heroObserver.unobserve(entry.target);
            }
        });
    });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        heroObserver.observe(heroStats);
    }
}

// Load user preferences from localStorage
function loadUserPreferences() {
    // Update sliders with saved values
    const sliders = {
        'paymentHistory': userPreferences.paymentHistory,
        'creditUtilization': userPreferences.creditUtilization,
        'creditHistory': userPreferences.creditHistory,
        'creditMix': userPreferences.creditMix,
        'newCredit': userPreferences.newCredit
    };

    Object.keys(sliders).forEach(sliderId => {
        const slider = document.getElementById(sliderId);
        if (slider) {
            slider.value = sliders[sliderId];
            updateSliderValue(slider);
        }
    });

    // Update utilization inputs
    const currentBalance = document.getElementById('currentBalance');
    const creditLimit = document.getElementById('creditLimit');
    
    if (currentBalance && creditLimit) {
        currentBalance.value = userPreferences.currentBalance || 2500;
        creditLimit.value = userPreferences.creditLimit || 10000;
    }
}

// Save user preferences to localStorage
function saveUserPreferences() {
    localStorage.setItem('creditCorePreferences', JSON.stringify(userPreferences));
}

// Utility function to scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Update slider values
function updateSliderValue(slider) {
    const value = slider.value;
    const factorValue = slider.parentElement.querySelector('.factor-value');
    if (factorValue) {
        factorValue.textContent = value + '%';
    }
    
    // Update user preferences
    userPreferences[slider.id] = parseInt(value);
    saveUserPreferences();
    
    // Recalculate credit score
    updateCreditScore();
}

// Update credit score based on factors
function updateCreditScore() {
    const paymentHistory = userPreferences.paymentHistory || 85;
    const creditUtilization = userPreferences.creditUtilization || 25;
    const creditHistory = userPreferences.creditHistory || 70;
    const creditMix = userPreferences.creditMix || 60;
    const newCredit = userPreferences.newCredit || 80;
    
    // Calculate weighted score
    const score = Math.round(
        (paymentHistory * 0.35) +
        ((100 - creditUtilization) * 0.30) +
        (creditHistory * 0.15) +
        (creditMix * 0.10) +
        (newCredit * 0.10)
    );
    
    // Ensure score is within valid range
    const finalScore = Math.max(300, Math.min(850, score * 8.5));
    
    // Update display
    const scoreElement = document.getElementById('creditScore');
    if (scoreElement) {
        scoreElement.textContent = Math.round(finalScore);
    }
    
    // Update progress circle
    updateScoreProgress(finalScore);
    
    // Save to preferences
    userPreferences.creditScore = Math.round(finalScore);
    saveUserPreferences();
}

// Update credit score progress circle
function updateScoreProgress(score) {
    const progressCircle = document.getElementById('scoreProgress');
    if (progressCircle) {
        const percentage = ((score - 300) / (850 - 300)) * 100;
        const circumference = 2 * Math.PI * 80; // radius = 80
        const offset = circumference - (percentage / 100) * circumference;
        
        progressCircle.style.strokeDashoffset = offset;
        
        // Update color based on score
        let color = '#ef4444'; // Poor (red)
        if (score >= 750) color = '#22c55e'; // Excellent (green)
        else if (score >= 670) color = '#eab308'; // Good (yellow)
        else if (score >= 580) color = '#f97316'; // Fair (orange)
        
        progressCircle.style.stroke = color;
    }
}

// Update utilization gauge
function updateUtilizationGauge() {
    const currentBalance = document.getElementById('currentBalance');
    const creditLimit = document.getElementById('creditLimit');
    const utilizationPercent = document.getElementById('utilizationPercent');
    const utilizationFill = document.getElementById('utilizationFill');
    
    if (currentBalance && creditLimit && utilizationPercent && utilizationFill) {
        const balance = parseFloat(currentBalance.value) || 0;
        const limit = parseFloat(creditLimit.value) || 1;
        const utilization = Math.min(100, (balance / limit) * 100);
        
        utilizationPercent.textContent = Math.round(utilization) + '%';
        
        // Update gauge fill (inverse because we want to show used portion)
        const rotation = (utilization / 100) * 180;
        utilizationFill.style.transform = `rotate(${rotation}deg)`;
        
        // Update preferences
        userPreferences.currentBalance = balance;
        userPreferences.creditLimit = limit;
        userPreferences.creditUtilization = utilization;
        saveUserPreferences();
        
        // Update credit score
        updateCreditScore();
    }
}

// Calculate debt payoff
function calculatePayoff() {
    const totalDebt = parseFloat(document.getElementById('totalDebt')?.value) || 5000;
    const interestRate = parseFloat(document.getElementById('interestRate')?.value) || 18.5;
    const monthlyPayment = parseFloat(document.getElementById('monthlyPayment')?.value) || 200;
    
    const monthlyRate = (interestRate / 100) / 12;
    
    if (monthlyPayment <= totalDebt * monthlyRate) {
        // Payment too low to cover interest
        document.getElementById('payoffTime').textContent = 'Never (payment too low)';
        document.getElementById('totalInterest').textContent = 'N/A';
        document.getElementById('totalPaid').textContent = 'N/A';
        return;
    }
    
    // Calculate payoff time using formula
    const months = Math.ceil(-Math.log(1 - (totalDebt * monthlyRate) / monthlyPayment) / Math.log(1 + monthlyRate));
    const totalPaid = months * monthlyPayment;
    const totalInterest = totalPaid - totalDebt;
    
    // Update display
    document.getElementById('payoffTime').textContent = `${months} months`;
    document.getElementById('totalInterest').textContent = `$${totalInterest.toFixed(0)}`;
    document.getElementById('totalPaid').textContent = `$${totalPaid.toFixed(0)}`;
}

// Add event listeners for sliders
document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.slider');
    sliders.forEach(slider => {
        slider.addEventListener('input', function() {
            updateSliderValue(this);
        });
    });
    
    // Add event listeners for utilization inputs
    const utilizationInputs = ['currentBalance', 'creditLimit'];
    utilizationInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', updateUtilizationGauge);
        }
    });
    
    // Add event listeners for debt payoff inputs
    const payoffInputs = ['totalDebt', 'interestRate', 'monthlyPayment'];
    payoffInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', calculatePayoff);
        }
    });
});

// Modal functionality
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal();
    }
});

// Utility functions for formatting
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function formatNumber(number) {
    return new Intl.NumberFormat('en-US').format(number);
}

// Export functions for use in other modules
window.CreditCore = {
    scrollToSection,
    updateCreditScore,
    updateUtilizationGauge,
    calculatePayoff,
    showModal,
    closeModal,
    formatCurrency,
    formatNumber,
    userPreferences,
    saveUserPreferences
};

