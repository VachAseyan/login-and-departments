import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        navigate('/');
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Welcome to the Dashboard</h1>
            <p>This is your private dashboard after login.</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Dashboard;
