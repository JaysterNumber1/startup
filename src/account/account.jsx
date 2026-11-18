import React, { useEffect, useState } from 'react';
import { deleteAccount, getRecentGames } from '../auth';

export function Account({ user, onUserChange, authLoading }) {
    const [gamePieceStyle, setGamePieceStyle] = useState('cartoony');
    const [quote, setQuote] = useState(null);
    const [quoteError, setQuoteError] = useState('');
    const [recentGames, setRecentGames] = useState([]);
    const [gamesLoading, setGamesLoading] = useState(true);
    const [gamesError, setGamesError] = useState('');
    const [deleteError, setDeleteError] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let isMounted = true;

        if (authLoading) {
            return () => {
                isMounted = false;
            };
        }

        if (!user) {
            setRecentGames([]);
            setGamesLoading(false);
            return () => {
                isMounted = false;
            };
        }

        setGamesLoading(true);
        setGamesError('');
        getRecentGames()
            .then((games) => {
                if (!Array.isArray(games)) {
                    throw new Error('Game history returned invalid data');
                }
                if (isMounted) {
                    setRecentGames(games);
                }
            })
            .catch((error) => {
                if (isMounted) {
                    setGamesError(error.message);
                }
            })
            .finally(() => {
                if (isMounted) {
                    setGamesLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [user, authLoading]);

    useEffect(() => {
        const controller = new AbortController();

        async function loadQuote() {
            try {
                const response = await fetch('/api/quote', { signal: controller.signal });
                if (!response.ok) {
                    throw new Error(`Quote request failed (${response.status})`);
                }

                const result = await response.json();
                if (typeof result.quote !== 'string' || typeof result.character !== 'string') {
                    throw new Error('Quote service returned invalid data');
                }

                setQuote(result);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Unable to load an anime quote:', error);
                    setQuoteError('Unable to load a quote right now. Please try again later.');
                }
            }
        }

        loadQuote();
        return () => controller.abort();
    }, []);

    const handleGamePieceStyleChange = (event) => {
        setGamePieceStyle(event.target.value);
        window.alert('Your game piece style preference has been updated!');
    };

    async function handleDeleteAccount() {
        if (!window.confirm('Are you sure you want to delete your account?')) {
            return;
        }

        if (!window.confirm('This permanently deletes your account. This cannot be undone. Continue?')) {
            return;
        }

        setDeleteError('');
        setIsDeleting(true);
        try {
            await deleteAccount();
            onUserChange(null);
        } catch (error) {
            setDeleteError(error.message);
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <main className="container py-5">
            <section id="account-info">
                <h2>
                    Account Information
                </h2>
                <h3>
                    {authLoading
                        ? 'Loading account...'
                        : `Email: ${user?.email ?? 'Not signed in'}`}
                </h3>
                <button id="pass-change">Change Password?</button>
                {!authLoading && user && (
                    <div className="mt-3">
                        <button
                            className="btn btn-danger"
                            onClick={handleDeleteAccount}
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Deleting account...' : 'Delete Account'}
                        </button>
                        {deleteError && <p className="mt-2" role="alert">{deleteError}</p>}
                    </div>
                )}
            </section>

            <section id="customize-cosmetic">
                <h3>Customize Game</h3>
                <label htmlFor="game-piece-style">Select game pieces:</label>

                <select
                    id="game-piece-style"
                    name="selected-game-pieces"
                    value={gamePieceStyle}
                    onChange={handleGamePieceStyleChange}
                >
                    <option value="cartoony">Cartoony</option>
                    <option value="english-names">English Names</option>
                    <option value="japanese-kanji">Japanese Kanji</option>
                </select>
            </section>


            <section id="match-history">
                <h3>Recent Games</h3>
                {authLoading || gamesLoading ? (
                    <p aria-live="polite">Loading games...</p>
                ) : !user ? (
                    <p>Sign in to see your game history.</p>
                ) : gamesError ? (
                    <p role="alert">Unable to load games: {gamesError}</p>
                ) : recentGames.length === 0 ? (
                    <p>No games have been recorded yet.</p>
                ) : (
                    <ol>
                        {recentGames.map((game, index) => {
                            const playedAt = new Date(game.playedAt);
                            const validDate = !Number.isNaN(playedAt.getTime());

                            return (
                                <li key={game._id ?? `${game.playedAt}-${index}`}>
                                    <article className="match">
                                        <p>Opponent: {game.opponent}</p>
                                        <p>
                                            Result: {game.winner === user.email ? 'You won' : 'You lost'}
                                        </p>
                                        <p>
                                            Played:{' '}
                                            {validDate
                                                ? playedAt.toLocaleString()
                                                : 'Date unavailable'}
                                        </p>
                                    </article>
                                </li>
                            );
                        })}
                    </ol>
                )}
            </section>

            <section id="anime-api">
                <h3>Random Anime Quote</h3>

                <div id="quote-container">
                    {quoteError ? (
                        <p role="alert">{quoteError}</p>
                    ) : quote ? (
                        <p id="quote">
                            "{quote.quote}" — {quote.character}
                            {quote.anime && ` (${quote.anime})`}
                        </p>
                    ) : (
                        <p aria-live="polite">Loading quote...</p>
                    )}
                </div>

            </section>


        </main>

    );
}