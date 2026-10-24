import React, { useState } from 'react';

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

function getQuote() {
    // This will be replaced with a third-party service call.
    return {
        quote: 'A journey of a thousand miles begins with a single step.',
        character: 'Lao Tzu'
    };
}

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

export function Account() {
    const [gamePieceStyle, setGamePieceStyle] = useState('cartoony');
    const quote = getQuote();

    const handleGamePieceStyleChange = (event) => {
        setGamePieceStyle(event.target.value);
        window.alert('Your game piece style preference has been updated!');
    };

    return (
        <main className="container py-5">
            <section id="account-info">
                <h2>
                    Account Information
                </h2>
                <h3>
                    Username: JaysterNumber1
                </h3>
                <button id="pass-change">Change Password?</button>

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
                    <p id="quote">
                        "{quote.quote}" — {quote.character}
                    </p>
                </div>

            </section>


        </main>

    );
}