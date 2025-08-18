// 10 Queens Puzzle Game - Vanilla JavaScript Version
class TenQueensPuzzle {
    constructor() {
        this.board = [];
        this.solution = [];
        this.gameWon = false;
        this.isLoading = true;
        
        this.colors = [
            '#fecaca', '#bfdbfe', '#bbf7d0', '#fef3c7', 
            '#ddd6fe', '#fbcfe8', '#c7d2fe', '#99f6e4',
            '#fed7aa', '#a5f3fc'
        ];
        
        this.gameBoard = document.getElementById('gameBoard');
        this.loadingSpinner = document.getElementById('loadingSpinner');
        this.newGameBtn = document.getElementById('newGameBtn');
        this.clearBoardBtn = document.getElementById('clearBoardBtn');
        this.winMessage = document.getElementById('winMessage');
        this.newPuzzleBtn = document.getElementById('newPuzzleBtn');
        
        this.initializeEventListeners();
        this.initializeGame();
    }
    
    initializeEventListeners() {
        this.newGameBtn.addEventListener('click', () => this.resetGame());
        this.clearBoardBtn.addEventListener('click', () => this.clearBoard());
        this.newPuzzleBtn.addEventListener('click', () => window.location.reload());
        
        // Hide win message when page is reloaded
        window.addEventListener('beforeunload', () => {
            this.winMessage.style.display = 'none';
        });
    }
    
    async initializeGame() {
        this.isLoading = true;
        this.showLoading();
        
        try {
            this.solution = await this.generateSolution();
            this.board = this.generateColoredSections(this.solution);
            this.gameWon = false;
            this.isLoading = false;
            this.hideLoading();
            this.renderBoard();
        } catch (error) {
            console.error('Error initializing game:', error);
            // Fallback to a known valid solution
            this.solution = [
                [0, 0], [1, 2], [2, 4], [3, 6], [4, 8],
                [5, 1], [6, 3], [7, 5], [8, 7], [9, 9]
            ];
            this.board = this.generateColoredSections(this.solution);
            this.isLoading = false;
            this.hideLoading();
            this.renderBoard();
        }
    }
    
    async generateSolution() {
        try {
            const response = await fetch('../../resources/10-queens-solutions.json');
            const solutions = await response.json();
            
            // Select a random solution from the available solutions
            const randomIndex = Math.floor(Math.random() * solutions.length);
            return solutions[randomIndex];
        } catch (error) {
            console.error('Error loading solutions:', error);
            // Fallback to a known valid solution
            return [
                [0, 0], [1, 2], [2, 4], [3, 6], [4, 8],
                [5, 1], [6, 3], [7, 5], [8, 7], [9, 9]
            ];
        }
    }
    
    generateColoredSections(queens) {
        const newBoard = Array(10).fill(null).map(() => 
            Array(10).fill(null).map(() => ({
                state: 'empty',
                color: -1, // -1 means unassigned
                isWrong: false
            }))
        );

        // Assign colors to sections based on solution positions (but don't place queens)
        queens.forEach(([row, col], index) => {
            newBoard[row][col].color = index;
        });

        // Create larger, more varied colored sections for each queen
        queens.forEach(([queenRow, queenCol], colorIndex) => {
            const sectionSize = Math.floor(Math.random() * 12) + 10; // 10-21 cells per section
            const sectionCells = [[queenRow, queenCol]];
            
            // Generate random directions for section expansion (only horizontal and vertical)
            const directions = [
                [-1, 0], [1, 0], [0, -1], [0, 1] // up, down, left, right only
            ];
            
            // Expand section ensuring contiguity
            let attempts = 0;
            const maxAttempts = 200;
            
            while (sectionCells.length < sectionSize && attempts < maxAttempts) {
                // Pick a random cell from current section to expand from
                const expandFrom = sectionCells[Math.floor(Math.random() * sectionCells.length)];
                const [expandRow, expandCol] = expandFrom;
                
                // Shuffle directions for randomness
                const shuffledDirections = [...directions].sort(() => Math.random() - 0.5);
                
                // Try each direction
                for (const [dr, dc] of shuffledDirections) {
                    const newRow = expandRow + dr;
                    const newCol = expandCol + dc;
                    
                    if (newRow >= 0 && newRow < 10 && 
                        newCol >= 0 && newCol < 10 && 
                        newBoard[newRow][newCol].color === -1) {
                        
                        newBoard[newRow][newCol].color = colorIndex;
                        sectionCells.push([newRow, newCol]);
                        break;
                    }
                }
                attempts++;
            }
        });

        // Fill remaining unassigned cells to ensure complete coverage
        // Use a flood-fill approach to maintain contiguity
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                if (newBoard[row][col].color === -1) {
                    // Find the nearest colored section using Manhattan distance
                    let minDistance = Infinity;
                    let nearestColor = 0;
                    
                    for (let r = 0; r < 10; r++) {
                        for (let c = 0; c < 10; c++) {
                            if (newBoard[r][c].color !== -1) {
                                const distance = Math.abs(row - r) + Math.abs(col - c);
                                if (distance < minDistance) {
                                    minDistance = distance;
                                    nearestColor = newBoard[r][c].color;
                                }
                            }
                        }
                    }
                    
                    newBoard[row][col].color = nearestColor;
                }
            }
        }

        return newBoard;
    }
    
    showLoading() {
        this.loadingSpinner.style.display = 'block';
        this.gameBoard.style.display = 'none';
    }
    
    hideLoading() {
        this.loadingSpinner.style.display = 'none';
        this.gameBoard.style.display = 'block';
    }
    
    renderBoard() {
        this.gameBoard.innerHTML = '';
        
        // Force grid layout with inline styles
        this.gameBoard.style.display = 'grid';
        this.gameBoard.style.gridTemplateColumns = 'repeat(10, 1fr)';
        this.gameBoard.style.gridTemplateRows = 'repeat(10, 1fr)';
        this.gameBoard.style.gap = '0.25rem';
        this.gameBoard.style.width = 'fit-content';
        this.gameBoard.style.margin = '0 auto';
        
        console.log('Rendering board with dimensions:', this.board.length, 'x', this.board[0]?.length);
        console.log('Board data:', this.board);
        
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                const cell = this.board[row][col];
                const cellElement = document.createElement('button');
                
                // Apply color as inline style
                const colorIndex = Math.max(0, cell.color);
                cellElement.style.backgroundColor = this.colors[colorIndex];
                cellElement.className = 'queens-cell';
                cellElement.dataset.row = row;
                cellElement.dataset.col = col;
                
                if (this.gameWon) {
                    cellElement.style.cursor = 'not-allowed';
                    cellElement.disabled = true;
                    // Add visual indication that the board is locked
                    cellElement.style.opacity = '0.8';
                    cellElement.style.pointerEvents = 'none';
                } else {
                    cellElement.style.cursor = 'pointer';
                    cellElement.style.opacity = '1';
                    cellElement.style.pointerEvents = 'auto';
                    cellElement.addEventListener('click', () => this.handleCellClick(row, col));
                }
                
                // Set cell content based on state
                if (cell.state === 'queen') {
                    if (cell.isWrong) {
                        cellElement.innerHTML = '<span style="color: #dc2626; font-size: 1.5rem; font-weight: bold;">!</span>';
                    } else {
                        cellElement.textContent = '👑';
                    }
                } else if (cell.state === 'x') {
                    cellElement.textContent = '❌';
                }
                
                this.gameBoard.appendChild(cellElement);
            }
        }
        
        console.log('Game board element:', this.gameBoard);
        console.log('Number of cells created:', this.gameBoard.children.length);
    }
    
    handleCellClick(row, col) {
        // Don't allow clicks if game is already won
        if (this.gameWon) {
            return;
        }
        
        const newBoard = [...this.board];
        const cell = newBoard[row][col];
        
        if (cell.state === 'empty') {
            cell.state = 'x';
        } else if (cell.state === 'x') {
            cell.state = 'queen';
        } else if (cell.state === 'queen') {
            cell.state = 'empty';
        }

        // Check all queen conflicts after any state change
        const updatedBoard = this.checkAllQueenConflicts(newBoard);
        this.board = updatedBoard;
        
        // Check win condition BEFORE rendering board
        this.checkWinCondition(updatedBoard);
        
        // Now render the board (which will be locked if gameWon is true)
        this.renderBoard();
    }
    
    checkAllQueenConflicts(currentBoard) {
        const newBoard = currentBoard.map(row => row.map(cell => ({ ...cell })));
        
        // Reset all wrong flags first
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                if (newBoard[row][col].state === 'queen') {
                    newBoard[row][col].isWrong = false;
                }
            }
        }
        
        // Check each queen for conflicts
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                if (newBoard[row][col].state === 'queen') {
                    // Check row conflicts
                    for (let r = 0; r < 10; r++) {
                        if (r !== row && newBoard[r][col].state === 'queen') {
                            newBoard[row][col].isWrong = true;
                            newBoard[r][col].isWrong = true;
                        }
                    }
                    
                    // Check column conflicts
                    for (let c = 0; c < 10; c++) {
                        if (c !== col && newBoard[row][c].state === 'queen') {
                            newBoard[row][col].isWrong = true;
                            newBoard[row][c].isWrong = true;
                        }
                    }
                    
                    // Check diagonal conflicts
                    for (let r = 0; r < 10; r++) {
                        for (let c = 0; c < 10; c++) {
                            if ((r !== row || c !== col) && 
                                newBoard[r][c].state === 'queen') {
                                // Check if queens are diagonally adjacent
                                const rowDiff = Math.abs(row - r);
                                const colDiff = Math.abs(col - c);
                                if (rowDiff === 1 && colDiff === 1) {
                                    newBoard[row][col].isWrong = true;
                                    newBoard[r][c].isWrong = true;
                                }
                            }
                        }
                    }
                    
                    // Check color section conflicts
                    const currentColor = newBoard[row][col].color;
                    for (let r = 0; r < 10; r++) {
                        for (let c = 0; c < 10; c++) {
                            if ((r !== row || c !== col) && 
                                newBoard[r][c].color === currentColor && 
                                newBoard[r][c].state === 'queen') {
                                newBoard[row][col].isWrong = true;
                                newBoard[r][c].isWrong = true;
                            }
                        }
                    }
                }
            }
        }
        
        return newBoard;
    }
    
    checkWinCondition(currentBoard) {
        if (this.checkValidSolution(currentBoard)) {
            this.gameWon = true;
            this.showWinMessage();
        }
    }
    
    checkValidSolution(currentBoard) {
        let queenCount = 0;
        let hasConflicts = false;
        
        // Count queens and check for conflicts
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                if (currentBoard[row][col].state === 'queen') {
                    queenCount++;
                    if (currentBoard[row][col].isWrong) {
                        hasConflicts = true;
                    }
                }
            }
        }
        
        // Win condition: exactly 10 queens with no conflicts
        return queenCount === 10 && !hasConflicts;
    }
    
    resetGame() {
        // Hide the win message
        this.winMessage.style.display = 'none';
        // Reset game state
        this.gameWon = false;
        // Initialize a new game
        this.initializeGame();
    }
    
    clearBoard() {
        // Hide the win message
        this.winMessage.style.display = 'none';
        
        const newBoard = [...this.board];
        
        // Reset all user-placed queens and X's back to empty
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                newBoard[row][col].state = 'empty';
                newBoard[row][col].isWrong = false;
            }
        }
        
        // Clear all conflict flags
        const updatedBoard = this.checkAllQueenConflicts(newBoard);
        this.board = updatedBoard;
        this.gameWon = false;
        this.renderBoard();
    }
    
    showWinMessage() {
        this.winMessage.style.display = 'block';
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', function() {
    new TenQueensPuzzle();
});
