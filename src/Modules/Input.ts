import SimConfig from '../Interfaces/SimConfig';

export default class Input {
    //#region Singleton
    private static _instance: Input;
    public static get instance() {
        if (!this._instance) {
            this._instance = new Input();
        }
        return this._instance;
    }
    //#endregion

    // Methods
    public init(SimConfig: SimConfig) {}
}
