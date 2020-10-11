import SimConfig from '../Interfaces/SimConfig';
import SimObject from '../Interfaces/SimObject';
import Input from './Input';
import Processor from './Processor';
import Renderer from './Renderer';

export default class Sim {
    //#region Singleton
    private static _instance: Sim;
    public static get instance() {
        if (!this._instance) {
            this._instance = new Sim();
        }
        return this._instance;
    }
    //#endregion

    // Configuration
    private _config: SimConfig | null = null;

    // Renderer and processor
    private _renderer = Renderer.instance;
    private _processor = Processor.instance;
    private _input = Input.instance;

    // Sim objects
    private _simObjects: Array<SimObject> = [];

    // Default simulation config
    private _defaultSimConfig: SimConfig = {
        canvas: <HTMLCanvasElement>document.querySelector('canvas'),
        width: 300,
        height: 300,
        gravity: -9.81,
        spaceScale: 0.05,
        deltaTime: 0.001,
    };

    // Methods
    public init(simConfig: SimConfig | null = null) {
        this._config = simConfig ? simConfig : this._defaultSimConfig;
        this._renderer.init(this._config);
        this._processor.init(this._config);
        this._input.init(this._config);
        this.initMainloop();
    }

    private initMainloop() {
        const mainloop = () => {
            this._renderer.clear();
            this._processor.processSimObjects(this._simObjects);
            this._renderer.renderSimObjects(this._simObjects);
        };

        setInterval(mainloop, this._config!.deltaTime * 1000);
    }
}
