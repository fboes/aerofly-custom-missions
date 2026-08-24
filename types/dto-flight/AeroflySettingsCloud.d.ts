import { AeroflyConfigurationNode } from "../node/AeroflyConfigurationNode.js";
export type AeroflySettingsCloudDensityCode = "CLR" | "FEW" | "SCT" | "BKN" | "OVC";
export declare class AeroflySettingsCloud {
    /**
     * @property {number} density as normalized value [0,1], e.g. 0.5 for 50% cloud cover
     */
    density: number;
    /**
     * @property {number} height in 10,000 ft AGL, e.g. 0.5 for 5,000 ft AGL
     */
    height: number;
    /**
     * @param {number} density as normalized value [0,1], e.g. 0.5 for 50% cloud cover
     * @param {number} height in 10,000 ft AGL, e.g. 0.5 for 5,000 ft AGL
     */
    constructor(density: number, height: number);
    /**
     * @param {number} density as normalized value [0,1], e.g. 0.5 for 50% cloud cover
     * @param {number} height_ft altitude in feet AGL
     * @returns {AeroflySettingsCloud} with height converted to meters AGL
     */
    static createInFeet(density: number, height_ft: number): AeroflySettingsCloud;
    /**
     * @returns {number} height_ft altitude in feet AGL
     */
    get height_ft(): number;
    set height_ft(height_ft: number);
    /**
     * @returns {AeroflySettingsCloudDensityCode} density code based on the density value
     * CLR: 0, FEW: >0 to 1/8, SCT: >1/8 to 2/8, BKN: >2/8 to 7/8, OVC: >7/8 to 1
     */
    get density_code(): AeroflySettingsCloudDensityCode;
    set density_code(density_code: AeroflySettingsCloudDensityCode);
    /**
     * @param {number} index if used in an array will set the array index
     * @returns {AeroflyConfigurationNode[]} to use in Aerofly FS4's `main.mcf`
     */
    getElements(index?: number): AeroflyConfigurationNode[];
    toJSON(): never;
    /**
     * @param {number} index if used in an array will set the array index
     * @returns {string} to use in Aerofly FS4's `main.mcf`
     */
    toString(index?: number): string;
}
//# sourceMappingURL=AeroflySettingsCloud.d.ts.map
