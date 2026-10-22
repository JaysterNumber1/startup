import React, { useState, useEffect } from 'react';
import '/src/app.css';

const initialBoard = [
    // Row 0: Opponent (Gote) back row
    [
        { type: '香', player: 'gote' },
        { type: '桂', player: 'gote' },
        { type: '銀', player: 'gote' },
        { type: '金', player: 'gote' },
        { type: '王', player: 'gote' },
        { type: '金', player: 'gote' },
        { type: '銀', player: 'gote' },
        { type: '桂', player: 'gote' },
        { type: '香', player: 'gote' }
    ],
    // Row 1
    [
        null,
        { type: '飛', player: 'gote' },
        null, null, null, null, null,
        { type: '角', player: 'gote' },
        null
    ],
    // Row 2: Opponent Pawns
    Array(9).fill({ type: '歩', player: 'gote' }),

    // Rows 3, 4, 5: Empty squares
    Array(9).fill(null),
    Array(9).fill(null),
    Array(9).fill(null),

    // Row 6: Your (Sente) Pawns
    Array(9).fill({ type: '歩', player: 'sente' }),
    // Row 7
    [
        null,
        { type: '角', player: 'sente' },
        null, null, null, null, null,
        { type: '飛', player: 'sente' },
        null
    ],
    // Row 8: Your (Sente) back row
    [
        { type: '香', player: 'sente' },
        { type: '桂', player: 'sente' },
        { type: '銀', player: 'sente' },
        { type: '金', player: 'sente' },
        { type: '玉', player: 'sente' },
        { type: '金', player: 'sente' },
        { type: '銀', player: 'sente' },
        { type: '桂', player: 'sente' },
        { type: '香', player: 'sente' }
    ]
];

export function Play() {
    const [board, setBoard] = useState(initialBoard);
    const [selectedSquare, setSelectedSquare] = useState(null);

    const handleSquareClick = (row, col) => {
        if (!selectedSquare) {
            if (board[row][col] !== null) {
                setSelectedSquare({ row, col });
            }
        } else {
            const newBoard = board.map((r) => [...r]);
            const movingPiece = newBoard[selectedSquare.row][selectedSquare.col];

            newBoard[selectedSquare.row][selectedSquare.col] = null;
            newBoard[row][col] = movingPiece;

            setBoard(newBoard);
            setSelectedSquare(null);
        }
    };

    return (
        <main className="container py-5">
            <section id="play-area">
                <h2>Play Shogi</h2>

                <section id="player-info" className="play-area-sub-section">
                    <div id="opponent">
                        <h3>Opponent</h3>
                        <p>Username: OpponentName</p>
                        <p>Record: 12 W - 8 L</p>
                    </div>

                    <div id="player">
                        <h3>You</h3>
                        <p>Username: YourUsername</p>
                        <p>Record: 15 W - 99 L</p>
                    </div>
                </section>

                <section id="board-section" className="play-area-sub-section">
                    <h3>Board - WebSocket to keep playing!</h3>

                    <table className="shogi-board">
                        <tbody>
                            {board.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, colIndex) => {
                                        const isSelected =
                                            selectedSquare?.row === rowIndex &&
                                            selectedSquare?.col === colIndex;

                                        return (
                                            <td key={colIndex}>
                                                <button
                                                    className={isSelected ? 'selected' : ''}
                                                    onClick={() => handleSquareClick(rowIndex, colIndex)}
                                                >
                                                    {cell ? (
                                                        <span
                                                            style={{
                                                                display: 'inline-block',
                                                                transform:
                                                                    cell.player === 'gote'
                                                                        ? 'rotate(180deg)'
                                                                        : 'none'
                                                            }}
                                                        >
                                                            {cell.type}
                                                        </span>
                                                    ) : (
                                                        ''
                                                    )}
                                                </button>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <section id="game-chat" className="play-area-sub-section">
                    <div id="live-chat">
                        <h3>Game Chat - One of the WebSocket uses!</h3>
                        <p>You: Man, that was a terrible move!</p>
                        <p>Opponent: Why did you do that?</p>
                        <p>You: I'm thinking about playing...</p>
                    </div>
                </section>

                <section id="game-status" className="play-area-sub-section">
                    <div id="timer">
                        <h3>Timer</h3>
                        <p>You: 09:58</p>
                        <p>Opponent: 09:42</p>
                    </div>

                    <div id="last-move">
                        <h3>Last Move</h3>
                        <p>▲ P-7f</p>
                    </div>

                    <div id="turn">
                        <h3>Turn:</h3>
                        <p>Your Turn</p>
                    </div>
                </section>

                <section id="captured-pieces" className="play-area-sub-section">
                    <h3>Captured Pieces</h3>

                    <div id="player-captured">
                        <h4>Your Captured Pieces</h4>
                        <div className="captured-pieces">
                            <div className="shogi-board-piece">
                                <button>歩</button>
                            </div>
                            <div className="shogi-board-piece">
                                <button>銀</button>
                            </div>
                        </div>
                    </div>

                    <div id="opponent-captured">
                        <h4>Opponent's Captured Pieces</h4>
                        <div className="captured-pieces">
                            <div className="shogi-board-piece">
                                <button>歩</button>
                            </div>
                        </div>
                    </div>

                    <p>Select a captured piece to replay it onto the board.</p>
                </section>

                <section id="move-notation" className="play-area-sub-section">
                    <h3>Game History</h3>
                    <ol>
                        <li>☗ 7六歩</li>
                        <li>☖ 3四歩</li>
                        <li>☗ 2六歩</li>
                        <li>☖ 8四歩</li>
                        <li>☗ 2五歩</li>
                        <li>☖ 8五歩</li>
                    </ol>
                </section>
            </section>
        </main>
    );
}