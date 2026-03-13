import { AeroflySettingsAircraft } from "./AeroflySettingsAircraft.js";
import { AeroflySettingsFuelLoad } from "./AeroflySettingsFuelLoad.js";
import { AeroflyConfigurationNode } from "../node/AeroflyConfigurationNode.js";
export class AeroflyFlight {
    /**
     *
     * @param {AeroflySettingsAircraft} aircraft settings for the mission
     * @param {AeroflySettingsFlight} flightSetting flight settings for the mission
     * @param {AeroflyTimeUtc} timeUtc time settings for the mission
     * @param {AeroflySettingsWind} wind wind settings for the mission
     * @param {AeroflySettingsCloud[]} clouds cloud settings for the mission
     * @param {AeroflyNavigationConfig} navigation navigation settings for the mission
     * @param {object} [options] optional parameters for the mission
     * @param {AeroflySettingsFuelLoad} [options.fuelLoadSetting] fuel load settings for the mission, default is empty fuel load
     * @param {number} [options.visibility_meter] visibility in meter, 9999 for unlimited visibility, default is 9999
     * @param {number} [options.visibility] visibility in normalized value [0,1], where 0 means 0 meter visibility and 1 unlimited visibility, default is 0
     * @param {number} [options.visibility_sm] visibility in statute miles, 10 SM for unlimited visibility, default is 0
     */
    constructor(aircraft, flightSetting, timeUtc, wind, clouds, navigation, { fuelLoadSetting = new AeroflySettingsFuelLoad(), visibility_meter = 9999, visibility = 0, visibility_sm = 0, } = {}) {
        this.aircraft = aircraft;
        this.flightSetting = flightSetting;
        this.timeUtc = timeUtc;
        this.wind = wind;
        this.clouds = clouds;
        this.navigation = navigation;
        this.fuelLoadSetting = fuelLoadSetting;
        this.visibility_meter = visibility_meter;
        if (visibility_sm > 0) {
            this.visibility_sm = visibility_sm;
        }
        if (visibility > 0) {
            this.visibility = visibility;
        }
    }
    /**
     * @returns {number} visibility in statute miles, 10 SM for unlimited visibility
     */
    get visibility_sm() {
        return this.visibility_meter / 1609.34;
    }
    set visibility_sm(visibility_sm) {
        this.visibility_meter = visibility_sm * 1609.34;
    }
    /**
     * @returns {number} visibility in normalized value [0,1], where 0 means 0
     * meter visibility and 1 unlimited visibility (exactly 9999 meter or more
     * than 10 SM)
     */
    get visibility() {
        return this.visibility_meter === 9999 ? 1 : this.visibility_meter / 15_000;
    }
    set visibility(visibility) {
        this.visibility_meter = visibility * 15_000;
    }
    /**
     * This will update the aircraft name in both the flight settings and the
     * fuel load settings, as they are both required to be consistent for
     * Aerofly to load the mission correctly.
     * - This also resets the fuel load settings, as the fuel load configuration
     *   is likely to be invalid for the new aircraft.
     * - This also resets the paintscheme, as it is likely to be invalid for the
     *   new aircraft.
     * @param {string} aircraftName Aerofly aircraft name (e.g. "c172").
     */
    setAircraftName(aircraftName) {
        if (this.aircraft.name !== aircraftName) {
            this.aircraft = new AeroflySettingsAircraft(aircraftName);
        }
        if (this.fuelLoadSetting.aircraft !== aircraftName) {
            this.fuelLoadSetting = new AeroflySettingsFuelLoad(aircraftName);
        }
    }
    /**
     * @returns {AeroflyConfigurationNode[]} cloud elements
     */
    getCloudElements() {
        return this.clouds.flatMap((c, index) => (index < 3 ? c.getElements(index) : []));
    }
    /**
     * @returns {AeroflyConfigurationNode} element containing all clouds
     */
    getCloudsElement() {
        return new AeroflyConfigurationNode("tmsettings_clouds", "clouds").append(...this.getCloudElements());
    }
    getElement() {
        return new AeroflyConfigurationNode("file", "").append(new AeroflyConfigurationNode("tmsettings_sim", "").append(this.aircraft.getElement(), this.flightSetting.getElement(), this.fuelLoadSetting.getElement(), this.timeUtc.getElement(), new AeroflyConfigurationNode("float64", "visibility", this.visibility, `${this.visibility_sm.toPrecision(2)} SM`), this.wind.getElement(), this.getCloudsElement(), this.navigation.getElement()));
    }
    /**
     * @returns {string} to use in Aerofly FS4's `main.mcf`
     */
    toString() {
        return this.getElement().toString();
    }
    /**
     * @returns {string} to use in Aerofly FS4's `main.xml` in XML format
     */
    toXmlString() {
        return this.getElement().toXmlString();
    }
}
