var Button = (function (_super) {
    __extends(Button, _super);
    function Button(id) {
        _super.call(this);
        this.myButton = new egret.Bitmap();
        this.myButton.texture = RES.getRes(id);
        this.addChild(this.myButton);
        this.touchEnabled = true;
        this.width = this.myButton.width;
        this.height = this.myButton.height;
        this.touchEnabled = true;
        this.id = id;
    }
    var d = __define,c=Button,p=c.prototype;
    p.getId = function () {
        return this.id;
    };
    return Button;
}(egret.DisplayObjectContainer));
egret.registerClass(Button,'Button');
//# sourceMappingURL=Button.js.map