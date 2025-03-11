# 🚀 CYPRESS STEP UP AUTOMATION

Automated end-to-end testing framework using **Cypress** to validate web application functionality.

---

## 📖 Overview

This project automates UI and API tests using **Cypress**. It supports various test environments and includes structured test data, reports, and CI/CD integration.

---

## 🛠️ Tech Stack

- **Cypress**: Test automation framework  
- **Mocha & Chai**: Test runner & assertion library  
- **JavaScript/TypeScript** (Optional)  
- **Azure Pipelines** (CI/CD)  
- **JSON/CSV** (For test data management)  
- **JUnit XML Reports** (Test results processing)  

---

## ⚙️ Installation & Setup

### 1️⃣ **Install Node.js**
Cypress requires **Node.js** (LTS version recommended). Download and install from [Node.js official site](https://nodejs.org/).

Check if Node.js is installed:
```sh
node -v
```
If Node.js is not installed, install it via package manager:
- **MacOS (Homebrew)**: `brew install node`
- **Windows**: Use the [Node.js installer](https://nodejs.org/)
- **Linux (Debian/Ubuntu)**: `sudo apt install nodejs npm`

### 2️⃣ **Clone the repository**
```sh
git clone https://github.com/thuchoang-tw/StepUpAutomation.git
cd cypress-stepup
```

### 3️⃣ **Install dependencies**
```sh
npm install
```

### 4️⃣ **Run Cypress Tests**
- Open Cypress UI:
  ```sh
  npx cypress open
  ```
- Run tests in headless mode:
  ```sh
  npx cypress run
  ```

---

## 📂 Project Structure

```
cypress-stepup/
│── cypress/
│   ├── downloads/           
│   ├── e2e/                  # End-to-end test cases
│   │   ├── proxy/            
│   │   ├── researcher/       
│   │   ├── researcherAdmin/  
│   │   ├── volunteer/        
│   ├── fixtures/             # Test data (JSON, CSV)
│   ├── results/              # Test execution results
│   ├── support/              # Custom Cypress commands
│   ├── videos/               # Recorded test runs
│── cypress.config.js         # Cypress configuration
│── cypress.env.json          # Environment variables
│── package.json              # Project dependencies
│── azure-pipelines.yml       # Azure DevOps pipeline configuration
│── README.md                 # Project documentation
```

---

## 🧪 Usage

### 0️⃣ Configure the URL  
Before running tests, configure the target URL for **Demencia** or **Aging** in the `cypress.env.json` file.  

### 1️⃣ Customize Test Data  
Ensure the test data is properly set up before running test cases. The following files are used:  

- **`account_details.json`** – Used for registering a new account.  
- **`address.json`** – Contains address-related test data.  
- **`proxy.json`** – Stores proxy information (used for registering a proxy).  
- **`study.json`** – Used for registering a study.  
- **`volunteer.json`** – Contains volunteer user details used in test cases.  
- **`question_volunteer.csv`** – CSV file with questions for volunteer registration.  
- **`question_proxy.csv`** – CSV file containing questions for proxy registration.  
- **`proxy_confirm_question.csv`** – Stores confirmation questions for proxy registration.  

### 2️⃣ Run a Specific Test Case  
To execute a specific test case, use the following command:  

```sh
npx cypress run --spec "cypress/e2e/proxy.cy.js"
```
### ⚠️ Important Notes  

- The **`question_volunteer.csv`** and **`question_proxy.csv`** files can be modified dynamically during test execution.  
- Each question must have:  
  - ✅ **Title** of the question  
  - ✅ **Type** of question  
  - ✅ **Answer** to be selected  
- The **next question** displayed must match exactly the expected flow based on the chosen answer.  
❗ If this condition is not met, the test will fail.  

---

## 🚀 Running Tests in CI/CD (Azure Pipelines)

This project can integrates with **Azure Pipelines**. Sample `azure-pipelines.yml`:

```yaml
trigger:
  - main

jobs:
  - job: Cypress_Tests
    pool:
      vmImage: 'ubuntu-latest'
    steps:
      - checkout: self
      - task: NodeTool@0
        inputs:
          versionSpec: '16.x'
      - script: npm install
      - script: npx cypress run
```

---

## 📝 Test Results & Reports

- **JUnit XML Reports**: Stored in `cypress/results/`
- **Screenshots & Videos**: Automatically saved in `cypress/videos/` on test failures on headless mode.

---

## 📬 Contact

📧 Email: thuc.hoang@thoughtworks.com

---

