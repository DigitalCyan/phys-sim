import { setInterval } from 'timers';
import SimConfig from '../Interfaces/SimConfig';
import SimObject from '../Interfaces/SimObject';
import Vector2 from '../Interfaces/Vector2';
// @ts-ignore
import Processor from './Processor.ts';
// @ts-ignore
import Renderer from './Renderer.ts';

export default class Sim {
    //#region Singleton
    private static _instance: Sim;
    public static get instance(): Sim {
        if (!this._instance) {
            this._instance = new Sim();
        }
        return this._instance;
    }
    //#endregion

    private _defaultSimConfig: SimConfig = {
        height: 300,
        width: 300,
        gravity: -9.83,
        spaceScale: 0.05,
        deltaTime: 0.001,
    };

    private _config: SimConfig = this._defaultSimConfig;
    public get config(): SimConfig {
        return this._config;
    }

    public root: Vector2 = {
        x: 0,
        y: 0
    };

    private _renderer: Renderer = Renderer.instance;
    private _processor: Processor = Processor.instnace;

    private _simObjects: Array<SimObject> = [];

    public init(simConfig: SimConfig | null = null) {
        this._renderer.setTarget(<HTMLCanvasElement>document.getElementById('simCanvas'));
        simConfig
            ? this.configure(simConfig)
            : this.configure(this._defaultSimConfig);
        this.start();
    }

    private configure(simConfig: SimConfig) {
        this._config = simConfig;
        this._renderer.loadConfig();
    }

    private mainloop() {
        this._renderer.clear();
        this._processor.processSimObjects(Sim.instance._simObjects)
        this._renderer.renderSimObjects(Sim.instance._simObjects);
    }

    private start() {
        /*
        Sim.instance._simObjects.push({
            position: {
                x: 150,
                y: 50,
            },
            vel: {
                x: 0,
                y: 10,
            },
            rad: 50,
        });
        */
        setInterval(this.mainloop, this.config!.deltaTime * 1000);
    }
}
