# Commercial Management System - Workflow Diagram

## 🔄 Complete Application Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           COMMERCIAL SYSTEM                                 │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│    ADMIN    │    │   PARTNER   │    │  CUSTOMER   │
│             │    │             │    │             │
│ Full Access │    │ Edit Access │    │ Read Access │
└──────┬──────┘    └──────┬──────┘    └──────┬──────┘
       │                  │                  │
       └──────────────────┼──────────────────┘
                          │
                    ┌─────▼─────┐
                    │   LOGIN   │
                    │  SYSTEM   │
                    └─────┬─────┘
                          │
                    ┌─────▼─────┐
                    │ DASHBOARD │
                    │           │
                    │ • Stats   │
                    │ • Recent  │
                    │ • Overview│
                    └─────┬─────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
   ┌────▼────┐      ┌─────▼─────┐     ┌────▼────┐
   │ CREATE  │      │   VIEW    │     │ MANAGE  │
   │ PROJECT │      │ PROJECTS  │     │ SYSTEM  │
   └────┬────┘      └─────┬─────┘     └────┬────┘
        │                 │                │
        │           ┌─────▼─────┐          │
        │           │  SUMMARY  │          │
        │           │  MODULE   │          │
        │           │           │          │
        │           │ • Customer│          │
        │           │ • Partner │          │
        │           │ • Opp ID  │          │
        │           │ • Status  │          │
        │           └─────┬─────┘          │
        │                 │                │
        └─────────────────┼────────────────┘
                          │
              ┌───────────▼───────────┐
              │    PROJECT CREATED    │
              │   (Available in all   │
              │      modules)         │
              └───────────┬───────────┘
                          │
    ┌─────────────────────┼─────────────────────┐
    │                     │                     │
┌───▼───┐           ┌─────▼─────┐         ┌─────▼─────┐
│ PHASE │           │   PHASE   │         │   PHASE   │
│   1   │           │     2     │         │     3     │
│       │           │           │         │           │
│PRICING│           │INFRASTRUCTURE│      │MANAGEMENT │
└───┬───┘           └─────┬─────┘         └─────┬─────┘
    │                     │                     │
┌───▼───┐           ┌─────▼─────┐         ┌─────▼─────┐
│COMMERCIAL│        │    DC     │         │  QUERIES  │
│         │         │  MODULE   │         │  MODULE   │
│• Items  │         │           │         │           │
│• MRC    │         │• Servers  │         │• Q&A      │
│• OTC    │         │• Specs    │         │• Status   │
│• Totals │         │• Costs    │         │• Priority │
└───┬───┘          └─────┬─────┘         └─────┬─────┘
    │                    │                     │
    │              ┌─────▼─────┐               │
    │              │  DR SITE  │               │
    │              │  MODULE   │               │
    │              │           │               │
    │              │• DR Env   │               │
    │              │• Location │               │
    │              │• RPO/RTO  │               │
    │              └─────┬─────┘               │
    │                    │                     │
    │              ┌─────▼─────┐               │
    │              │  SIZING   │               │
    │              │  MODULE   │               │
    │              │           │               │
    │              │• Capacity │               │
    │              │• Growth   │               │
    │              │• Performance│             │
    │              └─────┬─────┘               │
    │                    │                     │
    └────────────────────┼─────────────────────┘
                         │
                   ┌─────▼─────┐
                   │   RACI    │
                   │  MODULE   │
                   │           │
                   │• Roles    │
                   │• Responsibilities│
                   │• Matrix   │
                   └─────┬─────┘
                         │
                   ┌─────▼─────┐
                   │ DISCOUNT  │
                   │  MODULE   │
                   │           │
                   │• Types    │
                   │• Approval │
                   │• Apply    │
                   └─────┬─────┘
                         │
                   ┌─────▼─────┐
                   │  EXPORT   │
                   │ REPORTS   │
                   │           │
                   │• Excel    │
                   │• PDF      │
                   │• Share    │
                   └───────────┘
```

## 📊 Module Interaction Flow

```
SUMMARY (Master Data)
    │
    ├── Creates Project Context
    │
    ├─→ COMMERCIAL ──→ Calculates Costs ──→ Updates Summary Totals
    │
    ├─→ DC ──────────→ Infrastructure Specs ──→ Feeds into Sizing
    │
    ├─→ DR SITE ─────→ Backup Requirements ──→ Complements DC
    │
    ├─→ SIZING ──────→ Capacity Planning ────→ Validates DC/DR
    │
    ├─→ QUERIES ─────→ Customer Communication ─→ Tracks Issues
    │
    ├─→ RACI ────────→ Responsibility Matrix ──→ Defines Roles
    │
    └─→ DISCOUNT ────→ Pricing Adjustments ───→ Updates Commercial
```

## 🎯 User Journey Examples

### Journey 1: Admin Creating New Project
```
1. Login → Dashboard
2. Navigate to Summary
3. Click "New Project"
4. Fill customer details
5. Save project
6. Go to Commercial
7. Add pricing items
8. Configure DC requirements
9. Set up DR site
10. Define RACI matrix
11. Export final report
```

### Journey 2: Partner Managing Pricing
```
1. Login → Dashboard
2. Select existing project
3. Go to Commercial module
4. Review current items
5. Add new services
6. Update pricing
7. Check auto-calculated totals
8. Export updated pricing
9. Share with customer
```

### Journey 3: Customer Viewing Project
```
1. Login → Dashboard
2. View project overview
3. Check commercial pricing
4. Review infrastructure specs
5. See query responses
6. Check RACI responsibilities
7. Export project summary
```

## 🔄 Data Flow Between Modules

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   SUMMARY   │───▶│ COMMERCIAL  │───▶│   TOTALS    │
│             │    │             │    │             │
│ • Customer  │    │ • Items     │    │ • Total MRC │
│ • Partner   │    │ • MRC/OTC   │    │ • Total OTC │
│ • Opp ID    │    │ • Categories│    │ • Summary   │
└─────────────┘    └─────────────┘    └─────────────┘
        │                  │
        │                  │
        ▼                  ▼
┌─────────────┐    ┌─────────────┐
│INFRASTRUCTURE│    │   REPORTS   │
│             │    │             │
│ • DC Config │    │ • Excel     │
│ • DR Setup  │    │ • PDF       │
│ • Sizing    │    │ • Analytics │
└─────────────┘    └─────────────┘
        │
        ▼
┌─────────────┐
│ MANAGEMENT  │
│             │
│ • Queries   │
│ • RACI      │
│ • Discounts │
└─────────────┘
```

## 🚀 Quick Start Workflow

### For First-Time Users:
```
Step 1: Setup
├── npm run install-all
├── npm run setup
└── npm run dev

Step 2: Login
├── Go to http://localhost:3000
├── Use sample credentials
└── Explore dashboard

Step 3: Create Project
├── Go to Summary module
├── Click "New Project"
├── Fill required details
└── Save project

Step 4: Add Pricing
├── Go to Commercial module
├── Add pricing items
├── Set MRC and OTC values
└── Review totals

Step 5: Export Report
├── Click "Export" button
├── Choose Excel or PDF
└── Download and share
```

## 📱 Navigation Flow

```
Main Navigation (Left Sidebar)
├── Dashboard (Always accessible)
├── Summary (Always accessible)
├── Commercial (Needs project selection)
├── DC (Needs project selection)
├── DR Site (Needs project selection)
├── Sizing (Needs project selection)
├── Queries (Needs project selection)
├── RACI (Needs project selection)
└── Discount (Needs project selection)

Top Navigation
├── Project Context (Shows current project)
├── User Menu
│   ├── Profile (Name and Role)
│   └── Logout
└── Mobile Menu Toggle
```

This workflow diagram provides a visual representation of how users interact with the system and how data flows between different modules. Use this alongside the detailed User Guide for complete understanding of the application.