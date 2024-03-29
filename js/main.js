var Main = function(game){

};

Main.prototype = {
  create: function() {
    var me = this;
    // me.game.stage.backgroundColor = "34495f";
    me.bgrd = me.add.sprite(0,0,"background");
    me.bgrd.height = 700;
    me.bgrd.width = 700;
    me.bgrd.scale.x = 1;
    me.bgrd.scale.y = 1;

    me.tileTypes = [
      'blue',
      'green',
      'red',
      'yellow',
      'pink',
      'sky'
    ];

    me.score = me.add.sprite(100,580,"score");
    me.score.height = 300;
    me.score.width = 400;
    me.score.scale.x = 0.8;
    me.score.scale.y = 0.8;

    me.score = 0;
    me.seconds = 20;
    me.activeTile1 = null;
    me.activeTile2 = null;
    me.canMove = false;
    me.tileWidth = me.game.cache.getImage('blue').width;
    me.tileHeight = me.game.cache.getImage('blue').height;
    me.tiles = me.game.add.group();
    me.tileGrid = [
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null]
    ];

    var seed = Date.now();
    me.random = new Phaser.RandomDataGenerator([seed]);
    me.initTiles();
    me.createScore();
    me.createCounter();
    me.updateCounter()

  },

  update: function() {

    var me = this;
    if(me.activeTile1 && !me.activeTile2){
      var hoverX = me.game.input.x;
      var hoverY = me.game.input.y;
      var hoverPosX = Math.floor(hoverX/me.tileWidth);
      var hoverPosY = Math.floor(hoverY/me.tileHeight);
      var difX = (hoverPosX - me.startPosX);
      var difY = (hoverPosY - me.startPosY);
      if(!(hoverPosY > me.tileGrid[0].length - 1 || hoverPosY < 0) && !(hoverPosX > me.tileGrid.length - 1 || hoverPosX < 0)){

        if((Math.abs(difY) == 1 && difX == 0) || (Math.abs(difX) == 1 && difY ==0)){
          me.canMove = false;
          me.activeTile2 = me.tileGrid[hoverPosX][hoverPosY];
          me.swapTiles();
          me.game.time.events.add(500, function(){
            me.checkMatch();
          });
        }

      }

    }

  },

  gameOver: function(){
    this.game.state.start('GameOver');
  },

  initTiles: function(){
    var me = this;
    for(var i = 0; i < me.tileGrid.length; i++){
      for(var j = 0; j < me.tileGrid.length; j++){
        var tile = me.addTile(i, j);
        me.tileGrid[i][j] = tile;
      }
    }

    me.game.time.events.add(600, function(){
      me.checkMatch();
    });

  },

  addTile: function(x, y){

    var me = this;
    var tileToAdd = me.tileTypes[me.random.integerInRange(0, me.tileTypes.length - 1)]; 
    var tile = me.tiles.create((x * me.tileWidth) + me.tileWidth / 2, 0, tileToAdd);
    me.game.add.tween(tile).to({y:y*me.tileHeight+(me.tileHeight/2)}, 500, Phaser.Easing.Linear.In, true)
    tile.anchor.setTo(0.5, 0.5);
    tile.inputEnabled = true;
    tile.tileType = tileToAdd;
    tile.events.onInputDown.add(me.tileDown, me);
    return tile;
  },

  tileDown: function(tile, pointer){

    var me = this;
    if(me.canMove){
      me.activeTile1 = tile;
      me.startPosX = (tile.x - me.tileWidth/2) / me.tileWidth;
      me.startPosY = (tile.y - me.tileHeight/2) / me.tileHeight;
    }

  },

  tileUp: function(){
    var me = this;
    me.activeTile1 = null;
    me.activeTile2 = null;

  },

  swapTiles: function(){

    var me = this;
    if(me.activeTile1 && me.activeTile2){
      var tile1Pos = {x:(me.activeTile1.x - me.tileWidth / 2) / me.tileWidth, y:(me.activeTile1.y - me.tileHeight / 2) / me.tileHeight};
      var tile2Pos = {x:(me.activeTile2.x - me.tileWidth / 2) / me.tileWidth, y:(me.activeTile2.y - me.tileHeight / 2) / me.tileHeight};
      me.tileGrid[tile1Pos.x][tile1Pos.y] = me.activeTile2;
      me.tileGrid[tile2Pos.x][tile2Pos.y] = me.activeTile1;
      me.game.add.tween(me.activeTile1).to({x:tile2Pos.x * me.tileWidth + (me.tileWidth/2), y:tile2Pos.y * me.tileHeight + (me.tileHeight/2)}, 200, Phaser.Easing.Linear.In, true);
      me.game.add.tween(me.activeTile2).to({x:tile1Pos.x * me.tileWidth + (me.tileWidth/2), y:tile1Pos.y * me.tileHeight + (me.tileHeight/2)}, 200, Phaser.Easing.Linear.In, true);

      me.activeTile1 = me.tileGrid[tile1Pos.x][tile1Pos.y];
      me.activeTile2 = me.tileGrid[tile2Pos.x][tile2Pos.y];

    }

  },

  checkMatch: function(){
    var me = this;
    var matches = me.getMatches(me.tileGrid);
    if(matches.length > 0){
      me.removeTileGroup(matches);
      me.resetTile();
      me.fillTile();
      me.game.time.events.add(500, function(){
        me.tileUp();
      });

      me.game.time.events.add(600, function(){
        me.checkMatch();
      });

    }
    else {

      me.swapTiles();
      me.game.time.events.add(500, function(){
        me.tileUp();
        me.canMove = true;
      });
    }

  },

  getMatches: function(tileGrid){

    var matches = [];
    var groups = [];

    for (var i = 0; i < tileGrid.length; i++)
    {
      var tempArr = tileGrid[i];
      groups = [];
      for (var j = 0; j < tempArr.length; j++)
      {
        if(j < tempArr.length - 2)
          if (tileGrid[i][j] && tileGrid[i][j + 1] && tileGrid[i][j + 2])
          {
            if (tileGrid[i][j].tileType == tileGrid[i][j+1].tileType && tileGrid[i][j+1].tileType == tileGrid[i][j+2].tileType)
            {
              if (groups.length > 0)
              {
                if (groups.indexOf(tileGrid[i][j]) == -1)
                {
                  matches.push(groups);
                  groups = [];
                }
              }

              if (groups.indexOf(tileGrid[i][j]) == -1)
              {
                groups.push(tileGrid[i][j]);
              }
              if (groups.indexOf(tileGrid[i][j+1]) == -1)
              {
                groups.push(tileGrid[i][j+1]);
              }
              if (groups.indexOf(tileGrid[i][j+2]) == -1)
              {
                groups.push(tileGrid[i][j+2]);
              }
            }
          }
      }
      if(groups.length > 0) matches.push(groups);
    }

    for (j = 0; j < tileGrid.length; j++)
    {
      var tempArr = tileGrid[j];
      groups = [];
      for (i = 0; i < tempArr.length; i++)
      {
        if(i < tempArr.length - 2)
          if (tileGrid[i][j] && tileGrid[i+1][j] && tileGrid[i+2][j])
          {
            if (tileGrid[i][j].tileType == tileGrid[i+1][j].tileType && tileGrid[i+1][j].tileType == tileGrid[i+2][j].tileType)
            {
              if (groups.length > 0)
              {
                if (groups.indexOf(tileGrid[i][j]) == -1)
                {
                  matches.push(groups);
                  groups = [];
                }
              }

              if (groups.indexOf(tileGrid[i][j]) == -1)
              {
                groups.push(tileGrid[i][j]);
              }
              if (groups.indexOf(tileGrid[i+1][j]) == -1)
              {
                groups.push(tileGrid[i+1][j]);
              }
              if (groups.indexOf(tileGrid[i+2][j]) == -1)
              {
                groups.push(tileGrid[i+2][j]);
              }
            }
          }
      }
      if(groups.length > 0) matches.push(groups);
    }

    return matches;

  },

  removeTileGroup: function(matches){

    var me = this;
    for(var i = 0; i < matches.length; i++){
      var tempArr = matches[i];
      for(var j = 0; j < tempArr.length; j++){

        var tile = tempArr[j];
        var tilePos = me.getTilePos(me.tileGrid, tile);
        me.tiles.remove(tile);
        me.incrementScore();
        if(tilePos.x != -1 && tilePos.y != -1){
          me.tileGrid[tilePos.x][tilePos.y] = null;
        }

      }
    }
  },

  getTilePos: function(tileGrid, tile)
  {
    var pos = {x:-1, y:-1};
    for(var i = 0; i < tileGrid.length ; i++)
    {
      for(var j = 0; j < tileGrid[i].length; j++)
      {

        if(tile == tileGrid[i][j])
        {
          pos.x = i;
          pos.y = j;
          break;
        }
      }
    }

    return pos;
  },

  resetTile: function(){
    var me = this;
    for (var i = 0; i < me.tileGrid.length; i++)
    {
      for (var j = me.tileGrid[i].length - 1; j > 0; j--)
      {
        if(me.tileGrid[i][j] == null && me.tileGrid[i][j-1] != null)
        {
          var tempTile = me.tileGrid[i][j-1];
          me.tileGrid[i][j] = tempTile;
          me.tileGrid[i][j-1] = null;

          me.game.add.tween(tempTile).to({y:(me.tileHeight*j)+(me.tileHeight/2)}, 200, Phaser.Easing.Linear.In, true);

          j = me.tileGrid[i].length;
        }
      }
    }

  },

  fillTile: function(){
    var me = this;
    for(var i = 0; i < me.tileGrid.length; i++){
      for(var j = 0; j < me.tileGrid.length; j++){
        if (me.tileGrid[i][j] == null)
        {
          var tile = me.addTile(i, j);

          me.tileGrid[i][j] = tile;
        }

      }
    }

  },

  createScore: function(){


    var me = this;
    var scoreFont = "80px Arial";
    me.scoreLabel = me.game.add.text((Math.floor(me.tileGrid[0].length / 2) * me.tileWidth),
     me.tileGrid.length * me.tileHeight+18, "0", {font: scoreFont, fill: "#fff"}); 
    me.scoreLabel.anchor.setTo(0.4, 0);
    me.scoreLabel.align = 'center';



  },

  incrementScore: function(){
    var me = this;
    me.score += 10;   
    me.scoreLabel.text = me.score;    

  },

  createCounter: function(){
    var me = this;
    var scoreFont = "80px Arial";

    me.timer = me.game.add.text((Math.floor(me.tileGrid[0].length / 2) * me.tileWidth+400),
     me.tileGrid.length * me.tileHeight-400, "2", {font: scoreFont, fill: "#fff"}); 
    me.timer.anchor.setTo(0.5, 1);
    me.timer.align = 'center';
    me.time.events.loop(1000,me.updateCounter,me);

  },

  updateCounter: function(){
    var me = this;
    me.seconds=me.seconds-1;
    me.timer.text = me.seconds;
    if(me.seconds <= 0)
    {
      me.game.state.start("GameOver")
    }

  }


};
