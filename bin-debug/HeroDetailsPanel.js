var HeroDetailsPanel = (function (_super) {
    __extends(HeroDetailsPanel, _super);
    function HeroDetailsPanel() {
        _super.call(this);
        var bj = new egret.Bitmap();
        bj.x = 0;
        bj.y = 0;
        bj.width = 400;
        bj.height = 640;
        bj.texture = RES.getRes("heroDetails_jpg");
        this.addChild(bj);
        var myPlayer = new egret.Bitmap();
        myPlayer.texture = RES.getRes("d1_png");
        myPlayer.x = 150;
        myPlayer.y = 200;
        myPlayer.scaleX = 2;
        myPlayer.scaleY = 2;
        this.addChild(myPlayer);
        this.hero = User.getInstance().heros;
        this.equipment = this.hero[0].equipments;
        this.text = new Array();
        this.icon = new Array();
        this.desc = new egret.TextField();
        this.desc.x = 108;
        this.desc.y = 400;
        this.desc.width = 300;
        this.desc.height = 300;
        this.desc.textColor = 0xbb1525;
        this.desc.size = 25;
        this.addChild(this.desc);
        this.textInit();
        this.iconInit();
    }
    var d = __define,c=HeroDetailsPanel,p=c.prototype;
    p.textInit = function () {
        for (var _i = 0, _a = this.hero[0].equipments; _i < _a.length; _i++) {
            var e = _a[_i];
            var tf = PropertiesDisplayUtils.getAllProperties(e.properties);
            var jewll = e.jewlls;
            console.log("before" + " " + tf.text);
            for (var _b = 0, jewll_1 = jewll; _b < jewll_1.length; _b++) {
                var j = jewll_1[_b];
                tf.appendText(PropertiesDisplayUtils.getAllProperties(j.properties).text);
            }
            this.text.push(tf);
            console.log("after" + " " + tf.text);
        }
    };
    p.iconInit = function () {
        var _this = this;
        var w1 = new egret.Bitmap();
        w1.texture = RES.getRes("w1_jpg");
        w1.x = 0;
        w1.y = 0;
        w1.width = 108;
        w1.height = 150;
        w1.touchEnabled = true;
        w1.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            _this.desc.text = _this.text[0].text;
        }, this);
        this.icon.push(w1);
        this.addChild(w1);
        var w2 = new egret.Bitmap();
        w2.x = 150;
        w2.y = 0;
        w2.width = 108;
        w2.height = 150;
        w2.texture = RES.getRes("w2_jpg");
        w2.touchEnabled = true;
        w2.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            _this.desc.text = _this.text[1].text;
        }, this);
        this.icon.push(w2);
        this.addChild(w2);
        var w3 = new egret.Bitmap();
        w3.x = 300;
        w3.y = 0;
        w3.width = 108;
        w3.height = 150;
        w3.texture = RES.getRes("w3_jpg");
        w3.touchEnabled = true;
        w3.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            _this.desc.text = _this.text[2].text;
        }, this);
        this.icon.push(w3);
        this.addChild(w3);
        var w4 = new egret.Bitmap();
        w4.x = 0;
        w4.y = 400;
        w4.width = 108;
        w4.height = 150;
        w4.texture = RES.getRes("w4_jpg");
        w4.touchEnabled = true;
        w4.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            _this.desc.text = _this.text[3].text;
        }, this);
        this.icon.push(w4);
        this.addChild(w4);
    };
    return HeroDetailsPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(HeroDetailsPanel,'HeroDetailsPanel');
//# sourceMappingURL=HeroDetailsPanel.js.map