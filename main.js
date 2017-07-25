// phina.js をグローバル領域に展開
phina.globalize();
//ASSETS
var ASSETS = {
    image: {
        'neko': 'pic/neko.png'
    }
};
//定数宣言
var SCREEN_WIDTH = 1200;
var SCREEN_HEIGHT = 900;
var GRAVITY = 1;
var GROUND_FACE = 850;
var CEILING = 10;
var JUMP_POWER = -20;

// MainScene クラスを定義
phina.define('MainScene', {
    superClass: 'DisplayScene',
    init: function(options) {
        this.superInit(options);
        // 背景色を指定
        this.backgroundColor = 'skyblue';
        //nekoを生成
        var neko = Neko().addChildTo(this);
        neko.x = this.gridX.center();
        neko.y = this.gridY.center();

        //maruを追加
        var maru = CircleShape({
            fill: 'gray',
        }).addChildTo(this);
        maru.physical.velocity.x = -10;
        // 画面タッチ時処理 
        this.onpointend = function() {
                neko.jump();
            }
            //maruの挙動
        maru.update = function() {
            if (maru.x < 10) {
                maru.x = SCREEN_WIDTH;
                maru.y = Math.randint(0, SCREEN_HEIGHT);
            }
        };
    }
});
//nekoクラス
phina.define('Neko', {
    superClass: 'Sprite',
    init: function() {
        this.superInit('neko');
        this.width = 128;
        this.height = 128;
        this.physical.gravity.y = GRAVITY;
    },
    jump: function() {
        this.physical.velocity.y = JUMP_POWER;
    },
    update: function() {
        //床で跳ねる
        if (this.bottom > GROUND_FACE) {
            this.bottom = GROUND_FACE - 5;
            this.physical.velocity.y = this.physical.velocity.y * -0.5;
        } //天井に当たる
        else if (this.top < CEILING) {
            if (this.physical.velocity.y < 0) {
                this.physical.velocity.y = 0;
            }
        }
    },
});
// メイン処理
phina.main(function() {
    // アプリケーション生成
    var app = GameApp({
        startLabel: 'main', // メインシーンから開始する
        assets: ASSETS,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    });
    // アプリケーション実行
    app.run();
});