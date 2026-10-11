# StudentHub — Interactive Favourite Student List

A responsive React + Vite student directory demonstrating React Router, Context API, reusable components, search, filtering, sorting, modal interactions, and favourite management.

## Requirements
- Node.js 18 or newer
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite.

## Production build
```bash
npm run build
npm run preview
```

## Features
- Student directory with sample data
- Search by name, roll number, or department
- Department filtering and sorting
- Add/remove favourite students without duplicates
- Favourite count shared across routes using Context API
- Student profile modal with keyboard Escape support
- Dark/light application-shell toggle
- Responsive navigation and student grid

## Notes
This is a front-end demonstration. Student records are sample data, and favourites are held in React state, so they reset after a full page refresh. No backend or authentication is included.
