import React, { useEffect, useState } from 'react';
import { deleteAccount } from '../auth';

const mockMatchDatabase = [
    {
        id: 'match-1',
        opponent: 'S0meb0dyS0metime',
        date: '2026-09-18',
        result: 'You Won!',
        moves: ['You: P-7f', 'Opponent: P-3d', 'You: P-2f', 'Opponent: P-8d']
    },
    {
        id: 'match-2',
        opponent: 'S0meb0dyS0metime',
        date: '2026-09-18',
        result: 'You Lost!',
        moves: ['You: P-7f', 'Opponent: P-3d', 'You: S-7g', 'Opponent: R-8b']
    },
    {
        id: 'match-3',
        opponent: 'S0meb0dyS0metime',
        date: '2026-09-17',
        result: 'You Drew!',
        moves: ['You: P-7f', 'Opponent: P-3d', 'You: P-2f', 'Opponent: P-8d']
    }
];

function getMatchFromMockDatabase(matchId) {
    return mockMatchDatabase.find((savedMatch) => savedMatch.id === matchId);
}

function showMatchPlayByPlay(matchId) {
    const match = getMatchFromMockDatabase(matchId);
    if (!match) {
        window.alert('Match not found.');
        return;
    }

    const playByPlay = match.moves.map((move, index) => `${index + 1}. ${move}`).join('\n');
    window.alert(
        `Match vs. ${match.opponent} on ${match.date}\n${match.result}\n\n${playByPlay}`
    );
}

export function Account({ user, onUserChange, authLoading }) {
    const [gamePieceStyle, setGamePieceStyle] = useState('cartoony');
    const [quote, setQuote] = useState(null);
    const [quoteError, setQuoteError] = useState('');
    const [deleteError, setDeleteError] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

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
                <h3>
                    Match History - DataBase Access!
                </h3>
                {mockMatchDatabase.map((match) => (
                    <article className="match" key={match.id}>
                        Played {match.opponent} on {match.date}
                        <p>{match.result}</p>
                        <button
                            className="view-match"
                            onClick={() => showMatchPlayByPlay(match.id)}
                        >
                            See Match play-by-play?
                        </button>
                    </article>
                ))}
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