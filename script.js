function showGame(gameNumber) {
    // Hide all games
    document.querySelectorAll('.game-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Show selected game
    document.getElementById('game' + gameNumber).classList.add('active');
    
    // Update button states
    document.querySelectorAll('.game-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Clear event text and highlights when switching games
    document.getElementById('event-text').textContent = 'Click on a moment to see details';
    document.querySelectorAll('.timeline-marker').forEach(m => {
        m.style.boxShadow = 'none';
    });
}

// Event delegation - single listener for all timeline markers
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('timeline-marker')) {
        const event = e.target.dataset.event;
        document.getElementById('event-text').textContent = event;
        
        // Remove highlight from all markers
        document.querySelectorAll('.timeline-marker').forEach(m => {
            m.style.boxShadow = 'none';
        });
        
        // Highlight clicked marker
        e.target.style.boxShadow = '0 0 15px rgba(0,0,0,0.5)';
    }
});