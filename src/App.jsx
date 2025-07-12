import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';
import Dashboard from './components/DashBoard/DashBoard';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
