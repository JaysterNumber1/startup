import React from 'react';

export function Rules() {
    return (
        <main className="container py-5">

            <section id="rules-introduction">
                <h2>How to Play Shogi</h2>

                <p>
                    Shogi is a two-player strategy game played on a 9 by 9 board.
                    Each player takes turns moving their pieces across the board.
                    The goal of the game is to checkmate your opponent's king.
                </p>

                <p>
                    Each piece has its own unique movement pattern. Here are three.
                </p>
            </section>


            <section id="pawn">
                <h2>Pawn (歩)</h2>

                <p>
                    The pawn can move one space forward. Unlike chess, shogi pawns
                    cannot move diagonally or capture diagonally.
                </p>
                <table className="shogi-board">
                    <tr>
                        <td><button>　</button></td>
                        <td><button>　</button></td>
                        <td><button>　</button></td>
                        <td><button>　</button></td>
                        <td><button>　</button></td>
                    </tr>
                    <tr>
                        <td><button>　</button></td>
                        <td><button>　</button></td>
                        <td className="shogi-legal-move"><button >　</button></td>
                        <td><button>　</button></td>
                        <td><button>　</button></td>

                    </tr>
                    <tr>

                        <td><button>　</button></td>
                        <td><button>　</button></td>
                        <td className="shogi-selected-piece"><button>歩</button></td>
                        <td><button>　</button></td>
                        <td><button>　</button></td>

                    </tr>
                    <tr>

                        <td><button>　</button></td>
                        <td><button>　</button></td>
                        <td><button>　</button></td>
                        <td><button>　</button></td>
                        <td><button>　</button></td>

                    </tr>
                    <tr>

                        <td><button>　</button></td>
                        <td><button>　</button></td>
                        <td><button>　</button></td>
                        <td><button>　</button></td>
                        <td><button>　</button></td>

                    </tr>
                </table>
                <p>
                    A pawn can only move toward your opponent's side of the board.
                </p>
            </section>


            <section id="rook">
                <h2>Rook (飛)</h2>

                <p>
                    The rook can move any number of spaces horizontally or
                    vertically, as long as there are no pieces blocking its path.
                </p>
                <table className="shogi-board">
                    <tr>
                        <td><button>　</button></td>
                        <td><button>　</button></td>
                        <td className="shogi-legal-move"><button >　</button></td>
                        <td><button>　</button></td>
                        <td><button>　</button></td>
                    </tr>
                    <tr>
                        <td><button>　</button></td>
                        <td><button>　</button></td>
                        <td className="shogi-legal-move"><button >　</button></td>
                        <td><button>　</button></td>
                        <td><button>　</button></td>

                    </tr>
                    <tr>

                        <td className="shogi-legal-move"><button >　</button></td>
                        <td className="shogi-legal-move"><button >　</button></td>
                        <td className="shogi-selected-piece"><button>飛</button></td>
                        <td className="shogi-legal-move"><button >　</button></td>
                        <td className="shogi-legal-move"><button >　</button></td>

                    </tr>
                    <tr>

                        <td><button>　</button></td>
                        <td><button>　</button></td>
                        <td className="shogi-legal-move"><button >　</button></td>
                        <td><button>　</button></td>
                        <td><button>　</button></td>

                    </tr>
                    <tr>

                        <td><button>　</button></td>
                        <td><button>　</button></td>
                        <td className="shogi-legal-move"><button >　</button></td>
                        <td><button>　</button></td>
                        <td><button>　</button></td>

                    </tr>
                </table>
                <p>
                    The rook is a powerful long-range piece and can move across
                    multiple squares in a single turn.
                </p>
            </section>


            <section id="bishop">
                <h2>Bishop (角)</h2>

                <p>
                    The bishop can move any number of spaces diagonally, as long
                    as there are no pieces blocking its path.
                </p>
                <table className="shogi-board">
                    <tr>
                        <td className="shogi-legal-move"><button >　</button></td>
                        <td><button>　</button></td>
                        <td><button>　</button></td>
                        <td><button>　</button></td>
                        <td className="shogi-legal-move"><button >　</button></td>
                    </tr>
                    <tr>
                        <td><button>　</button></td>
                        <td className="shogi-legal-move"><button >　</button></td>
                        <td><button>　</button></td>
                        <td className="shogi-legal-move"><button >　</button></td>
                        <td><button>　</button></td>

                    </tr>
                    <tr>

                        <td><button>　</button></td>
                        <td><button>　</button></td>
                        <td className="shogi-selected-piece"><button>角</button></td>
                        <td><button>　</button></td>
                        <td><button>　</button></td>

                    </tr>
                    <tr>

                        <td><button>　</button></td>
                        <td className="shogi-legal-move"><button >　</button></td>
                        <td><button>　</button></td>
                        <td className="shogi-legal-move"><button >　</button></td>
                        <td><button>　</button></td>

                    </tr>
                    <tr>

                        <td className="shogi-legal-move"><button >　</button></td>
                        <td><button>　</button></td>
                        <td><button>　</button></td>
                        <td><button>　</button></td>
                        <td className="shogi-legal-move"><button >　</button></td>

                    </tr>
                </table>
                <p>
                    Because the bishop moves diagonally, it remains on the same
                    color of square throughout the game unless it is promoted.
                </p>
            </section>


            <section id="more-rules">
                <h2>More Rules Coming Soon</h2>

                <p>
                    More pieces, promotion, capturing, dropping captured pieces,
                    check, and checkmate will be explained here as the rules
                    section is expanded.
                </p>
            </section>
        </main>

    );
}