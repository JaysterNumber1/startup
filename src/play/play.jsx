import { useState, useEffect, useRef } from 'react';
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

const mockChatMessages = [
    { sender: 'Opponent', text: 'Nice move!' },
    { sender: 'You', text: 'Thanks, your turn.' },
    { sender: 'Opponent', text: 'I need to think about this one.' },
    { sender: 'You', text: 'Take your time.' }
];

const TURN_DURATION_SECONDS = 5;

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

export function Play() {
    const [board, setBoard] = useState(createInitialBoard);
    const [selectedSquare, setSelectedSquare] = useState(null);
    const [timerState, setTimerState] = useState({
        sente: 600,
        gote: 600,
        activePlayer: 'sente',
        secondsInTurn: 0
    });
    const [chatMessages, setChatMessages] = useState([
        { id: 'initial-1', sender: 'You', text: 'Man, that was a terrible move!' },
        { id: 'initial-2', sender: 'Opponent', text: 'Why did you do that?' },
        { id: 'initial-3', sender: 'You', text: "I'm thinking about playing..." }
    ]);
    const chatContainerRef = useRef(null);
    const boardColumnRef = useRef(null);
    const [boardColumnHeight, setBoardColumnHeight] = useState(null);
    const [capturedPieces, setCapturedPieces] = useState(() => ({
        sente: [
            new Piece('sente-captured-pawn', '歩', 'sente'),
            new Piece('sente-captured-silver', '銀', 'sente')
        ],
        gote: [new Piece('gote-captured-pawn', '歩', 'gote')]
    }));
    const [selectedCapturedPiece, setSelectedCapturedPiece] = useState(null);

    useEffect(() => {
        let messageIndex = 0;
        const intervalId = window.setInterval(() => {
            const index = messageIndex++;
            const message = mockChatMessages[index % mockChatMessages.length];
            setChatMessages((previous) => [
                ...previous,
                { ...message, id: `mock-${index}` }
            ]);
        }, 2000);

        return () => window.clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            setTimerState((previous) => {
                const activeTime = previous[previous.activePlayer];
                if (activeTime === 0) {
                    return previous;
                }

                const secondsInTurn = previous.secondsInTurn + 1;
                const switchTurn = secondsInTurn === TURN_DURATION_SECONDS;
                const nextPlayer = previous.activePlayer === 'sente' ? 'gote' : 'sente';

                return {
                    ...previous,
                    [previous.activePlayer]: activeTime - 1,
                    activePlayer: switchTurn ? nextPlayer : previous.activePlayer,
                    secondsInTurn: switchTurn ? 0 : secondsInTurn
                };
            });
        }, 1000);

        return () => window.clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [chatMessages]);

    useEffect(() => {
        const boardColumn = boardColumnRef.current;
        if (!boardColumn) {
            return undefined;
        }

        const resizeObserver = new ResizeObserver(([entry]) => {
            setBoardColumnHeight(entry.contentRect.height);
        });
        resizeObserver.observe(boardColumn);

        return () => resizeObserver.disconnect();
    }, []);

    const handleCapturedPieceClick = (player, piece) => {
        setSelectedSquare(null);
        setSelectedCapturedPiece((selected) =>
            selected?.id === piece.id ? null : { id: piece.id, player }
        );
    };

    const handleSquareClick = (row, col) => {
        const targetPiece = board[row][col];

        if (selectedCapturedPiece) {
            if (targetPiece !== null) {
                if (targetPiece.player === selectedCapturedPiece.player) {
                    setSelectedCapturedPiece(null);
                    setSelectedSquare({ row, col });
                }
                return;
            }

            const hand = capturedPieces[selectedCapturedPiece.player];
            const pieceToDrop = hand.find((piece) => piece.id === selectedCapturedPiece.id);
            if (!pieceToDrop) {
                setSelectedCapturedPiece(null);
                return;
            }

            const newBoard = board.map((r) => [...r]);
            newBoard[row][col] = new Piece(
                pieceToDrop.id,
                pieceToDrop.type,
                pieceToDrop.player,
                pieceToDrop.promoted
            );
            setBoard(newBoard);
            setCapturedPieces((previous) => ({
                ...previous,
                [selectedCapturedPiece.player]: previous[selectedCapturedPiece.player].filter(
                    (piece) => piece.id !== selectedCapturedPiece.id
                )
            }));
            setSelectedCapturedPiece(null);
            return;
        }

        if (!selectedSquare) {
            if (targetPiece !== null) {
                setSelectedSquare({ row, col });
            }
        } else {
            const newBoard = board.map((r) => [...r]);
            const movingPiece = newBoard[selectedSquare.row][selectedSquare.col];

            //deselect if own piece (either same or other owned)
            if (targetPiece !== null && targetPiece.player === movingPiece.player) {
                setSelectedSquare(null);
                return;
            }

            //if capturing opponent's piece
            if (targetPiece !== null && targetPiece.player !== movingPiece.player) {
                const capturedPiece = new Piece(
                    targetPiece.id,
                    targetPiece.type,
                    targetPiece.player,
                    targetPiece.promoted
                );
                capturedPiece.capture(movingPiece.player);
                setCapturedPieces((previous) => ({
                    ...previous,
                    [movingPiece.player]: [...previous[movingPiece.player], capturedPiece]
                }));
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

                <div id="board-chat-layout">
                    <section id="timer-section" className="play-area-sub-section">
                        <h3>Timer</h3>
                        <p>Opponent: {formatTime(timerState.gote)}</p>
                        <p>
                            Current Turn: {timerState.activePlayer === 'sente' ? 'You' : 'Opponent'}
                        </p>
                        <p>You: {formatTime(timerState.sente)}</p>
                    </section>

                    <div id="board-column" ref={boardColumnRef}>
                        <section id="opponent-captured" className="play-area-sub-section">
                            <h4>Opponent's Captured Pieces</h4>
                            <div className="captured-pieces">
                                {capturedPieces.gote.map((piece) => (
                                    <div className="shogi-board-piece" key={piece.id}>
                                        <button
                                            className={
                                                selectedCapturedPiece?.id === piece.id ? 'selected' : ''
                                            }
                                            aria-label={`Select opponent's captured ${piece.type}`}
                                            onClick={() => handleCapturedPieceClick('gote', piece)}
                                        >
                                            {piece.type}
                                        </button>
                                    </div>
                                ))}
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

                        <section id="player-captured" className="play-area-sub-section">
                            <h4>Your Captured Pieces</h4>
                            <div className="captured-pieces">
                                {capturedPieces.sente.map((piece) => (
                                    <div className="shogi-board-piece" key={piece.id}>
                                        <button
                                            className={
                                                selectedCapturedPiece?.id === piece.id ? 'selected' : ''
                                            }
                                            aria-label={`Select your captured ${piece.type}`}
                                            onClick={() => handleCapturedPieceClick('sente', piece)}
                                        >
                                            {piece.type}
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <p>Select a captured piece to replay it onto the board.</p>
                        </section>
                    </div>

                    <section
                        id="game-chat"
                        className="play-area-sub-section"
                        style={{ height: boardColumnHeight ? `${boardColumnHeight}px` : undefined }}
                    >
                        <h3>Game Chat - One of the WebSocket uses!</h3>
                        <div id="live-chat" ref={chatContainerRef} aria-live="polite">
                            {chatMessages.map((message) => (
                                <p key={message.id}>
                                    {message.sender}: {message.text}
                                </p>
                            ))}
                        </div>
                    </section>
                </div>

                <section id="game-status" className="play-area-sub-section">
                    <div id="last-move">
                        <h3>Last Move</h3>
                        <p>▲ P-7f</p>
                    </div>

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