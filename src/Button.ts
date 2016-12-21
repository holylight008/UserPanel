class Button extends egret.DisplayObjectContainer{
    private id:string;
    private myButton:egret.Bitmap;
    constructor(id:string){
        super();
        this.myButton=new egret.Bitmap();
        this.myButton.texture=RES.getRes(id);
        this.addChild(this.myButton);
        this.touchEnabled=true;
        this.width=this.myButton.width;
        this.height=this.myButton.height;
        this.touchEnabled=true;

        this.id=id;
    }
    public getId():string{
        return this.id;
    }
}