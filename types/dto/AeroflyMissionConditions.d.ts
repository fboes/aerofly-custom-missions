import { AeroflyConfigurationNode } from "../node/AeroflyConfigurationNode.js";
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
export declare class AeroflyMissionConditions {
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
    clouds: AeroflyMissionConditionsCloud[];
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
    constructor({ time, wind, turbulenceStrength, thermalStrength, visibility, visibility_sm, temperature, clouds, }?: Partial<AeroflyMissionConditions> & {
        visibility_sm?: number;
        temperature?: number;
    });
    /**
     * @returns {number} the Aerofly value for UTC hours + minutes/60 + seconds/3600. Ignores milliseconds ;)
     */
    get time_hours(): number;
    /**
     * @returns {string} Time representation like "20:15:00"
     */
    get time_presentational(): string;
    /**
     * @param {number} visibility_sm `this.visibility` in statute miles instead of meters
     */
    set visibility_sm(visibility_sm: number);
    /**
     * @returns {number} `this.visibility` in statute miles instead of meters
     */
    get visibility_sm(): number;
    /**
     * Will set `this.thermalStrength`
     * @param {number} temperature in °C
     */
    set temperature(temperature: number);
    /**
     * @returns {number} in °C
     */
    get temperature(): number;
    /**
     * @returns {AeroflyConfigurationNode[]} cloud elements
     */
    getCloudElements(): AeroflyConfigurationNode[];
    /**
     * @returns {string} to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    getElement(): AeroflyConfigurationNode;
    /**
     * @returns {string} to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    toString(): string;
}
//# sourceMappingURL=AeroflyMissionConditions.d.ts.map