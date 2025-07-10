// Card Comparison Engine for Credit Core

// Credit card database
const creditCardsDatabase = [
    {
        id: 'chase-sapphire-preferred',
        name: 'Chase Sapphire Preferred',
        issuer: 'Chase',
        type: 'travel',
        annualFee: 95,
        apr: '21.49% - 28.49%',
        creditScoreRequired: 'excellent',
        creditScoreMin: 750,
        rewards: {
            dining: 2,
            travel: 2,
            other: 1
        },
        signupBonus: '60,000 points',
        signupSpend: 4000,
        signupTimeframe: 3,
        benefits: [
            'No foreign transaction fees',
            '25% more value when redeeming for travel',
            'Trip cancellation/interruption insurance',
            'Primary rental car insurance'
        ],
        rating: 4.5,
        pros: [
            'Excellent travel rewards',
            'Valuable signup bonus',
            'Great travel protections'
        ],
        cons: [
            'Annual fee',
            'High APR',
            'Requires excellent credit'
        ]
    },
    {
        id: 'discover-it-cash-back',
        name: 'Discover it Cash Back',
        issuer: 'Discover',
        type: 'cashback',
        annualFee: 0,
        apr: '16.49% - 27.49%',
        creditScoreRequired: 'good',
        creditScoreMin: 670,
        rewards: {
            rotating: 5,
            other: 1
        },
        signupBonus: 'Cashback Match',
        signupSpend: 0,
        signupTimeframe: 12,
        benefits: [
            'No annual fee',
            'Cashback Match for first year',
            '5% rotating categories',
            'Free FICO score'
        ],
        rating: 4.3,
        pros: [
            'No annual fee',
            'High rotating category rewards',
            'Cashback match program'
        ],
        cons: [
            'Limited acceptance internationally',
            'Rotating categories require activation',
            'Lower base reward rate'
        ]
    },
    {
        id: 'capital-one-venture',
        name: 'Capital One Venture',
        issuer: 'Capital One',
        type: 'travel',
        annualFee: 95,
        apr: '19.49% - 29.49%',
        creditScoreRequired: 'excellent',
        creditScoreMin: 750,
        rewards: {
            all: 2
        },
        signupBonus: '75,000 miles',
        signupSpend: 4000,
        signupTimeframe: 3,
        benefits: [
            'No foreign transaction fees',
            'Simple flat-rate rewards',
            'Transfer partners',
            'Global Entry/TSA PreCheck credit'
        ],
        rating: 4.2,
        pros: [
            'Simple reward structure',
            'No category restrictions',
            'Good travel benefits'
        ],
        cons: [
            'Annual fee',
            'High APR',
            'Limited bonus categories'
        ]
    },
    {
        id: 'citi-double-cash',
        name: 'Citi Double Cash',
        issuer: 'Citi',
        type: 'cashback',
        annualFee: 0,
        apr: '18.49% - 28.49%',
        creditScoreRequired: 'good',
        creditScoreMin: 670,
        rewards: {
            all: 2
        },
        signupBonus: '$200',
        signupSpend: 1500,
        signupTimeframe: 6,
        benefits: [
            'No annual fee',
            '2% on everything',
            'No category restrictions',
            'Balance transfer options'
        ],
        rating: 4.4,
        pros: [
            'No annual fee',
            'Flat 2% on everything',
            'Simple reward structure'
        ],
        cons: [
            'No bonus categories',
            'Must pay bill to earn 2nd 1%',
            'Limited additional benefits'
        ]
    },
    {
        id: 'amex-gold',
        name: 'American Express Gold',
        issuer: 'American Express',
        type: 'travel',
        annualFee: 250,
        apr: '18.49% - 27.49%',
        creditScoreRequired: 'excellent',
        creditScoreMin: 750,
        rewards: {
            dining: 4,
            groceries: 4,
            other: 1
        },
        signupBonus: '60,000 points',
        signupSpend: 4000,
        signupTimeframe: 6,
        benefits: [
            '$120 dining credit',
            '$120 Uber credit',
            'No foreign transaction fees',
            'Excellent customer service'
        ],
        rating: 4.6,
        pros: [
            'High dining and grocery rewards',
            'Valuable credits offset fee',
            'Excellent customer service'
        ],
        cons: [
            'High annual fee',
            'Limited acceptance',
            'Credits require specific spending'
        ]
    },
    {
        id: 'chase-freedom-unlimited',
        name: 'Chase Freedom Unlimited',
        issuer: 'Chase',
        type: 'cashback',
        annualFee: 0,
        apr: '17.49% - 26.49%',
        creditScoreRequired: 'good',
        creditScoreMin: 670,
        rewards: {
            dining: 3,
            drugstores: 3,
            all: 1.5
        },
        signupBonus: '$200',
        signupSpend: 500,
        signupTimeframe: 3,
        benefits: [
            'No annual fee',
            'No category restrictions',
            'Intro APR offer',
            'Cell phone protection'
        ],
        rating: 4.1,
        pros: [
            'No annual fee',
            'Flat rate on everything',
            'Good intro APR offer'
        ],
        cons: [
            'Lower reward rate',
            'Limited bonus categories',
            'Requires good credit'
        ]
    },
    {
        id: 'capital-one-quicksilver',
        name: 'Capital One Quicksilver',
        issuer: 'Capital One',
        type: 'cashback',
        annualFee: 0,
        apr: '19.49% - 29.49%',
        creditScoreRequired: 'fair',
        creditScoreMin: 580,
        rewards: {
            all: 1.5
        },
        signupBonus: '$200',
        signupSpend: 500,
        signupTimeframe: 3,
        benefits: [
            'No annual fee',
            'No foreign transaction fees',
            'Simple rewards',
            'Pre-qualification available'
        ],
        rating: 3.9,
        pros: [
            'No annual fee',
            'Good for fair credit',
            'No foreign transaction fees'
        ],
        cons: [
            'Lower reward rate',
            'High APR',
            'Limited benefits'
        ]
    },
    {
        id: 'discover-it-student',
        name: 'Discover it Student',
        issuer: 'Discover',
        type: 'student',
        annualFee: 0,
        apr: '16.49% - 27.49%',
        creditScoreRequired: 'fair',
        creditScoreMin: 580,
        rewards: {
            rotating: 5,
            other: 1
        },
        signupBonus: 'Cashback Match',
        signupSpend: 0,
        signupTimeframe: 12,
        benefits: [
            'No annual fee',
            'Cashback Match for first year',
            'Good Grade Rewards',
            'Free FICO score'
        ],
        rating: 4.2,
        pros: [
            'Great for students',
            'No annual fee',
            'Cashback match program'
        ],
        cons: [
            'Limited acceptance',
            'Requires student status',
            'Rotating categories'
        ]
    },
    {
        id: 'capital-one-secured',
        name: 'Capital One Secured',
        issuer: 'Capital One',
        type: 'secured',
        annualFee: 0,
        apr: '26.99%',
        creditScoreRequired: 'any',
        creditScoreMin: 300,
        rewards: {
            all: 0
        },
        signupBonus: 'None',
        signupSpend: 0,
        signupTimeframe: 0,
        benefits: [
            'No annual fee',
            'Helps build credit',
            'Graduation to unsecured',
            'Access to higher credit line'
        ],
        rating: 3.8,
        pros: [
            'Builds credit history',
            'No annual fee',
            'Graduation opportunity'
        ],
        cons: [
            'Requires security deposit',
            'No rewards',
            'High APR'
        ]
    },
    {
        id: 'chase-ink-business',
        name: 'Chase Ink Business Cash',
        issuer: 'Chase',
        type: 'business',
        annualFee: 0,
        apr: '18.49% - 24.49%',
        creditScoreRequired: 'good',
        creditScoreMin: 670,
        rewards: {
            office: 5,
            telecom: 5,
            gas: 2,
            other: 1
        },
        signupBonus: '$750',
        signupSpend: 7500,
        signupTimeframe: 3,
        benefits: [
            'No annual fee',
            'High category rewards',
            'Employee cards at no cost',
            'Purchase protection'
        ],
        rating: 4.3,
        pros: [
            'High business category rewards',
            'No annual fee',
            'Good for small business'
        ],
        cons: [
            'Category spending limits',
            'Business use required',
            'Limited personal benefits'
        ]
    }
];

// Comparison state
let comparisonState = {
    selectedCards: [],
    filteredCards: [...creditCardsDatabase],
    currentFilters: {
        cardType: 'all',
        annualFee: 'all',
        creditScore: 'all'
    }
};

// Initialize comparison engine
document.addEventListener('DOMContentLoaded', function() {
    initializeComparison();
    setupComparisonEventListeners();
    displayCards(comparisonState.filteredCards);
});

// Initialize comparison functionality
function initializeComparison() {
    // Load saved comparison state
    const savedState = localStorage.getItem('creditCoreComparisonState');
    if (savedState) {
        comparisonState = { ...comparisonState, ...JSON.parse(savedState) };
    }
    
    // Apply saved filters
    applyFilters();
}

// Setup event listeners
function setupComparisonEventListeners() {
    // Filter change listeners
    const filterSelects = ['cardTypeFilter', 'annualFeeFilter', 'creditScoreFilter'];
    filterSelects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select) {
            select.addEventListener('change', function() {
                updateFilter(selectId, this.value);
            });
        }
    });
}

// Update filter and apply
function updateFilter(filterId, value) {
    const filterMap = {
        'cardTypeFilter': 'cardType',
        'annualFeeFilter': 'annualFee',
        'creditScoreFilter': 'creditScore'
    };
    
    const filterKey = filterMap[filterId];
    if (filterKey) {
        comparisonState.currentFilters[filterKey] = value;
        applyFilters();
        saveComparisonState();
    }
}

// Apply current filters
function applyFilters() {
    let filtered = [...creditCardsDatabase];
    
    // Filter by card type
    if (comparisonState.currentFilters.cardType !== 'all') {
        filtered = filtered.filter(card => card.type === comparisonState.currentFilters.cardType);
    }
    
    // Filter by annual fee
    if (comparisonState.currentFilters.annualFee !== 'all') {
        switch (comparisonState.currentFilters.annualFee) {
            case 'no-fee':
                filtered = filtered.filter(card => card.annualFee === 0);
                break;
            case 'low-fee':
                filtered = filtered.filter(card => card.annualFee > 0 && card.annualFee < 100);
                break;
            case 'high-fee':
                filtered = filtered.filter(card => card.annualFee >= 100);
                break;
        }
    }
    
    // Filter by credit score
    if (comparisonState.currentFilters.creditScore !== 'all') {
        switch (comparisonState.currentFilters.creditScore) {
            case 'excellent':
                filtered = filtered.filter(card => card.creditScoreMin >= 750);
                break;
            case 'good':
                filtered = filtered.filter(card => card.creditScoreMin >= 670 && card.creditScoreMin < 750);
                break;
            case 'fair':
                filtered = filtered.filter(card => card.creditScoreMin < 670);
                break;
        }
    }
    
    comparisonState.filteredCards = filtered;
    displayCards(filtered);
}

// Filter cards function (called by button)
function filterCards() {
    applyFilters();
}

// Display cards in grid
function displayCards(cards) {
    const cardsGrid = document.getElementById('cardsGrid');
    if (!cardsGrid) return;
    
    if (cards.length === 0) {
        cardsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <h3>No cards match your criteria</h3>
                <p>Try adjusting your filters to see more options.</p>
            </div>
        `;
        return;
    }
    
    cardsGrid.innerHTML = cards.map(card => createCardHTML(card)).join('');
    
    // Add click listeners for card selection
    const cardItems = cardsGrid.querySelectorAll('.card-item');
    cardItems.forEach(cardItem => {
        cardItem.addEventListener('click', function() {
            const cardId = this.dataset.cardId;
            toggleCardSelection(cardId);
        });
    });
}

// Create HTML for a single card
function createCardHTML(card) {
    const isSelected = comparisonState.selectedCards.includes(card.id);
    const rewardText = getRewardText(card.rewards);
    
    return `
        <div class="card-item ${isSelected ? 'selected' : ''}" data-card-id="${card.id}">
            <div class="card-header">
                <div>
                    <div class="card-name">${card.name}</div>
                    <div class="card-issuer">${card.issuer}</div>
                </div>
                <div class="card-rating">
                    ${generateStars(card.rating)}
                </div>
            </div>
            
            <div class="card-features">
                <div class="feature">
                    <span class="feature-label">Annual Fee</span>
                    <span class="feature-value">${card.annualFee === 0 ? 'No Fee' : '$' + card.annualFee}</span>
                </div>
                <div class="feature">
                    <span class="feature-label">APR</span>
                    <span class="feature-value">${card.apr}</span>
                </div>
                <div class="feature">
                    <span class="feature-label">Rewards</span>
                    <span class="feature-value">${rewardText}</span>
                </div>
                <div class="feature">
                    <span class="feature-label">Credit Score</span>
                    <span class="feature-value">${formatCreditScore(card.creditScoreRequired)}</span>
                </div>
                <div class="feature">
                    <span class="feature-label">Signup Bonus</span>
                    <span class="feature-value">${card.signupBonus}</span>
                </div>
            </div>
            
            <div class="card-actions">
                <button class="btn btn-small btn-outline" onclick="viewCardDetails('${card.id}')">
                    View Details
                </button>
                <button class="btn btn-small btn-primary" onclick="toggleCardSelection('${card.id}')">
                    ${isSelected ? 'Remove' : 'Compare'}
                </button>
            </div>
        </div>
    `;
}

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<span class="star">★</span>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<span class="star">☆</span>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<span class="star" style="opacity: 0.3;">☆</span>';
    }
    
    return starsHTML;
}

// Get reward text for display
function getRewardText(rewards) {
    if (rewards.all) {
        return `${rewards.all}% on everything`;
    }
    
    const rewardParts = [];
    Object.keys(rewards).forEach(category => {
        if (category === 'rotating') {
            rewardParts.push(`${rewards[category]}% rotating`);
        } else if (category === 'dining') {
            rewardParts.push(`${rewards[category]}% dining`);
        } else if (category === 'travel') {
            rewardParts.push(`${rewards[category]}% travel`);
        } else if (category === 'groceries') {
            rewardParts.push(`${rewards[category]}% groceries`);
        } else if (category === 'gas') {
            rewardParts.push(`${rewards[category]}% gas`);
        } else if (category === 'office') {
            rewardParts.push(`${rewards[category]}% office`);
        } else if (category === 'other') {
            rewardParts.push(`${rewards[category]}% other`);
        }
    });
    
    return rewardParts.slice(0, 2).join(', ');
}

// Format credit score requirement
function formatCreditScore(requirement) {
    const scoreMap = {
        'excellent': 'Excellent (750+)',
        'good': 'Good (670-749)',
        'fair': 'Fair (580-669)',
        'any': 'Any Score'
    };
    
    return scoreMap[requirement] || requirement;
}

// Toggle card selection for comparison
function toggleCardSelection(cardId) {
    const index = comparisonState.selectedCards.indexOf(cardId);
    
    if (index > -1) {
        // Remove from selection
        comparisonState.selectedCards.splice(index, 1);
    } else {
        // Add to selection (max 3 cards)
        if (comparisonState.selectedCards.length < 3) {
            comparisonState.selectedCards.push(cardId);
        } else {
            alert('You can compare up to 3 cards at a time. Please remove a card first.');
            return;
        }
    }
    
    // Update display
    displayCards(comparisonState.filteredCards);
    updateComparisonTable();
    saveComparisonState();
}

// Update comparison table
function updateComparisonTable() {
    const comparisonTable = document.getElementById('comparisonTable');
    if (!comparisonTable) return;
    
    if (comparisonState.selectedCards.length === 0) {
        comparisonTable.style.display = 'none';
        return;
    }
    
    comparisonTable.style.display = 'block';
    
    const selectedCardData = comparisonState.selectedCards.map(cardId => 
        creditCardsDatabase.find(card => card.id === cardId)
    ).filter(card => card);
    
    const tableContainer = comparisonTable.querySelector('.table-container');
    if (tableContainer) {
        tableContainer.innerHTML = createComparisonTableHTML(selectedCardData);
    }
}

// Create comparison table HTML
function createComparisonTableHTML(cards) {
    if (cards.length === 0) return '';
    
    return `
        <table class="comparison-table-element">
            <thead>
                <tr>
                    <th>Feature</th>
                    ${cards.map(card => `<th>${card.name}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Issuer</strong></td>
                    ${cards.map(card => `<td>${card.issuer}</td>`).join('')}
                </tr>
                <tr>
                    <td><strong>Annual Fee</strong></td>
                    ${cards.map(card => `<td>${card.annualFee === 0 ? 'No Fee' : '$' + card.annualFee}</td>`).join('')}
                </tr>
                <tr>
                    <td><strong>APR</strong></td>
                    ${cards.map(card => `<td>${card.apr}</td>`).join('')}
                </tr>
                <tr>
                    <td><strong>Credit Score Required</strong></td>
                    ${cards.map(card => `<td>${formatCreditScore(card.creditScoreRequired)}</td>`).join('')}
                </tr>
                <tr>
                    <td><strong>Signup Bonus</strong></td>
                    ${cards.map(card => `<td>${card.signupBonus}</td>`).join('')}
                </tr>
                <tr>
                    <td><strong>Signup Spend</strong></td>
                    ${cards.map(card => `<td>${card.signupSpend > 0 ? '$' + card.signupSpend.toLocaleString() : 'None'}</td>`).join('')}
                </tr>
                <tr>
                    <td><strong>Rating</strong></td>
                    ${cards.map(card => `<td>${generateStars(card.rating)}</td>`).join('')}
                </tr>
            </tbody>
        </table>
        
        <style>
            .comparison-table-element {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
                background: white;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            
            .comparison-table-element th,
            .comparison-table-element td {
                padding: 15px;
                text-align: left;
                border-bottom: 1px solid #e5e7eb;
            }
            
            .comparison-table-element th {
                background: #f9fafb;
                font-weight: 600;
                color: #374151;
            }
            
            .comparison-table-element tr:hover {
                background: #f9fafb;
            }
            
            .comparison-table-element td:first-child {
                font-weight: 500;
                background: #f9fafb;
                width: 200px;
            }
        </style>
    `;
}

// View card details (modal or detailed view)
function viewCardDetails(cardId) {
    const card = creditCardsDatabase.find(c => c.id === cardId);
    if (!card) return;
    
    const modalContent = document.getElementById('conceptContent');
    if (modalContent) {
        modalContent.innerHTML = createCardDetailsHTML(card);
        showModal('conceptModal');
    }
}

// Create detailed card view HTML
function createCardDetailsHTML(card) {
    return `
        <div class="card-details">
            <h2>${card.name}</h2>
            <div class="card-details-grid">
                <div class="details-section">
                    <h3>Overview</h3>
                    <div class="detail-item">
                        <span class="detail-label">Issuer:</span>
                        <span class="detail-value">${card.issuer}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Type:</span>
                        <span class="detail-value">${card.type.charAt(0).toUpperCase() + card.type.slice(1)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Annual Fee:</span>
                        <span class="detail-value">${card.annualFee === 0 ? 'No Fee' : '$' + card.annualFee}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">APR:</span>
                        <span class="detail-value">${card.apr}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Credit Score:</span>
                        <span class="detail-value">${formatCreditScore(card.creditScoreRequired)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Rating:</span>
                        <span class="detail-value">${generateStars(card.rating)}</span>
                    </div>
                </div>
                
                <div class="details-section">
                    <h3>Rewards</h3>
                    ${Object.keys(card.rewards).map(category => `
                        <div class="detail-item">
                            <span class="detail-label">${category.charAt(0).toUpperCase() + category.slice(1)}:</span>
                            <span class="detail-value">${card.rewards[category]}%</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="details-section">
                    <h3>Signup Bonus</h3>
                    <div class="detail-item">
                        <span class="detail-label">Bonus:</span>
                        <span class="detail-value">${card.signupBonus}</span>
                    </div>
                    ${card.signupSpend > 0 ? `
                        <div class="detail-item">
                            <span class="detail-label">Required Spend:</span>
                            <span class="detail-value">$${card.signupSpend.toLocaleString()}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Timeframe:</span>
                            <span class="detail-value">${card.signupTimeframe} months</span>
                        </div>
                    ` : ''}
                </div>
                
                <div class="details-section">
                    <h3>Benefits</h3>
                    <ul>
                        ${card.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="details-section">
                    <h3>Pros</h3>
                    <ul class="pros-list">
                        ${card.pros.map(pro => `<li>${pro}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="details-section">
                    <h3>Cons</h3>
                    <ul class="cons-list">
                        ${card.cons.map(con => `<li>${con}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
        
        <style>
            .card-details h2 {
                margin-bottom: 20px;
                color: #1f2937;
            }
            
            .card-details-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
            }
            
            .details-section {
                background: #f9fafb;
                padding: 20px;
                border-radius: 10px;
            }
            
            .details-section h3 {
                margin-bottom: 15px;
                color: #374151;
                font-size: 1.1rem;
            }
            
            .detail-item {
                display: flex;
                justify-content: space-between;
                margin-bottom: 8px;
                padding: 5px 0;
                border-bottom: 1px solid #e5e7eb;
            }
            
            .detail-label {
                font-weight: 500;
                color: #6b7280;
            }
            
            .detail-value {
                font-weight: 600;
                color: #1f2937;
            }
            
            .details-section ul {
                list-style: none;
                padding: 0;
            }
            
            .details-section li {
                padding: 5px 0;
                padding-left: 20px;
                position: relative;
            }
            
            .details-section li::before {
                content: '•';
                position: absolute;
                left: 0;
                color: #2563eb;
                font-weight: bold;
            }
            
            .pros-list li::before {
                content: '✓';
                color: #22c55e;
            }
            
            .cons-list li::before {
                content: '✗';
                color: #ef4444;
            }
        </style>
    `;
}

// Get card recommendations based on user profile
function getRecommendations() {
    const userScore = window.CreditCore?.userPreferences?.creditScore || 720;
    const userUtilization = window.CreditCore?.userPreferences?.creditUtilization || 25;
    
    let recommendations = [];
    
    // Score-based recommendations
    if (userScore >= 750) {
        recommendations = creditCardsDatabase.filter(card => 
            card.creditScoreRequired === 'excellent' && card.rating >= 4.0
        );
    } else if (userScore >= 670) {
        recommendations = creditCardsDatabase.filter(card => 
            ['good', 'excellent'].includes(card.creditScoreRequired) && card.rating >= 3.8
        );
    } else {
        recommendations = creditCardsDatabase.filter(card => 
            ['fair', 'good'].includes(card.creditScoreRequired)
        );
    }
    
    // Sort by rating and relevance
    recommendations.sort((a, b) => {
        // Prioritize no annual fee if user has high utilization
        if (userUtilization > 30) {
            if (a.annualFee === 0 && b.annualFee > 0) return -1;
            if (b.annualFee === 0 && a.annualFee > 0) return 1;
        }
        
        return b.rating - a.rating;
    });
    
    return recommendations.slice(0, 3);
}

// Show modal function
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Save comparison state
function saveComparisonState() {
    localStorage.setItem('creditCoreComparisonState', JSON.stringify(comparisonState));
}

// Export comparison functions
window.CreditComparison = {
    filterCards,
    toggleCardSelection,
    viewCardDetails,
    getRecommendations,
    comparisonState,
    creditCardsDatabase
};

