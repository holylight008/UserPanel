let VELOCITY:number=2;//x，y方向的帧速率都是2px/s
let PICTURECHANGERATE=15;//1/4S改变一次图片和位置
let oneFaceNumber=4;
let faceNumber=4;
let RIGHT=0;
let DOWN=1;
let LEFT=2;
let UP=3;
let offSetOfPlayer=100;//人物相对一个格子的位移偏移量


interface State{
    OnEnter():void;
    OnExit():void;
}

class MoveState implements State{
    private movePicture:egret.Texture[][];
    private currentFace:number;
    private player:Player;
    private currentPicture:number;
    private targetTile:number;//路径数组下标
    private count:number;//帧计时器
    private targetX:number;
    private targetY:number;
    private targetFace:number;
    private path:tile[];
    //constructor(player:Player,TargetX:number,TargetY:number){
    constructor(player: Player, path: tile[]) {
        this.targetTile=0;
        this.player = player;
        this.currentPicture = 0;
        this.count = 0;
        // this.TargetX=TargetX;
        // this.TargetY=TargetY;
        this.path = path;
        this.targetX = path[path.length - 1].x;
        this.targetY = path[path.length - 1].y;
        let temp = ["r1_png", "r2_png", "r3_png", "r4_png", "d1_png", "d2_png", "d3_png", "d4_png", "l1_png", "l2_png", "l3_png", "l4_png", "u1_png", "u2_png", "u3_png", "u4_png"];
        this.movePicture = new Array();
        for (let i = 0; i < faceNumber; i++) {
            this.movePicture[i] = new Array();
        }
        for (let i = 0, count = 0; i < faceNumber; i++) {
            for (let j = 0; j < oneFaceNumber; j++) {
                this.movePicture[i][j] = RES.getRes(temp[count]);
                count++;
            }
        }
        this.currentFace = DOWN;
    }
    OnEnter():void{
        let dx=this.targetX-this.player.x;
        let dy=this.targetY-this.player.y;
        // let distance=Math.sqrt(dx*dx+dy*dy);
        // egret.Tween.get(this.player).to({x:this.TargetX,y:this.TargetY},distance/this.player.volocity).call(()=>{
        //     this.player.Macine.ChangeState(new IdleState(this.player));
        // },this);
        this.chooseFace(dx,dy);
        this.currentFace=this.targetFace;
        // console.log("第一次选择以后朝向："+this.currentFace);
        //console.log("("+this.player.x+","+this.player.y+")"+"dy="+dy+"  dx="+dx+"  targetFace="+this.targetFace);
        egret.startTick(this.enter,this);
    }
    private enter():boolean{
        this.count++;
        // console.log("当前人物位置：("+ this.player.x+","+ this.player.y +")");
        // console.log("当前目标位置：("+this.path[this.targetTile].x+","+this.path[this.targetTile].y+")");
        if(this.count%PICTURECHANGERATE==0){
            this.currentPicture++;
            this.currentPicture%=this.movePicture.length;
            this.player.MyPlayer.texture=this.movePicture[this.targetFace][this.currentPicture];
            this.count=0;
        }
        
        if (this.player.x < this.path[this.targetTile].x) {
            this.player.x += VELOCITY;
        }else if(this.player.x > this.path[this.targetTile].x) {
            this.player.x -= VELOCITY;
        }
        if ( this.player.y < this.path[this.targetTile].y) {
            this.player.y += VELOCITY;
        }else if(this.player.y > this.path[this.targetTile].y){
            this.player.y -= VELOCITY;
        }
        // console.log("当前帧渲染后人物位置：("+this.player.x+","+this.player.y+")");
        if ( this.player.x == this.path[this.targetTile].x && this.player.y == this.path[this.targetTile].y) {
            if (this.targetTile == this.path.length - 1) {
                this.player.Macine.ChangeState(new IdleState(this.player));
            } else {
                // console.log("到达第"+this.targetTile+"块转时的朝向"+this.currentFace);
                this.targetTile++;
                let dx = this.path[this.targetTile].x - this.player.x;
                let dy = this.path[this.targetTile].y - this.player.y;
                this.chooseFace(dx, dy);
                this.currentFace=this.targetFace;
                // console.log("目标为第"+this.targetTile+"块转时的朝向"+this.currentFace);
            }
        }
        return true;
    }
    OnExit():void{
        egret.stopTick(this.enter,this);
        // egret.Tween.removeTweens(this.player);
        this.count=0;
    }
    private chooseFace(dx: number, dy: number) {
        if (dy >= 0) {
            if (Math.abs(dy) >= Math.abs(dx)) {
                this.targetFace = 1;
            } else if (dx > 0) {
                this.targetFace = 0;
            } else {
                this.targetFace = 2;
            }
        } else {
            if (Math.abs(dy) >= Math.abs(dx)) {
                this.targetFace = 3;
            } else if (dx >= 0) {
                this.targetFace = 0;
            } if (dx < 0) {
                this.targetFace = 2;
            }
        }
    }
}



class IdleState implements State{
    private player:Player;
    private IdlePicture:egret.Texture[];
    private CurrentPicture:number;
    private count:number;
    constructor(player:Player){
        this.player=player;
        this.CurrentPicture=0;
        this.count=0;
        let temp=["i1_png","i2_png","i3_png","i4_png","i5_png"];
        this.IdlePicture=new Array();
        for(let i=0;i<temp.length;i++){
            this.IdlePicture.push(RES.getRes(temp[i]));
        }
    }
    OnEnter():void{
        egret.startTick(this.enter,this);
    }
    private enter():boolean{
        this.count++;
        if(this.count%PICTURECHANGERATE==0){
            this.CurrentPicture++;
            this.CurrentPicture%=this.IdlePicture.length;
            this.player.MyPlayer.texture=this.IdlePicture[this.CurrentPicture];
            this.count=0;
        }
        return true;
    }
    OnExit():void{
        egret.stopTick(this.enter,this);
        // egret.Tween.removeTweens(this.player);
        this.count=0;
    }
}



class StateMacine{
    private CurrentState:State;
    private Myplayer:Player;
    public constructor(x:Player){
        this.Myplayer=x;
        this.CurrentState=new IdleState(x);
        this.CurrentState.OnEnter();
    }
    public ChangeState(e:State):void{
        this.CurrentState.OnExit();
        e.OnEnter();
        this.CurrentState = e;
    }

}



class Player extends egret.DisplayObjectContainer{
    constructor(){
        super();
        this.volocity=VELOCITY;
        this.MyPlayer=this.createBitmapByName("b1_png");
        this.Macine=new StateMacine(this);
        this.addChild(this.MyPlayer);
        this.width=this.MyPlayer.width;
        this.height=this.MyPlayer.height;
        this.MyPlayer.x=0;
        this.MyPlayer.y=-40;
    }
    public Macine:StateMacine;
    public MyPlayer:egret.Bitmap;
    public volocity:number;
    private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}