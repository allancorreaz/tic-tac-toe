document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const currentPlayerDisplay = document.getElementById('current-player');
    const resetButton = document.getElementById('reset-button');

    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    // Cria o tabuleiro
    function createBoard() {
        board.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-index', i);
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }
    }

    // Lida com o clique em uma célula
    function handleCellClick(e) {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedCellIndex] !== '' || !gameActive) return;

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        checkResult();
    }

    // Verifica se há um vencedor ou empate
    function checkResult() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
            [0, 4, 8], [2, 4, 6]             // diagonais
        ];

        let roundWon = false;

        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') continue;

            if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            status.textContent = `Jogador ${currentPlayer} venceu!`;
            gameActive = false;
            return;
        }

        if (!gameState.includes('')) {
            status.textContent = 'Empate!';
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        currentPlayerDisplay.textContent = currentPlayer;
    }

    // Reinicia o jogo
    function resetGame() {
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        status.textContent = 'Vez do jogador: ';
        currentPlayerDisplay.textContent = currentPlayer;
        createBoard();
    }

    resetButton.addEventListener('click', resetGame);

    // Inicializa o jogo
    createBoard();
});