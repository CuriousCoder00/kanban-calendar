# Calendar Kanban Board - Take Home Challenge

## Live URL

**Deployed Link:** [https://calendly.kapiljangid.live](https://calendly.kapiljangid.live)

## GitHub Repository

**Repository Link:** [https://github.com/CuriousCoder00/kanban-calendar](https://github.com/CuriousCoder00/kanban-calendar)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Swipe Gesture Details](#swipe-gesture-details)
- [Additional Improvements](#additional-improvements)
- [Challenges Faced](#challenges-faced)
- [Conclusion](#conclusion)

---

## Overview
This project is a **Calendar Kanban Board** application that offers a mobile-first responsive calendar where users can:

- View events day-by-day (on mobile) or week-by-week (on desktop).
- Drag and drop events across days.
- Smoothly transition into a detailed full-screen event view.
- Swipe to navigate days (on mobile) or weeks (on desktop).


## Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Local state (useState, useContext)
- **Gestures:** @use-gesture/react
- **Drag and Drop** @dnd-kit/core
- **Animation:** Framer Motion


## Features
- ✨ **Responsive Design**
  - Mobile: Displays one day at a time.
  - Desktop: Displays full week with next/previous week navigation.

- 👉 **Drag and Drop Across Days**
  - Drag events to a new day.
  - Traverse to next/previous day by holding card at edge.

- 👀 **Swipe Navigation**
  - Swipe on Calendar Board to move to next/previous day.
  - Swipe on Header to move to next/previous week.

- 🔄 **Smooth Card-to-Detail Transition**
  - Click on an event to expand it into a full-screen detail view with animations.

- ✨ **Subtle Animations**
  - Card scale on drag.
  - Slight card rotation for visual cue while dragging.
  - Animated header highlight for the current day.

- 🎈 **UX Enhancements**
  - Minor haptic-like feedback via animations.
  - Minor haptic-like feedback on mobile via `navigate.vibrate()`


## Installation

```bash
# Clone the repo
git clone https://github.com/CuriousCoder00/kanban-calendar.git

# Navigate into the project
cd kanban-calendar

# Install dependencies
npm install

# Start development server
npm run dev
```


## Usage
- **Mobile:**
  - View 1 day.
  - Drag events to move them.
  - Swipe left/right to change the day.
  - Swipe left/right on header dates to change the week

- **Desktop:**
  - View 7 days.
  - Drag events to move them across days.
  - Click arrows in header to navigate weeks.

- **Event Details:**
  - Click an event to view full details.
  - Smooth animated transition from card to detail view.


## Swipe Gesture Details
- **Library Used:** `@use-gesture/react` `@dnd-kit/core`
- **Swipe on Calendar Board:** Changes day (mobile).
- **Swipe on Header:** Changes week (mobile).
- **Drag Hold on Edge:** Allows day traversal while dragging on Mobile once per drag and on desktop week traversal.
- **Visual Feedback:** Slight scaling and rotation while dragging.


## Additional Improvements
- Animated week/day change transitions.
- Added scaling/rotation on drag for better visual feedback.
- Minor delay added on mobile drag traversal for better feel.


## Challenges Faced
- Balancing drag vs swipe gesture detection.
- Mobile traversal without accidental card drops.
- Smooth transition from small card to large event detail view.
- Swipe gesture vs native scroll behavior conflicts.


## Conclusion
This project was an amazing opportunity to demonstrate expertise in modern frontend practices:
- Building highly interactive, fluid UI components.
- Ensuring excellent mobile and desktop responsiveness.
- Writing clean, scalable, and maintainable code.

I'm proud of the result and would love to discuss any further improvements or ideas!

---

Thank you for reviewing the project! 🚀

