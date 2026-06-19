---
name: space-invaders-task-list-v1-0-6-missing-player-hitbox-collision-alien-deletion-and-game-over-handling
description: Space Invaders tasks 4 & 5 (player health, bullet collision) are similar and should be consolidated; also need entity cleanup logic. >Note: The user wants to see the game work end-to-end with win/lose states before this is considered "complete". Keep task descriptions focused on observable behavior ("aliens shoot projectiles that damage player", "score increases when bullets hit aliens") not internal code structure (unless it's unclear how to implement). **Do NOT reference** memory entries from other projects or unrelated work unless the user asks. Don't repeat myself in responses—state what matters and move forward efficiently.
---

# Space Invaders Game Task List

## Core Gameplay Mechanics
- [ ] Add player health system (Task #4)
  - Aliens should be able to shoot projectiles that damage the player
  - Player needs hitboxes for collision detection with alien bullets
  - Remove alien on projectile hit and add score
   
- [ ] Implement bullet vs alien collisions (Task #5) 
  - Bullets destroy aliens they hit, remove both from game loop properly

## Game States & UI
- [x] Add game states management (Menu/Game Over/Victory screens with state transitions) (Task #1)
  
- [ ] Score tracking display in UI
  
- [ ] Lives system for player
  
- [ ] Level/round progression logic when all aliens die
 
## Alien Behavior  
- [ ] Implement coordinated swarm movement (Tasks 3 - current task #8 merged here): 
  - Move as group with wall wrapping and vertical drops
  - Accelerate difficulty periodically

## Visual & Polish
- [x] Basic shapes for entities
  
- [ ] Add sprites or more detailed entity visuals
    
    