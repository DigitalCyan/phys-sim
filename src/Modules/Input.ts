import Sim from "./Sim";

export default class Input {
    //#region Singleton
    private static _instance: Input;
    public static get instance(): Input {
        if (!this._instance) {
            this._instance = new Input();
        }
        return this._instance;
    }
    //#endregion

    private sim = Sim.instance;
    
    public Init(){
        
    }
}
