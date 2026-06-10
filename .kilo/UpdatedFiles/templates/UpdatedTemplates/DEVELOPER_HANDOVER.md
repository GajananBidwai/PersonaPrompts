# Developer Handover & Workflow Document

### 1. Project Overview
* **Project Name:** Expense Tracker
* **Business Purpose:** Enables freelancers to track business expenses digitally with visual insights and tax reporting capabilities
* **Problem Statement:** Freelancers manually track expenses using physical notebooks, leading to errors, no visual insights, and tedious tax reporting
* **Solution Summary:** Lightweight web application for instant expense logging, monthly category breakdowns via dynamic charts, and CSV export
* **Key Features:** Expense CRUD, Monthly Summary & Bar Chart, CSV Export

### 2. Technology Stack
| Layer | Technologies |
| ----- | ------------ |
| Frontend | React 18, TypeScript, localStorage, Recharts, Formik, Yup, Tailwind CSS |
| Infrastructure | Vite, Node.js |
| Testing | Jest, React Testing Library |

### 3. Architecture Overview
* **High-Level Architecture:** Single-page React application with localStorage persistence
* **Request/Data Flow:** Page → Hook → Service → Storage (localStorage)
* **Major Components:** ExpenseForm, ExpenseList, ExpenseChart, ExportButton
* **External Integrations:** None (local-only application)

### 4. Project Structure
```
src/
├── app/
│   └── App.tsx
├── features/
│   └── expenses/
│       ├── components/
│       │   ├── ExpenseForm.tsx
│       │   ├── ExpenseList.tsx
│       │   ├── ExportButton.tsx
│       ├── hooks/
│       │   └── useExpenses.ts
│       ├── services/
│       │   └── index.ts
│       ├── storage/
│       │   └── index.ts
│       ├── charts/
│       │   └── ExpenseChart.tsx
│       ├── types/
│       │   └── index.ts
│       └── pages/
│           └── index.tsx
```

### 5. Module Summary
| Module | Purpose | Key Components | Dependencies |
| ------ | ------- | -------------- | ------------ |
| Expenses | Core expense tracking | ExpenseForm, ExpenseList, ExpenseChart, useExpenses, expenseService, storage | react, recharts, formik, yup, tailwind |

### 6. Database Overview
| Entity / Collection | Purpose | Relationships |
| ------------------- | ------- | ------------- |
| localStorage 'expenses' | Persists expense records | None (local storage only) |

### 7. API Overview
| Endpoint | Method | Purpose | Auth Required |
| -------- | ------ | ------- | ------------- |
| LocalStorage | GET | Retrieve all expenses | No |
| LocalStorage | POST | Add new expense | No |
| LocalStorage | DELETE | Delete expense by ID | No |

### 8. Environment & Setup
* **Required Environment Variables:** None
* **Installation Steps:** `npm install`
* **Local Setup:** Run `npm run dev` - app starts on port 3000
* **Build Commands:** `npm run build`
* **Run Commands:** `npm run dev` (development), `npm run preview` (production preview)

### 9. Business Workflows
**Expense Logging Workflow:**
* **Purpose:** Record business expenses for tracking and reporting
* **Steps:** Fill form fields → Submit → Validate → Save to localStorage → Update chart
* **Validation Rules:** Amount > 0 and ≤ $999,999.99; Category required; Date required
* **Expected Outcome:** Expense appears in list and chart updates within 100ms

**CSV Export Workflow:**
* **Purpose:** Export expenses for tax reporting
* **Steps:** Click Export button → Generate CSV → Sanitize formulas → Download file
* **Validation Rules:** All values sanitized to prevent CSV injection
* **Expected Outcome:** expenses_export.csv downloads within 500ms

### 10. Security & Error Handling
* **Authentication & Authorization:** None (local-only)
* **Sensitive Data Handling:** Input sanitization for XSS prevention
* **Validation Strategy:** Yup validation on form inputs, client-side amount limits
* **Error Handling Strategy:** Form field red borders for invalid inputs, empty state placeholders

| Scenario | Expected Behavior |
| -------- | ----------------- |
| Invalid amount | Field highlighted with red border, submission blocked |
| Empty category | Field highlighted with red border, submission blocked |
| Special characters in category | Sanitized with single quote prefix for CSV |
| No expenses recorded | Empty state message displayed |

### 11. Testing Overview
| Test Type | Coverage | Tools |
| --------- | -------- | ----- |
| Unit Tests | Component rendering, form validation, hooks | Jest, React Testing Library |
| Integration Tests | Expense CRUD operations | Jest, React Testing Library |
| E2E Tests | Not implemented (future enhancement) | Playwright recommended |

**Test Commands:** `npm test` (run tests), `npm run test:ui` (watch mode)

### 12. Deployment & Operations
* **Deployment Process:** `npm run build` generates static assets for static hosting
* **CI/CD Flow:** Recommended: GitHub Actions with `npm install`, `npm run build`, deploy to Netlify/Vercel
* **Monitoring & Logging:** Browser console for errors
* **Rollback Strategy:** Re-deploy previous build version

### 13. Known Limitations & Future Enhancements
| Type | Description | Priority |
| ---- | ----------- | -------- |
| Technical | Data lost on browser cache clear | Medium |
| Security | No authentication/authorization | High (v2) |
| Feature | Multi-user accounts | High (v2) |
| Feature | Auto-categorization via AI | Low |
| Feature | Banking API integration | Low |

### 14. Troubleshooting Guide
| Issue | Resolution |
| ----- | ---------- |
| Chart not rendering | Check if expenses exist, verify Recharts import |
| Form not submitting | Verify all fields filled, check browser console |
| CSV not downloading | Check browser permissions, verify export function |
| Data not persisting | Verify localStorage available, check for private browsing mode |
| Tests failing | Run `npm install` to ensure test dependencies installed |

### 15. Developer Quick Start
1. **Install dependencies:** `npm install`
2. **Configure environment:** No configuration required
3. **Run application:** `npm run dev`
4. **Execute tests:** `npm test`
5. **Build project:** `npm run build`
6. **Deploy application:** Deploy `dist/` folder to any static hosting provider