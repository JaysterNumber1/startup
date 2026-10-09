import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Home } from './home/home';
import { Account } from './account/account';
import { Play } from './play/play';
import { Rules } from './rules/rules';
import { History } from './history/history';

export default function App() {
    return (
        <BrowserRouter>
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
                                    <NavLink className='nav-link' to="">Home</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className='nav-link' to="account">Account</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className='nav-link' to="play">Play</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className='nav-link' to="rules">Rules</NavLink>
                                </li>

                                <li className="nav-item" id="nav-item-last">
                                    <NavLink className='nav-link' to="history">History</NavLink>
                                </li>

                            </ul>
                        </nav>

                    </div>
                </header>

                <Routes>
                    <Route path='/' element={<Home />} exact />
                    <Route path='/account' element={<Account />} />
                    <Route path='/play' element={<Play />} />
                    <Route path='/rules' element={<Rules />} />
                    <Route path='/history' element={<History />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>

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
        </BrowserRouter>

    );
}

function NotFound() {
    return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}