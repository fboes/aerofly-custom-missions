/**
 * Cloud coverage codes
 */
export type AeroflyMissionConditionsCloudCoverCode = "CLR" | "FEW" | "SCT" | "BKN" | "OVC";
/**
 * @class
 * A cloud layer for the current flight plan's weather data
 *
 * The purpose of this class is to collect data needed for Aerofly FS4's
 * `custom_missions_user.tmc` flight plan file format, and export the structure
 * for this file via the `toString()` method.
 */
export declare class AeroflyMissionConditionsCloud {
    /**
     * @property {number} cover 0..1, percentage
     */
    cover: number;
    /**
     * @property {number} base altitude in meters AGL
     */
    base: number;
    /**
     * @param {number} cover 0..1, percentage
     * @param {number} base altitude in meters AGL
     */
    constructor(cover: number, base: number);
    /**
     * @param {number} cover 0..1, percentage
     * @param {number} base_feet altitude, but in feet AGL instead of meters AGL
     * @returns {AeroflyMissionConditionsCloud}
     */
    static createInFeet(cover: number, base_feet: number): AeroflyMissionConditionsCloud;
    /**
     * @param {number} base_feet `this.base` in feet instead of meters
     */
    set base_feet(base_feet: number);
    /**
     * @returns {number} `this.base` in feet instead of meters
     */
    get base_feet(): number;
    /**
     * @returns {string} Cloud coverage as text representation like "OVC" for `this.cover`
     */
    get cover_code(): AeroflyMissionConditionsCloudCoverCode;
    /**
     * @param {number} index if used in an array will se the array index
     * @returns {string} to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    toString(index?: number): string;
}
//# sourceMappingURL=AeroflyMissionConditionsCloud.d.ts.map
