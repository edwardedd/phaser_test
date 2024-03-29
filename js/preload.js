var Preload = function(game){};

Preload.prototype = {

  preload: function(){
    var me = this;
    me.game.load.image('blue', 'assets/gem-01.png');
    me.game.load.image('green', 'assets/gem-02.png');
    me.game.load.image('red', 'assets/gem-03.png');
    me.game.load.image('yellow', 'assets/gem-04.png'); 
    me.game.load.image('sky', 'assets/gem-05.png');
    me.game.load.image('pink', 'assets/gem-06.png');
    me.game.load.spritesheet('Button', 'assets/btn-play.png',300,100);
    me.game.load.image('logo', 'assets/donuts_logo.png'); 
    me.game.load.image('timeup', 'assets/timeup.png');  
    me.game.load.audio('music', 'sounds/background.mp3') ;
    me.game.load.image('background', 'assets/background.jpg',300,300);
    me.game.load.image('score', 'assets/score.png',300,300)    
  },
  
  create: function(){
    var me = this;
    me.game.state.start("MainMenu");
  }
 
}
