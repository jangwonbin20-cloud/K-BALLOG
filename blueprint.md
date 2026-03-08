# K-BALLOG Blueprint

## Overview

K-BALLOG is a web application dedicated to providing news and information about the K5, K6, and K7 amateur football leagues in South Korea. This platform aims to be a central hub for fans, players, and anyone interested in local football, offering league tables, match results, news articles, and more.

## Project Structure & Design

The application is built with a modern, framework-less approach, leveraging standard HTML, CSS, and JavaScript. The design is clean, responsive, and user-friendly, with a focus on providing a great experience on both mobile and desktop devices.

### Key Design Elements:

*   **Typography:** Roboto font is used for its readability and modern feel.
*   **Color Palette:** A dark theme with contrasting colors for better readability and a premium look.
*   **Layout:** A responsive grid system is used for the main layout and article sections.
*   **Iconography:** Font Awesome is used for icons throughout the application.

## Implemented Features (Current Version)

### Core:

*   **Homepage (`index.html`):** Features a hero section, featured articles, latest news, and a "Match Center".
*   **Region Pages (`seoul.html`, `suwon.html`, `incheon.html`):** Dedicated pages for each region with links to respective leagues.
*   **Styling (`style.css`):** A centralized stylesheet for a consistent and modern look and feel.
*   **JavaScript (`main.js`):** Base file for future interactive features.

### K5 & K6 League Pages:

*   Pages for K5 and K6 leagues in Seoul, Suwon, and Incheon have been created with placeholder content.

### K7 League Pages:

*   **Seoul K7 Page (`seoul-k7.html`):** Provides links to different K7 league divisions in Seoul.
*   **Seoul K7 Seongbuk Division (`seoul-k7-seongbuk.html`):**
    *   Lists all participating teams with an improved, modern design.
    *   Links to individual team pages.
*   **Team Pages:** Created initial pages for teams in the Seongbuk division (`team-sangbidan.html`, `team-creo.html`, `team-yangji.html`, `team-dream.html`, `team-corea.html`, `team-dice.html`).

## Plan for Current Request

### 5. Team and Player Profile Pages

The current task is to create detailed profile pages for all coaching staff and players for the teams listed on the `seoul-k7-seongbuk` page.

1.  **Create Roster Pages:**
    *   [ ] For each team, create a dedicated "Roster" page (e.g., `team-creo-roster.html`). This page will list all coaching staff and players.
2.  **Create Individual Profile Pages:**
    *   [ ] Create individual HTML pages for each coach and player using a standardized template. Placeholder data will be used for now.
    *   Example: `profile-coach-jane-doe.html`, `profile-player-john-doe.html`.
3.  **Link Everything Together:**
    *   [ ] Update the main team pages (e.g., `team-creo.html`) to link to their new roster page.
    *   [ ] On the roster page, link each person's name to their individual profile page.
4.  **Styling:**
    *   [ ] Add new styles to `style.css` for the roster lists and the individual profile pages to ensure they match the site's aesthetic.
5.  **Commit and Push:**
    *   [ ] Add all new files to git.
    *   [ ] Commit the changes with a descriptive message.
    *   [ ] Push the new feature to the `main` branch on GitHub.
