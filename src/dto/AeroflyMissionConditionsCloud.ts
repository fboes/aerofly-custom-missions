import { AeroflyConfigurationNode, AeroflyConfigurationNodeComment } from "../node/AeroflyConfigurationNode.js";
import { feetPerMeter } from "./AeroflyMission.js";

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
export class AeroflyMissionConditionsCloud {
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
    constructor(cover: number, base: number) {
        this.cover = cover;
        this.base = base;
    }

    /**
     * @param {number} cover 0..1, percentage
     * @param {number} base_feet altitude, but in feet AGL instead of meters AGL
     * @returns {AeroflyMissionConditionsCloud} self
     */
    static createInFeet(cover: number, base_feet: number): AeroflyMissionConditionsCloud {
        return new AeroflyMissionConditionsCloud(cover, base_feet / feetPerMeter);
    }

    /**
     * @param {number} base_feet `this.base` in feet instead of meters
     */
    set base_feet(base_feet: number) {
        this.base = base_feet / feetPerMeter;
    }

    /**
     * @returns {number} `this.base` in feet instead of meters
     */
    get base_feet(): number {
        return this.base * feetPerMeter;
    }

    /**
     * @returns {string} Cloud coverage as text representation like "OVC" for `this.cover`
     */
    get cover_code(): AeroflyMissionConditionsCloudCoverCode {
        if (this.cover < 1 / 8) {
            return "CLR";
        } else if (this.cover <= 2 / 8) {
            return "FEW";
        } else if (this.cover <= 4 / 8) {
            return "SCT";
        } else if (this.cover <= 7 / 8) {
            return "BKN";
        }
        return "OVC";
    }

    /**
     * @param {number} index if used in an array will set the array index
     * @returns {AeroflyConfigurationNode[]} to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    getElements(index: number = 0): AeroflyConfigurationNode[] {
        const getIndexString = (index: number) => {
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

        return index <= 1
            ? [
                  new AeroflyConfigurationNode("float64", `${indexString}_cover`, this.cover ?? 0, this.cover_code),
                  new AeroflyConfigurationNode("float64", `${indexString}_base`, this.base, `${this.base_feet} ft AGL`),
              ]
            : [
                  new AeroflyConfigurationNodeComment("float64", `${indexString}_cover`, this.cover ?? 0, this.cover_code),
                  new AeroflyConfigurationNodeComment("float64", `${indexString}_base`, this.base, `${this.base_feet} ft AGL`),
              ];
    }

    /**
     * @param {number} index if used in an array will set the array index
     * @returns {string} to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    toString(index: number = 0): string {
        return this.getElements()
            .map((element) => element.toString(index))
            .join("\n");
    }
}
