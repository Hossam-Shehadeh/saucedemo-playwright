
# 🧪 SauceDemo Playwright Testing Framework

## 📚 Course: Software Testing and Quality Assurance  
**Semester:** Second Semester 2024/2025  
**Assignment:** Homework #3  
**Deadline:** ⏰ 25 May Midnight (Not negotiable)  

---

## 🌐 Target Website
[https://www.saucedemo.com](https://www.saucedemo.com)

---

## ✅ Features Tested

1. 🔐 Login
2. 🛒 Add to Cart
3. 🧾 Checkout
4. ❌ Remove from Cart
5. ↕️ Sort Feature (A-Z, Price High to Low)

---

## 🧱 Project Structure

```
saucedemo-playwright/
│
├── .env                          # Stores credentials
├── playwright.config.ts          # Playwright global configuration
├── package.json                  # NPM scripts and dependencies
│
├── pages/                        # Page Object Model classes
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
│
├── tests/                        # All feature-based test files
│   ├── login.spec.ts
│   ├── addToCart.spec.ts
│   ├── checkout.spec.ts
│   ├── removeFromCart.spec.ts
│   └── sort.spec.ts
│
└── utils/                        # Optional utilities (like testData)
    └── testData.ts
```

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Hossam-Shehadeh/saucedemo-playwright.git
cd saucedemo-playwright
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

```
USERNAME=standard_user
PASSWORD=secret_sauce
```

### 4. Run All Tests

```bash
npx playwright test
```

### 5. Run Tests on Specific Browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
```

---

## 🛠️ Tools & Concepts Used

- **Playwright** with TypeScript
- Page Object Model (POM)
- Hooks (`beforeEach`, `describe`, etc.)
- Parameterized environment with `.env`
- Grouping and separation of tests
- Multi-browser testing (Chromium & Firefox)

---

## 📁 Deliverables

- ✅ Complete Playwright Project
- ✅ Separate test files per feature
- ✅ Multi-browser support
- ✅ Parameterized configuration
- ✅ GitHub Repository

---

