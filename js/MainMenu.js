var MainMenu = function(game){

};

MainMenu.prototype = {
	preload: function(){
		var me = this;
		me.logo = me.add.sprite((me.game.width * 0.5)-300,(me.game.height * 0.5)-256, "logo")
	},

	create: function(){
		var me = this;
		me.btn = me.add.button(550,600,"Button", me.startGame, me,0,1,2,3);
		me.btn.anchor.setTo(-1,0.5);
		me.music = me.add.audio('music',1,true,true);
		me.music.play();
	},

	update: function(){

	},

	startGame : function()
	{
		var me = this;
		me.game.state.start("Main");
	}

}