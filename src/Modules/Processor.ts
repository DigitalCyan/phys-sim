import SimConfig from '../Interfaces/SimConfig';
import SimObject from '../Interfaces/SimObject';
// @ts-ignore
import Sim from './Sim.ts';

export default class Processor {
    private static _instance: Processor;
    public static get instnace(): Processor {
        if (!this._instance) {
            this._instance = new Processor();
        }
        return this._instance;
    }

    public processSimObjects(simObjects: Array<SimObject>) {
        simObjects.forEach((simObject) => {
            this.processSimObject(simObject);
        });
    }

    private _config:SimConfig = Sim.instance.config;

    public processSimObject(simObject: SimObject) {
        simObject.position.x += (simObject.vel.x * this._config.deltaTime) / this._config.spaceScale;
        simObject.position.y += (simObject.vel.y * this._config.deltaTime) / this._config.spaceScale;
        simObject.vel.y += (Sim.instance.config.gravity * this._config.deltaTime) / this._config.spaceScale;
    }
}
