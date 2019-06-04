var MainMenu = function(game){

};

MainMenu.prototype = {
	preload: function(){
		this.logo = this.add.sprite((this.game.width * 0.5)-300,(this.game.height * 0.5)-256, "logo")
	},

	create: function(){
		this.btn = this.add.button(550,600,"Button", this.startGame, this,0,1,2,3);
		this.btn.anchor.setTo(-1,0.5);
		this.music = this.add.audio('music',1,true,true);
		this.music.play();
	},

	update: function(){

	},

	startGame : function()
	{
		this.game.state.start("Main");
	}

}