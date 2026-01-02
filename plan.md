# Bible Reading Tracker PWA

## Overview
A mobile-first Progressive Web App for tracking the Navigators Bible Reading Plan with gamification features. Modern minimal design with React + Tailwind, local-only storage.

## Tech Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Storage**: localStorage + IndexedDB (via idb-keyval)
- **PWA**: Vite PWA plugin (service worker, manifest)
- **State**: Zustand (lightweight)

## Core Features

### 1. Reading Tracker
- Display today's 4 readings (2 NT + 2 OT tracks)
- Tap to mark each passage as complete
- Shows current month/day in the plan
- Start from any month (configurable)

### 2. Streak System 🔥
- Track consecutive days of reading
- Fire icon with animated flames
- Streak freeze (1 free pass per week)
- Streak history visualization

### 3. XP & Leveling System
- **XP Sources**:
  - Complete 1 reading: +10 XP
  - Complete all 4 daily readings: +50 XP bonus
  - Maintain streak (per day): +5 XP × streak length
  - Complete a full month: +200 XP
- **Levels**: 1-50 with thematic names (Seeker → Scholar → Sage → etc.)
- Smooth progress bar animations

### 4. Achievement Badges
- **Streak Badges**: 7-day, 30-day, 100-day, 365-day
- **Completion Badges**: First reading, First month, Full book completed
- **Special Badges**: Early bird (read before 7am), Night owl (after 10pm)
- Badge unlock animations

### 5. Progress Map
- Visual journey through the Bible
- Scrollable map with waypoints for each book
- Current position marker with glow effect
- Completed sections filled in
- Mini-map overview

## File Structure
```
/bible-tracker/
├── index.html
├── vite.config.js
├── package.json
├── public/
│   └── manifest.json
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── data/
│   │   └── readingPlan.js        # All 12 months of readings
│   ├── stores/
│   │   └── useStore.js           # Zustand store
│   ├── components/
│   │   ├── DailyReadings.jsx     # Today's 4 passages
│   │   ├── ReadingCard.jsx       # Individual reading item
│   │   ├── StreakDisplay.jsx     # Fire streak counter
│   │   ├── XPBar.jsx             # Level progress bar
│   │   ├── AchievementBadge.jsx  # Badge component
│   │   ├── ProgressMap.jsx       # Visual journey map
│   │   ├── Navigation.jsx        # Bottom nav bar
│   │   └── Calendar.jsx          # Monthly view
│   ├── pages/
│   │   ├── Home.jsx              # Daily view (default)
│   │   ├── Progress.jsx          # Map & stats
│   │   ├── Achievements.jsx      # Badge collection
│   │   └── Settings.jsx          # Config options
│   ├── hooks/
│   │   └── useReadingProgress.js # Reading logic
│   └── utils/
│       ├── xpCalculator.js       # XP/level math
│       └── streakManager.js      # Streak logic
```

## Implementation Order

### Phase 1: Foundation
1. Initialize Vite + React + Tailwind project
2. Set up PWA config (manifest, service worker)
3. Create reading plan data structure from PDF
4. Build Zustand store with localStorage persistence

### Phase 2: Core UI
5. Build DailyReadings component with 4 cards
6. Implement ReadingCard with tap-to-complete
7. Add bottom Navigation bar
8. Create Home page layout

### Phase 3: Gamification - Streaks
9. Build StreakDisplay with fire animation
10. Implement streak logic (consecutive days tracking)
11. Add streak freeze feature

### Phase 4: Gamification - XP System
12. Create XP calculator utility
13. Build XPBar component with level display
14. Add XP gain animations (floating +XP text)
15. Implement level-up celebration

### Phase 5: Achievements
16. Define achievement criteria
17. Build AchievementBadge component
18. Create Achievements page (badge grid)
19. Add badge unlock notifications

### Phase 6: Progress Map
20. Design map waypoints for Bible books
21. Build scrollable ProgressMap component
22. Add current position indicator
23. Implement Progress page

### Phase 7: Polish
24. Add page transitions (Framer Motion)
25. Implement Settings page (start month, reset data)
26. Add Calendar view for monthly overview
27. Final PWA testing & optimization

## Data Model (localStorage)

```js
{
  // Reading progress
  completedReadings: {
    "2024-01-05": ["matt-1:1-17", "acts-1:1-11", "ps-1", "gen-1-2"],
    // ...
  },

  // Streak data
  streak: {
    current: 15,
    longest: 42,
    lastReadDate: "2024-01-05",
    freezesRemaining: 1,
    freezeUsedThisWeek: false
  },

  // XP & Level
  xp: {
    total: 2450,
    level: 8,
    todayEarned: 75
  },

  // Achievements
  achievements: {
    "first-reading": { unlocked: true, date: "2024-01-01" },
    "7-day-streak": { unlocked: true, date: "2024-01-07" },
    // ...
  },

  // Settings
  settings: {
    startMonth: 1,
    startDate: "2024-01-01"
  }
}
```

## Design System (Modern Minimal)

**Colors**:
- Background: `#FAFAFA` (off-white)
- Cards: `#FFFFFF` with subtle shadow
- Primary: `#2563EB` (blue-600)
- Accent: `#F59E0B` (amber-500, for streaks/XP)
- Success: `#10B981` (emerald-500)
- Text: `#1F2937` (gray-800)

**Typography**:
- Font: Inter (clean, modern)
- Headings: Semi-bold
- Body: Regular

**Spacing**:
- Generous whitespace
- 16px base padding
- 8px grid system

**Animations**:
- Subtle micro-interactions
- Smooth page transitions
- Satisfying completion feedback
