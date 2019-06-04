var GameOver = function(game){
	
};


GameOver.prototype = {
	preload: function(){
		this.logo = this.add.sprite((this.game.width * 0.5)-300,(this.game.height * 0.5)-256, "logo");
		this.timeup = this.add.sprite((this.game.width * 0.5)-500,(this.game.height * 0.5)+100, "timeup")
	},

	create: function(){
		this.btn = this.add.button(550,600,"Button", this.startGame, this,0,1,2,3);
		this.btn.anchor.setTo(-1,0.5);
	},

	update: function(){

  },
  startGame : function()
	{
		this.game.state.start("Main");
	}


}
