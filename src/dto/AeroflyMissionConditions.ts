import { AeroflyConfigurationNode } from "../node/AeroflyConfigurationNode.js";
import { meterPerStatuteMile } from "./AeroflyMission.js";
import { AeroflyMissionConditionsCloud } from "./AeroflyMissionConditionsCloud.js";

/**
 * Weather data for wind
 * @property {number} direction in degree
 * @property {number} speed in kts
 * @property {number} gusts in kts
 */
export type AeroflyMissionConditionsWind = {
    direction: number;
    speed: number;
    gusts: number;
};

/**
 * @class
 * Time and weather data for the given flight plan
 *
 * The purpose of this class is to collect data needed for Aerofly FS4's
 * `custom_missions_user.tmc` flight plan file format, and export the structure
 * for this file via the `toString()` method.
 */
export class AeroflyMissionConditions {
    /**
     * @property {Date} time of flight plan. Relevant is the UTC part, so
     *    consider setting this date in UTC.
     */
    time: Date;

    /**
     * @property {object} wind state
     */
    wind: AeroflyMissionConditionsWind;

    /**
     * @property {number} turbulenceStrength 0..1, percentage
     */
    turbulenceStrength: number;

    /**
     * @property {number} thermalStrength 0..1, percentage
     */
    thermalStrength: number;

    /**
     * @property {number} visibility in meters
     */
    visibility: number;

    /**
     * @property {AeroflyMissionConditionsCloud[]} clouds for the whole flight
     */
    clouds: AeroflyMissionConditionsCloud[] = [];

    /**
     * @param {object} additionalAttributes allows to set additional attributes on creation
     * @param {Date} [additionalAttributes.time]  of flight plan. Relevant is the UTC part, so
     *    consider setting this date in UTC.
     * @param {{direction: number, speed: number, gusts: number}} [additionalAttributes.wind] state
     * @param {number} [additionalAttributes.turbulenceStrength] 0..1, percentage
     * @param {number} [additionalAttributes.thermalStrength] 0..1, percentage
     * @param {number} [additionalAttributes.visibility] in meters
     * @param {?number} [additionalAttributes.visibility_sm] in statute miles, will overwrite visibility
     * @param {?number} [additionalAttributes.temperature] in °C, will overwrite thermalStrength
     * @param {AeroflyMissionConditionsCloud[]} [additionalAttributes.clouds] for the whole flight
     */
    constructor({
        time = new Date(),
        wind = {
            direction: 0,
            speed: 0,
            gusts: 0,
        },
        turbulenceStrength = 0,
        thermalStrength = 0,
        visibility = 25_000,
        visibility_sm = 0,
        temperature = 0,
        clouds = [],
    }: Partial<AeroflyMissionConditions> & {
        visibility_sm?: number;
        temperature?: number;
    } = {}) {
        this.time = time;
        this.wind = wind;
        this.turbulenceStrength = turbulenceStrength;
        this.thermalStrength = thermalStrength;
        this.visibility = visibility;
        this.clouds = clouds;

        if (visibility_sm) {
            this.visibility_sm = visibility_sm;
        }
        if (temperature) {
            this.temperature = temperature;
        }
    }

    /**
     * @returns {number} the Aerofly value for UTC hours + minutes/60 + seconds/3600. Ignores milliseconds ;)
     */
    get time_hours(): number {
        return this.time.getUTCHours() + this.time.getUTCMinutes() / 60 + this.time.getUTCSeconds() / 3600;
    }

    /**
     * @returns {string} Time representation like "20:15:00"
     */
    get time_presentational(): string {
        return [this.time.getUTCHours(), this.time.getUTCMinutes(), this.time.getUTCSeconds()]
            .map((t) => {
                return String(t).padStart(2, "0");
            })
            .join(":");
    }

    /**
     * @param {number} visibility_sm `this.visibility` in statute miles instead of meters
     */
    set visibility_sm(visibility_sm: number) {
        this.visibility = visibility_sm * meterPerStatuteMile;
    }

    /**
     * @returns {number} `this.visibility` in statute miles instead of meters
     */
    get visibility_sm(): number {
        return this.visibility / meterPerStatuteMile;
    }

    /**
     * Will set `this.thermalStrength`
     * @param {number} temperature in °C
     */
    set temperature(temperature: number) {
        // Range from -15°C to 35°C
        this.thermalStrength = Math.max(0, (temperature + 15) / 50) ** 2;
    }

    /**
     * @returns {number} in °C
     */
    get temperature(): number {
        return Math.sqrt(this.thermalStrength) * 50 - 15;
    }

    /**
     * @returns {AeroflyConfigurationNode[]} cloud elements
     */
    getCloudElements(): AeroflyConfigurationNode[] {
        return this.clouds.flatMap((c: AeroflyMissionConditionsCloud, index: number) => c.getElements(index));
    }

    /**
     * @returns {string} to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    getElement(): AeroflyConfigurationNode {
        if (this.clouds.length < 1) {
            this.clouds = [new AeroflyMissionConditionsCloud(0, 0)];
        }

        return new AeroflyConfigurationNode("tmmission_conditions", "conditions")
            .append(
                new AeroflyConfigurationNode("tm_time_utc", "time")
                    .appendChild("int32", "time_year", this.time.getUTCFullYear())
                    .appendChild("int32", "time_month", this.time.getUTCMonth() + 1)
                    .appendChild("int32", "time_day", this.time.getUTCDate())
                    .appendChild("float64", "time_hours", this.time_hours, `${this.time_presentational} UTC`),
            )
            .appendChild("float64", "wind_direction", this.wind.direction)
            .appendChild("float64", "wind_speed", this.wind.speed, "kts")
            .appendChild("float64", "wind_gusts", this.wind.gusts, "kts")
            .appendChild("float64", "turbulence_strength", this.turbulenceStrength)
            .appendChild("float64", "thermal_strength", this.thermalStrength, `${this.temperature} °C`)
            .appendChild("float64", "visibility", this.visibility, `${this.visibility_sm} SM`)
            .append(...this.getCloudElements());
    }

    /**
     * @returns {string} to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    toString(): string {
        return this.getElement().toString();
    }
}
