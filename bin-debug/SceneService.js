var SceneService = (function () {
    function SceneService() {
        ;
    }
    var d = __define,c=SceneService,p=c.prototype;
    SceneService.getInstance = function () {
        if (SceneService.sceneService != null) {
            return SceneService.sceneService;
        }
        else {
            SceneService.sceneService = new SceneService();
            SceneService.sceneService.taskList = new Array();
            SceneService.sceneService.buttonList = new Array();
            return SceneService.sceneService;
        }
        ;
    };
    p.notify = function (task) {
        task.getCondition().onAccept(task);
    };
    p.addTask = function (x) {
        this.taskList.push(x);
    };
    p.addButton = function (x) {
        this.buttonList.push(x);
    };
    p.killMonster = function (x) {
        for (var i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].getTargetMonster().match(x.getId()) &&
                this.taskList[i].getStatus() == Task.DURING) {
                this.notify(this.taskList[i]);
            }
        }
    };
    return SceneService;
}());
egret.registerClass(SceneService,'SceneService');
//# sourceMappingURL=SceneService.js.map