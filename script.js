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
    
    // Clear event text when switching games
    document.getElementById('event-text').textContent = 'Click on a moment to see details';
}

// Timeline marker clicks
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('timeline-marker')) {
        const event = e.target.dataset.event;
        document.getElementById('event-text').textContent = event;
    }
});

// Add click handlers to timeline markers
document.querySelectorAll('.timeline-marker').forEach(marker => {
    marker.addEventListener('click', () => {
        const event = marker.dataset.event;
        document.getElementById('event-text').textContent = event;
        
        // Optional: highlight selected marker
        document.querySelectorAll('.timeline-marker').forEach(m => {
            m.style.boxShadow = 'none';
        });
        marker.style.boxShadow = '0 0 15px rgba(0,0,0,0.5)';
    });
});