import React from 'react';
import { NavLink } from 'react-router-dom';

export function Home() {
    return (
        <main class="container py-5">

            <section>
                <h2>Play Shogi Online</h2>
                <p>
                    Shogi Showdown is a place to play shogi online with your friends.
                    Create an account, learn the rules, and challenge your friends
                    to a game of Japanese chess.
                </p>
            </section>

            <section>
                <h2>Login</h2>

                <form action="account.html" method="get">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" required placeholder="Enter Username" />

                    <br />

                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required placeholder="Enter Password" />

                    <br />

                    <button type="submit">Log In</button>
                </form>
            </section>

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