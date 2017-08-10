// phina.js をグローバル領域に展開
phina.globalize();
//ASSETS
var ASSETS = {
    image: {
        'neko': 'pic/nekoall.png'
    }
};
//定数宣言
var SCREEN_WIDTH = 1200;
var SCREEN_HEIGHT = 900;
var GRAVITY = 1;
var GROUND_FACE = 850;
var CEILING = 10;
var JUMP_POWER = -20;
var NUMBER_OF_MARU = 3;
//参照用
var MAIN;

// MainScene クラスを定義
phina.define('MainScene', {
    superClass: 'DisplayScene',
    timer: 0,
    init: function(options) {
        this.superInit(options);
        //参照を渡す
        MAIN = this;
        // 背景色を指定
        this.backgroundColor = 'skyblue';
        //nekoを生成
        this.neko = Neko().addChildTo(this);
        this.neko.x = this.gridX.center();
        this.neko.y = this.gridY.center();

        //maruを追加
        for (i = 0; i < NUMBER_OF_MARU; i++) {
            var maru = Maru({
                fill: 'gray',
            }, this.neko).addChildTo(this);
            maru.x = SCREEN_WIDTH * 2 + (SCREEN_WIDTH / 3) * i;
            maru.y = Math.randint(CEILING, GROUND_FACE);
        }
    },
    onpointend: function() {
        this.neko.jump();
    },
    update: function() {
        this.timer++
    },
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
            this.physical.velocity.y = this.physical.velocity.y * -1;
        } //天井に当たる
        else if (this.top < CEILING) {
            if (this.physical.velocity.y < 0) {
                this.physical.velocity.y = 0;
                this.top = CEILING;
            }
        }
    },
});
//Maruクラスの定義
phina.define('Maru', {
    superClass: 'RectangleShape',
    init: function(option, enemy) {
        this.superInit(option);
        this.physical.velocity.x = -10;
        this.enemy = enemy;
    },
    update: function() {
        if (this.right < 0) {
            this.left = SCREEN_WIDTH;
            this.y = Math.randint(CEILING, GROUND_FACE);
        }
        if (this.hitTestElement(this.enemy)) {
            MAIN.exit();
        }
    },
});
//結果表示Scene
phina.define('ResultScene', {
    superClass: 'phina.game.ResultScene',
    init: function() {
        this.superInit({
            score: ((MAIN.timer / 30) | 0) + '秒よけ続けた',
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
        });
    },
});

// メイン処理
phina.main(function() {
    // アプリケーション生成
    var app = GameApp({
        startLabel: 'title', // メインシーンから開始する
        assets: ASSETS,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        title: 'よけろねこ',
    });
    // アプリケーション実行
    app.run();
});
