var gameScreenWidth = 400,
    gameScreenHeight = 490;
var game = new Phaser.Game(gameScreenWidth,gameScreenHeight, Phaser.AUTO, 'gameDiv');

var mainState = {
    preload: function(){
        // Change the background color.
        game.stage.backgroundColor = '#000000';

        // Load the bird's sprite.
        game.load.image('bird', 'app/resources/images/assets/bird.png');
    },

    create: function(){
        // Set the physics system.
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Add the bird to the game screen.
        this.bird = this.game.add.sprite(100, 245, 'bird');

        // Add gravity to bird
        game.physics.arcade.enable(this.bird);
        this.bird.body.gravity.y = 1000;

        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
            homeKey = this.game.input.keyboard.addKey(Phaser.Keyboard.HOME);

        // Call jump function when space key is pressed.
        spaceKey.onDown.add(this.jump, this);
        // Restart game when home button is pressed.
        homeKey.onDown.add(this.restartGame, this);
    },

    update: function(){
        if(this.bird.position.y > (gameScreenHeight - this.bird.height)){
            this.bird.body.gravity.y = 0;
            this.bird.body.velocity.y = 0;
        }
    },

    // make the bird jump.
    jump: function(){
        this.bird.body.velocity.y = -350;
        this.bird.body.gravity.y = 1000;
    },

    restartGame: function(){
        this.game.state.start('main');
    }
};

game.state.add('main', mainState);
game.state.start('main');