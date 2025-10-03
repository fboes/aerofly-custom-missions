import { AeroflyConfigurationNode } from "../node/AeroflyConfigurationNode.js";
/**
 * @class
 * A target plane which the aircraft needs to cross.
 */
export class AeroflyMissionTargetPlane {
    /**
     *
     * @param {number} longitude easting, using the World Geodetic
     *    System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units
     *    of decimal degrees; -180..180
     * @param {number}latitude northing, using the World Geodetic
     *    System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units
     *    of decimal degrees; -90..90
     * @param {number} dir in degree
     * @param {string} name of property
     */
    constructor(longitude, latitude, dir, name = "finish") {
        this.longitude = longitude;
        this.latitude = latitude;
        this.dir = dir;
        this.name = name;
    }
    getElement() {
        return new AeroflyConfigurationNode("tmmission_target_plane", this.name)
            .appendChild("vector2_float64", "lon_lat", [this.longitude, this.latitude])
            .appendChild("float64", "direction", this.dir);
    }
    /**
     * @returns {string} to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    toString() {
        return this.getElement().toString();
    }
}
