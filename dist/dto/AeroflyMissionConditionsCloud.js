import { feetPerMeter } from "./AeroflyMission.js";
/**
 * @class
 * A cloud layer for the current flight plan's weather data
 *
 * The purpose of this class is to collect data needed for Aerofly FS4's
 * `custom_missions_user.tmc` flight plan file format, and export the structure
 * for this file via the `toString()` method.
 */
export class AeroflyMissionConditionsCloud {
    /**
     * @param {number} cover 0..1, percentage
     * @param {number} base altitude in meters AGL
     */
    constructor(cover, base) {
        this.cover = cover;
        this.base = base;
    }
    /**
     * @param {number} cover 0..1, percentage
     * @param {number} base_feet altitude, but in feet AGL instead of meters AGL
     * @returns {AeroflyMissionConditionsCloud}
     */
    static createInFeet(cover, base_feet) {
        return new AeroflyMissionConditionsCloud(cover, base_feet / feetPerMeter);
    }
    /**
     * @param {number} base_feet `this.base` in feet instead of meters
     */
    set base_feet(base_feet) {
        this.base = base_feet / feetPerMeter;
    }
    /**
     * @returns {number} `this.base` in feet instead of meters
     */
    get base_feet() {
        return this.base * feetPerMeter;
    }
    /**
     * @returns {string} Cloud coverage as text representation like "OVC" for `this.cover`
     */
    get cover_code() {
        if (this.cover < 1 / 8) {
            return "CLR";
        }
        else if (this.cover <= 2 / 8) {
            return "FEW";
        }
        else if (this.cover <= 4 / 8) {
            return "SCT";
        }
        else if (this.cover <= 7 / 8) {
            return "BKN";
        }
        return "OVC";
    }
    /**
     * @param {number} index if used in an array will se the array index
     * @returns {string} to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    toString(index = 0) {
        const getIndexString = (index) => {
            switch (index) {
                case 0:
                    return "cloud";
                case 1:
                    return "cirrus";
                case 2:
                    return "cumulus_mediocris";
                default:
                    return "more_clouds";
            }
        };
        const indexString = getIndexString(index);
        const comment = index > 1 ? "//" : "";
        return `\
                    ${comment}<[float64][${indexString}_cover][${this.cover ?? 0}]> // ${this.cover_code}
                    ${comment}<[float64][${indexString}_base][${this.base}]> // ${this.base_feet} ft AGL`;
    }
}
