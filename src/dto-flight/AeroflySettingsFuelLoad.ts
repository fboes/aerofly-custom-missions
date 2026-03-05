import { AeroflyConfigurationNode } from "../node/AeroflyConfigurationNode.js";

export type AeroflySettingsFuelLoadConfiguration = "Keep" | "Invalid";

export class AeroflySettingsFuelLoad {
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
        aircraft: string = "",
        fuelMass: number = 0,
        payloadMass: number = 0,
        configuration: AeroflySettingsFuelLoadConfiguration = "Invalid",
    ) {
        this.aircraft = aircraft;
        this.fuelMass = fuelMass;
        this.payloadMass = payloadMass;
        this.configuration = configuration;
    }

    getElement(): AeroflyConfigurationNode {
        return new AeroflyConfigurationNode("tmsettings_fuel_load", "fuel_load_setting")
            .appendChild("fuel_load_configuration", "configuration", this.fuelMass > 0 ? "Keep" : this.configuration)
            .appendChild("string8u", "aircraft", this.aircraft)
            .appendChild("float64", "fuel_mass", this.fuelMass)
            .appendChild("float64", "payload_mass", this.payloadMass);
    }

    /**
     * @returns {string} to use in Aerofly FS4's `main.mcf`
     */
    toString(): string {
        return this.getElement().toString();
    }
}
