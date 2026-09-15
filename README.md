# SHOGI SHOWDOWN

<!--
> [My Notes](notes.md)
-->

This application is an online way to learn and play Shogi-Japanese Chess.

<!-- [!NOTE]
> This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

> [!NOTE]
> If you are not familiar with Markdown then you should review the [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing.

-->

### Elevator pitch
<!--
Many know of the classic board game "Chess" but fewer know of the other, lesser-known members of the Chess Family. Far away in the tranquil land of Japan, war is raging as warlord is pitched against warlord in the greatest battle of wits. Learn how to command your units on the 9x9 battlefield and play against your friends and strangers alike to improve your skills. Like any goo
-->

Have you ever wanted to learn how to play Shogi, the Japanese version of Chess? Ever seen the board with all pieces places and thought to yourself, "This is just too confusing! How could you ever learn how to play this?" Worry no more and learn the basics of Shogi and play against your friends! Through this application, you can play remotely whilst also learning how each piece moves in a convenient way. As you make moves, it will be validated by the server and then relayed to your friend in real-time! In addition, chat with them via the in-game chat. After playing, you can review previous games following standard Shogi notation and also keep track of your win-loss ratio.

### Design

![An image of a shogi board](images/PLACEHOLDER-ShogiBoard.jpg)
<!-- https://photock.org/photo/shogi-board-and-pieces-3 -->

This is the fundamental Shogi board.

![An image of how to play, showing how the gold general moves](images/Shogi%20Examples.png)

This is what the how-to-play manual will look like. Note the indicators for how the shogi piece will move.

![Placeholder - Login Screen](images/placeholder.png)

This is what the login screen will look like, with a fun quote from the [AnimeChan API.](#technologies)

![Placeholder - Account History](images/placeholder.png)

This is what a user's account page will show, note the game history.

##### Gameplay Loop

This is an example of what the gameplay loop will look like integrated.

```mermaid
sequenceDiagram
    actor Player
    participant Client
    participant Server
    participant Game as Game State

    %% Player makes a move
    Player->>Client: Makes move
    Client->>Server: Send move
    Server->>Game: Validate legal move

    alt Move is legal
        Game-->>Server: Move accepted
        Server->>Game: Update board & log move
        Server-->>Client: Send updated board
        Client-->>Player: Show updated board

    else Move is illegal
        Game-->>Server: Move rejected
        Server-->>Client: Reject move
        Client-->>Player: Don't move piece, show error
    end

```

### Key features

- Play Shogi against your friends via direct play or with strangers via rooms!
- Learn the basics of Shogi and how core gameplay works!
- Switch between variations of the play pieces and gameboard to suit your preferences!
- Log in to keep track of your matches, including the abilty to review past games!

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Utilize HTML for the structure of the website. At least 4 main pages: login, How-to-play tutorial/guide, game screen, and account information. 
- **CSS** - Style the website so that it looks good on all screen sizes, especially so that the website is useable both on mobile and on desktop. Allows for players to change the board and game piece assests with different variations.
- **React** - The main client-side service by which the client will interact with the Shogi game. In addition, will allow the user to log in and to access the tutorial/customization features. 
- **Service** - Manage game sessions, validate legal Shogi moves, and update game states for all players. Provide further chat functionality for real-time game chat. Link to the database for user information such as game history. In addition, pulls a fun quote from an anime from [the AnimeChan API!](https://github.com/AnimechanOrg/animechan)
- **Database** - Store:
    + authenification information
    + list of users 
    + the play-by-play history of played games
    + players' win-lose ratios.
- **WebSocket** - Takes verified moves and syncs all clients. Also, implement a live chat feature so users may banter whilst playing.

## 🚀 Specification Deliverable
<!--
Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.
-->

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] I completed the prerequisites for this deliverable (Git commit requirement)
- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology including your 3rd party API and use of WebSocket
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

> [!NOTE]
> Will continue to throw together examples for the login screen and for the account tab.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Rented EC2 server** - I did complete this part of the deliverable.
- [x] **Leased domain name** - leased the name "shogi-showdown" at the domain extension ".link"
- [x] **Server accessible** from my domain: [https://shogi-showdown.link](https://shogi-showdown.link)

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **HTML pages** - I did not complete this part of the deliverable.
- [ ] **Proper HTML element usage** - I did not complete this part of the deliverable.
- [ ] **Links** - I did not complete this part of the deliverable.
- [ ] **Text** - I did not complete this part of the deliverable.
- [ ] **3rd party API placeholder** - I did not complete this part of the deliverable.
- [ ] **Images** - I did not complete this part of the deliverable.
- [ ] **Login placeholder** - I did not complete this part of the deliverable.
- [ ] **DB data placeholder** - I did not complete this part of the deliverable.
- [ ] **WebSocket placeholder** - I did not complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Visually appealing colors and layout. No overflowing elements.** - I did not complete this part of the deliverable.
- [ ] **Use of a CSS framework** - I did not complete this part of the deliverable.
- [ ] **All visual elements styled using CSS** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing using flexbox and/or grid display** - I did not complete this part of the deliverable.
- [ ] **Use of a imported font** - I did not complete this part of the deliverable.
- [ ] **Use of different types of selectors including element, class, ID, and pseudo selectors** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - I did not complete this part of the deliverable.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.
- [ ] **Uses BCrypt to hash passwords** - I did not complete this part of the deliverable.

## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
