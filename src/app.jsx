import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
    return (
        <main>
            <header className="navbar navbar-expand-lg">
                <div className="container-fluid">

                    <a className="navbar-brand" href="index.html">
                        <h1 id="navbar-brand-text">Shogi Showdown</h1>
                    </a>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#mainNavigation"
                        aria-controls="mainNavigation"
                        aria-expanded="false"
                        aria-label="Toggle navigation">

                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <nav className="collapse navbar-collapse" id="mainNavigation">
                        <ul className="navbar-nav">

                            <li className="nav-item">
                                <a className="btn btn-outline-light" href="index.html">Home</a>
                            </li>

                            <li className="nav-item">
                                <a className="btn btn-outline-light" href="account.html">Account</a>
                            </li>

                            <li className="nav-item">
                                <a className="btn btn-outline-light" href="play.html">Play</a>
                            </li>

                            <li className="nav-item">
                                <a className="btn btn-outline-light" href="rules.html">Rules</a>
                            </li>

                            <li className="nav-item" id="nav-item-last">
                                <a className="btn btn-outline-light" href="history.html">History</a>
                            </li>

                        </ul>
                    </nav>

                </div>
            </header>
            <div className="body bg-dark text-light">App will display here</div>
            <footer>
                <p>
                    Shogi Showdown - 2026 - Made by Jarrett Sorensen
                </p>
                <p>
                    <a href="https://github.com/JaysterNumber1/startup">
                        GitHub Repository
                    </a>
                </p>
            </footer>
        </main>

    );
}