var MonsterButton = (function (_super) {
    __extends(MonsterButton, _super);
    function MonsterButton(id) {
        _super.call(this, id);
        SceneService.getInstance().addButton(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    }
    var d = __define,c=MonsterButton,p=c.prototype;
    p.onButtonClick = function () {
        SceneService.getInstance().killMonster(this);
    };
    return MonsterButton;
}(Button));
egret.registerClass(MonsterButton,'MonsterButton');
//# sourceMappingURL=MonsterButton.js.map