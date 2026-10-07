## 📄 `brandGuidelines.md`

```markdown
# VM Solutionss — Brand & Engineering Guidelines

**Version:** 1.0.0
**Applies to:** Personal Finance Dashboard (and all VM Solutionss frontend work)
**Status:** Binding — read before writing any code or copy

---

## 1. BRAND NAME

### 1.1 Correct spelling
The brand is **VM Solutionss**.

> **Always two "s" at the end.** Never one.

### 1.2 Acceptable usage
| Form | Allowed |
|---|---|
| `VM Solutionss` |  Standard / default |
| `VM SOLUTIONSS` |  All-caps contexts (logo lockups, headings set in caps) |

### 1.3 Unacceptable usage
| Form | Why |
|---|---|
| `VM Solutions` | Single s |
| `Vm Solutionss` |  Lowercase m |
| `vm solutionss` |  All lowercase |
| `VMSolutions` |  Missing space |
| `VM Solution` |  Missing s and wrong word |
| `VM Solutionss Inc.` |  No legal suffix unless approved |

### 1.4 Enforcement
- Grep for `VM Solutions\b` (single-s) before every publish. Zero matches allowed.
- Applies to: UI copy, page titles, footers, meta tags, code comments,
  commit messages, README files, test names, and alt text.

---

## 2. LOGO

### 2.1 Variants
| Variant | Use case |
|---|---|
| Primary (horizontal lockup) | Sidebar header, top-left, default |
| Stacked (mark over wordmark) | Square/compact spaces, mobile splash |
| Mark only (monogram) | Collapsed sidebar, favicon, app icon |
| Mono light | On dark blue backgrounds |
| Mono dark | On light backgrounds (rare — we are dark-first) |

### 2.2 Clear space
Minimum clear space on all sides = **height of the "V"** in the wordmark.
Nothing — text, icons, borders, container edges — may enter this zone.

┌─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐
│ ↕ V-height │
│ ┌───────────────┐ │
←V→ │ │ VM Solutionss │ │ ←V→
│ └───────────────┘ │
│ ↕ V-height │
└─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘


### 2.3 Minimum sizes
| Variant | Digital min width |
|---|---|
| Horizontal lockup | 120px |
| Stacked | 72px |
| Mark only | 24px |

Below these sizes, switch to a simpler variant — never scale down further.

### 2.4 Sizing rules
- Scale proportionally. Never stretch, squash, or distort.
- Never rotate.
- Never add drop shadows, glows, outlines, or gradients to the logo.
- Never place the logo on a busy image or a mid-tone background without
  the appropriate mono variant.
- Never re-typeset the wordmark in a different font.

### 2.5 Misuse — hard no
 Recoloring outside the approved palette
 Adding effects or bevels
 Outlining
 Placing inside a shape that crowds clear space
 Animating the logo (except a single, subtle fade-in on app load)

---

## 3. COLOR SYSTEM

**Theme: dark blue, minimalistic, high-clarity.** Every color has one job.

### 3.1 Core surfaces (dark blue base)
| Token | Hex | Usage |
|---|---|---|
| `--bg-base` | `#0A0F1C` | App background, deepest layer |
| `--bg-surface` | `#0F172A` | Cards, panels, sidebar |
| `--bg-elevated` | `#16203A` | Modals, dropdowns, popovers |
| `--bg-hover` | `#1B2744` | Row/button hover states |
| `--border-subtle` | `#1E2A47` | 1px dividers, card borders |
| `--border-strong` | `#2A3A5F` | Focused inputs, active borders |

### 3.2 Brand
| Token | Hex | Usage |
|---|---|---|
| `--primary` | `#3B82F6` | Primary actions, active nav, links |
| `--primary-hover` | `#2563EB` | Hover |
| `--primary-active` | `#1D4ED8` | Pressed |
| `--primary-subtle` | `rgba(59,130,246,0.12)` | Tinted backgrounds, active nav bg |
| `--accent` | `#22D3EE` | Data highlights, chart accents, focus glow |

### 3.3 Semantic (financial meaning — never repurpose)
| Token | Hex | Meaning |
|---|---|---|
| `--income` / `--success` | `#22C55E` | Income, positive delta, goal met |
| `--expense` / `--danger` | `#EF4444` | Expense, negative delta, over budget |
| `--warning` | `#F59E0B` | Approaching limit (≥ 80%) |
| `--info` | `#38BDF8` | Neutral notices |

**Rule:** income is *always* green, expense is *always* red. Consistency beats
aesthetics. Never swap these for visual variety.

### 3.4 Text
| Token | Hex | Usage |
|---|---|---|
| `--text-primary` | `#E6EDF7` | Headings, values, primary copy |
| `--text-secondary` | `#94A3B8` | Labels, descriptions, metadata |
| `--text-muted` | `#64748B` | Placeholders, disabled |
| `--text-inverse` | `#0A0F1C` | Text on light/primary buttons |

### 3.5 Category palette (for charts)
Ordered, distinguishable on dark blue, colorblind-considered:
#3B82F6 #22D3EE #8B5CF6 #EC4899 #F59E0B
#22C55E #14B8A6 #F97316 #6366F1 #84CC16

Cycle in order. Never assign the same color to two categories in one chart.

### 3.6 Rules
- Contrast ratio **≥ 4.5:1** for body text, **≥ 3:1** for large text and UI.
- Never use pure black (`#000`) or pure white (`#FFF`).
- Semantic colors are for meaning, not decoration.
- Charts must remain legible in grayscale — differentiate by shape/label too.

---

## 4. TYPOGRAPHY

**Primary typeface:** `Inter` (fallback: `Plus Jakarta Sans`, then system UI).
Load via `@fontsource/inter` or a self-hosted variable font. No Google Fonts CDN
in production.

| Role | Size | Weight | Line height | Letter spacing |
|---|---|---|---|---|
| Display (balance) | 40px / 2.5rem | 700 | 1.1 | -0.02em |
| H1 (page title) | 28px / 1.75rem | 700 | 1.2 | -0.01em |
| H2 (section) | 20px / 1.25rem | 600 | 1.3 | -0.01em |
| H3 (card title) | 16px / 1rem | 600 | 1.4 | 0 |
| Body | 14px / 0.875rem | 400 | 1.6 | 0 |
| Small / label | 13px / 0.8125rem | 500 | 1.4 | 0.01em |
| Caption / meta | 12px / 0.75rem | 400 | 1.4 | 0.02em |

**Numeric rules (critical for a finance app):**
- All monetary values use `font-variant-numeric: tabular-nums`.
- Right-align currency in tables and lists.
- Never wrap a currency value across lines — use `white-space: nowrap`.
- Negative values: `-$1,200.00` or `($1,200.00)` — pick one, be consistent
  (default: leading minus).
- Always show two decimal places unless the currency convention says otherwise.
- Format via `Intl.NumberFormat(locale, { style: 'currency', currency })`.

**Max line length for prose:** 72 characters.

---

## 5. BUTTONS

Exactly **two** primary variants plus two utility variants. Do not invent more.

### 5.1 Primary button
For the single most important action on a screen. **Max one per view.**
Background: --primary (#3B82F6)
Text: --text-inverse (#0A0F1C) → use white #FFFFFF for AA on #3B82F6
Border: none
Radius: 10px
Padding: 10px 18px (md)
Font: 14px / 600
Height: 40px (md), 36px (sm), 48px (lg)
Shadow: 0 1px 2px rgba(0,0,0,0.3)
Transition: background 150ms ease, transform 100ms ease

| State | Background | Notes |
|---|---|---|
| Default | `#3B82F6` | — |
| Hover | `#2563EB` | — |
| Active | `#1D4ED8` | `scale(0.98)` |
| Focus | `#3B82F6` + `0 0 0 3px rgba(34,211,238,0.35)` | Visible ring, always |
| Disabled | `#1E2A47`, text `#64748B` | `cursor: not-allowed`, no shadow |
| Loading | Default + inline spinner, label dimmed | Disable interaction |

### 5.2 Secondary button
For all supporting actions. This is the **default** for most buttons.

Background: transparent
Text: --text-primary (#E6EDF7)
Border: 1px solid --border-strong (#2A3A5F)
Radius: 10px
Padding: 10px 18px (md)
Font: 14px / 600
Height: 40px (md)

| State | Background | Border |
|---|---|---|
| Default | transparent | `#2A3A5F` |
| Hover | `#1B2744` | `#3A4C77` |
| Active | `#16203A` | `#3A4C77` |
| Focus | transparent + cyan ring | `#22D3EE` |
| Disabled | transparent | `#1E2A47`, text `#64748B` |

### 5.3 Utility variants
| Variant | Usage | Style |
|---|---|---|
| **Ghost** | Icon buttons, table row actions, sidebar toggle | No bg/border; hover → `--bg-hover` |
| **Danger** | Destructive: delete transaction, reset data | `#EF4444` bg / red-subtle bg + red text + red border |

### 5.4 Button rules
- Every button has a visible label **or** an `aria-label` + tooltip.
- Minimum touch target: **44×44px** on mobile, **36×36px** on desktop.
- Icon-only buttons are **ghost** variant by default.
- Destructive actions always require confirmation (modal, not `window.confirm`).
- Never place two primary buttons side by side.
- Never use a button as a link or a link as a button.

---

## 6. SPACING, RADIUS, ELEVATION

### 6.1 Spacing scale (4px base)
4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80

- Component internal padding: **16–20px**
- Card padding: **20–24px**
- Gap between cards: **16px** (mobile) / **24px** (desktop)
- Section spacing: **32–40px**
- Page padding: **16px** (mobile) / **24px** (tablet) / **32px** (desktop)

### 6.2 Radius
--radius-sm: 6px (badges, tags, small inputs)
--radius-md: 10px (buttons, inputs)
--radius-lg: 14px (cards, panels)
--radius-xl: 20px (modals, large containers)
--radius-full: 9999px (pills, avatars)


### 6.3 Elevation
Restrained. Depth comes from borders and background layering, not heavy shadows.
--shadow-sm: 0 1px 2px rgba(0,0,0,0.30)
--shadow-md: 0 4px 12px rgba(0,0,0,0.35)
--shadow-lg: 0 12px 32px rgba(0,0,0,0.45) (modals only)


---

## 7. UI/UX PRINCIPLES

1. **Dark blue, always.** Every screen is dark-first. Light mode is out of scope.
2. **Minimalistic.** One idea per card. Remove anything that doesn't help the
   user decide or act.
3. **Color means something.** Green = income/positive. Red = expense/negative.
   Amber = warning. Blue = action. Never decorative.
4. **Hierarchy through size and weight**, not through color saturation.
5. **Consistent element treatment.** The same element looks the same on every
   page. No one-off styling.
6. **Numbers are the hero.** Big, tabular, aligned, unmissable. Chrome recedes.
7. **Progressive disclosure.** Summary first; detail on click. Drawers and
   modals over new pages.
8. **Feedback for every action.** Toasts, optimistic updates, loading states.
   The user never wonders if something happened.
9. **Empty states teach.** Every empty list/chart explains what to do next and
   offers the action inline.
10. **Motion is functional.** 150–200ms, `ease-out` for enter, `ease-in` for
    exit. Respect `prefers-reduced-motion`.
11. **Accessible by default.** Keyboard, screen reader, contrast, focus rings.
    Not an afterthought.
12. **No dark patterns.** No fake urgency, no hidden fees framing, no confusing
    defaults. This is a finance app — trust is the product.

---

## 8. TECH STACK

| Layer | Technology | Notes |
|---|---|---|
| Framework | React 18 | Function components + hooks only |
| Language | TypeScript | `strict: true`, no `any` |
| Build | Vite | Fast dev, optimized prod build |
| Routing | React Router v6 | Lazy-loaded routes |
| Styling | Tailwind CSS v3 + CSS variables | Tokens in `styles/tokens.css` |
| Primitives | Radix UI (headless) | For modal, dropdown, tooltip, tabs |
| Charts | Recharts | Wrapped in `components/charts/` |
| Icons | lucide-react | 1.5px stroke, 18–20px default |
| State | Zustand + `persist` | localStorage-backed |
| Forms | react-hook-form + Zod | Schema-validated |
| Dates | date-fns | Tree-shakeable |
| Currency | `Intl.NumberFormat` | Native, no lib |
| Testing | Vitest + React Testing Library | ≥ 80% on `lib/` + `store/` |
| Lint/Format | ESLint + Prettier | Zero warnings policy |
| Package manager | pnpm | Lockfile committed |

**No backend. No database. No external API. All data lives in localStorage.**

---

## 9. CODE QUALITY — SENIOR LEVEL

- Clean architecture: `app → pages → features → components/ui → lib`.
- Pure calculation functions in `lib/`, fully unit-tested.
- No business logic in JSX. No `useEffect` for derived state.
- Every component typed with an explicit props interface.
- Every async/edge path handled: empty, loading, error, success.
- No premature abstraction — but no copy-paste duplication either.
- Conventional commits: `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`, `test:`.
- No commented-out code in `main`. Ever.

---

## 10. REVIEW & APPROVAL PROCESS

**Nothing ships without review. No exceptions.**

### 10.1 Constant review
- Every increment is reviewed before the next one begins.
- AI states what changed, why, and what was verified — every time.
- No "I'll fix it later." Fix it now or flag it explicitly.

### 10.2 Question-first protocol
Before coding anything non-trivial, the AI must ask and receive answers on:
1. Scope — which page/feature, and what's explicitly out of scope?
2. Data — does this touch the storage schema or data model?
3. Design — is there an existing pattern in these guidelines, or do we need
   a new one approved first?
4. Success criteria — what does "done" look like?
5. Risks — what could break, and what's the rollback?

**Never assume. Ask.**

### 10.3 Multiple checks before approval
Every deliverable passes this sequence:

**Pass 1 — Build**
`pnpm lint` · `pnpm tsc --noEmit` · `pnpm test` · `pnpm build`

**Pass 2 — Function**
Feature works empty → works seeded → works after refresh → totals verified
by hand → CRUD round-trips → edge cases (0, negative, huge, long strings)

**Pass 3 — Brand**
Colors match tokens · typography matches scale · buttons use approved variants ·
spacing consistent · "VM Solutionss" spelled correctly (two s's) · no
single-s `VM Solutions` anywhere

**Pass 4 — UX & A11y**
Responsive 360→1920 · keyboard operable · focus visible · contrast AA ·
empty/loading/error states · no console errors · reduced-motion respected

**Pass 5 — Regression**
Previously working features still work · no store schema breakage · no
orphaned code · bundle size within budget

> **Rule:** Passes 1–5 are run, issues are fixed, then **the entire sequence is
> run again from Pass 1**. Only a clean second run counts as approval.

### 10.4 Approval gate
A change is approved only when:
- [ ] All five passes clean, twice
- [ ] No open questions
- [ ] Brand compliance confirmed
- [ ] Reviewer sign-off recorded

If any box is unchecked, the change is **not** approved. No partial credit.

---

## 11. VOICE & TONE

| Attribute | We are | We are not |
|---|---|---|
| **Professional** | Clear, trustworthy, knowledgeable | Stiff, corporate, cold |
| **Approachable** | Friendly, helpful, not overly formal | Casual, gimmicky, jokey |
| **Concise** | Direct, low jargon, easy to understand | Verbose, technical for its own sake |

### Copy rules
- Plain language. "Spending limit" not "budgetary threshold allocation."
- Active voice. "Add transaction" not "Transaction can be added."
- Sentence case for UI labels. Title Case only for page titles and proper nouns.
- Numbers as numerals: "3 transactions," not "three transactions."
- Currency always formatted and localized.
- Error messages: say what happened **and** what to do next.
   "Couldn't save the transaction. Check that the amount is greater than zero."
   "Error 422."
- Never blame the user. Never use "invalid" alone.

---

## 12. QUICK REFERENCE
Brand: VM Solutionss (two s's — always)
Base bg: #0A0F1C
Surface: #0F172A
Primary: #3B82F6
Accent: #22D3EE
Income: #22C55E
Expense: #EF4444
Warning: #F59E0B
Text: #E6EDF7 / #94A3B8 / #64748B
Font: Inter, tabular-nums for money
Radius: 10px buttons · 14px cards · 20px modals
Buttons: Primary (filled blue) · Secondary (outlined) · Ghost · Danger
Theme: Dark blue, minimalistic, consistent
Review: 5 passes × 2 runs before approval
Rule: Ask first. Build second. Verify always.


---

*End of brandGuidelines.md — VM Solutionss*