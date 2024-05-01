export default class Storage {

    static getValue(key : string){
        const item =  localStorage.getItem(key);
        if(item)
            return JSON.parse(item);


        return null;
    }

    static setValue(key:string,value:any){
        localStorage.setItem(key,JSON.stringify(value));
    }

    static removeValue(key : string){
        localStorage.removeItem(key)
    }

}