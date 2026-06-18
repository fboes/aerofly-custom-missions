import { type AeroflyVector3Float, type AeroflyMatrix3Float } from "../node/Convert.js";
import { AeroflyConfigurationNode } from "../node/AeroflyConfigurationNode.js";
export type AeroflySettingsFlightConfiguration =
    | "Keep"
    | "ColdAndDark"
    | "BeforeStart"
    | "Parking"
    | "OnGround"
    | "Takeoff"
    | "Cruise"
    | "ShortFinal"
    | "Final";
export declare class AeroflySettingsFlight {
    longitude: number;
    latitude: number;
    altitude_meter: number;
    heading_degree: number;
    speed_kts: number;
    gear: number;
    /**
     * Throttle is supposed to be set to
     * - 0 on "ColdAndDark", "BeforeStart", "Parking", "OnGround" and "Takeoff" configuration
     * - 0.4 on "ShortFinal" and "Final" configuration
     * - 0.6 on "Cruise" configuration
     */
    throttle: number;
    /**
     * Flaps is supposed to be set to 1 on "ShortFinal" and "Final" configurations
     */
    flaps: number;
    configuration: AeroflySettingsFlightConfiguration;
    onGround: boolean;
    /**
     * Airport is supposed to be set on any configurations but "Cruise" and "Keep"
     */
    airport: string;
    /**
     * Runway is supposed to be set on "Takeoff", "ShortFinal" and "Final" configurations
     */
    runway: string;
    constructor(
        longitude: number,
        latitude: number,
        altitude_meter: number,
        heading_degree: number,
        speed_kts?: number,
        { gear, throttle, flaps, configuration, onGround, airport, runway }?: Partial<AeroflySettingsFlight>,
    );
    static createInFeet(
        longitude: number,
        latitude: number,
        altitude_ft: number,
        heading_degree: number,
        speed_kts?: number,
        additionalAttributes?: Partial<AeroflySettingsFlight>,
    ): AeroflySettingsFlight;
    static createInCartesian(
        position: AeroflyVector3Float,
        velocity: AeroflyVector3Float,
        orientation: AeroflyMatrix3Float,
        additionalAttributes?: Partial<AeroflySettingsFlight>,
    ): AeroflySettingsFlight;
    /**
     * @param {AeroflySettingsFlightConfiguration} configuration which will set other parameters like `gear`, `flaps` and `throttle` consistently
     */
    setConfiguration(configuration: AeroflySettingsFlightConfiguration): void;
    /**
     * @returns {AeroflyVector3Float} position vector to use in Aerofly FS4's `main.mcf`
     */
    get position(): AeroflyVector3Float;
    set position(position: AeroflyVector3Float);
    /**
     * @returns {AeroflyVector3Float} velocity vector to use in Aerofly FS4's `main.mcf`
     */
    get velocity(): AeroflyVector3Float;
    set velocity(velocity: AeroflyVector3Float);
    get orientation(): AeroflyMatrix3Float;
    set orientation(orientation: AeroflyMatrix3Float);
    /**
     * @returns {number} altitude in feet AGL
     */
    get altitude_ft(): number;
    set altitude_ft(altitude_ft: number);
    /**
     * @returns {number} speed in meters per seconds
     */
    get speed_ms(): number;
    set speed_ms(speed_ms: number);
    getElement(): AeroflyConfigurationNode;
    toJSON(): never;
    /**
     * @returns {string} to use in Aerofly FS4's `main.mcf`
     */
    toString(): string;
}
//# sourceMappingURL=AeroflySettingsFlight.d.ts.map
