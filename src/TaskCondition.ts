
interface TaskConditionContext{
    setCurrent():void;
    onFinish():void;
}

interface TaskCondition{
    onAccept(task: TaskConditionContext);
}

class NPCTalkTaskCondition implements TaskCondition{
    onAccept(task:TaskConditionContext){
        task.onFinish();
    }
}
class KillMonsterTaskCondition implements TaskCondition{
    private onAcceptButton:boolean=true;
    onAccept(task:TaskConditionContext){
        if(!this.onAcceptButton){
            task.setCurrent();
        }
        this.onAcceptButton=false;
    }
}