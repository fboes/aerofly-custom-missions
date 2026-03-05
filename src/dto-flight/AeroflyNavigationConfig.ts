import { AeroflyConfigurationNode } from "../node/AeroflyConfigurationNode.js";
import { Convert } from "../node/Convert.js";
import { AeroflyNavRouteBase } from "./AeroflyNavRouteBase.js";

export class AeroflyNavigationConfig {
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
    constructor(cruiseAltitude: number, waypoints: AeroflyNavRouteBase[] = []) {
        this.cruiseAltitude = cruiseAltitude;
        this.waypoints = waypoints;
    }

    /**
     * @param {number}  cruiseAltitude_ft in feet
     * @param {AeroflyNavRouteBase[]} waypoints in order of flight, if used in an array will set the array index
     * @returns {AeroflyNavigationConfig} with cruise altitude converted to meters
     */
    static createInFeet(cruiseAltitude_ft: number, waypoints: AeroflyNavRouteBase[] = []): AeroflyNavigationConfig {
        return new AeroflyNavigationConfig(Convert.convertFeetToMeter(cruiseAltitude_ft), waypoints);
    }

    /**
     * @returns {number} cruise altitude in feet
     */
    get cruiseAltitude_ft(): number {
        return Convert.convertMeterToFeet(this.cruiseAltitude);
    }

    set cruiseAltitude_ft(cruiseAltitude_ft: number) {
        this.cruiseAltitude = Convert.convertFeetToMeter(cruiseAltitude_ft);
    }

    /**
     * @returns {AeroflyConfigurationNode[]} indexed checkpoints
     */
    getCheckpointElements(): AeroflyConfigurationNode[] {
        return this.waypoints.map((c: AeroflyNavRouteBase, index: number): AeroflyConfigurationNode => {
            return c.getElement(index);
        });
    }

    getElement(): AeroflyConfigurationNode {
        return new AeroflyConfigurationNode("tmnavigation_config", "navigation")
            .append(
                new AeroflyConfigurationNode("tmnav_route", "Route")
                    .appendChild(
                        "float64",
                        "CruiseAltitude",
                        this.cruiseAltitude,
                        `${Math.ceil(this.cruiseAltitude_ft)} ft`,
                    )
                    .append(
                        new AeroflyConfigurationNode("pointer_list_tmnav_route_way", "Ways").append(
                            ...this.getCheckpointElements(),
                        ),
                    ),
            )
            .append(new AeroflyConfigurationNode("list_fixed_tmnav_fix", "Fixes", []));
    }

    /**
     * @returns {string} to use in Aerofly FS4's `main.mcf`
     */
    toString(): string {
        return this.getElement().toString();
    }
}
