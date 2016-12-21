class MonsterButton extends Button{
    constructor(id:string){
        super(id);
        SceneService.getInstance().addButton(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onButtonClick,this);
    }
    public onButtonClick(){
        SceneService.getInstance().killMonster(this);
    }
}