class NPC extends egret.DisplayObjectContainer implements Observer{
    private emoji:egret.Bitmap;
    private id:string;
    private myBitmap:egret.Bitmap;
    private myTask:Task[];

    constructor(id:string,tex:string){
        super();
        
        this.myBitmap=new egret.Bitmap();
        this.myBitmap.texture=RES.getRes(tex);
        this.myBitmap.x=0;
        this.myBitmap.y=0;
        this.addChild(this.myBitmap);

        this.id = id;

        this.myTask=new Array();

        var taskService:TaskService=TaskService.getInstance();
        taskService.addObserver(this);
        var flag=Task.UNACCEPTALBE;
        taskService.getTaskByCustomRole((taskList:Task[])=>{
            for(var i=0;i<taskList.length;i++){
                if(taskList[i].getToID().match(this.id) ||taskList[i].getFromID().match(this.id)){
                    this.myTask.push(taskList[i]);
                    if(taskList[i].getStatus()==Task.CAN_SUBMIT && taskList[i].getToID().match(this.id)){
                        flag=Task.CAN_SUBMIT;
                    }else if(taskList[i].getStatus()==Task.ACCEPTABLE && taskList[i].getFromID().match(this.id)){
                        flag=Task.ACCEPTABLE;
                    }else if(taskList[i].getStatus()==Task.DURING){
                        flag=Task.DURING;
                    }
                }
            }
        });

        this.emoji=new egret.Bitmap();
        if(flag==Task.ACCEPTABLE){
            this.emoji.texture=RES.getRes("ACCEPTABLE_png");
        }else if(flag==Task.CAN_SUBMIT){
            this.emoji.texture=RES.getRes("CAN_SUBMIT_png");
        }else if(flag==Task.DURING){
            this.emoji.texture=RES.getRes("DURING_png");
        }
        
        this.emoji.x=0;
        this.emoji.y=-50;
        this.addChild(this.emoji);

        
        this.width = this.myBitmap.width;
        this.height=this.myBitmap.height;
        
        this.myBitmap.touchEnabled=true;
        this.myBitmap.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onNPCClick,this);
    }
    onChange(task:Task):void{
        if(task.getStatus()==Task.ACCEPTABLE && task.getFromID().match(this.id)){
            this.emoji.texture=RES.getRes("ACCEPTABLE_png");
        }else if(task.getStatus()==Task.CAN_SUBMIT && task.getToID().match(this.id)){
            this.emoji.texture=RES.getRes("CAN_SUBMIT_png");
        }else if(task.getStatus()==Task.DURING && task.getToID().match(this.id)){
            this.emoji.texture=RES.getRes("DURING_png");
        }else{
            this.emoji.texture=RES.getRes("");
        }
    }
    onNPCClick():void{
        var dialogPanel:DialogPanel=DialogPanel.getInstance();
        dialogPanel.addTask(this.myTask,this.id);
    }
}