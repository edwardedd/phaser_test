var Preload = function(game){};

Preload.prototype = {

    preload: function(){
        this.game.load.image('blue', 'assets/gem-01.png');
        this.game.load.image('green', 'assets/gem-02.png');
        this.game.load.image('red', 'assets/gem-03.png');
        this.game.load.image('yellow', 'assets/gem-04.png'); 
        this.game.load.image('sky', 'assets/gem-05.png');
        this.game.load.image('pink', 'assets/gem-06.png');
        this.game.load.spritesheet('Button', 'assets/btn-play.png',300,100);
        this.game.load.image('logo', 'assets/donuts_logo.png'); 
        this.game.load.image('timeup', 'assets/timeup.png');  
        this.game.load.audio('music', 'sounds/background.mp3')   
    },
    
    create: function(){
        this.game.state.start("MainMenu");
    }
 
}
