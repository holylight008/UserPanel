
class DialogPanel extends egret.DisplayObjectContainer{
    private dialog:egret.TextField;
    private currentNPCID:string;
    private taskList:Task[];
    private finishButton:Button;
    private closeButton:Button;
    private static dialogPanel:DialogPanel;
    constructor(){
        super();
        var bj:egret.Bitmap=new egret.Bitmap();
        bj.texture=RES.getRes("dialog_jpg");
        bj.x=0;
        bj.y=0;
        this.addChild(bj);

        this.width=bj.width;
        this.height=bj.height;

        this.dialog=new egret.TextField();
        this.dialog.size=20;
        this.dialog.x=0;
        this.dialog.y=0;
        this.addChild(this.dialog);

        this.finishButton=new Button("buttonFinish_png");
        this.finishButton.x=0;
        this.finishButton.y=200;
        this.finishButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onButtonClick,this);
        this.addChild(this.finishButton);
    }
    public static getInstance():DialogPanel{
        if(DialogPanel.dialogPanel!=null){
            return DialogPanel.dialogPanel;
        }else{
            DialogPanel.dialogPanel=new DialogPanel();
            //DialogPanel.dialogPanel.taskList=new Array();
            return DialogPanel.dialogPanel;
        }
    }
    private onButtonClick():void{
        //此处有几个任务完成，接受就需要点击几次按钮，如需优化，请为每一个任务添加一个按钮，同时删去break
        for(var i=0;i<this.taskList.length;i++){
            if(this.taskList[i].getStatus()==Task.CAN_SUBMIT && this.taskList[i].getToID().match(this.currentNPCID)){
                this.taskList[i].onSubmit();
                break;
            }else if(this.taskList[i].getStatus()==Task.ACCEPTABLE && this.taskList[i].getFromID().match(this.currentNPCID)){
                this.taskList[i].onAccept();
                break;
            }
        }

        this.visible=false;
    }
    public addTask(taskList:Task[],id:string):void{
        this.taskList=taskList;
        this.refreash(id);
    }
    private refreash(id:string):void{
        this.dialog.text="";
        for(var i=0;i<this.taskList.length;i++){
            this.dialog.appendText(this.taskList[i].getID()+"\n"+this.taskList[i].toString()+"\n");
        }
        this.visible=true;
        this.currentNPCID=id;
    }
}