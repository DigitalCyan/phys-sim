import SimConfig from '../Interfaces/SimConfig';
import SimObject from '../Interfaces/SimObject';
import Vector2 from '../Interfaces/Vector2';

export default class Renderer {
    //#region Singleton
    private static _instance: Renderer;
    public static get instance() {
        if (!this._instance) {
            this._instance = new Renderer();
        }
        return this._instance;
    }
    //#endregion

    // Canvas
    private _canvas: HTMLCanvasElement | null = null;
    private _ctx: CanvasRenderingContext2D | null = null;

    // Vars
    private _spaceScale: number = 1;
    private _root: Vector2 = {
        x: 0,
        y: 0,
    };

    // Methods
    public init(simConfig: SimConfig) {
        this._canvas = simConfig.canvas;
        this._canvas.width = simConfig.width;
        this._canvas.height = simConfig.height;
        this._spaceScale = simConfig.spaceScale;
        this._root = {
            x: 0,
            y: this._canvas.height,
        };

        this._canvas.getContext('2d');
    }

    public clear() {
        this._ctx!.clearRect(0, 0, this._canvas!.width, this._canvas!.height);
    }

    public renderSimObjects(simObjects: Array<SimObject>) {
        simObjects.forEach((simObject) => {
            this.renderSimObject(simObject);
        });
    }

    public renderSimObject(simObject: SimObject) {
        this._ctx!.beginPath();
        this._ctx!.arc(
            this._root.x + simObject.position.x,
            this._root.y - simObject.position.y,
            simObject.rad * this._spaceScale,
            0,
            2 * Math.PI
        );
        this._ctx!.fill();
    }
}
