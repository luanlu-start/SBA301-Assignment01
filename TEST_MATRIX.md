# Assignment 01 — Manual Test Matrix

Run these checks in the browser using temporary/sample data. Mark the result and attach screenshots or notes where the course asks for evidence. Rows are intentionally left unverified until a person performs the UI action.

| # | Group | Case / action | Expected result | Actual / Pass? |
|---:|---|---|---|---|
| 1 | Login | Submit with username and password empty | Stay on Login and show validation feedback | ☐ Pass ☐ Fail |
| 2 | Login | Submit an incorrect username or password | Do not enter Admin area; show an error | ☐ Pass ☐ Fail |
| 3 | Login | Login with `Admin` / `Admin` | Open Admin area | ☐ Pass ☐ Fail |
| 4 | Auth | Logout after login | Return to Login; current session is cleared | ☐ Pass ☐ Fail |
| 5 | Layout | Inspect the menu | Dashboard, Category, News, Users, Settings are present | ☐ Pass ☐ Fail |
| 6 | Navigation | Click each menu item | Correct screen appears without a full-page reload | ☐ Pass ☐ Fail |
| 7 | Category | Open Category Management | Existing categories render; empty state works if none | ☐ Pass ☐ Fail |
| 8 | Category | Create with a non-empty name | New category appears in the list | ☐ Pass ☐ Fail |
| 9 | Category | Create with an empty name | No record is added; feedback appears | ☐ Pass ☐ Fail |
| 10 | Category | Edit a category and save | Only the selected category is updated | ☐ Pass ☐ Fail |
| 11 | Category | Start delete, then cancel | Category remains | ☐ Pass ☐ Fail |
| 12 | Category | Confirm delete for an unused category | Selected category is removed | ☐ Pass ☐ Fail |
| 13 | Category | Search for an existing name | Matching category is shown | ☐ Pass ☐ Fail |
| 14 | Category | Search for a missing name | No-result state is shown | ☐ Pass ☐ Fail |
| 15 | News | Open News Management | Existing news render with category and author labels | ☐ Pass ☐ Fail |
| 16 | News | Create with valid title and category | New news appears and references an existing category | ☐ Pass ☐ Fail |
| 17 | News | Create without title or category | No record is added; feedback appears | ☐ Pass ☐ Fail |
| 18 | News | Edit a news item and save | Only the selected news item is updated | ☐ Pass ☐ Fail |
| 19 | News | Start delete, then cancel | News item remains | ☐ Pass ☐ Fail |
| 20 | News | Confirm delete | Selected news item is removed | ☐ Pass ☐ Fail |
| 21 | News | Search for an existing title | Matching news is shown | ☐ Pass ☐ Fail |
| 22 | News | Search for a missing title | No-result state is shown | ☐ Pass ☐ Fail |
| 23 | Users | Open User Management | Existing accounts render with role/status labels | ☐ Pass ☐ Fail |
| 24 | Users | Create with valid username/password | New user appears in the list | ☐ Pass ☐ Fail |
| 25 | Users | Create with missing username/password | No record is added; feedback appears | ☐ Pass ☐ Fail |
| 26 | Users | Edit a user and save | Only the selected user is updated | ☐ Pass ☐ Fail |
| 27 | Users | Start delete, then cancel | User remains | ☐ Pass ☐ Fail |
| 28 | Users | Confirm delete for another user | Selected user is removed | ☐ Pass ☐ Fail |
| 29 | Users | Search for an existing username | Matching user is shown | ☐ Pass ☐ Fail |
| 30 | Users | Search for a missing username | No-result state is shown | ☐ Pass ☐ Fail |
| 31 | Relation | Create/update News and choose a Category | Stored `categoryId` points to an existing Category | ☐ Pass ☐ Fail |
| 32 | Role | Inspect users with role 1 and 2 | Labels show Admin and Staff | ☐ Pass ☐ Fail |
| 33 | Status | Inspect records with status 1 and 0 | Labels show Active and Inactive | ☐ Pass ☐ Fail |
| 34 | Empty state | Test an empty list | Page does not crash and shows an empty/no-result message | ☐ Pass ☐ Fail |
| 35 | Persistence | Reload after a data change and login | Mock data/session behavior matches the documented localStorage design | ☐ Pass ☐ Fail |

## Build checks

| Check | Result |
|---|---|
| `npm run build` | Passed in the current workspace |
| `npm run lint` | Passed in the current workspace |
