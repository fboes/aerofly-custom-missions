import { AeroflyConfigurationNode } from "../node/AeroflyConfigurationNode.js";
/**
 * @class Represents the wind settings for a mission in Aerofly FS4.
 */
export declare class AeroflySettingsWind {
    /**
     * @property {number} speed_kts in knots
     */
    speed_kts: number;
    /**
     * @property {number} directionInDegree in degree
     */
    directionInDegree: number;
    /**
     * @property {number} gust_kts in knots
     */
    gust_kts: number;
    /**
     * @property {number} temperature_celsius in degree Celsius, e.g. 14 for 14°C
     */
    temperature_celsius: number;
    /**
     * @param {number} speed_kts in knots
     * @param {number} directionInDegree in degree
     * @param {number} gust_kts in knots
     * @param {number} temperature_celsius in degree Celsius, e.g. 14 for 14°C
     */
    constructor(speed_kts: number, directionInDegree: number, gust_kts?: number, temperature_celsius?: number);
    /**
     * @param {number} strength normalized strength value [0,1]
     * @param {number} directionInDegree in degree
     * @param {number} turbulence normalized turbulence value [0,1]
     * @param {number} thermalActivity normalized thermal activity value [0,1]
     * @returns {AeroflySettingsWind} a new instance of AeroflySettingsWind with the specified normalized values
     */
    static createWithNormalizedValues(
        strength: number,
        directionInDegree: number,
        turbulence?: number,
        thermalActivity?: number,
    ): AeroflySettingsWind;
    /**
     * @returns {number} the normalized strength value [0,1] for this wind, where 0 means no wind and 1 means 80 kts or more
     */
    get strength(): number;
    set strength(strength: number);
    /**
     * @returns {number} the normalized turbulence value [0,1] for this wind, where 0 means no turbulence and 1 means very strong turbulence. Wind difference is [0,15] kts.
     */
    get turbulence(): number;
    set turbulence(turbulence: number);
    /**
     * @returns {number} the normalized thermal activity value [0,1] for this wind, where 0 means no thermal activity and 1 means very strong thermal activity (30°C or more)
     */
    get thermalActivity(): number;
    set thermalActivity(thermalActivity: number);
    getElement(): AeroflyConfigurationNode;
    /**
     * @returns {string} to use in Aerofly FS4's `main.mcf`
     */
    toString(): string;
}
//# sourceMappingURL=AeroflySettingsWind.d.ts.map
