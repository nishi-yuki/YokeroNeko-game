// phina.js をグローバル領域に展開
phina.globalize();
//ASSETS
var ASSETS = {
    image :  {
        'neko' : 'pic/neko.png'}
};
//定数宣言
var GRAVITY = 1;
var GROUND_FACE ;
var CEILING = 10;

// MainScene クラスを定義
phina.define('MainScene', {
  superClass: 'CanvasScene',
  init: function() {
    this.superInit();
    // 背景色を指定
    this.backgroundColor = 'skyblue';
    
    var neko = Sprite('neko').addChildTo(this);
    neko.x = this.gridX.center(); 
    neko.y = this.gridY.center();
    neko.width = 128;
    neko.height = 128;
    
    neko.xcenter = this.gridX.center(); 
    neko.ycenter = this.gridY.center();
    GROUND_FACE = this.gridY.center()+200;
    // 画面タッチ時処理 
    this.onpointend = function() {
        neko.physical.velocity.y = -20;
    }
    
    neko.update = function(){
        //床で止まる処理
        if(neko.y > GROUND_FACE + 10){
              this.physical.gravity.y = 0;
              this.physical.velocity.y = this.physical.velocity.y * -0.5;
              this.y = GROUND_FACE + 5;
        }
        if(neko.y < GROUND_FACE){
              this.physical.gravity.y = GRAVITY;
        }
        //天井処理
        /*
        if(neko.y < CEILING){
          if(this.physical.velocity.y < 0)
            this.physical.velocity.y = this.physical.velocity.y * -1;
        }
        */
    };
    
  }
});

// メイン処理
phina.main(function() {
  // アプリケーション生成
  var app = GameApp({
    startLabel: 'main', // メインシーンから開始する
    assets : ASSETS
  });
  // アプリケーション実行
  app.run();
});
