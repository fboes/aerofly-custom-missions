import { AeroflyConfigurationNode } from "../node/AeroflyConfigurationNode.js";

export class AeroflySettingsAircraft {
    /**
     * @property {string} name of the aircraft as internal Aerofly FS 4 code, e.g. "c172"
     */
    name: string;

    /**
     * @property {string} paintscheme of the aircraft as internal Aerofly FS 4 code, e.g. "default"
     */
    paintscheme: string;

    /**
     * @property {string[]} options for the aircraft, e.g. ["wheel_chocks", "tie_downs"]
     */
    options: string[];

    /**
     * @property {boolean} profi if true will set the aircraft to the profi version if available, otherwise will use the standard version
     */
    profi: boolean;

    /**
     * @param {string} name of the aircraft as internal Aerofly FS 4 code, e.g. "c172"
     * @param {string} paintscheme of the aircraft as internal Aerofly FS 4 code, e.g. "default"
     * @param {string[]} options for the aircraft, e.g. ["wheel_chocks", "tie_downs"]
     * @param {boolean} profi if true will set the aircraft to the profi version if available, otherwise will use the standard version
     */
    constructor(name: string, paintscheme: string = "", options: string[] = [], profi: boolean = false) {
        this.name = name;
        this.paintscheme = paintscheme;
        this.options = options;
        this.profi = profi;
    }

    getElement(): AeroflyConfigurationNode {
        return new AeroflyConfigurationNode("tmsettings_aircraft", "aircraft")
            .appendChild("string8u", "name", this.name)
            .appendChild("string8u", "paintscheme", this.paintscheme)
            .appendChild("list_string8u", "options", this.options)
            .appendChild("bool", "profi", this.profi);
    }

    /**
     * @returns {string} to use in Aerofly FS4's `main.mcf`
     */
    toString(): string {
        return this.getElement().toString();
    }
}
