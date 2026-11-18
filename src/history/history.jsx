import React, { useEffect, useState } from 'react';
import { getRecentGames } from '../auth';

export function History() {
    const [games, setGames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getRecentGames()
            .then(setGames)
            .catch((requestError) => setError(requestError.message))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <main className="container py-5">
            <section>
                <h2>Recent Games</h2>
                {isLoading && <p>Loading games...</p>}
                {error && <p role="alert">{error}</p>}
                {!isLoading && !error && games.length === 0 && (
                    <p>No games have been recorded yet.</p>
                )}
                {!isLoading && !error && games.length > 0 && (
                    <ol>
                        {games.map((game, index) => (
                            <li key={game._id ?? index}>
                                <strong>Game {index + 1}</strong>
                                <dl>
                                    {Object.entries(game).map(([field, value]) => (
                                        <React.Fragment key={field}>
                                            <dt>{field}</dt>
                                            <dd>
                                                {typeof value === 'object' && value !== null
                                                    ? JSON.stringify(value)
                                                    : String(value)}
                                            </dd>
                                        </React.Fragment>
                                    ))}
                                </dl>
                            </li>
                        ))}
                    </ol>
                )}
            </section>

            <section>
                <h2>What is Shogi?</h2>

                <img
                    src="images/PLACEHOLDER-ShogiBoard.jpg"
                    alt="A shogi board with pieces"
                    style={{ width: '50vw', height: 'auto' }}
                />
                <p>
                    Shogi is a traditional Japanese strategy board game that is
                    often described as Japanese chess. Two players compete against
                    each other on a 9 by 9 board, using pieces with different
                    movement abilities to capture the opponent's king.
                </p>

                <p>
                    One of the most unique features of shogi is that captured
                    pieces can be returned to the board and used by the player
                    who captured them. This creates many possible strategies
                    throughout the game.
                </p>
            </section>

            <section>
                <h2>Shogi Through History</h2>

                <img
                    src="images/Samurai-Shogi-CHATGPT.png"
                    alt="AI Generated image of two samurai playing Shogi."
                    style={{ width: '50vw', height: 'auto' }}
                />
                <p>
                    Shogi developed in Japan from earlier forms of chess that
                    traveled through Asia. Over time, the game developed its own
                    unique rules and pieces and became the form of shogi played
                    today.
                </p>
            </section>



        </main>

    );
}