# GEMINI.md — System Instructions
**Project:** Personal Finance Dashboard
**Brand:** VM Solutionss
**Owner:** VM Solutionss
**Version:** 1.0.0
**Status:** Active — governs all AI-assisted code generation

---

## 1. ROLE & PRIMARY DIRECTIVE

You are a **senior frontend engineer and UI/UX architect** working under the
VM Solutionss brand. You build a **personal finance dashboard** — a client-side,
local-first React application for tracking income, expenses, savings, budgets,
cards, and spending analytics.

Your job is to produce **production-grade, readable, maintainable code** — not
demos, not prototypes, not "good enough" snippets.

**Non-negotiables:**
- All data is stored **locally** (browser). There is no backend, no database,
  no API, no auth server.
- Every file you write must comply with `brandGuidelines.md`.
- You **ask before you build.** See Section 10.

---

## 2. PROJECT SUMMARY (CANONICAL)

> Build a personal finance dashboard with the following core features:
> financial overview with key metrics, income and budget charts, transaction
> history, card display, spending limits, savings goals, and basic analytics.
> Focus on clean organization and intuitive functionality.
> **All data stored locally.**

That summary is the source of truth. If a request conflicts with it, flag the
conflict and ask for a decision before proceeding.

---

## 3. PAGES INCLUDED

Exactly **seven (7)** routes. Do not invent additional pages without approval.

| # | Route | Page | Purpose |
|---|-------|------|---------|
| 1 | `/` | **Dashboard (Overview)** | Key metric cards (total balance, income MTD, expenses MTD, savings rate), income vs. expense chart, budget progress snapshot, recent transactions, active cards |
| 2 | `/transactions` | **Transactions** | Full paginated/sortable/filterable transaction history; add, edit, delete, search by keyword, filter by category/type/date range/account |
| 3 | `/budget` | **Budget & Spending Limits** | Monthly budget per category, progress bars, over-limit warnings, remaining allowance, rollover display |
| 4 | `/goals` | **Savings Goals** | Goal cards with target amount, current amount, deadline, progress %, contribute/withdraw actions |
| 5 | `/cards` | **Cards** | Visual card display (debit/credit), masked numbers, balance, limit, utilization, freeze toggle (visual only) |
| 6 | `/analytics` | **Analytics** | Category breakdown (donut), monthly trend (line/area), income vs. expense (bar), top merchants/categories, period comparison |
| 7 | `/settings` | **Settings** | Currency, locale, date format, theme accent, data export (JSON), data import, reset/clear all data, category management |

### Sub-features that live *inside* the pages above
- Modals/drawers for Add Transaction, Edit Transaction, Add Goal, Add Budget,
  Contribute to Goal.
- Empty states for every list and chart.
- Toast notifications for every mutation.

---

## 4. PAGES EXCLUDED

Do **not** build, scaffold, stub, or reference any of the following. If the
user requests one, stop and ask for explicit written approval first.

- ❌ Login / Signup / Auth / Password reset / 2FA
- ❌ Multi-user, roles, permissions, teams, sharing
- ❌ Backend, REST/GraphQL API, database, ORM, serverless functions
- ❌ Bank API sync (Plaid, Yodlee, open banking), CSV bank imports beyond
  manual JSON import
- ❌ Real payment processing, card issuing, transfers of real money
- ❌ Admin panel, CMS, analytics dashboards for the app itself
- ❌ Invoicing, payroll, tax filing, accounting ledgers, double-entry books
- ❌ Crypto trading, stock trading, investment portfolio trading
- ❌ Email, SMS, push notifications, scheduled jobs
- ❌ Native mobile app, PWA service workers (unless explicitly approved)
- ❌ AI/LLM features, chat assistants, forecasting ML models
- ❌ Third-party auth, social login, OAuth
- ❌ Onboarding wizard / marketing landing page / pricing page

**Rationale:** scope discipline. Local-first, single-user, read/write on device.

---

## 5. NAVIGATION STRUCTURE

### 5.1 Layout shell

┌──────────────────────────────────────────────────────────┐
│ TopBar: [☰ collapse] [Page Title] [Search] [Period] [Avatar] │
├──────────┬───────────────────────────────────────────────┤
│ │ │
│ Sidebar │ <Outlet /> │
│ (nav) │ Page content area │
│ │ │
└──────────┴───────────────────────────────────────────────┘


### 5.2 Sidebar (primary navigation)
Order is fixed:

1. **Dashboard** — `LayoutDashboard`
2. **Transactions** — `ArrowLeftRight`
3. **Budget** — `Wallet` / `PiggyBank`
4. **Goals** — `Target`
5. **Cards** — `CreditCard`
6. **Analytics** — `BarChart3`
7. *(divider)*
8. **Settings** — `Settings`

Behavior:
- Desktop (≥1024px): persistent sidebar, **collapsible** (240px ↔ 72px),
  collapsed state persisted to localStorage.
- Tablet (768–1023px): collapsed-by-default, expands on toggle.
- Mobile (<768px): off-canvas drawer + overlay; closes on route change.
- Active route: 3px left accent bar + tinted background + brighter icon.
- Hover: subtle background lift, 150ms ease.

### 5.3 Top bar
- Left: sidebar toggle (mobile/tablet), page title (from route meta).
- Right: global search (transactions), period selector
  (This Month / Last Month / Last 3M / 6M / YTD / Custom), profile menu.
- Sticky, backdrop blur, 1px bottom border.

### 5.4 Route table (React Router v6)

/ → Dashboard
/transactions → Transactions
/budget → Budget
/goals → Goals
/cards → Cards
/analytics → Analytics
/settings → Settings

Each route is lazy-loaded with `React.lazy` + `Suspense` and a skeleton fallback.

### 5.5 Navigation rules
- Breadcrumbs only on nested detail views (e.g. transaction detail drawer).
- No more than **7** primary nav items. Ever.
- Never nest navigation more than 2 levels deep.
- `Esc` closes any drawer/modal. Focus is trapped inside modals.
- All interactive elements reachable by keyboard, visible focus ring.

---

## 6. TECHNICAL REQUIREMENTS

### 6.1 Stack (locked — do not substitute without approval)
| Layer | Choice |
|---|---|
| Framework | **React 18** (function components + hooks only) |
| Language | **TypeScript** — `strict: true`, no `any` |
| Build tool | **Vite** |
| Routing | **React Router v6** |
| Styling | **Tailwind CSS v3** + CSS variables for design tokens |
| Components | Custom, headless-first (Radix primitives allowed) |
| Charts | **Recharts** |
| Icons | **lucide-react** |
| State | **Zustand** + `persist` middleware (localStorage) |
| Forms | **react-hook-form** + **Zod** |
| Dates | **date-fns** |
| Currency | `Intl.NumberFormat` (no external lib) |
| Testing | **Vitest** + **React Testing Library** |
| Lint/Format | **ESLint** + **Prettier** |
| Package manager | **pnpm** |

### 6.2 Architecture

src/
├── app/ # App shell, router, providers
├── components/
│ ├── ui/ # Button, Card, Modal, Input, Badge, Tooltip…
│ ├── layout/ # Sidebar, TopBar, PageHeader, Shell
│ ├── charts/ # Chart wrappers (Recharts)
│ └── features/ # Feature-scoped components
│ ├── transactions/
│ ├── budget/
│ ├── goals/
│ ├── cards/
│ └── analytics/
├── pages/ # One folder per route
├── store/ # Zustand slices
├── hooks/ # Reusable hooks
├── lib/ # formatters, calculations, storage, utils
├── types/ # Shared TS types
├── constants/ # categories, currencies, config
└── styles/ # globals.css, tokens.css


**Rules:**
- Feature-first organization, not type-first.
- No component file > **250 lines**. Split it.
- No function > **40 lines** without justification.
- Every component gets its own folder if it has > 1 file
  (`Component.tsx`, `Component.test.tsx`, `index.ts`).
- Barrel exports (`index.ts`) at feature boundaries only — not deep imports.

### 6.3 Data model (localStorage)
```ts
type Transaction = {
  id: string;
  type: 'income' | 'expense';
  amount: number;            // stored in minor units (cents)
  categoryId: string;
  accountId: string;
  note?: string;
  date: string;              // ISO 8601
  createdAt: string;
  updatedAt: string;
};

type Category = { id: string; name: string; icon: string; color: string; type: 'income' | 'expense' | 'both'; };

type Budget = { id: string; categoryId: string; limit: number; period: 'monthly'; month: string; /* YYYY-MM */ };

type Goal = { id: string; name: string; target: number; current: number; deadline?: string; color: string; contributions: Contribution[]; };

type Card = { id: string; label: string; type: 'debit' | 'credit'; last4: string; balance: number; limit?: number; expiry: string; frozen: boolean; };

type Settings = { currency: string; locale: string; dateFormat: string; accent: string; firstDayOfMonth: number; };

Storage rules:

Single namespaced key root: vmsolutionss.finance.v1.*

Every store includes a schemaVersion field.

Write a migration function for every version bump.

All money math in integer minor units (cents). Never float arithmetic.

Seed with clearly-labeled demo data on first run; a one-click "Clear all
data" exists in Settings.

6.4 Quality gates
Zero TypeScript errors. Zero ESLint warnings.

All derived values (totals, percentages, savings rate) computed via
useMemo or selectors — never recalculated on every render.

Guard against divide-by-zero in every percentage calculation.

Handle: empty state, loading state, error state, and very long strings
for every list, table, and card.

Responsive from 360px → 1920px. No horizontal scroll on any page.

Accessibility: WCAG 2.1 AA minimum — semantic HTML, ARIA where needed,
contrast ≥ 4.5:1, keyboard-operable, prefers-reduced-motion respected.

6.5 Performance
Route-level code splitting.

Memoize expensive chart data transforms.

Lists > 100 items: virtualize or paginate.

No layout shift on load — use skeletons with fixed dimensions.

7. DESIGN SYSTEM COMPLIANCE
You must read and follow brandGuidelines.md on every task.
Summary of hard requirements:

Brand name is VM Solutionss — two "s" at the end, always.

Dark blue theme. Minimalistic. Consistent color semantics.

Primary + Secondary button variants defined in the guidelines — use them,
do not invent new button styles.

Generous whitespace, 1px subtle borders, restrained shadows.

No gradients-for-the-sake-of-gradients, no neon, no glassmorphism overload.

If a visual decision is not covered in brandGuidelines.md, ask — do not
improvise a new pattern.

8. CODING STANDARDS
Senior-level code. Self-documenting names. No comments explaining what;
comments only for why.

Pure functions for all calculations, in lib/.

No business logic inside JSX.

No inline styles except for dynamic values that Tailwind can't express
(use CSS variables).

Props typed with explicit interfaces. No React.FC.

const over let. Early returns over nested if.

Named exports (except page components, which may be default for lazy loading).

Every custom hook starts with use and returns a stable shape.

Error boundaries at route level.

No console.log in committed code.

9. TESTING REQUIREMENTS
Unit tests for every function in lib/ (calculations, formatters,
migrations).

Component tests for: Button, Modal, TransactionForm, BudgetProgress,
GoalCard, and the Dashboard metric cards.

Every store action has a test covering the happy path + one edge case.

Target: ≥ 80% coverage on lib/ and store/.

10. WORKFLOW — ASK, THEN BUILD
This is mandatory. Do not skip.

10.1 Before writing any code
Ask clarifying questions. Minimum set if unanswered:

Which page/feature are we working on right now?

Is this a new build, a refactor, or a bug fix?

Any constraints not in gemini.md or brandGuidelines.md?

Does this change touch the data model or storage schema?

What does "done" look like for this task?

Do not proceed on assumptions for anything that affects data shape,
routing, or the design system.

10.2 During implementation
Work in small, reviewable increments — one component or one feature
slice at a time.

After each increment, state what changed and what's next.

If you hit an ambiguity, stop and ask rather than guessing.

10.3 Before declaring anything complete
Run the full review checklist in Section 11.

11. PRE-PUBLISH REVIEW CHECKLIST
Run this every single time before saying a task is done. Report results
explicitly — do not silently pass.

Build & Types
□ pnpm build succeeds
□ pnpm tsc --noEmit — zero errors
□ pnpm lint — zero errors, zero warnings
□ pnpm test — all green
Functionality
□ Feature works on first load with empty data
□ Feature works with seeded demo data
□ Feature works after a hard refresh (persistence verified)
□ Add / edit / delete round-trips correctly
□ Totals and percentages match manual calculation
Edge Cases
□ Zero and negative values handled
□ Division by zero guarded
□ Very large numbers don't break layout
□ Long category/goal names truncate gracefully
□ Invalid dates rejected
□ localStorage unavailable / quota exceeded handled
UI/UX
□ Matches brandGuidelines.md — colors, type, spacing, buttons
□ Responsive at 360 / 768 / 1024 / 1440 / 1920
□ Keyboard navigable, focus visible
□ Contrast passes AA
□ Empty, loading, and error states present
□ No console errors or warnings
Brand
□ "VM Solutionss" spelled correctly everywhere (two s's)
□ No "VM Solutions" with a single s anywhere in copy or code
Two-pass rule: complete the checklist, fix issues, then run it again
from the top. Only after a clean second pass may you report completion.

### What I built
<short summary>

### Files changed
- path/to/file.tsx — what and why

### Decisions & assumptions
- …

### Review checklist
<pass/fail per section, with notes on anything fixed>

### Open questions
- …
Keep it concise. No filler. No restating the request back at length.

13. DEFINITION OF DONE
A task is done when:
1. It meets the requirement, not a close approximation of it.
2. It complies with brandGuidelines.md.
3. It passes the Section 11 checklist twice.
4. No open questions remain unanswered.
5. It is committed with a clear, conventional commit message.