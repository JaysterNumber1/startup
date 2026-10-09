import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Home } from './home/home';
import { Account } from './account/account';
import { Play } from './play/play';
import { Rules } from './rules/rules';
import { History } from './history/history';
import { ScrollToTop } from './scrollToTop';

export default function App() {
    const [isNavigationExpanded, setIsNavigationExpanded] = useState(false);

    return (
        <BrowserRouter>

            <div>
                <ScrollToTop />
                <header className="navbar navbar-expand-lg">
                    <div className="container-fluid">

                        <a className="navbar-brand" href="index.html">
                            <h1 id="navbar-brand-text">Shogi Showdown</h1>
                        </a>

                        <button
                            className="navbar-toggler"
                            type="button"
                            aria-controls="mainNavigation"
                            aria-expanded={isNavigationExpanded}
                            aria-label="Toggle navigation"
                            onClick={() => setIsNavigationExpanded((expanded) => !expanded)}>

                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <nav
                            className={`collapse navbar-collapse${isNavigationExpanded ? ' show' : ''}`}
                            id="mainNavigation">
                            <ul className="navbar-nav">

                                <li className="nav-item">
                                    <NavLink className="btn btn-outline-light" to="/">Home</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="btn btn-outline-light" to="/account">Account</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="btn btn-outline-light" to="/play">Play</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="btn btn-outline-light" to="/rules">Rules</NavLink>
                                </li>

                                <li className="nav-item" id="nav-item-last">
                                    <NavLink className="btn btn-outline-light" to="/history">History</NavLink>
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
            </div>
        </BrowserRouter>

    );
}

function NotFound() {
    return (
        <main class="container py-5">

            <section>
                <div className='error-div'>
                    <p className='not-found'>
                        404 - Site not found.
                    </p>
                    <img
                        src="images/Sharaku-404.jpg"
                        alt='Famous Japanese painting "Sharaku"'
                        className='not-found-image'
                    />

                    <img
                        src="images/Sharaku-404.jpg"
                        alt='Famous Japanese painting "Sharaku"'
                        className='not-found-image'
                        style={{ transform: 'scaleX(-1)' }}
                    />

                </div>

            </section>
        </main>
    );
}
