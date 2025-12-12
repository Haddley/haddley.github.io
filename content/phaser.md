---
title: "Phaser"
description: "2D game framework used for making HTML5 games"
date: "2022-01-23"
categories: ["JavaScript",".NET","AI","Angular","TypeScript"]
tags: ""
slug: "phaser"
image: "/assets/images/phaser-logo-1836x1530.png"
---


## Getting Started

A [getting started sample](https://haddley.github.io/phaser/index.html) includes a config object, a preload function and a create function.

The preload function is used to load the Phaser assets.

The create function is used to add assets to the scene/game.

![](/assets/images/phaser/screen-shot-2022-01-23-at-1.53.03-pm-1836x870.png)
*Getting Started - index.htm*

![](/assets/images/phaser/screen-shot-2022-01-23-at-2.22.32-pm-1836x1110.png)
*Getting Started - running*


## Aquarium

I created an animated [Aquarium](https://haddley.github.io/aquarium/index.html) based on [https://github.com/lrusso/Aquarium](https://github.com/lrusso/Aquarium).

The Aquarium code includes a config object, a preload function, a create function and an update function.

Again the preload function is used to load the Phaser assets.

Again the create function is used to add assets to the scene/game.

Here the update function is called (over and over again) as the main/game loop runs. 

The update function animates the scene (moving the fish and the bubbles).

![](/assets/images/phaser/screen-shot-2022-01-26-at-9.01.25-am-1357x1009.png)
*Aquarium with artwork*


## index.htm

```text
<!DOCTYPE html>
<html>

<head>
    <script src="https://cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser-arcade-physics.min.js"></script>
</head>

<body>

    <script>
        var config = {

            type: Phaser.AUTO,
            
            width: 800,
            height: 600,

            scale: {

                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,

            },

            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 200 }
                }
            },

            scene: {
                preload: preload,
                create: create
            }
        };

        var game = new Phaser.Game(config);

        function preload() {
            this.load.setBaseURL('https://labs.phaser.io');

            this.load.image('sky', 'assets/skies/space3.png');
            this.load.image('logo', 'assets/sprites/phaser3-logo.png');
            this.load.image('red', 'assets/particles/red.png');
        }

        function create() {
            this.add.image(400, 300, 'sky');

            var particles = this.add.particles('red');

            var emitter = particles.createEmitter({
                speed: 100,
                scale: { start: 1, end: 0 },
                blendMode: 'ADD'
            });

            var logo = this.physics.add.image(400, 100, 'logo');

            logo.setVelocity(100, 200);
            logo.setBounce(1, 1);
            logo.setCollideWorldBounds(true);

            emitter.startFollow(logo);
        }
    </script>

</body>

</html>
```

## Index.html

```text
<!DOCTYPE html>
<html>

<head>
    <script src="https://cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser-arcade-physics.min.js"></script>
</head>

<body style="background-color: black;">

    <script>

        function getRandomBubbleX(columnIndex) {
            if (columnIndex == 1) {
                return this.getRandomInteger(70, 90);
            }
            else if (columnIndex == 2) {
                return this.getRandomInteger(250, 275);
            }
            else if (columnIndex == 3) {
                return this.getRandomInteger(450, 470);
            }
        }

        function getRandomBubbleY() {
            return this.getRandomInteger(450, 800);
        }

        function getRandomAngle() {
            var randomValue = this.getRandomInteger(1, 100);

            if (randomValue < 33) {
                // RETURNING A LOOKING FORWARD FISH ANGLE ORIENTATION
                return 0;
            }
            else if (randomValue < 66) {
                // RETURNING A LOOKING DOWN FISH ANGLE ORIENTATION
                return 20;
            }
            else {
                // RETURNING A LOOKING UP FISH ANGLE ORIENTATION
                return -20;
            }
        }

        function getRandomX() {
            // GETTING A RANDOM NUMBER BETWEEN 60 AND 500 (THE GAME WIDTH WITH A MARGIN)
            return this.getRandomInteger(60, 500);
        }

        function getRandomY() {
            // GETTING A RANDOM NUMBER BETWEEN 60 AND 300 (THE GAME HEIGHT WITH A MARGIN)
            return this.getRandomInteger(60, 300);
        }

        function getRandomInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        var config = {

            type: Phaser.AUTO,

            width: 576, height: 432,

            scale: {

                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,

            },

            scene: {
                preload: preload,
                create: create,
                update: update
            }
        };

        bubbles = []
        fishCount = 16

        var game = new Phaser.Game(config)

        function preload() {

            // LOAD THE IMAGES
            this.load.image("imageBackground", 'imageBackground.jpeg');
            this.load.image("imageBubbles", 'imageBubbles.png');

            for (let i = 0; i < fishCount; i++) {
                this.load.image("imageFish" + (i + 1), "fish" + (i + 1) + "_64.png");
            }

            // LOAD THE AUDIO
            this.load.audio('audioBubbles', 'audioBubbles.mp3');

        }

        function create() {

            // ADD THE AUDIO
            this.bubbles = this.sound.add('audioBubbles', { volume: 0.1, loop: true });
            this.bubbles.play();

            // ADD THE BACKGROUND IMAGE
            this.add.sprite(576 / 2, 432 / 2, "imageBackground");

            fishes = []

            // ADD THE FISH
            for (let i = 0; i < fishCount; i++) {
                const fish = this.add.sprite(getRandomX(), getRandomY(), "imageFish" + (i + 1));
                fish.fishSpeed = 1;
                fish.angle = getRandomAngle();
                fish.inputEnabled = true;
                fishes.push(fish);
            }

            // ADD BUBBLES
            for (var column = 0; column < 3; column++) {
                for (var i = 0; i < 9; i++) {
                    var tempBubble = this.add.sprite(getRandomBubbleX(column + 1), getRandomBubbleY(), "imageBubbles");
                    tempBubble.columnIndex = column + 1;
                    tempBubble.alpha = 0.7;
                    tempBubble.setScale(.5);
                    bubbles.push(tempBubble);
                }
            }


        }

        function update() {

            if (game.sound.context.state === 'suspended') {
                game.sound.context.resume();
            }

            // LOOP FOR EVERY FISH
            for (var i = 0; i < fishes.length; i++) {

                // GET A FISH
                var fish = fishes[i];

                // CHECK THE FISH ORIENTATION
                if (fish.scale == 1) {
                    // MOVING THE FISH TO THE RIGHT
                    fish.x = fish.x + fish.fishSpeed;
                }
                else {
                    // MOVING THE FISH TO THE LEFT
                    fish.x = fish.x - fish.fishSpeed;
                }

                // CHECK IF THE FISH IS NOT VISIBLE (RIGHT SIDE)
                if (fish.x > 650) {
                    // RESTORING THE ORIGINAL FISH SPEED
                    fish.fishSpeed = 1;

                    // CHANGING THE FISH ORIENTATION
                    fish.scale = -1;

                    // CHANGING THE FISH Y POSITION TO A RANDOM VALUE
                    fish.y = getRandomY();

                    // CHANGING THE FISH ANGLE TO A RANDOM VALUE
                    fish.angle = getRandomAngle();
                }

                // CHECK IF THE FISH IS NOT VISIBLE (LEFT SIDE)
                else if (fish.x < -70) {
                    // RESTORING THE ORIGINAL FISH SPEED
                    fish.fishSpeed = 1;

                    // CHANGING THE FISH ORIENTATION
                    fish.scale = 1;

                    // CHANGING THE FISH Y POSITION TO A RANDOM VALUE
                    fish.y = getRandomY();

                    // CHANGING THE FISH ANGLE TO A RANDOM VALUE
                    fish.angle = getRandomAngle();
                }

                // CHECK IF THE FISH IS NOT VISIBLE (TOP SIDE)
                if (fish.y < -70) {
                    // MOVING THE FISH TO THE LEFT SIDE
                    fish.x = -70;

                    // CHANGING THE FISH Y POSITION TO A RANDOM VALUE
                    fish.y = getRandomY();

                    // RESTORING THE FISH ANGLE
                    fish.angle = 0;
                }

                // CHECK IF THE FISH IS NOT VISIBLE (BOTTOM SIDE)
                else if (fish.y > 650) {
                    // MOVING THE FISH TO THE RIGHT SIDE
                    fish.x = 650;

                    // CHANGING THE FISH Y POSITION TO A RANDOM VALUE
                    fish.y = getRandomY();

                    // RESTORING THE FISH ANGLE
                    fish.angle = 0;
                }

                // CHECK THE FISH SCALE AND ANGLE AND MOVING UP OR DOWN ACCORDINGLY
                if ((fish.scale == 1 && fish.angle == 20) || (fish.scale == -1 && fish.angle == -20)) {
                    fish.y = fish.y + fish.fishSpeed / 2;
                }
                else if ((fish.scale == 1 && fish.angle == -20) || (fish.scale == -1 && fish.angle == 20)) {
                    fish.y = fish.y - fish.fishSpeed / 2;
                }
            }

            // LOOP FOR EVERY BUBBLE
            for (var i = 0; i < bubbles.length; i++) {
                // GET A BUBBLE
                var bubble = bubbles[i];

                // MOVE THE BUBBLE
                bubble.y = bubble.y - 1;

                // CHECK IF THE BUBBLE IS NOT VISIBLE
                if (bubble.y < -150) {
                    // MOVE THE BUBBLE DOWN
                    bubble.x = getRandomBubbleX(bubble.columnIndex);
                    bubble.y = getRandomBubbleY();
                }
            }
        }

    </script>

</body>

</html>
```

## References

- [Aquarium](https://haddley.github.io/aquarium/index.html)