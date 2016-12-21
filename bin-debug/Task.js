var Task = (function () {
    function Task(id, fromID, toID, status, condition, total, targetMonster, laterTask) {
        this.id = id;
        this.fromNpcId = fromID;
        this.toNpcId = toID;
        this.status = status;
        this.current = 0;
        this.total = total;
        this.condition = condition;
        this.targetMonster = targetMonster;
        this.nextTask = laterTask;
        TaskService.getInstance().addTask(this);
        SceneService.getInstance().addTask(this);
    }
    var d = __define,c=Task,p=c.prototype;
    p.getFromID = function () {
        return this.fromNpcId;
    };
    p.getToID = function () {
        return this.toNpcId;
    };
    p.getStatus = function () {
        return this.status;
    };
    p.setStatus = function (newStatus) {
        this.status = newStatus;
    };
    p.getID = function () {
        return this.id;
    };
    p.getCondition = function () {
        return this.condition;
    };
    p.getTargetMonster = function () {
        return this.targetMonster;
    };
    p.getNextTask = function () {
        return this.nextTask;
    };
    //接受任务
    p.onAccept = function () {
        TaskService.getInstance().accept(this.id);
        this.condition.onAccept(this);
    };
    //任务提交
    p.onSubmit = function () {
        TaskService.getInstance().over(this.getID());
    };
    //任务完成
    p.onFinish = function () {
        TaskService.getInstance().finish(this.getID());
    };
    //杀怪进行中
    p.setCurrent = function () {
        this.current++;
        if (this.current == this.total) {
            this.onFinish();
        }
    };
    p.toString = function () {
        if (this.status == Task.ACCEPTABLE) {
            return "ACCEPTABLE";
        }
        else if (this.status == Task.CAN_SUBMIT) {
            return "CAN_SUBMIT";
        }
        else if (this.status == Task.DURING) {
            return "DURING";
        }
        else if (this.status == Task.SUBMITTED) {
            return "SUBMITTED";
        }
        else if (this.status == Task.UNACCEPTALBE) {
            return "UNACCEPTALBE";
        }
    };
    Task.UNACCEPTALBE = 0;
    Task.ACCEPTABLE = 1;
    Task.DURING = 2;
    Task.CAN_SUBMIT = 3;
    Task.SUBMITTED = 4;
    return Task;
}());
egret.registerClass(Task,'Task',["TaskConditionContext"]);
//# sourceMappingURL=Task.js.map