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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    p.createGameScene = function () {
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        var newMap = new MainMap();
        newMap.x = 0;
        newMap.y = 0;
        this.addChild(newMap);
        var Character = new Player();
        Character.x = 0;
        Character.y = 0;
        this.addChild(Character);
        var taskService = TaskService.getInstance();
        var task_0 = new Task("task_0", "npc_0", "npc_1", Task.ACCEPTABLE, new NPCTalkTaskCondition(), 1, "null", "task_1");
        var task_1 = new Task("task_1", "npc_1", "npc_1", Task.UNACCEPTALBE, new KillMonsterTaskCondition(), 10, "pig_png", "null");
        var taskPanel = new TaskPanel();
        taskPanel.x = 640;
        taskPanel.y = 0;
        this.addChild(taskPanel);
        var monsterButton = new MonsterButton("pig_png");
        monsterButton.x = 640;
        monsterButton.y = 500;
        this.addChild(monsterButton);
        var dialogPanel = DialogPanel.getInstance();
        dialogPanel.x = 200;
        dialogPanel.y = 200;
        this.addChild(dialogPanel);
        dialogPanel.visible = false;
        var npc_0 = new NPC("npc_0", "npc_0_png");
        npc_0.x = 128;
        npc_0.y = 128;
        this.addChild(npc_0);
        var npc_1 = new NPC("npc_1", "npc_1_png");
        npc_1.x = 576;
        npc_1.y = 576;
        this.addChild(npc_1);
        newMap.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
            var startTile = new tile();
            startTile.x = Math.floor(Character.x / ONETILESIZE);
            startTile.y = Math.floor(Character.y / ONETILESIZE);
            var endTile = new tile();
            endTile.x = Math.floor(evt.stageX / ONETILESIZE);
            endTile.y = Math.floor(evt.stageY / ONETILESIZE);
            // console.log("start:("+startTile.x+","+startTile.y+")"+"end:("+endTile.x+","+endTile.y+")");
            if (newMap.findWay(startTile, endTile)) {
                var path = newMap.getPath();
                Character.Macine.ChangeState(new MoveState(Character, path));
            }
        }, this);
        var user = User.getInstance();
        var hero = new Hero(10, 10);
        var equipment = new Equipment(10);
        var equipment1 = new Equipment(20);
        var equipment2 = new Equipment(999);
        var equipment3 = new Equipment(1000);
        var jewll = new Jewll(10);
        var jewll1 = new Jewll(20);
        var jewll2 = new Jewll(999);
        var jewll3 = new Jewll(1000);
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
        var heroDetailsPanel = new HeroDetailsPanel();
        heroDetailsPanel.x = 840;
        heroDetailsPanel.y = 0;
        heroDetailsPanel.width = 400;
        heroDetailsPanel.height = 640;
        this.addChild(heroDetailsPanel);
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map