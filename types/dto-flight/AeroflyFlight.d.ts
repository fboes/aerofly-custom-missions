import { AeroflyNavigationConfig } from "./AeroflyNavigationConfig.js";
import { AeroflySettingsAircraft } from "./AeroflySettingsAircraft.js";
import { AeroflySettingsCloud } from "./AeroflySettingsCloud.js";
import { AeroflySettingsFlight } from "./AeroflySettingsFlight.js";
import { AeroflySettingsFuelLoad } from "./AeroflySettingsFuelLoad.js";
import { AeroflyTimeUtc } from "./AeroflyTimeUtc.js";
import { AeroflySettingsWind } from "./AeroflySettingsWind.js";
import { AeroflyConfigurationNode } from "../node/AeroflyConfigurationNode.js";
export declare class AeroflyFlight {
    /**
     * @property {AeroflySettingsAircraft} aircraft settings for the mission
     */
    aircraft: AeroflySettingsAircraft;
    /**
     * @property {AeroflySettingsFlight} flight settings for the mission
     */
    flightSetting: AeroflySettingsFlight;
    /**
     * @property {AeroflySettingsFuelLoad} fuelLoadSetting fuel load settings for the mission
     */
    fuelLoadSetting: AeroflySettingsFuelLoad;
    /**
     * @property {AeroflyTimeUtc} timeUtc time settings for the mission
     */
    timeUtc: AeroflyTimeUtc;
    /**
     * @property {AeroflySettingsWind} wind settings for the mission
     */
    wind: AeroflySettingsWind;
    /**
     * @property {AeroflySettingsCloud[]} clouds cloud settings for the mission.
     * Aerofly supports up to 3 cloud layers, so only the first 3 elements of this array will be used.
     */
    clouds: AeroflySettingsCloud[];
    /**
     * @property {AeroflyNavigationConfig} navigation navigation settings for the mission
     */
    navigation: AeroflyNavigationConfig;
    /**
     * @property {number} visibility_meter visibility in meter, 9999 for unlimited visibility
     */
    visibility_meter: number;
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
    constructor(
        aircraft: AeroflySettingsAircraft,
        flightSetting: AeroflySettingsFlight,
        timeUtc: AeroflyTimeUtc,
        wind: AeroflySettingsWind,
        clouds: AeroflySettingsCloud[],
        navigation: AeroflyNavigationConfig,
        { fuelLoadSetting, visibility_meter, visibility, visibility_sm }?: Partial<AeroflyFlight>,
    );
    /**
     * @returns {number} visibility in statute miles, 10 SM for unlimited visibility
     */
    get visibility_sm(): number;
    set visibility_sm(visibility_sm: number);
    /**
     * @returns {number} visibility in normalized value [0,1], where 0 means 0
     * meter visibility and 1 unlimited visibility (exactly 9999 meter or more
     * than 10 SM)
     */
    get visibility(): number;
    set visibility(visibility: number);
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
    setAircraftName(aircraftName: string): void;
    /**
     * @returns {AeroflyConfigurationNode[]} cloud elements
     */
    getCloudElements(): AeroflyConfigurationNode[];
    /**
     * @returns {AeroflyConfigurationNode} element containing all clouds
     */
    getCloudsElement(): AeroflyConfigurationNode;
    getElement(): AeroflyConfigurationNode;
    /**
     * @returns {string} to use in Aerofly FS4's `main.mcf`
     */
    toString(): string;
    /**
     * @returns {string} to use in Aerofly FS4's `main.xml` in XML format
     */
    toXmlString(): string;
}
//# sourceMappingURL=AeroflyFlight.d.ts.map
