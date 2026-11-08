import React from 'react';
import { NavLink } from 'react-router-dom';
import { Authenticated } from '../authenticated';
import { Login } from '../login';

export function Home({ user, onUserChange, authLoading, authError }) {
    return (
        <main className="container py-5">

            <section>
                <h2>Play Shogi Online</h2>
                <p>
                    Shogi Showdown is a place to play shogi online with your friends.
                    Create an account, learn the rules, and challenge your friends
                    to a game of Japanese chess.
                </p>
            </section>

            {authLoading ? (
                <section><p aria-live="polite">Checking sign-in status...</p></section>
            ) : user ? (
                <section>
                    <h2>Account</h2>
                    <Authenticated userName={user.email} onLogout={() => onUserChange(null)} />
                </section>
            ) : (
                <Login onLogin={onUserChange} />
            )}

            {authError && <p role="alert">{authError}</p>}

            <section>
                <h2>Learn to Play</h2>
                <p>
                    New to shogi? Learn how the pieces move, how capturing works,
                    and how to win the game.
                </p>
                <NavLink to="/rules">Learn the Rules</NavLink>
            </section>

            <section>
                <h2>What is Shogi?</h2>
                <p>
                    Shogi is a traditional Japanese strategy board game often
                    described as Japanese chess. Learn more about its origins
                    and history.
                </p>
                <NavLink to="/history">Learn About Shogi's History</NavLink>
            </section>

        </main>
    );
}