//http://www.lessmilk.com/tutorial/flappy-bird-phaser-1

// Create our 'main' state that will contain the game
var mainState = {
    preload: function () {
        // Load the bird sprite
        game.load.image('bird', 'assets/bird.png');
        game.load.image('pipe', 'assets/pipe.png');
    },

    create: function () {

        this.score = 0;
        this.highscore = 0;

        this.labelScore = game.add.text(20, 20, "0",
            { font: "30px Arial", fill: "#000000" });

        this.labelHighScore = game.add.text(200, 20, "0",
            { font: "30px Arial", fill: "#000000" });

        // Create an empty group
        this.pipes = game.add.group();

        // Change the background color of the game to blue
        game.stage.backgroundColor = '#e6e6e6';

        // Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Display the bird at the position x=100 and y=245
        this.bird = game.add.sprite(100, 245, 'bird');

        // Add physics to the bird
        // Needed for: movements, gravity, collisions, etc.
        game.physics.arcade.enable(this.bird);

        // Add gravity to the bird to make it fall
        this.bird.body.gravity.y = 1000;

        // Call the 'jump' function when the spacekey is hit
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        spaceKey.onDown.add(this.jump, this);

        // add mouse/touch controls
        this.input.onDown.add(this.jump, this);

        this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);

    },

    update: function () {
        // If the bird is out of the screen (too high or too low)
        // Call the 'restartGame' function
        if (this.bird.y < 0 || this.bird.y > 490)
            this.resetGame();

        game.physics.arcade.overlap(
            this.bird, this.pipes, this.resetGame, null, this);
    },
    // Make the bird jump 
    jump: function () {
        // Add a vertical velocity to the bird
        this.bird.body.velocity.y = -350;
    },

    // Restart the game
    restartGame: function () {
        // Start the 'main' state, which restarts the game
        game.state.start('main');
    },

    resetGame: function(){
        this.score = 0;
        this.bird.y = 245;
        this.bird.body.velocity.y = 0;
        this.pipes.removeAll();
    },

    addOnePipe: function (x, y) {
        // Create a pipe at the position x and y
        var pipe = game.add.sprite(x, y, 'pipe');

        // Add the pipe to our previously created group
        this.pipes.add(pipe);

        // Enable physics on the pipe 
        game.physics.arcade.enable(pipe);

        // Add velocity to the pipe to make it move left
        pipe.body.velocity.x = -200;

        // Automatically kill the pipe when it's no longer visible 
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },

    addRowOfPipes: function () {

        this.score += 1;
        this.labelScore.text = this.score;

        if (this.score>this.highscore){
            this.highscore = this.score
            this.labelHighScore.text=this.highscore
        }
        

        // hole size?
        var size = 5

        // reduce size for advanced levels
        if (this.score > 10) {
            size = 4
        }

        if (this.score > 20) {
            size = 3
        }

        if (this.score > 30) {
            size = 2
        }

        if (this.score > 40) {
            size = 1
        }

        // Randomly pick a number between 1 and 3
        // This will be the hole position
        var hole = Math.floor(Math.random() * (9-size));

        // Add the 6 - size pipes 
        // With one big hole at position 'hole', 'hole + 1' 'hole + 2' ...
        for (var i = 0; i < 8; i++)
            if (i < hole || i >= (hole + size))
                this.addOnePipe(400, i * 60 + 10);
    },


};


//debugger;

// Initialize Phaser, and create a 400px by 490px game
//var game = new Phaser.Game(400, 490);
//var game = new Phaser.Game($window.innerWidth, $window.innerHeight, Phaser.CANVAS, 'gameCanvas');
var game = new Phaser.Game(400, 490, Phaser.CANVAS, 'gameCanvas');

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState);

// Start the state to actually start the game
game.state.start('main');