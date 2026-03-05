import { AeroflyConfigurationNode } from "../node/AeroflyConfigurationNode.js";

/**
 * @class Represents the wind settings for a mission in Aerofly FS4.
 */
export class AeroflySettingsWind {
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
    constructor(speed_kts: number, directionInDegree: number, gust_kts: number = 0, temperature_celsius: number = 14) {
        this.speed_kts = speed_kts;
        this.directionInDegree = directionInDegree;
        this.gust_kts = gust_kts;
        this.temperature_celsius = temperature_celsius;
    }

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
        turbulence: number = 0,
        thermalActivity: number = 0,
    ): AeroflySettingsWind {
        const wind = new AeroflySettingsWind(0, directionInDegree);
        wind.strength = strength;
        wind.turbulence = turbulence;
        wind.thermalActivity = thermalActivity;
        return wind;
    }

    /**
     * @returns {number} the normalized strength value [0,1] for this wind, where 0 means no wind and 1 means 80 kts or more
     */
    get strength(): number {
        return Math.sqrt(this.speed_kts / 8 + 0.25) - 0.5;
    }

    set strength(strength: number) {
        this.speed_kts = Math.max(0, (strength + 0.5) ** 2 - 0.25) * 8;
    }

    /**
     * @returns {number} the normalized turbulence value [0,1] for this wind, where 0 means no turbulence and 1 means very strong turbulence (80 kts wind + 20 kts gusts)
     */
    get turbulence(): number {
        return Math.min(1, this.speed_kts / 80 + this.gust_kts / 20);
    }

    set turbulence(turbulence: number) {
        const totalWindEffect = turbulence * 80;
        this.speed_kts = Math.min(this.speed_kts, totalWindEffect);
        this.gust_kts = Math.min(this.gust_kts, (totalWindEffect - this.speed_kts) * 20);
    }

    /**
     * @returns {number} the normalized thermal activity value [0,1] for this wind, where 0 means no thermal activity and 1 means very strong thermal activity (30°C or more)
     */
    get thermalActivity(): number {
        return (this.temperature_celsius - 5) / 25;
    }

    set thermalActivity(thermalActivity: number) {
        this.temperature_celsius = thermalActivity * 25 + 5;
    }

    getElement(): AeroflyConfigurationNode {
        return new AeroflyConfigurationNode("tmsettings_wind", "wind")
            .appendChild("float64", "strength", this.strength, `${Math.ceil(this.speed_kts)} kts`)
            .appendChild("float64", "direction_in_degree", this.directionInDegree)
            .appendChild("float64", "turbulence", this.turbulence, `${Math.ceil(this.gust_kts)} kts gusts`)
            .appendChild(
                "float64",
                "thermal_activity",
                this.thermalActivity,
                `${Math.round(this.temperature_celsius)}°C`,
            );
    }

    /**
     * @returns {string} to use in Aerofly FS4's `main.mcf`
     */
    toString(): string {
        return this.getElement().toString();
    }
}
