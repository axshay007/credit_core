// Educational Resources for Credit Core

// Financial concepts database
const financialConcepts = {
    apr: {
        title: 'Annual Percentage Rate (APR)',
        definition: 'The yearly cost of borrowing money, including interest and fees, expressed as a percentage.',
        explanation: `APR represents the true cost of borrowing money over a year. Unlike simple interest rates, APR includes:
        
        • Base interest rate
        • Origination fees
        • Processing fees
        • Other loan costs
        
        For example, if you have a credit card with 18% APR and carry a $1,000 balance for a year, you'll pay approximately $180 in interest (assuming no additional fees).`,
        example: 'A credit card advertises 15% interest, but with fees, the APR might be 17.5%.',
        tips: [
            'Always compare APRs, not just interest rates',
            'Lower APR  lower borrowing costs',
            'APR can be variable or fixed'
        ]
    },
    utilization: {
        title: 'Credit Utilization Ratio',
        definition: 'The percentage of available credit you are currently using across all your credit accounts.',
        explanation: `Credit utilization is calculated by dividing your total credit card balances by your total credit limits. It's one of the most important factors in your credit score.
        
        Formula: (Total Balances ÷ Total Credit Limits) × 100
        
        • Excellent: Under 10%
        • Good: 10-30%
        • Fair: 30-50%
        • Poor: Over 50%
        
        Both overall utilization and per-card utilization matter for your credit score.`,
        example: 'If you have $2,000 in balances and $10,000 in total limits, your utilization is 20%.',
        tips: [
            'Keep utilization below 30%, ideally under 10%',
            'Pay balances before statement dates',
            'Request credit limit increases'
        ]
    },
    compound: {
        title: 'Compound Interest',
        definition: 'Interest calculated on the initial principal and accumulated interest from previous periods.',
        explanation: `Compound interest is "interest on interest" - it makes your money grow faster when saving and costs more when borrowing.
        
        The formula: A = P(1 + r/n)^(nt)
        Where:
        • A = Final amount
        • P = Principal
        • r = Annual interest rate
        • n = Compounding frequency
        • t = Time in years
        
        The more frequently interest compounds, the more you earn (or owe).`,
        example: '$1,000 at 5% compounded annually becomes $1,628 after 10 years.',
        tips: [
            'Start investing early to maximize compound growth',
            'Pay off high-interest debt quickly',
            'Look for accounts with frequent compounding'
        ]
    },
    fico: {
        title: 'FICO Score',
        definition: 'A credit score model created by Fair Isaac Corporation, ranging from 300 to 850.',
        explanation: `FICO scores are the most widely used credit scores, calculated using five factors:
        
        • Payment History (35%) - On-time payments
        • Credit Utilization (30%) - Amount of credit used
        • Length of Credit History (15%) - Age of accounts
        • Credit Mix (10%) - Types of credit accounts
        • New Credit (10%) - Recent credit inquiries
        
        Score ranges:
        • 800-850: Exceptional
        • 740-799: Very Good
        • 670-739: Good
        • 580-669: Fair
        • 300-579: Poor`,
        example: 'A FICO score of 750 typically qualifies for the best interest rates.',
        tips: [
            'Pay all bills on time',
            'Keep credit utilization low',
            'Maintain old credit accounts'
        ]
    }
};

// Financial glossary
const financialGlossary = [
    {
        term: 'Annual Fee',
        definition: 'A yearly charge for having a credit card, regardless of usage.'
    },
    {
        term: 'Balance Transfer',
        definition: 'Moving debt from one credit card to another, often to get a lower interest rate.'
    },
    {
        term: 'Credit Limit',
        definition: 'The maximum amount you can borrow on a credit card or line of credit.'
    },
    {
        term: 'Credit Report',
        definition: 'A detailed record of your credit history, including accounts, payments, and inquiries.'
    },
    {
        term: 'Debt-to-Income Ratio',
        definition: 'The percentage of your monthly income that goes toward debt payments.'
    },
    {
        term: 'Grace Period',
        definition: 'The time between your statement date and due date when no interest is charged on new purchases.'
    },
    {
        term: 'Hard Inquiry',
        definition: 'A credit check that occurs when you apply for credit and can temporarily lower your credit score.'
    },
    {
        term: 'Minimum Payment',
        definition: 'The smallest amount you must pay on your credit card bill to avoid late fees.'
    },
    {
        term: 'Principal',
        definition: 'The original amount of money borrowed or invested, not including interest.'
    },
    {
        term: 'Secured Credit Card',
        definition: 'A credit card that requires a cash deposit as collateral, typically used to build credit.'
    },
    {
        term: 'Statement Balance',
        definition: 'The total amount owed on your credit card at the end of a billing cycle.'
    },
    {
        term: 'Variable APR',
        definition: 'An interest rate that can change over time, usually tied to a benchmark rate.'
    }
];

// Education state
let educationState = {
    currentConcept: null,
    journeyProgress: 0,
    completedSteps: [],
    glossaryFilter: ''
};

// Initialize education module
document.addEventListener('DOMContentLoaded', function() {
    initializeEducation();
    setupEducationEventListeners();
    loadEducationData();
});

// Initialize education functionality
function initializeEducation() {
    // Initialize journey map
    initializeJourneyMap();
    
    // Initialize glossary
    initializeGlossary();
    
    // Initialize concept cards
    initializeConceptCards();
}

// Setup event listeners
function setupEducationEventListeners() {
    // Journey step clicks
    const journeySteps = document.querySelectorAll('.journey-step');
    journeySteps.forEach((step, index) => {
        step.addEventListener('click', function() {
            activateJourneyStep(index + 1);
        });
    });
    
    // Concept card clicks are handled by onclick attributes in HTML
    
    // Glossary search
    const glossarySearch = document.getElementById('glossarySearch');
    if (glossarySearch) {
        glossarySearch.addEventListener('input', function() {
            educationState.glossaryFilter = this.value;
            filterGlossary(this.value);
        });
    }
}

// Initialize journey map
function initializeJourneyMap() {
    const journeySteps = document.querySelectorAll('.journey-step');
    
    // Load progress from user preferences
    if (window.CreditCore && window.CreditCore.userPreferences) {
        const creditScore = window.CreditCore.userPreferences.creditScore || 720;
        
        // Determine progress based on credit score
        if (creditScore >= 750) {
            educationState.journeyProgress = 4;
            educationState.completedSteps = [1, 2, 3, 4];
        } else if (creditScore >= 670) {
            educationState.journeyProgress = 3;
            educationState.completedSteps = [1, 2, 3];
        } else if (creditScore >= 580) {
            educationState.journeyProgress = 2;
            educationState.completedSteps = [1, 2];
        } else {
            educationState.journeyProgress = 1;
            educationState.completedSteps = [1];
        }
    }
    
    // Update visual progress
    updateJourneyProgress();
}

// Update journey progress visualization
function updateJourneyProgress() {
    const journeySteps = document.querySelectorAll('.journey-step');
    
    journeySteps.forEach((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = educationState.completedSteps.includes(stepNumber);
        const isCurrent = stepNumber === educationState.journeyProgress;
        
        // Update step appearance
        if (isCompleted) {
            step.classList.add('completed');
            step.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
            step.style.color = 'white';
        } else if (isCurrent) {
            step.classList.add('current');
            step.style.background = 'linear-gradient(135deg, #2563eb, #1d4ed8)';
            step.style.color = 'white';
        } else {
            step.classList.add('upcoming');
            step.style.background = '#f3f4f6';
            step.style.color = '#6b7280';
        }
        
        // Add completion checkmark
        if (isCompleted) {
            const checkmark = step.querySelector('.completion-check');
            if (!checkmark) {
                const check = document.createElement('div');
                check.className = 'completion-check';
                check.innerHTML = '✓';
                check.style.cssText = `
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    width: 20px;
                    height: 20px;
                    background: #22c55e;
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    font-weight: bold;
                `;
                step.style.position = 'relative';
                step.appendChild(check);
            }
        }
    });
}

// Activate journey step
function activateJourneyStep(stepNumber) {
    const stepData = {
        1: {
            title: 'Start Building Credit',
            content: `
                <h3>Getting Started with Credit</h3>
                <p>Building credit from scratch requires patience and strategy. Here's how to begin:</p>
                <ul>
                    <li><strong>Get your first credit card:</strong> Consider a secured card or student card</li>
                    <li><strong>Become an authorized user:</strong> Ask family to add you to their account</li>
                    <li><strong>Pay all bills on time:</strong> Even non-credit bills can affect your score</li>
                    <li><strong>Keep balances low:</strong> Use less than 30% of your credit limit</li>
                </ul>
                <div class="step-tips">
                    <h4>Pro Tips:</h4>
                    <p>• Start with one card and use it responsibly</p>
                    <p>• Set up automatic payments to never miss a due date</p>
                    <p>• Check your credit report regularly for errors</p>
                </div>
            `
        },
        2: {
            title: 'Use Credit Responsibly',
            content: `
                <h3>Building Good Credit Habits</h3>
                <p>Now that you have credit, it's crucial to use it wisely:</p>
                <ul>
                    <li><strong>Pay in full every month:</strong> Avoid interest charges completely</li>
                    <li><strong>Keep utilization under 30%:</strong> Ideally under 10% for best scores</li>
                    <li><strong>Pay before statement dates:</strong> Lower reported balances</li>
                    <li><strong>Don't close old accounts:</strong> Keep your credit history long</li>
                </ul>
                <div class="step-tips">
                    <h4>Common Mistakes to Avoid:</h4>
                    <p>• Making only minimum payments</p>
                    <p>• Maxing out credit cards</p>
                    <p>• Applying for too many cards at once</p>
                </div>
            `
        },
        3: {
            title: 'Build Credit History',
            content: `
                <h3>Establishing Long-Term Credit Health</h3>
                <p>Building a strong credit history takes time but pays off:</p>
                <ul>
                    <li><strong>Maintain accounts for years:</strong> Length of history matters</li>
                    <li><strong>Diversify credit types:</strong> Mix of cards, loans, etc.</li>
                    <li><strong>Monitor your credit regularly:</strong> Use free monitoring services</li>
                    <li><strong>Dispute errors promptly:</strong> Incorrect information hurts your score</li>
                </ul>
                <div class="step-tips">
                    <h4>Timeline Expectations:</h4>
                    <p>• 6 months: First credit score appears</p>
                    <p>• 1 year: Score becomes more stable</p>
                    <p>• 2+ years: Qualify for better credit products</p>
                </div>
            `
        },
        4: {
            title: 'Achieve Credit Excellence',
            content: `
                <h3>Reaching Elite Credit Status</h3>
                <p>Excellent credit (750+) opens doors to the best financial products:</p>
                <ul>
                    <li><strong>Optimize your credit mix:</strong> Strategic use of different credit types</li>
                    <li><strong>Maximize credit limits:</strong> Request increases to lower utilization</li>
                    <li><strong>Use credit strategically:</strong> Earn rewards while building credit</li>
                    <li><strong>Help others build credit:</strong> Add family as authorized users</li>
                </ul>
                <div class="step-tips">
                    <h4>Elite Credit Benefits:</h4>
                    <p>• Best interest rates on loans and mortgages</p>
                    <p>• Premium credit cards with valuable rewards</p>
                    <p>• Higher credit limits and better terms</p>
                </div>
            `
        }
    };
    
    const step = stepData[stepNumber];
    if (step) {
        showStepModal(step);
        
        // Mark step as completed if not already
        if (!educationState.completedSteps.includes(stepNumber)) {
            educationState.completedSteps.push(stepNumber);
            educationState.journeyProgress = Math.max(educationState.journeyProgress, stepNumber);
            updateJourneyProgress();
            saveEducationData();
        }
    }
}

// Show step modal
function showStepModal(stepData) {
    const modalContent = document.getElementById('conceptContent');
    if (modalContent) {
        modalContent.innerHTML = `
            <div class="journey-step-content">
                ${stepData.content}
            </div>
            <style>
                .journey-step-content h3 {
                    color: #1f2937;
                    margin-bottom: 15px;
                    font-size: 1.5rem;
                }
                
                .journey-step-content ul {
                    margin: 15px 0;
                    padding-left: 20px;
                }
                
                .journey-step-content li {
                    margin-bottom: 10px;
                    line-height: 1.6;
                }
                
                .step-tips {
                    background: #f0f9ff;
                    padding: 20px;
                    border-radius: 10px;
                    margin-top: 20px;
                    border-left: 4px solid #2563eb;
                }
                
                .step-tips h4 {
                    color: #1e40af;
                    margin-bottom: 10px;
                }
                
                .step-tips p {
                    margin: 5px 0;
                    color: #1e40af;
                }
            </style>
        `;
        showModal('conceptModal');
    }
}

// Initialize concept cards
function initializeConceptCards() {
    // Add hover effects and animations
    const conceptCards = document.querySelectorAll('.concept-card');
    conceptCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotateY(5deg)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotateY(0deg)';
            this.style.boxShadow = 'none';
        });
    });
}

// Show financial concept
function showConcept(conceptKey) {
    const concept = financialConcepts[conceptKey];
    if (!concept) return;
    
    const modalContent = document.getElementById('conceptContent');
    if (modalContent) {
        modalContent.innerHTML = createConceptHTML(concept);
        showModal('conceptModal');
        
        // Add to education history
        educationState.currentConcept = conceptKey;
        saveEducationData();
    }
}

// Create concept HTML with animations
function createConceptHTML(concept) {
    return `
        <div class="concept-detail">
            <h2 class="concept-title">${concept.title}</h2>
            
            <div class="concept-definition">
                <h3>Definition</h3>
                <p>${concept.definition}</p>
            </div>
            
            <div class="concept-explanation">
                <h3>Detailed Explanation</h3>
                <div class="explanation-content">${concept.explanation.replace(/\n/g, '<br>')}</div>
            </div>
            
            <div class="concept-example">
                <h3>Example</h3>
                <div class="example-box">
                    <i class="fas fa-lightbulb"></i>
                    <p>${concept.example}</p>
                </div>
            </div>
            
            <div class="concept-tips">
                <h3>Key Tips</h3>
                <ul class="tips-list">
                    ${concept.tips.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
        </div>
        
        <style>
            .concept-detail {
                animation: slideInUp 0.5s ease-out;
            }
            
            .concept-title {
                color: #1f2937;
                margin-bottom: 25px;
                font-size: 2rem;
                text-align: center;
                background: linear-gradient(135deg, #2563eb, #7c3aed);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            
            .concept-definition,
            .concept-explanation,
            .concept-example,
            .concept-tips {
                margin-bottom: 25px;
                padding: 20px;
                border-radius: 10px;
                background: #f9fafb;
                border-left: 4px solid #2563eb;
            }
            
            .concept-detail h3 {
                color: #374151;
                margin-bottom: 15px;
                font-size: 1.3rem;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .concept-detail h3::before {
                content: '';
                width: 4px;
                height: 20px;
                background: #2563eb;
                border-radius: 2px;
            }
            
            .explanation-content {
                line-height: 1.7;
                color: #4b5563;
                white-space: pre-line;
            }
            
            .example-box {
                background: #fef3c7;
                padding: 15px;
                border-radius: 8px;
                border: 1px solid #f59e0b;
                display: flex;
                align-items: flex-start;
                gap: 15px;
            }
            
            .example-box i {
                color: #f59e0b;
                font-size: 1.2rem;
                margin-top: 2px;
            }
            
            .example-box p {
                margin: 0;
                color: #92400e;
                font-style: italic;
            }
            
            .tips-list {
                list-style: none;
                padding: 0;
            }
            
            .tips-list li {
                padding: 10px 0;
                padding-left: 30px;
                position: relative;
                border-bottom: 1px solid #e5e7eb;
                color: #4b5563;
            }
            
            .tips-list li:last-child {
                border-bottom: none;
            }
            
            .tips-list li::before {
                content: '✓';
                position: absolute;
                left: 0;
                top: 10px;
                width: 20px;
                height: 20px;
                background: #22c55e;
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: bold;
            }
            
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        </style>
    `;
}

// Initialize glossary
function initializeGlossary() {
    displayGlossary(financialGlossary);
}

// Display glossary terms
function displayGlossary(terms) {
    const glossaryGrid = document.getElementById('glossaryGrid');
    if (!glossaryGrid) return;
    
    if (terms.length === 0) {
        glossaryGrid.innerHTML = `
            <div class="no-results">
                <p>No terms found matching your search.</p>
            </div>
        `;
        return;
    }
    
    glossaryGrid.innerHTML = terms.map((term, index) => `
        <div class="glossary-term" onclick="showGlossaryTerm('${term.term}')" style="animation-delay: ${index * 0.1}s">
            <div class="term-title">${term.term}</div>
            <div class="term-definition">${term.definition}</div>
        </div>
    `).join('');
    
    // Add flip animation on hover
    const termElements = glossaryGrid.querySelectorAll('.glossary-term');
    termElements.forEach(term => {
        term.addEventListener('mouseenter', function() {
            this.style.transform = 'rotateY(10deg) scale(1.02)';
        });
        
        term.addEventListener('mouseleave', function() {
            this.style.transform = 'rotateY(0deg) scale(1)';
        });
    });
}

// Filter glossary
function filterGlossary(searchTerm) {
    const filtered = financialGlossary.filter(term => 
        term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    displayGlossary(filtered);
}

// Search glossary function (called by HTML)
function searchGlossary() {
    const searchInput = document.getElementById('glossarySearch');
    if (searchInput) {
        filterGlossary(searchInput.value);
    }
}

// Show glossary term details
function showGlossaryTerm(termName) {
    const term = financialGlossary.find(t => t.term === termName);
    if (!term) return;
    
    const modalContent = document.getElementById('conceptContent');
    if (modalContent) {
        modalContent.innerHTML = `
            <div class="glossary-term-detail">
                <h2>${term.term}</h2>
                <div class="term-definition-detail">
                    <p>${term.definition}</p>
                </div>
                <div class="related-terms">
                    <h3>Related Terms</h3>
                    <div class="related-grid">
                        ${getRelatedTerms(termName).map(relatedTerm => `
                            <div class="related-term" onclick="showGlossaryTerm('${relatedTerm.term}')">
                                ${relatedTerm.term}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <style>
                .glossary-term-detail h2 {
                    color: #1f2937;
                    margin-bottom: 20px;
                    font-size: 2rem;
                    text-align: center;
                }
                
                .term-definition-detail {
                    background: #f0f9ff;
                    padding: 25px;
                    border-radius: 10px;
                    margin-bottom: 25px;
                    border-left: 4px solid #2563eb;
                }
                
                .term-definition-detail p {
                    font-size: 1.1rem;
                    line-height: 1.7;
                    color: #1e40af;
                    margin: 0;
                }
                
                .related-terms h3 {
                    color: #374151;
                    margin-bottom: 15px;
                }
                
                .related-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 10px;
                }
                
                .related-term {
                    padding: 10px 15px;
                    background: #f3f4f6;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    text-align: center;
                    font-weight: 500;
                    color: #4b5563;
                }
                
                .related-term:hover {
                    background: #2563eb;
                    color: white;
                    transform: translateY(-2px);
                }
            </style>
        `;
        showModal('conceptModal');
    }
}

// Get related terms (simple keyword matching)
function getRelatedTerms(termName) {
    const term = financialGlossary.find(t => t.term === termName);
    if (!term) return [];
    
    // Simple keyword-based relation finding
    const keywords = term.definition.toLowerCase().split(' ');
    const related = financialGlossary.filter(t => 
        t.term !== termName && 
        keywords.some(keyword => 
            keyword.length > 4 && 
            t.definition.toLowerCase().includes(keyword)
        )
    );
    
    return related.slice(0, 6); // Return max 6 related terms
}

// Show modal function
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Load education data
function loadEducationData() {
    const savedData = localStorage.getItem('creditCoreEducationData');
    if (savedData) {
        educationState = { ...educationState, ...JSON.parse(savedData) };
        updateJourneyProgress();
    }
}

// Save education data
function saveEducationData() {
    localStorage.setItem('creditCoreEducationData', JSON.stringify(educationState));
}

// Export education functions
window.CreditEducation = {
    showConcept,
    searchGlossary,
    showGlossaryTerm,
    activateJourneyStep,
    educationState,
    saveEducationData
};

