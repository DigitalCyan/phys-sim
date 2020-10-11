export default class Sim {
    private static _instance: Sim;
    public static get instance() {
        if (!this._instance) {
            this._instance = new Sim();
        }
        return this._instance;
    }
}
