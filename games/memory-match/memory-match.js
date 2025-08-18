// Memory Match Game - Vanilla JavaScript Version
class MemoryMatchGame {
    constructor() {
        this.cards = [];
        this.flippedCards = [];
        this.moves = 0;
        this.gameWon = false;
        this.symbols = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
        
        this.gameBoard = document.getElementById('gameBoard');
        this.movesDisplay = document.getElementById('moves');
        this.newGameBtn = document.getElementById('newGameBtn');
        this.winMessage = document.getElementById('winMessage');
        this.finalMoves = document.getElementById('finalMoves');
        this.playAgainBtn = document.getElementById('playAgainBtn');
        
        this.initializeEventListeners();
        this.initializeGame();
    }
    
    initializeEventListeners() {
        this.newGameBtn.addEventListener('click', () => this.initializeGame());
        this.playAgainBtn.addEventListener('click', () => this.initializeGame());
    }
    
    initializeGame() {
        this.cards = [];
        this.flippedCards = [];
        this.moves = 0;
        this.gameWon = false;
        
        // Create game cards
        const gameCards = [...this.symbols, ...this.symbols].map((symbol, index) => ({
            value: symbol,
            isFlipped: false,
            isMatched: false,
        }));
        
        // Shuffle cards
        this.shuffleCards(gameCards);
        this.cards = gameCards;
        
        this.renderGame();
        this.updateMoves();
        this.hideWinMessage();
    }
    
    shuffleCards(cards) {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
    }
    
    renderGame() {
        this.gameBoard.innerHTML = '';
        
        this.cards.forEach((card, index) => {
            const cardElement = document.createElement('button');
            cardElement.className = 'memory-card';
            cardElement.dataset.index = index;
            
            if (card.isFlipped || card.isMatched) {
                cardElement.classList.add(card.isMatched ? 'matched' : 'flipped');
            }
            
            if (card.isMatched) {
                cardElement.disabled = true;
            }
            
            const symbolElement = document.createElement('span');
            symbolElement.className = 'card-symbol';
            symbolElement.textContent = card.value;
            cardElement.appendChild(symbolElement);
            
            cardElement.addEventListener('click', () => this.handleCardClick(index));
            this.gameBoard.appendChild(cardElement);
        });
    }
    
    handleCardClick(cardIndex) {
        if (this.flippedCards.length === 2 || 
            this.cards[cardIndex].isMatched || 
            this.cards[cardIndex].isFlipped) {
            return;
        }
        
        // Flip the card
        this.cards[cardIndex].isFlipped = true;
        this.renderGame();
        
        // Add to flipped cards
        this.flippedCards.push(cardIndex);
        
        if (this.flippedCards.length === 2) {
            this.moves++;
            this.updateMoves();
            
            if (this.cards[this.flippedCards[0]].value === this.cards[this.flippedCards[1]].value) {
                // Match found
                this.cards[this.flippedCards[0]].isMatched = true;
                this.cards[this.flippedCards[1]].isMatched = true;
                this.flippedCards = [];
                this.renderGame();
                
                // Check if game is won
                if (this.cards.every(card => card.isMatched)) {
                    this.gameWon = true;
                    this.showWinMessage();
                }
            } else {
                // No match, flip cards back after delay
                setTimeout(() => {
                    this.cards[this.flippedCards[0]].isFlipped = false;
                    this.cards[this.flippedCards[1]].isFlipped = false;
                    this.flippedCards = [];
                    this.renderGame();
                }, 1000);
            }
        }
    }
    
    updateMoves() {
        this.movesDisplay.textContent = this.moves;
    }
    
    showWinMessage() {
        this.finalMoves.textContent = this.moves;
        this.winMessage.style.display = 'block';
    }
    
    hideWinMessage() {
        this.winMessage.style.display = 'none';
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', function() {
    new MemoryMatchGame();
});
