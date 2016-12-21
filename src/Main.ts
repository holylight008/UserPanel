//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }


    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {
        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;
        
        
        var newMap:MainMap=new MainMap();
        newMap.x=0;
        newMap.y=0;
        this.addChild(newMap);

        var Character:Player=new Player();
        Character.x=0;
        Character.y=0;
        this.addChild(Character);

        var taskService:TaskService=TaskService.getInstance();

        var task_0:Task=new Task("task_0","npc_0","npc_1",Task.ACCEPTABLE,new NPCTalkTaskCondition(),1,"null","task_1");

        var task_1:Task=new Task("task_1","npc_1","npc_1",Task.UNACCEPTALBE,new KillMonsterTaskCondition(),10,"pig_png","null");

        var taskPanel:TaskPanel=new TaskPanel();
        taskPanel.x=640;
        taskPanel.y=0;
        this.addChild(taskPanel);

        var monsterButton:MonsterButton=new MonsterButton("pig_png");
        monsterButton.x=640;
        monsterButton.y=500;
        this.addChild(monsterButton);

        var dialogPanel:DialogPanel=DialogPanel.getInstance();
        dialogPanel.x=200;
        dialogPanel.y=200;
        this.addChild(dialogPanel);
        dialogPanel.visible=false;

        var npc_0:NPC=new NPC("npc_0","npc_0_png");
        npc_0.x=128;
        npc_0.y=128;
        this.addChild(npc_0);

        var npc_1:NPC=new NPC("npc_1","npc_1_png");
        npc_1.x=576;
        npc_1.y=576;
        this.addChild(npc_1);

        
        
        newMap.addEventListener(egret.TouchEvent.TOUCH_TAP,(evt:egret.TouchEvent)=>{
            let startTile: tile = new tile();
            startTile.x = Math.floor(Character.x / ONETILESIZE);
            startTile.y = Math.floor(Character.y / ONETILESIZE);
            let endTile: tile = new tile();
            endTile.x = Math.floor(evt.stageX / ONETILESIZE);
            endTile.y = Math.floor(evt.stageY / ONETILESIZE);
            // console.log("start:("+startTile.x+","+startTile.y+")"+"end:("+endTile.x+","+endTile.y+")");
            if(newMap.findWay(startTile,endTile)){
                let path:tile[]=newMap.getPath();
                Character.Macine.ChangeState(new MoveState(Character,path));
            }
        }, this);


        var user:User=User.getInstance();
        var hero:Hero=new Hero(10,10);
        var equipment:Equipment=new Equipment(10);
        var equipment1:Equipment=new Equipment(20);
        var equipment2:Equipment=new Equipment(999);
        var equipment3:Equipment=new Equipment(1000);
        var jewll:Jewll=new Jewll(10);
        var jewll1:Jewll=new Jewll(20);
        var jewll2:Jewll=new Jewll(999);
        var jewll3:Jewll=new Jewll(1000);
        user.addHero(hero);
        hero.addEquipment(equipment);
        hero.addEquipment(equipment1);
        hero.addEquipment(equipment2);
        hero.addEquipment(equipment3);
        equipment.addJewll(jewll);
        equipment1.addJewll(jewll1);
        equipment2.addJewll(jewll2);
        equipment3.addJewll(jewll3);
        
        console.log(user.getFightPower());
        user.getFightPower();

        var heroDetailsPanel:HeroDetailsPanel=new HeroDetailsPanel();
        heroDetailsPanel.x=840;
        heroDetailsPanel.y=0;
        heroDetailsPanel.width=400;
        heroDetailsPanel.height=640;
        this.addChild(heroDetailsPanel);

    }
}


