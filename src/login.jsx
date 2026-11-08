import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { createAccount, login } from './auth';

export function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const user = isCreatingAccount
                ? await createAccount(email, password)
                : await login(email, password);
            setPassword('');
            onLogin(user);
        } catch (requestError) {
            setError(requestError.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section>
            <h2>{isCreatingAccount ? 'Create Account' : 'Log In'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Enter email"
                    />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete={isCreatingAccount ? 'new-password' : 'current-password'}
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Enter password"
                    />
                </div>

                {error && <p role="alert">{error}</p>}

                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting
                        ? 'Please wait...'
                        : isCreatingAccount
                            ? 'Create Account'
                            : 'Log In'}
                </Button>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                        setIsCreatingAccount((creating) => !creating);
                        setError('');
                    }}
                    disabled={isSubmitting}
                >
                    {isCreatingAccount ? 'Already have an account? Log in' : 'Create an account'}
                </Button>
            </form>
        </section>
    );
}
