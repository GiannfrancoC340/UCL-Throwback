# UEFA Champions League Throwback Project

## Project Overview
An interactive web application that displays detailed statistics and timeline visualizations for the Manchester City vs. Real Madrid 
UEFA Champions League semi-final matches from May 2023, of the 2022-2023 season. Users can toggle between Game 1 and Game 2 to view comprehensive match 
statistics and an interactive timeline of key events.

## Technologies Used
- HTML5
- CSS3 (Flexbox, Grid, Gradients, Transitions)
- JavaScript (ES6)
- Web-safe fonts (Arial, Helvetica, Verdana)

## Project Structure
```
├── index.html
├── styles.css
└── script.js
```

## Key Features

### 1. **Game Toggle System**
Users can switch between two games with active state indicators:
```javascript
function showGame(gameNumber) {
    // Hide all games
    document.querySelectorAll('.game-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Show selected game
    document.getElementById('game' + gameNumber).classList.add('active');
}
```

### 2. **Comprehensive Match Statistics**
Each game displays 13 different statistical categories:
- Possession
- Passing Accuracy
- Passes Attempted/Completed
- Total Attempts
- Attempts on Target/Off Target/Blocked
- Corners
- Offsides
- Tackles
- Fouls Committed
- Yellow/Red Cards

### 3. **Interactive Timeline with Tick Marks**
Visual timeline showing key match events:
- ⚽ **Goals** (green)
- 🟨 **Yellow Cards** (yellow)
- ↔️ **Substitutions** (blue)
- **Stoppage Time** (gray)

Timeline features:
- Tick mark style indicators (graph-like appearance)
- Colored circles on tick marks for event type identification
- Minute labels below each tick
- Hover effects for better interactivity
- Click to display full event details

### 4. **Team Logos in Header**
Clean header layout with:
- Team logos (60x60px)
- Match score/result
- Match details (date, venue, competition stage)

## Technical Implementation

### HTML Structure

#### Game Toggle Buttons
```html
<div class="game-selector">
    <button class="game-btn active" onclick="showGame(1)">Game 1</button>
    <button class="game-btn" onclick="showGame(2)">Game 2</button>
</div>
```

#### Statistics Display (Grid Layout)
```html
<div class="stat-row">
    <span class="stat-left">43%</span>
    <span class="stat-middle">Possession</span>
    <span class="stat-right">57%</span>
</div>
```

#### Timeline with Tick Marks
```html
<div class="timeline-marker goal" 
     style="left: 40%;" 
     data-minute="36'" 
     data-event="36' Vinícius Júnior ⚽">
</div>
```

### CSS Implementation

#### Statistics Grid System
```css
.stat-row {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;  /* Left stat | Label | Right stat */
    width: 100%;
    padding: 8px 20px;
    align-items: center;
    gap: 10px;
}
```

#### Timeline Tick Mark Style
```css
.timeline-marker {
    position: absolute;
    width: 3px;  /* Thin vertical line */
    height: 30px;
    background: #333;
    cursor: pointer;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.3s ease;
}

.timeline-marker::before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;  /* Colored circle on top */
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
}
```

#### Auto Height Container
```css
.container {
    border: 2px solid black;
    width: 80vw;
    min-height: 180vh;
    height: auto;  /* Automatically adjusts based on content */
    padding-bottom: 50px;
}
```

### JavaScript Implementation

#### Event Delegation Pattern
Used event delegation for efficient event handling across all timeline markers:

```javascript
// Single listener handles all marker clicks
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('timeline-marker')) {
        const event = e.target.dataset.event;
        document.getElementById('event-text').textContent = event;
        
        // Visual feedback - highlight selected marker
        document.querySelectorAll('.timeline-marker').forEach(m => {
            m.style.boxShadow = 'none';
        });
        e.target.style.boxShadow = '0 0 15px rgba(0,0,0,0.5)';
    }
});
```

**Why Event Delegation?**
- ✅ Performance: One listener instead of 30+ individual listeners
- ✅ Memory efficient
- ✅ Works with dynamically added content
- ✅ No need to remove/re-attach listeners when switching games
- ✅ Cleaner, more maintainable code

## Design Decisions

### 1. **Hide/Show Pattern vs. Separate HTML Files**
**Decision**: Used single HTML file with CSS visibility toggling

**Reasoning**:
- Simpler to maintain
- Faster page loads (no separate HTTP requests)
- Consistent styling between games
- Easy to share common components

### 2. **Tick Marks vs. Circular Dots**
**Decision**: Switched from circular dots to tick marks (ruler/graph style)

**Reasoning**:
- Cleaner, more professional appearance
- Better visual hierarchy
- Easier to see exact timing on timeline
- More data-visualization-appropriate aesthetic

### 3. **Grouped Events on Timeline**
**Solution**: Combined multiple simultaneous substitutions (80' triple sub in Game 2) into one tick mark

**Implementation**:
```html
<div class="timeline-marker substitution triple-sub" 
     data-event="80' Triple Sub: Camavinga ↔️ Tchouaméni | Carvajal ↔️ Lucas Vázquez | Rodrygo ↔️ Ceballos">
</div>
```

Special styling for grouped events:
- Slightly wider tick mark (4px vs. 3px)
- Darker color to indicate multiple events
- Multi-line text display using pipe separators

### 4. **Auto Height Container**
**Problem**: Game 2 has more events (especially substitutions) than Game 1

**Solution**: Used `height: auto` with `min-height` instead of fixed height

**Benefits**:
- Container automatically expands to fit content
- No manual height adjustments needed
- Future-proof for content additions

### 5. **Timeline Gradient Background**
Visual indicator for match halves:
```css
background: linear-gradient(to right, 
    #90EE90 0%, #90EE90 50%,  /* First half - light green */
    #FFB6C1 50%, #FFB6C1 100%  /* Second half - light pink */
);
```

### 6. **Nested Flex Containers for Header**
**Problem**: Needed logos in a row but stats in a column

**Solution**: Created nested flex container:
```css
.stats-container {
    display: flex;
    flex-direction: column;  /* Main container: column */
}

.game-header {
    display: flex;
    flex-direction: row;  /* Nested: row for logos + title */
    align-items: center;
    gap: 20px;
}
```

## Color Scheme

### Timeline Event Colors
- **Goals**: Green (#28a745)
- **Yellow Cards**: Yellow (#ffc107)
- **Substitutions**: Blue (#007bff)
- **Stoppage Time**: Gray (#6c757d)
- **Triple Substitution**: Dark Blue (#0056b3)

### Layout Colors
- **First Half Background**: Light Green (#90EE90)
- **Second Half Background**: Light Pink (#FFB6C1)
- **Event Display**: Light Gray Gradient

## Match Data

### Game 1: Real Madrid 1-1 Manchester City
- **Date**: 9 May 2023
- **Venue**: Estadio Santiago Bernabéu, Madrid
- **Competition**: Semi-finals, 1st leg
- **Goals**: Vinícius Júnior (36'), De Bruyne (67')
- **Cards**: 5 yellow cards total
- **Substitutions**: 3 total

### Game 2: Manchester City 4-0 Real Madrid
- **Date**: 17 May 2023
- **Venue**: Etihad Stadium, Manchester
- **Competition**: Semi-finals, 2nd leg
- **Aggregate**: 5-1 Manchester City wins
- **Goals**: Bernardo Silva (23', 37'), Akanji (76'), Alvarez (90+1')
- **Cards**: 5 yellow cards total
- **Substitutions**: 8 total (including triple sub at 80')

## Technical Challenges & Solutions

### Challenge 1: Character Encoding
**Problem**: Special characters (ñ, í, ö, ć) displaying incorrectly

**Solution**: Added UTF-8 meta tag:
```html
<meta charset="UTF-8">
```

### Challenge 2: Timeline Marker Overlap
**Problem**: Too many events at similar times caused visual overlap

**Solution**:
- Carefully calculated positioning percentages
- Grouped simultaneous events
- Adjusted spacing between closely-timed events

### Challenge 3: Duplicate Event Listeners
**Problem**: Timeline markers had multiple click handlers

**Solution**: Used event delegation pattern with single listener

### Challenge 4: State Management Between Games
**Problem**: Highlights and selected states persisting when switching games

**Solution**: Added cleanup in `showGame()` function:
```javascript
// Clear event text and highlights when switching games
document.getElementById('event-text').textContent = 'Click on a moment to see details';
document.querySelectorAll('.timeline-marker').forEach(m => {
    m.style.boxShadow = 'none';
});
```

### Challenge 5: Horizontal Rule Alignment
**Problem**: "Full Time" text and MLS logo not aligning with horizontal rule

**Solution**: Created sub-container with matching width:
```css
.sub-row {
    width: 95%;  /* Match hr width */
    margin: 0 auto;  /* Center like hr */
    justify-content: space-between;
}
```

## CSS Techniques Used

### 1. **CSS Grid for Statistics**
Three-column layout with proper alignment:
- Right-align left stats
- Center-align labels
- Left-align right stats

### 2. **CSS Pseudo-elements (::before, ::after)**
Used for tick mark styling:
- `::before` - colored circle on top of tick
- `::after` - minute label below tick

### 3. **CSS Transitions**
Smooth hover effects:
```css
transition: all 0.3s ease;
```

### 4. **Positioning**
Absolute positioning for timeline markers relative to timeline bar

### 5. **Box Shadow for Visual Feedback**
Highlight selected markers with shadow effect

## JavaScript Patterns

### 1. **Event Delegation**
Single listener handles all similar elements efficiently

### 2. **DOM Manipulation**
- Class toggling for show/hide
- Dynamic text updates
- Style modifications for visual feedback

### 3. **Data Attributes**
Store event information directly in HTML:
```html
data-minute="36'"
data-event="36' Vinícius Júnior ⚽"
```

## Best Practices Implemented

### Code Organization
- ✅ Separation of concerns (HTML/CSS/JS)
- ✅ Semantic HTML structure
- ✅ Consistent naming conventions
- ✅ Reusable CSS classes

### Performance
- ✅ Event delegation instead of multiple listeners
- ✅ CSS transitions for smooth animations
- ✅ Minimal DOM manipulation

### User Experience
- ✅ Visual feedback on interactions (hover, click)
- ✅ Clear active states for buttons
- ✅ Readable typography and spacing
- ✅ Intuitive navigation between games

### Accessibility
- ✅ Semantic HTML elements
- ✅ Alt text for images
- ✅ Clear visual indicators
- ✅ Sufficient color contrast

## Lessons Learned

### 1. **Event Delegation is Powerful**
Using event delegation dramatically simplified the code and improved performance, especially when dealing with many similar elements.

### 2. **Auto Height vs. Fixed Height**
Letting the container automatically adjust to content is more flexible and maintainable than manually setting heights for different states.

### 3. **Nested Flex Containers**
Understanding when to nest flex containers is key to creating complex layouts while maintaining clean code.

### 4. **Data Attributes are Excellent**
Storing event information in `data-*` attributes keeps the HTML self-documenting and makes JavaScript interaction cleaner.

### 5. **Visual Hierarchy Matters**
The switch from circular dots to tick marks significantly improved the timeline's readability and professional appearance.

### 6. **Group Related Events**
When multiple events occur simultaneously, grouping them on one marker with detailed information on click provides better UX than cluttering the timeline.

## Future Enhancement Ideas

### Features
- Add match highlights/video clips
- Include player ratings
- Add formation diagrams
- Show possession map/heat maps
- Include commentary/analysis sections
- Add match momentum graph

### Technical Improvements
- Make fully responsive for mobile devices
- Add keyboard navigation
- Implement smooth scroll to timeline
- Add filters (show only goals, only cards, etc.)
- Export statistics as PDF
- Add animation when switching games
- Implement search/filter for events

### Data
- Add more matches from the tournament
- Include historical comparisons
- Add player-specific statistics
- Include xG (expected goals) data

## Conclusion

This project successfully demonstrates:
- ✅ Interactive data visualization
- ✅ Efficient JavaScript patterns (event delegation)
- ✅ Modern CSS layout techniques (Grid, Flexbox)
- ✅ Clean, maintainable code structure
- ✅ Responsive design principles
- ✅ User-friendly interface

The UEFA Champions League Throwback project provides an engaging way to explore historic match data through interactive statistics and visual timelines, showcasing both technical skills and design sensibility.
