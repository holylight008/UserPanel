var mapJason = [
    { x: 0, y: 0, walkAble: false },
    { x: 64, y: 0, walkAble: false },
    { x: 128, y: 0, walkAble: false },
    { x: 192, y: 0, walkAble: false },
    { x: 256, y: 0, walkAble: false },
    { x: 320, y: 0, walkAble: false },
    { x: 384, y: 0, walkAble: false },
    { x: 448, y: 0, walkAble: false },
    { x: 512, y: 0, walkAble: false },
    { x: 576, y: 0, walkAble: false },
    { x: 0, y: 64, walkAble: false },
    { x: 64, y: 64, walkAble: false },
    { x: 128, y: 64, walkAble: false },
    { x: 192, y: 64, walkAble: false },
    { x: 256, y: 64, walkAble: false },
    { x: 320, y: 64, walkAble: false },
    { x: 384, y: 64, walkAble: false },
    { x: 448, y: 64, walkAble: false },
    { x: 512, y: 64, walkAble: false },
    { x: 576, y: 64, walkAble: false },
    { x: 0, y: 128, walkAble: false },
    { x: 64, y: 128, walkAble: false },
    { x: 128, y: 128, walkAble: false },
    { x: 192, y: 128, walkAble: false },
    { x: 256, y: 128, walkAble: false },
    { x: 320, y: 128, walkAble: false },
    { x: 384, y: 128, walkAble: false },
    { x: 448, y: 128, walkAble: false },
    { x: 512, y: 128, walkAble: false },
    { x: 576, y: 128, walkAble: false },
    { x: 0, y: 192, walkAble: false },
    { x: 64, y: 192, walkAble: false },
    { x: 128, y: 192, walkAble: false },
    { x: 192, y: 192, walkAble: false },
    { x: 256, y: 192, walkAble: false },
    { x: 320, y: 192, walkAble: false },
    { x: 384, y: 192, walkAble: false },
    { x: 448, y: 192, walkAble: false },
    { x: 512, y: 192, walkAble: false },
    { x: 576, y: 192, walkAble: false },
    { x: 0, y: 256, walkAble: false },
    { x: 64, y: 256, walkAble: false },
    { x: 128, y: 256, walkAble: false },
    { x: 192, y: 256, walkAble: false },
    { x: 256, y: 256, walkAble: false },
    { x: 320, y: 256, walkAble: false },
    { x: 384, y: 256, walkAble: false },
    { x: 448, y: 256, walkAble: false },
    { x: 512, y: 256, walkAble: false },
    { x: 576, y: 256, walkAble: false },
    { x: 0, y: 320, walkAble: false },
    { x: 64, y: 320, walkAble: false },
    { x: 128, y: 320, walkAble: false },
    { x: 192, y: 320, walkAble: false },
    { x: 256, y: 320, walkAble: false },
    { x: 320, y: 320, walkAble: false },
    { x: 384, y: 320, walkAble: false },
    { x: 448, y: 320, walkAble: false },
    { x: 512, y: 320, walkAble: false },
    { x: 576, y: 320, walkAble: false },
    { x: 0, y: 384, walkAble: false },
    { x: 64, y: 384, walkAble: false },
    { x: 128, y: 384, walkAble: false },
    { x: 192, y: 384, walkAble: false },
    { x: 256, y: 384, walkAble: false },
    { x: 320, y: 384, walkAble: false },
    { x: 384, y: 384, walkAble: false },
    { x: 448, y: 384, walkAble: false },
    { x: 512, y: 384, walkAble: false },
    { x: 576, y: 384, walkAble: false },
    { x: 0, y: 448, walkAble: false },
    { x: 64, y: 448, walkAble: false },
    { x: 128, y: 448, walkAble: false },
    { x: 192, y: 448, walkAble: false },
    { x: 256, y: 448, walkAble: false },
    { x: 320, y: 448, walkAble: false },
    { x: 384, y: 448, walkAble: false },
    { x: 448, y: 448, walkAble: false },
    { x: 512, y: 448, walkAble: false },
    { x: 576, y: 448, walkAble: false },
    { x: 0, y: 512, walkAble: false },
    { x: 64, y: 512, walkAble: false },
    { x: 128, y: 512, walkAble: false },
    { x: 192, y: 512, walkAble: false },
    { x: 256, y: 512, walkAble: false },
    { x: 320, y: 512, walkAble: false },
    { x: 384, y: 512, walkAble: false },
    { x: 448, y: 512, walkAble: false },
    { x: 512, y: 512, walkAble: false },
    { x: 576, y: 512, walkAble: false },
    { x: 0, y: 576, walkAble: false },
    { x: 64, y: 576, walkAble: false },
    { x: 128, y: 576, walkAble: false },
    { x: 192, y: 576, walkAble: false },
    { x: 256, y: 576, walkAble: false },
    { x: 320, y: 576, walkAble: false },
    { x: 384, y: 576, walkAble: false },
    { x: 448, y: 576, walkAble: false },
    { x: 512, y: 576, walkAble: false },
    { x: 576, y: 576, walkAble: false },
];
var ROW = 10;
var LIST = 10;
var STONEPROBBILITY = 0.2;
var ONETILESIZE = 64;
var manhadun = 0;
var ojilide = 1;
var duijiaoxian = 2;
var tile = (function (_super) {
    __extends(tile, _super);
    function tile() {
        _super.call(this);
        this.bitmap = new egret.Bitmap();
        this.bitmap.x = 0;
        this.bitmap.y = 0;
        this.addChild(this.bitmap);
        this.weight = 0;
        this.preTile = null;
        this.touchEnabled = true;
    }
    var d = __define,c=tile,p=c.prototype;
    return tile;
}(egret.DisplayObjectContainer));
egret.registerClass(tile,'tile');
var MainMap = (function (_super) {
    __extends(MainMap, _super);
    function MainMap() {
        _super.call(this);
        this.myMap = new Array();
        this.objectOnMap = new Array();
        this.path = new Array();
        for (var i = 0; i < ROW * LIST; i++) {
            if (Math.random() <= STONEPROBBILITY) {
                mapJason[i].walkAble = false;
            }
            else {
                mapJason[i].walkAble = true;
            }
        }
        //人物初始位置不能为障碍物
        mapJason[0].walkAble = true;
        for (var i = 0; i < ROW * LIST; i++) {
            this.myMap[i] = new tile();
            this.myMap[i].walkAble = mapJason[i].walkAble;
            this.myMap[i].x = mapJason[i].x;
            this.myMap[i].y = mapJason[i].y;
            if (this.myMap[i].walkAble) {
                this.myMap[i].bitmap.texture = RES.getRes("path_jpg");
            }
            else {
                this.myMap[i].bitmap.texture = RES.getRes("wall_jpg");
            }
            this.addChild(this.myMap[i]);
        }
    }
    var d = __define,c=MainMap,p=c.prototype;
    p.addObject = function (x) {
        this.objectOnMap.push(x);
    };
    p.delObject = function (x) {
        var temp = this.objectOnMap.indexOf(x);
        if (temp != -1) {
            this.objectOnMap.splice(temp);
            return true;
        }
        else {
            console.log("Not Find");
        }
    };
    p.searchObject = function (x) {
        var temp = this.objectOnMap.indexOf(x);
        if (temp != -1) {
            return temp;
        }
        else {
            console.log("Not Find");
        }
    };
    p.estimulate = function (start, end, method) {
        if (method == 0) {
            return Math.abs(end.x / ONETILESIZE - start.x / ONETILESIZE) + Math.abs(end.y / ONETILESIZE - start.y / ONETILESIZE);
        }
        if (method == 1) {
            return Math.sqrt((start.x - end.x) * (start.x - end.x) + (start.y - end.y) * (start.y - end.y));
        }
        if (method == 2) {
            return Math.sqrt((start.x - Math.abs(end.x - start.x) / 2) * (start.x - Math.abs(end.x - start.x) / 2) + (start.y - end.y / 2) * (start.y - end.y / 2)) + Math.abs(end.x - start.x) / 2;
        }
    };
    p.sortWeight = function (a, b) {
        return a.weight - b.weight;
    };
    p.generatePath = function (start, end) {
        var x = this.path.length;
        for (var i = 0; i < x; i++) {
            this.path.pop();
        }
        this.path.pop();
        for (var temp = end; temp != start; temp = temp.preTile) {
            this.path.push(temp);
        }
        this.path.reverse();
    };
    p.findWay = function (startTile, endTile) {
        startTile = this.myMap[startTile.y * ROW + startTile.x];
        endTile = this.myMap[endTile.y * ROW + endTile.x];
        if (endTile.walkAble == false) {
            console.log("(" + endTile.x + "," + endTile.y + ")" + "不可达");
            return false;
        }
        else if (startTile == endTile) {
            console.log("起点终点相同" + "  不移动");
            return false;
        }
        var currentTile = startTile;
        currentTile.weight = 0;
        currentTile.preTile = null;
        var openList = new Array();
        var closedList = new Array();
        while (currentTile != endTile) {
            closedList.push(currentTile);
            var tempOpenList = new Array();
            for (var i = currentTile.x - 1 * ONETILESIZE; i < currentTile.x + 2 * ONETILESIZE; i += ONETILESIZE) {
                for (var j = currentTile.y - 1 * ONETILESIZE; j < currentTile.y + 2 * ONETILESIZE; j += ONETILESIZE) {
                    //判断是否超出地图
                    if (i < 0 || j < 0 || j > 9 * ONETILESIZE || i > 9 * ONETILESIZE) {
                        continue;
                    }
                    //判断斜线是否可走
                    if (i == currentTile.x - 1 * ONETILESIZE && j == currentTile.y - 1 * ONETILESIZE) {
                        if (this.myMap[(j / ONETILESIZE) * ROW + i / ONETILESIZE + 1].walkAble == false && this.myMap[((j / ONETILESIZE) + 1) * ROW + i / ONETILESIZE].walkAble == false) {
                            continue;
                        }
                    }
                    else if (i == currentTile.x - 1 * ONETILESIZE && j == currentTile.y + 1 * ONETILESIZE) {
                        if (this.myMap[(j / ONETILESIZE) * ROW + i / ONETILESIZE + 1].walkAble == false && this.myMap[((j / ONETILESIZE) - 1) * ROW + i / ONETILESIZE].walkAble == false) {
                            continue;
                        }
                    }
                    else if (i == currentTile.x + 1 * ONETILESIZE && j == currentTile.y - 1 * ONETILESIZE) {
                        if (this.myMap[(j / ONETILESIZE) * ROW + i / ONETILESIZE - 1].walkAble == false && this.myMap[((j / ONETILESIZE) + 1) * ROW + i / ONETILESIZE].walkAble == false) {
                            continue;
                        }
                    }
                    else if (i == currentTile.x + 1 * ONETILESIZE && j == currentTile.y + 1 * ONETILESIZE) {
                        if (this.myMap[(j / ONETILESIZE) * ROW + i / ONETILESIZE - 1].walkAble == false && this.myMap[((j / ONETILESIZE) - 1) * ROW + i / ONETILESIZE].walkAble == false) {
                            continue;
                        }
                    }
                    //计算G函数步进
                    var dg = 0;
                    if ((i == currentTile.x - 1 * ONETILESIZE && j == currentTile.y) || (i == currentTile.x + 1 * ONETILESIZE && j == currentTile.y) || (i == currentTile.x && j == currentTile.y - 1 * ONETILESIZE) || (i == currentTile.x && j == currentTile.y + 1 * ONETILESIZE)) {
                        dg = 1;
                    }
                    else {
                        dg = 1.4;
                    }
                    var testTile = this.myMap[(j / ONETILESIZE) * ROW + i / ONETILESIZE];
                    // console.log("当前判断砖块坐标：" + "(" + i / ONETILESIZE + "," + j / ONETILESIZE + ")");
                    //判断是否为当前地面
                    if (testTile == currentTile) {
                        continue;
                    }
                    else if (testTile.walkAble == false) {
                        continue;
                    }
                    else if (testTile.walkAble) {
                        //testTile到达endtile
                        if (testTile == endTile) {
                            endTile.preTile = currentTile;
                            // console.log("(" + endTile.x + "," + endTile.y + ")" + "已达到");
                            this.generatePath(startTile, endTile);
                            return true;
                        }
                        else if (openList.indexOf(testTile) == -1 && closedList.indexOf(testTile) == -1) {
                            tempOpenList.push(testTile);
                            // console.log("openlist +"+"("+testTile.x+","+testTile.y+")");
                            testTile.weight = currentTile.weight + dg + this.estimulate(testTile, endTile, ojilide);
                            testTile.preTile = currentTile;
                        }
                    }
                }
            }
            if (openList.indexOf(currentTile) != -1) {
                var p = openList.indexOf(currentTile);
                for (var i = p; i < openList.length - 1; i++) {
                    openList[i] = openList[i + 1];
                }
                openList.pop();
            }
            if (tempOpenList.length != 0) {
                tempOpenList.sort(this.sortWeight);
                currentTile = tempOpenList.shift();
                ;
                for (var i = 0; i < tempOpenList.length; i++) {
                    openList.push(tempOpenList[i]);
                }
            }
            else if (openList.length != 0) {
                openList.sort(this.sortWeight);
                currentTile = openList[0];
            }
            else {
                console.log("当前判断列表为空且开放列表为空，未找到路径");
                return false;
            }
        }
    };
    p.getPath = function () {
        if (this.path.length != 0) {
            return this.path;
        }
        else {
            console.log("暂时无路");
            return null;
        }
    };
    return MainMap;
}(egret.DisplayObjectContainer));
egret.registerClass(MainMap,'MainMap');
//# sourceMappingURL=map.js.map