class SceneService {
    private taskList:Task[];
    private buttonList:Button[];
    private static sceneService:SceneService;
    constructor(){
        ;
    }
    public static getInstance(){
        if(SceneService.sceneService!=null){
            return SceneService.sceneService;
        }else{
            SceneService.sceneService=new SceneService();
            SceneService.sceneService.taskList=new Array();
            SceneService.sceneService.buttonList=new Array();
            return SceneService.sceneService;
        };
    }
    private notify(task:Task):void{
            task.getCondition().onAccept(task);
    }
    public addTask(x: Task) {
        this.taskList.push(x);
    }
    public addButton(x: Button) {
        this.buttonList.push(x);
    }
    public killMonster(x:Button):void{
        for(var i=0;i<this.taskList.length;i++){
            if(this.taskList[i].getTargetMonster().match(x.getId()) && 
            this.taskList[i].getStatus()==Task.DURING){
                this.notify(this.taskList[i]);
            }
        }
    }
}