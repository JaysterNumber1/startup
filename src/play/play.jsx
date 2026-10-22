import React, { useState, useEffect } from 'react';
import '/src/app.css';

const initialBoard = [
    // Row 0: Gote back row
    [
        { id: 'gote-lance-1', type: '香', promoted: false, player: 'gote' },
        { id: 'gote-knight-1', type: '桂', promoted: false, player: 'gote' },
        { id: 'gote-silver-1', type: '銀', promoted: false, player: 'gote' },
        { id: 'gote-gold-1', type: '金', promoted: false, player: 'gote' },
        { id: 'gote-king', type: '王', promoted: false, player: 'gote' },
        { id: 'gote-gold-2', type: '金', promoted: false, player: 'gote' },
        { id: 'gote-silver-2', type: '銀', promoted: false, player: 'gote' },
        { id: 'gote-knight-2', type: '桂', promoted: false, player: 'gote' },
        { id: 'gote-lance-2', type: '香', promoted: false, player: 'gote' }
    ],
    // Row 1: Gote Rook & Bishop
    [
        null,
        { id: 'gote-rook', type: '飛', promoted: false, player: 'gote' },
        null, null, null, null, null,
        { id: 'gote-bishop', type: '角', promoted: false, player: 'gote' },
        null
    ],
    // Row 2: Gote Pawns 
    Array(9).fill(null).map((_, i) => ({
        id: `gote-pawn-${i + 1}`,
        type: '歩',
        promoted: false,
        player: 'gote'
    })),

    // Rows 3, 4, 5: Empty squares
    Array(9).fill(null),
    Array(9).fill(null),
    Array(9).fill(null),

    // Row 6: Sente Pawns
    Array(9).fill(null).map((_, i) => ({
        id: `sente-pawn-${i + 1}`,
        type: '歩',
        promoted: false,
        player: 'sente'
    })),
    // Row 7: Sente Bishop & Rook
    [
        null,
        { id: 'sente-bishop', type: '角', promoted: false, player: 'sente' },
        null, null, null, null, null,
        { id: 'sente-rook', type: '飛', promoted: false, player: 'sente' },
        null
    ],
    // Row 8: Sente back row
    [
        { id: 'sente-lance-1', type: '香', promoted: false, player: 'sente' },
        { id: 'sente-knight-1', type: '桂', promoted: false, player: 'sente' },
        { id: 'sente-silver-1', type: '銀', promoted: false, player: 'sente' },
        { id: 'sente-gold-1', type: '金', promoted: false, player: 'sente' },
        { id: 'sente-king', type: '玉', promoted: false, player: 'sente' },
        { id: 'sente-gold-2', type: '金', promoted: false, player: 'sente' },
        { id: 'sente-silver-2', type: '銀', promoted: false, player: 'sente' },
        { id: 'sente-knight-2', type: '桂', promoted: false, player: 'sente' },
        { id: 'sente-lance-2', type: '香', promoted: false, player: 'sente' }
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

            const isSenteInZone = movingPiece.player === 'sente' && row <= 2;
            const isGoteInZone = movingPiece.player === 'gote' && row >= 6;
            const promotableTypes = ['歩', '香', '桂', '銀', '飛', '角'];

            if (
                (isSenteInZone || isGoteInZone) &&
                promotableTypes.includes(movingPiece.type) &&
                !movingPiece.promoted
            ) {
                // browser prompt, make custom later.
                const shouldPromote = window.confirm(`Promote ${movingPiece.type}?`);

                if (shouldPromote) {
                    const promotionMap = {
                        '歩': 'と',
                        '香': '杏',
                        '桂': '圭',
                        '銀': '全',
                        '飛': '竜',
                        '角': '馬'
                    };

                    movingPiece.type = promotionMap[movingPiece.type];
                    movingPiece.promoted = true;
                }
            }

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