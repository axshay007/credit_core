# Credit Core - Your Personal Financial Assistant

## Overview

Credit Core is a comprehensive, frontend-only financial assistant website designed to empower users with tools and knowledge to manage their credit and finances effectively. Built with pure HTML, CSS, and JavaScript, this interactive platform offers a suite of features including an AI-powered credit advisor, a credit health dashboard, a credit card comparison engine, various financial calculators, and educational resources.

## Features

### 1. AI-Powered Credit Advisor (Simulated)

- **Personalized Financial Advice:** Get tailored guidance on credit scores, debt management, and financial planning through an interactive Q&A interface.
- **Dynamic Responses:** The AI advisor provides simulated, pre-built financial advice scenarios with dynamic responses to user queries.
- **User Preferences/History:** Utilizes local storage to remember user preferences and past interactions, providing a more personalized experience.

### 2. Credit Health Dashboard

- **Visual Credit Score Simulator:** An interactive tool allowing users to simulate their credit score based on key factors like payment history, credit utilization, length of credit history, credit mix, and new credit. Users can adjust sliders to see the immediate impact on their simulated score.
- **Credit Utilization Gauge:** A visually appealing CSS radial progress bar that clearly displays the user's credit utilization ratio, with color-coded indicators for excellent, good, fair, and poor utilization.
- **Debt Payoff Calculator:** Helps users plan and visualize their debt repayment strategies, showing how different payment amounts affect the payoff timeline and total interest paid.

### 3. Card Comparison Engine

- **Filterable Card Database:** A robust database of various credit cards that can be filtered by criteria such as annual fee, reward categories, and APR.
- **Side-by-Side Comparison Tool:** Allows users to compare multiple credit cards simultaneously, highlighting key features and benefits for informed decision-making.
- **"Best Match" Recommendation:** Based on user inputs and preferences, the engine provides personalized credit card recommendations.

### 4. Financial Tools

- **Interest Calculator:** A versatile calculator that supports both compound and simple interest calculations, helping users understand the growth of their investments or the cost of their loans.
- **Reward Point Optimizer:** Assists users in maximizing their credit card rewards by analyzing spending habits across different categories and recommending the best cards for their lifestyle.
- **Payment Timeline Visualizer:** Provides a clear, visual representation of loan payment schedules, breaking down principal and interest payments over time.

### 5. Educational Resources

- **Animated Financial Concept Explainers:** Engaging, animated explanations of complex financial concepts (e.g., APR, credit utilization, compound interest) to make learning accessible and fun.
- **Interactive Credit Journey Map:** Guides users through different stages of their credit building journey, offering actionable steps and tips for each phase.
- **Glossary with 3D Card Flip Animations:** An interactive glossary of financial terms, featuring visually appealing 3D card flip animations for definitions.

## Technologies Used

- **HTML5:** For structuring the web content.
- **CSS3:** For styling and creating an appealing, responsive design, including animations and interactive elements.
- **JavaScript (ES6+):** For implementing all interactive functionalities, dynamic content, calculations, and local storage management.

## Installation and Setup

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <your-github-repo-link>
    cd credit_core
    ```

2.  **Open `index.html`:**
    Simply open the `index.html` file in your preferred web browser. All functionalities are client-side and do not require a backend server.

    Alternatively, you can use a local HTTP server (e.g., Python's `http.server`):
    ```bash
    cd credit_core
    python3 -m http.server 8000
    ```
    Then, open your browser and navigate to `http://localhost:8000`.

## Project Structure

```
credit_core/
├── css/
│   └── styles.css
├── js/
│   ├── advisor.js
│   ├── comparison.js
│   ├── dashboard.js
│   ├── education.js
│   ├── main.js
│   └── tools.js
├── images/ (empty, for future use)
├── data/ (empty, for future use)
├── index.html
└── README.md
└── CODE_EXPLANATION.md
└── todo.md
```

## Usage

-   **Navigation:** Use the top navigation bar to switch between different sections (AI Advisor, Dashboard, Compare Cards, Tools, Learn).
-   **AI Advisor:** Type your questions or click on quick question buttons to get financial advice.
-   **Dashboard:** Adjust sliders and input values to simulate credit scores and analyze credit utilization.
-   **Card Comparison:** Use filters to find suitable credit cards and compare them side-by-side.
-   **Financial Tools:** Input values into calculators to perform interest calculations, optimize rewards, and visualize payment timelines.
-   **Education:** Explore interactive concept explainers and the financial glossary.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please feel free to:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add new feature'`).
5.  Push to the branch (`git push origin feature/YourFeature`).
6.  Open a Pull Request.

## License

This project is open-source and available under the MIT License.

## Contact

For any inquiries or feedback, please contact [Your Name/Email/GitHub Profile].

---

**Manus AI**
*Generated on 2025-07-10*

