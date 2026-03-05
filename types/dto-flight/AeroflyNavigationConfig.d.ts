import { AeroflyConfigurationNode } from "../node/AeroflyConfigurationNode.js";
import { AeroflyNavRouteBase } from "./AeroflyNavRouteBase.js";
export declare class AeroflyNavigationConfig {
    /**
     * @property {number} cruiseAltitude in meters
     */
    cruiseAltitude: number;
    /**
     * @property {AeroflyNavRouteBase[]} waypoints in order of flight, if used in an array will set the array index
     */
    waypoints: AeroflyNavRouteBase[];
    /**
     * @param {number} cruiseAltitude in meters
     * @param {AeroflyNavRouteBase[]} waypoints in order of flight, if used in an array will set the array index
     */
    constructor(cruiseAltitude: number, waypoints?: AeroflyNavRouteBase[]);
    /**
     * @param {number}  cruiseAltitude_ft in feet
     * @param {AeroflyNavRouteBase[]} waypoints in order of flight, if used in an array will set the array index
     * @returns {AeroflyNavigationConfig} with cruise altitude converted to meters
     */
    static createInFeet(cruiseAltitude_ft: number, waypoints?: AeroflyNavRouteBase[]): AeroflyNavigationConfig;
    /**
     * @returns {number} cruise altitude in feet
     */
    get cruiseAltitude_ft(): number;
    set cruiseAltitude_ft(cruiseAltitude_ft: number);
    /**
     * @returns {AeroflyConfigurationNode[]} indexed checkpoints
     */
    getCheckpointElements(): AeroflyConfigurationNode[];
    getElement(): AeroflyConfigurationNode;
    /**
     * @returns {string} to use in Aerofly FS4's `main.mcf`
     */
    toString(): string;
}
//# sourceMappingURL=AeroflyNavigationConfig.d.ts.map
