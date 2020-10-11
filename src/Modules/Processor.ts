import SimConfig from '../Interfaces/SimConfig';
import SimObject from '../Interfaces/SimObject';

export default class Processor {
    //#region Singleton
    private static _instance: Processor;
    public static get instance() {
        if (!this._instance) {
            this._instance = new Processor();
        }
        return this._instance;
    }
    //#endregion

    // Sim vars
    private _gravity: number = 0;
    private _deltaTime: number = 1;
    private _spacescale: number = 1;

    public init(simConfig: SimConfig) {
        this._gravity = simConfig.gravity;
        this._deltaTime = simConfig.deltaTime;
        this._spacescale = simConfig.spaceScale;
    }

    public processSimObjects(simObjects: Array<SimObject>) {
        simObjects.forEach((simObject) => {
            this.processSimObject(simObject);
        });
    }

    public processSimObject(simObject: SimObject) {
        simObject.position.x +=
            (simObject.vel.x * this._deltaTime) / this._spacescale;
        simObject.position.y +=
            (simObject.vel.y * this._deltaTime) / this._spacescale;
        simObject.vel.y += (this._gravity * this._deltaTime) / this._spacescale;
    }
}
