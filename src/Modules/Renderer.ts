// @ts-ignore
import Sim from './Sim.ts';
import SimObject from '../Interfaces/SimObject';
import SimConfig from '../Interfaces/SimConfig';

export default class Renderer {
    //#region Singleton
    private static _instance: Renderer;
    public static get instance(): Renderer {
        if (!this._instance) {
            this._instance = new Renderer();
        }
        return this._instance;
    }
    //#endregion

    private _canvas: HTMLCanvasElement | null = null;
    private _ctx: CanvasRenderingContext2D | null = null;
    private _spaceScale: number = 0;

    public loadConfig() {
        if (this._canvas) {
            const config: SimConfig = Sim.instance.config;
            this._canvas.height = config.height;
            this._canvas.width = config.width;
            this._spaceScale = config.spaceScale;
            Sim.instance.root = {
                x: 0,
                y: this._canvas.height,
            };
        }
    }

    public setTarget(target: HTMLCanvasElement) {
        this._canvas = target;
        this._ctx = this._canvas.getContext('2d');
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
            simObject.position.x,
            Sim.instance.root.y - simObject.position.y,
            simObject.rad * this._spaceScale,
            0,
            360
        );
        this._ctx!.stroke();
    }
}
