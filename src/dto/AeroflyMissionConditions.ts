import { AeroflyConfigFileSet } from "./AeroflyConfigFileSet.js";
import { meterPerStatuteMile } from "./AeroflyMission.js";
import { AeroflyMissionConditionsCloud } from "./AeroflyMissionConditionsCloud.js";

/**
 * Weather data for wind
 * @property direction in degree
 * @property speed in kts
 * @property gusts in kts
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
     * @property {number} 0..1, percentage
     */
    turbulenceStrength: number;

    /**
     * @property {number} 0..1, percentage
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
        visibility_sm = null,
        temperature = null,
        clouds = [],
    }: {
        time?: Date;
        wind?: {
            direction: number;
            speed: number;
            gusts: number;
        };
        turbulenceStrength?: number;
        thermalStrength?: number;
        visibility?: number;
        visibility_sm?: number | null;
        temperature?: number | null;
        clouds?: AeroflyMissionConditionsCloud[];
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
     * @returns {string}
     */
    getCloudsString(): string {
        return this.clouds
            .map((c: AeroflyMissionConditionsCloud, index: number): string => {
                return c.toString(index);
            })
            .join("\n");
    }

    /**
     * @returns {string} to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    toString(): string {
        if (this.clouds.length < 1) {
            this.clouds = [new AeroflyMissionConditionsCloud(0, 0)];
        }

        return new AeroflyConfigFileSet(4, "tmmission_conditions", "conditions")
            .pushRaw(
                new AeroflyConfigFileSet(5, "tm_time_utc", "time")
                    .push("int32", "time_year", this.time.getUTCFullYear())
                    .push("int32", "time_month", this.time.getUTCMonth() + 1)
                    .push("int32", "time_day", this.time.getUTCDate())
                    .push("float64", "time_hours", this.time_hours, `${this.time_presentational} UTC`)
                    .toString(),
            )
            .push("float64", "wind_direction", this.wind.direction)
            .push("float64", "wind_speed", this.wind.speed, "kts")
            .push("float64", "wind_gusts", this.wind.gusts, "kts")
            .push("float64", "turbulence_strength", this.turbulenceStrength)
            .push("float64", "thermal_strength", this.thermalStrength, `${this.temperature} °C`)
            .push("float64", "visibility", this.visibility, `${this.visibility_sm} SM`)
            .pushRaw(this.getCloudsString())
            .toString();
    }
}
