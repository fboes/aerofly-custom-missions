import { AeroflyConfigFileSet } from "./AeroflyConfigFileSet.js";
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
    toString() {
        return new AeroflyConfigFileSet(4, "tmmission_target_plane", this.name)
            .push("vector2_float64", "lon_lat", [this.longitude, this.latitude])
            .push("float64", "direction", this.dir)
            .toString();
    }
}
