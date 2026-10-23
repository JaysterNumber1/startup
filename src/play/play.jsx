import React, { useState, useEffect } from 'react';
import '/src/app.css';
import { Piece } from './Piece';

const createInitialBoard = () => [
    // Row 0: Gote back row
    [
        new Piece('gote-lance-1', '香', 'gote'),
        new Piece('gote-knight-1', '桂', 'gote'),
        new Piece('gote-silver-1', '銀', 'gote'),
        new Piece('gote-gold-1', '金', 'gote'),
        new Piece('gote-king', '玉', 'gote'),
        new Piece('gote-gold-2', '金', 'gote'),
        new Piece('gote-silver-2', '銀', 'gote'),
        new Piece('gote-knight-2', '桂', 'gote'),
        new Piece('gote-lance-2', '香', 'gote')
    ],
    // Row 1: Gote Rook & Bishop
    [
        null,
        new Piece('gote-rook', '飛', 'gote'),
        null, null, null, null, null,
        new Piece('gote-bishop', '角', 'gote'),
        null
    ],
    // Row 2: Gote Pawns
    Array(9).fill(null).map((_, i) => new Piece(`gote-pawn-${i + 1}`, '歩', 'gote')),

    // Rows 3, 4, 5: Empty squares
    Array(9).fill(null),
    Array(9).fill(null),
    Array(9).fill(null),

    // Row 6: Sente Pawns
    Array(9).fill(null).map((_, i) => new Piece(`sente-pawn-${i + 1}`, '歩', 'sente')),

    // Row 7: Sente Bishop & Rook
    [
        null,
        new Piece('sente-bishop', '角', 'sente'),
        null, null, null, null, null,
        new Piece('sente-rook', '飛', 'sente'),
        null
    ],

    // Row 8: Sente back row
    [
        new Piece('sente-lance-1', '香', 'sente'),
        new Piece('sente-knight-1', '桂', 'sente'),
        new Piece('sente-silver-1', '銀', 'sente'),
        new Piece('sente-gold-1', '金', 'sente'),
        new Piece('sente-king', '王', 'sente'),
        new Piece('sente-gold-2', '金', 'sente'),
        new Piece('sente-silver-2', '銀', 'sente'),
        new Piece('sente-knight-2', '桂', 'sente'),
        new Piece('sente-lance-2', '香', 'sente')
    ]
];

export function Play() {
    const [board, setBoard] = useState(createInitialBoard);
    const [selectedSquare, setSelectedSquare] = useState(null);




    const handleSquareClick = (row, col) => {
        if (!selectedSquare) {
            if (board[row][col] !== null) {
                setSelectedSquare({ row, col });
            }
        } else {
            const newBoard = board.map((r) => [...r]);
            const movingPiece = newBoard[selectedSquare.row][selectedSquare.col];
            const targetPiece = newBoard[row][col];

            //deselect if own piece (either same or other owned)
            if (targetPiece !== null && targetPiece.player == movingPiece.player) {
                setSelectedSquare(null);
                return;
            }

            //if capturing opponent's piece
            if (targetPiece !== null && targetPiece.player !== movingPiece.player) {
                targetPiece.capture(movingPiece.player)

                if (movingPiece.player === 'sente') {
                    //setSenteCaptured(prev => [...prev, capturedObj]);
                    console.log("SENTE CAPTUREd");

                } else {
                    //setGoteCaptured(prev => [...prev, capturedObj]);
                    console.log("GOTE CAPTUED")
                }
            }

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
                    movingPiece.promote();
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