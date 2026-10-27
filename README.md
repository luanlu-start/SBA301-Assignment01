# FUNewsManagementSystem — Assignment 01

## Overview

React + Vite frontend for the FUNewsManagementSystem administration assignment. This project uses mock authentication and browser `localStorage`; it does not connect to a backend or database.

## Requirements

- Node.js and npm
- Install dependencies with `npm ci`
- Start the development server with `npm run dev`
- Build for production with `npm run build`
- Run the configured linter with `npm run lint`

Vite prints the local URL after `npm run dev` starts.

## Test account

- Admin username: `Admin`
- Admin password: `Admin`
- A sample Staff account is `staff1` / `123`; Staff is not allowed into the Admin area.

Authentication is only a frontend mock. These credentials are not suitable for a real system.

## Assignment scope implemented

- Login, invalid/empty credential feedback, and logout.
- Shared Admin layout with header, logo, and Dashboard / Category / News / Users / Settings navigation.
- Category, News, and User CRUD with search.
- Shared Create/Update dialog per management page and confirmation before deletion.
- News-to-Category and News-to-User display relations; a Category used by News cannot be deleted.
- `localStorage` persistence for mock data and the current session.

## Data and design decisions

| Concern | Current choice | Reason / trade-off |
|---|---|---|
| Navigation | React Router with nested Admin layout | Each management area has a URL and navigation remains within the SPA. |
| Authentication state | `App` initializes from `currentUser` in `localStorage` | Refresh can retain the mock login; logout clears it. |
| Data persistence | `dataService.js` stores mock records in `localStorage` | No backend/database is required; data is limited to this browser. |
| CRUD dialog | Each page reuses one dialog with create/edit mode and selected ID | Avoids duplicating forms while keeping the active record explicit. |
| Search | Keep source arrays unchanged and derive filtered arrays from the keyword | Clearing search restores the full list. |
| Component structure | `App` for routes/auth, `components/Layout` for shared layout, `pages` for screens, `services` for mock data | Keeps route, screen, layout, and storage responsibilities separate. |

Review these choices and be ready to explain or change them during assessment.

## Limitations

- Authentication is mock-only; there is no secure password handling, backend API, database, or production authorization.
- Data is stored in the current browser's `localStorage`; clearing browser storage resets the sample data.
- The logo asset is `public/logo.jpg`. Record its source/prompt if it was AI-generated, as required by the course.

## Verification

- `npm run build` — passed in the current workspace.
- `npm run lint` — passed in the current workspace.
- Manual UI cases are listed in [TEST_MATRIX.md](./TEST_MATRIX.md). Record actual results and evidence after running them in the browser; they are not marked passed here.

## AI usage record

This support session used AI to compare the existing project with the assignment guide, identify the mismatched seed login, explain the execution flow, and make targeted corrections: seed the required `Admin` / `Admin` account (including migration of the old sample account), avoid storing the password in the current-user session, protect Categories referenced by News, and initialize page state from the existing mock data service. The project was checked with build and lint commands. The student should review these changes, perform the manual test matrix, and update this record if further AI assistance is used.
