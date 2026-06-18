import { AeroflyConfigurationNode } from "../node/AeroflyConfigurationNode.js";
import { Convert } from "../node/Convert.js";
import { AeroflyNavRouteBase } from "./AeroflyNavRouteBase.js";
export class AeroflyNavigationConfig {
    /**
     * @property {number} cruiseAltitude in meters
     */
    cruiseAltitude;
    /**
     * @property {AeroflyNavRouteBase[]} waypoints in order of flight, if used in an array will set the array index
     */
    waypoints;
    /**
     * @param {number} cruiseAltitude in meters
     * @param {AeroflyNavRouteBase[]} waypoints in order of flight, if used in an array will set the array index
     */
    constructor(cruiseAltitude, waypoints = []) {
        this.cruiseAltitude = cruiseAltitude;
        this.waypoints = waypoints;
    }
    /**
     * @param {number}  cruiseAltitude_ft in feet
     * @param {AeroflyNavRouteBase[]} waypoints in order of flight, if used in an array will set the array index
     * @returns {AeroflyNavigationConfig} with cruise altitude converted to meters
     */
    static createInFeet(cruiseAltitude_ft, waypoints = []) {
        return new AeroflyNavigationConfig(Convert.convertFeetToMeter(cruiseAltitude_ft), waypoints);
    }
    /**
     * @returns {number} cruise altitude in feet
     */
    get cruiseAltitude_ft() {
        return Convert.convertMeterToFeet(this.cruiseAltitude);
    }
    set cruiseAltitude_ft(cruiseAltitude_ft) {
        this.cruiseAltitude = Convert.convertFeetToMeter(cruiseAltitude_ft);
    }
    /**
     * @returns {AeroflyConfigurationNode[]} indexed checkpoints
     */
    getCheckpointElements() {
        return this.waypoints.map((c, index) => {
            return c.getElement(index);
        });
    }
    getElement() {
        return new AeroflyConfigurationNode("tmnavigation_config", "navigation")
            .append(new AeroflyConfigurationNode("tmnav_route", "Route")
            .appendChild("float64", "CruiseAltitude", this.cruiseAltitude, `${Math.ceil(this.cruiseAltitude_ft)} ft`)
            .append(new AeroflyConfigurationNode("pointer_list_tmnav_route_way", "Ways").append(...this.getCheckpointElements())))
            .append(new AeroflyConfigurationNode("list_fixed_tmnav_fix", "Fixes", []));
    }
    toJSON() {
        return {
            ...this,
            cruiseAltitude: undefined,
            cruiseAltitude_ft: this.cruiseAltitude_ft,
        };
    }
    /**
     * @returns {string} to use in Aerofly FS4's `main.mcf`
     */
    toString() {
        return this.getElement().toString();
    }
}
