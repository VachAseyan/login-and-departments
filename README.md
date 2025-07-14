# Login and Departments

A React-based web application for user authentication and department management. Users can sign in, reset their password, and manage departments (add, edit, delete, filter, and search) in a dashboard. The app uses Ant Design for UI components and localStorage for data persistence.

## Features
- **User Authentication**: Sign in, password reset, and protected routes. **Demo login:** `aseyanvache39@gmail.com` / `Triosoft2025@` (all login and password fields are validated).
- **Department Management**: Add, edit, delete, and filter departments.
- **Search & Filter**: Advanced search and filtering for departments by name, description, head, and status.
- **Responsive UI**: Built with Ant Design and custom CSS.
- **Local Storage**: All data is persisted in the browser's localStorage.

## Mock Back-End API Requirement
To fully achieve the functionality depicted in the Figma design, a Back-End API is required. In this project, a mock API is simulated using the browser's localStorage. For production or integration with a real server, replace the mock logic with actual API calls to a back-end service.

## Demo Credentials
- **Email:** `aseyanvache39@gmail.com`
- **Password:** `Triosoft2025@`
- All login and password fields are validated for format and security requirements.

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd login-and-departments
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` by default.

## Scripts
- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm run preview` — Preview the production build
- `npm run lint` — Lint the codebase

## Folder Structure
```
login-and-departments/
├── public/                # Static assets
├── src/
│   ├── assets/            # Images and other assets
│   ├── components/        # React components
│   │   ├── DashBoard/     # Dashboard UI and logic
│   │   ├── DepartmentModal/ # Modal for department CRUD
│   │   ├── LoginForm/     # Login form UI
│   │   ├── SignIn/        # Sign-in and password reset logic
│   │   ├── PrivateRoute/  # Route protection
│   │   ├── ResetEmailForm/    # Email reset form
│   │   ├── ResetPasswordForm/ # Password reset form
│   │   └── SuccessMessage/    # Success feedback
│   ├── reducer/           # State management (departmentReducer.js)
│   ├── App.jsx            # Main app component and routing
│   ├── main.jsx           # App entry point
│   └── index.css          # Global styles
├── index.html             # HTML entry point
├── package.json           # Project metadata and scripts
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

## Dependencies
- [React](https://react.dev/)
- [Ant Design](https://ant.design/)
- [Vite](https://vitejs.dev/)

## License
This project is for educational/demo purposes.
