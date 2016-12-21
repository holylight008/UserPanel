var TaskPanel = (function (_super) {
    __extends(TaskPanel, _super);
    function TaskPanel() {
        var _this = this;
        _super.call(this);
        this.myPanel = new egret.Bitmap();
        this.myPanel.texture = RES.getRes("taskPanel_jpg");
        this.addChild(this.myPanel);
        var taskService = TaskService.getInstance();
        taskService.addObserver(this);
        taskService.getTaskByCustomRole(function (taskList) {
            _this.taskList = taskList;
        });
        this.textField = new egret.TextField();
        this.textField.size = 20;
        for (var i = 0; i < this.taskList.length; i++) {
            this.textField.appendText(this.taskList[i].getID() + "\n" + this.taskList[i].toString() + "\n");
        }
        this.textField.x = 0;
        this.textField.y = 0;
        this.addChild(this.textField);
    }
    var d = __define,c=TaskPanel,p=c.prototype;
    p.onChange = function (task) {
        this.textField.text = "";
        for (var i = 0; i < this.taskList.length; i++) {
            this.textField.appendText(this.taskList[i].getID() + "\n" + this.taskList[i].toString() + "\n");
        }
    };
    return TaskPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(TaskPanel,'TaskPanel',["Observer"]);
//# sourceMappingURL=TaskPanel.js.map