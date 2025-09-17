# 🏓 Pong
The good old two player ping pong game.

## Features
- AI (Unbeatable synchronized to the ball position)
- Ball Speed Increase (Every consecutive bounce give it a bit of velocity)
- Custom Canvas Size (Adjust the size of the game area with url parameters)
- Ball Base Speed Configuration (Increase the ball speed)

## Guide

1. Each players have their own respective controls (*QWERTY*)

| |Player1|Player2|
|-|:-:|:-:|
|Move Up|<kbd>Z</kbd>|<kbd>Arrow Up</kbd>|
|Move Down|<kbd>S</kbd>|<kbd>Arrow Down</kbd>|
|Toggle AI|<kbd>Num Row 1</kbd>|<kbd>Num Pad 1</kbd>|

2. To change the canvas size just add `width` & `height` url parameters (*Default 1400 x 700* | *minimum 200 x 100*)

[`https://neyrowz.github.io/pong/?width=800&height=400`](https://neyrowz.github.io/pong/?width=800&height=400)

[Very Tall Canvas (100x800)](https://neyrowz.github.io/pong/?width=100&height=800)

[Very Long Canvas (1800x100)](https://neyrowz.github.io/pong/?width=1800&height=100)

3. You can increase the ball base speed with the bottom right range input (*Apply on top of the default speed and the bouce speed bonus*)

## Comming Next
- SFX with volume range input.