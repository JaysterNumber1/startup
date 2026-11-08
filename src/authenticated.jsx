import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import './authenticated.css';
import { logout } from './auth';

export function Authenticated({ userName, onLogout }) {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    async function handleLogout() {
        setIsSubmitting(true);
        setError('');

        try {
            await logout();
            onLogout();
        } catch (requestError) {
            setError(requestError.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="authenticated">
            <div className="playerName">Signed in as {userName}</div>
            <Button variant="primary" onClick={() => navigate('/play')}>
                Play
            </Button>
            <Button variant="secondary" onClick={handleLogout} disabled={isSubmitting}>
                {isSubmitting ? 'Signing out...' : 'Logout'}
            </Button>
            {error && <p role="alert">{error}</p>}
        </div>
    );
}
