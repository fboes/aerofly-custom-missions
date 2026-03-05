import { AeroflyConfigurationNode } from "../node/AeroflyConfigurationNode.js";
export type AeroflySettingsFuelLoadConfiguration = "Keep" | "Invalid";
export declare class AeroflySettingsFuelLoad {
    /**
     * @property {string} aircraft  aerofly aircraft name (e.g. "c172")
     */
    aircraft: string;
    /**
     * @property {number} fuelMass in kg
     */
    fuelMass: number;
    /**
     * @property {number} payloadMass in kg
     */
    payloadMass: number;
    /**
     * @property {AeroflySettingsFuelLoadConfiguration} configuration "Keep"
     * to keep the current fuel load configuration, "Invalid" to set an invalid
     * fuel load configuration (e.g. fuel mass exceeds maximum takeoff weight)
     */
    configuration: AeroflySettingsFuelLoadConfiguration;
    /**
     * @param {string} aircraft  aerofly aircraft name (e.g. "c172")
     * @param {number} fuelMass in kg
     * @param {number} payloadMass in kg
     * @param {AeroflySettingsFuelLoadConfiguration} configuration "Keep"
     * to keep the current fuel load configuration, "Invalid" to set an invalid
     * fuel load configuration (e.g. fuel mass exceeds maximum takeoff weight)
     */
    constructor(
        aircraft?: string,
        fuelMass?: number,
        payloadMass?: number,
        configuration?: AeroflySettingsFuelLoadConfiguration,
    );
    getElement(): AeroflyConfigurationNode;
    /**
     * @returns {string} to use in Aerofly FS4's `main.mcf`
     */
    toString(): string;
}
//# sourceMappingURL=AeroflySettingsFuelLoad.d.ts.map
