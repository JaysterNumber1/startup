import React from 'react';

export function Account() {
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
                <label for="game-piece-style">Select game pieces:</label>

                <select id="game-piece-style" name="selected-game-pieces">
                    <option value="cartoony">Cartoony</option>
                    <option value="english-names">English Names</option>
                    <option value="japanese-kanji">Japanese Kanji</option>


                </select>
            </section>


            <section id="match-history">
                <h3>
                    Match History - DataBase Access!
                </h3>
                <article className="match">
                    Played S0meb0dyS0metime on 2026-09-18

                    You Won!
                    <button className="view-match">
                        See Match play-by-play?
                    </button>
                </article>

                <article className="match">
                    Played S0meb0dyS0metime on 2026-09-18

                    You Lost!
                    <button className="view-match">
                        See Match play-by-play?
                    </button>
                </article>

                <article className="match">
                    Played S0meb0dyS0metime on 2026-09-17
                    You Drew!
                    <button className="view-match">
                        See Match play-by-play?
                    </button>
                </article>
            </section>

            <section id="anime-api">
                <h3>Random Anime Quote</h3>

                <div id="quote-container">
                    <p id="quote">
                        Funny anime quote will appear here!
                    </p>
                </div>

            </section>


        </main>

    );
}