var GameOver = function(game){

};


GameOver.prototype = {
  preload: function(){
    var me = this;
    me.logo = me.add.sprite((me.game.width * 0.5)-300,(me.game.height * 0.5)-256, "logo");
    me.timeup = me.add.sprite((me.game.width * 0.5)-250,(me.game.height * 0.5)+200, "timeup")
  },

  create: function(){
    var me = this;
    me.btn = me.add.button(-10,460,"Button", me.startGame, me,0,1,2,3);
    me.btn.anchor.setTo(-1,0.5);
  },

  update: function(){

  },
  startGame : function()
  {
    var me = this;
    me.game.state.start("Main");
  }


}
