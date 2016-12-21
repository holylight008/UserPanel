
var Catche: MethodDecorator = (target: any, propertyName, desc: PropertyDescriptor) => {
    const method = desc.value;
    desc.value = function () {
        if (this["fightPowerCache"] != null && this["dirtyFlag"]==false) {
            console.log("Have cache");
            return target["fightPowerCache"];
        } else {
            this["dirtyFlag"]=false;
            this["fightPowerCache"]= method.apply(this);
            return this["fightPowerCache"];
        }
    }
    
}


class User{
    gold=0;
    diomond=0;
    fightPowerCache:number;
    dirtyFlag:boolean;
    private static user:User;
    heros:Hero[];
    constructor(){
        ;
    }
    public static getInstance():User{
        if(User.user!=null){
            return User.user;
        }else{
            User.user=new User();
            User.user.heros=new Array();
            User.user.fightPowerCache=null;
            User.user.dirtyFlag=false;
            return User.user;
        }
    }
    @Catche
    public getFightPower():number{
        var result=0;
        this.heros.forEach((hero)=>{
            result+=hero.getFightPower();
        })
        this.fightPowerCache=result;
        return result;
    }
    public addHero(hero:Hero){
        this.heros.push(hero);
        this.dirtyFlag=true;
        hero.user=this;
    }
}
class Hero{
    properties:Properties;
    level=1;
    currentEXP=0;
    totalEXP=100;
    like=false;
    fightPowerCache:number;
    dirtyFlag:boolean;
    user:User;
    equipments:Equipment[];
    constructor(attack:number,defence:number){
        this.equipments=new Array();
        this.dirtyFlag=false;
        this.properties=new Properties();
        this.properties.all.push(new Property("attack",attack));
        this.properties.all.push(new Property("defence",defence));
    }
    @Catche
    public getFightPower():number{
        var result=0;
        this.equipments.forEach((equipment)=>{
            result+=equipment.getFightPower();
        })
        result+=this.properties.getProperty(heroProperty.attack).value*2+this.properties.getProperty(heroProperty.denfence).value*1+this.level*3;
        
        this.fightPowerCache=result;
        return result;
    }
    public addEquipment(e:Equipment){
        this.equipments.push(e);
        this.dirtyFlag=true;
        e.hero=this;
        this.user.dirtyFlag=true;
    }
}
class Equipment{
    properties:Properties;
    fightPowerCache:number;
    dirtyFlag:boolean;
    jewlls:Jewll[];
    hero:Hero;
    constructor(attack:number){
        this.jewlls=new Array();
        this.dirtyFlag=false;
        this.properties=new Properties();
        this.properties.all.push(new Property("attack",attack));
    }
    @Catche
    public getFightPower():number{
        var result=0;
        this.jewlls.forEach((jewll)=>{
            result+=jewll.getFightPower();
        })
        result+=this.properties.getProperty(equipmentProperty.attack).value*2;
        this.fightPowerCache=result;
        return result;
    }
    public addJewll(j:Jewll){
        this.jewlls.push(j);
        this.dirtyFlag=true;
        j.equip=this;
        this.hero.dirtyFlag=true;
    }
}
class Jewll{
    properties:Properties;
    fightPowerCache:number;
    dirtyFlag:boolean;
    equip:Equipment;
    constructor(defence:number){
        this.fightPowerCache=null;
        this.dirtyFlag=false;
        this.properties=new Properties();
        this.properties.all.push(new Property("defence",defence));
    }
    @Catche
    public getFightPower():number{
        var result=this.properties.getProperty(jewllProperty.denfence).value;
        this.fightPowerCache=result;
        return result;
    }
}
class Properties{
    all:Property[];
    constructor(){
        this.all=new Array();
    }
    getProperty(propertyName:number){
        return this.all[propertyName];
    }
}
class Property{
    name:string;
    value:number;
    constructor(name:string,value:number){
        this.name=name;
        this.value=value;
    }

}
enum heroProperty{
    attack=0,
    denfence=1
}
enum equipmentProperty{
    attack=0
}
enum jewllProperty{
    denfence=0
}
class PropertiesDisplayUtils{
    static getDescription(property:Property):string{
        return property.name+":"+property.value;
    }
    static getAllProperties(properties:Properties):egret.TextField{
        var tf:egret.TextField=new egret.TextField();
        for(var p of properties.all){
            tf.appendText(PropertiesDisplayUtils.getDescription(p)+ " ");
        }
        return tf;
    }
}
