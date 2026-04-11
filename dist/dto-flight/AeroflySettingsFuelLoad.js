import { AeroflyConfigurationNode } from "../node/AeroflyConfigurationNode.js";
import { Convert } from "../node/Convert.js";
export class AeroflySettingsFuelLoad {
    /**
     * @param {string} aircraft  aerofly aircraft name (e.g. "c172")
     * @param {number} fuelMass in kg
     * @param {number} payloadMass in kg
     * @param {AeroflySettingsFuelLoadConfiguration} configuration "Keep"
     * to keep the current fuel load configuration, "Invalid" to set an invalid
     * fuel load configuration (e.g. fuel mass exceeds maximum takeoff weight)
     */
    constructor(aircraft = "", fuelMass = 0, payloadMass = 0, configuration = "Invalid") {
        this.aircraft = aircraft;
        this.fuelMass = fuelMass;
        this.payloadMass = payloadMass;
        this.configuration = configuration;
    }
    get fuelMass_lb() {
        return Convert.convertKgToLb(this.fuelMass);
    }
    set fuelMass_lb(fuelMass_lb) {
        this.fuelMass = Convert.convertLbToKg(fuelMass_lb);
    }
    get payloadMass_lb() {
        return Convert.convertKgToLb(this.payloadMass);
    }
    set payloadMass_lb(payloadMass_lb) {
        this.payloadMass = Convert.convertLbToKg(payloadMass_lb);
    }
    getElement() {
        return new AeroflyConfigurationNode("tmsettings_fuel_load", "fuel_load_setting")
            .appendChild("fuel_load_configuration", "configuration", this.fuelMass > 0 ? "Keep" : this.configuration)
            .appendChild("string8u", "aircraft", this.aircraft)
            .appendChild("float64", "fuel_mass", this.fuelMass)
            .appendChild("float64", "payload_mass", this.payloadMass);
    }
    /**
     * @returns {string} to use in Aerofly FS4's `main.mcf`
     */
    toString() {
        return this.getElement().toString();
    }
}
