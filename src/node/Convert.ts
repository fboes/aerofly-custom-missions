export type AeroflyVector3Float = [number, number, number];

export type AeroflyMatrix3Float = [number, number, number, number, number, number, number, number, number];

export class Convert {
    static convertLonLatToVector(longitude: number, latitude: number, altitude_meter: number): AeroflyVector3Float {
        const a = 6378137.0;
        const f = 1.0 / 298.257223563;
        const e2 = f * (2 - f);

        const lon = longitude * (Math.PI / 180); // in radians
        const lat = latitude * (Math.PI / 180); // in radians
        const h = altitude_meter;

        const sinLat = Math.sin(lat);
        const cosLat = Math.cos(lat);
        const cosLon = Math.cos(lon);
        const sinLon = Math.sin(lon);

        const N = a / Math.sqrt(1 - e2 * sinLat * sinLat);
        const x = (N + h) * cosLat * cosLon;
        const y = (N + h) * cosLat * sinLon;
        const z = (N * (1 - e2) + h) * sinLat;

        return [x, y, z];
    }

    static convertVectorToLonLat(coordinates: AeroflyVector3Float): {
        longitude: number;
        latitude: number;
        altitude_meter: number;
    } {
        // TODO: This implementation is not correct
        const f = 1.0 / 298.257223563; // WGS84
        const e2 = 2 * f - f * f;

        //const lambda = VectorToAngle( coordinates[0], coordinates[1] );
        let lambda = 0;
        if (coordinates[0] > 0) {
            if (coordinates[1] < 0) {
                lambda = 2 * Math.PI + Math.atan(coordinates[1] / coordinates[0]);
            } else {
                lambda = Math.atan(coordinates[1] / coordinates[0]);
            }
        } else if (coordinates[0] < 0) {
            lambda = Math.PI + Math.atan(coordinates[1] / coordinates[0]);
        } else if (coordinates[1] > 0) {
            lambda = 0.5 * Math.PI;
        } else {
            lambda = 1.5 * Math.PI;
        }

        const rho = Math.sqrt(coordinates[0] * coordinates[0] + coordinates[1] * coordinates[1]);

        const phi = Math.atan(coordinates[2] / ((1.0 - e2) * rho));
        const longitude = (lambda * 180) / Math.PI;
        const latitude = (phi * 180) / Math.PI;
        const altitude_meter = rho / Math.cos(phi) - 6378137.0 / Math.sqrt(1 - e2 * Math.sin(phi) * Math.sin(phi));

        return {
            longitude: longitude > 180 ? longitude - 360 : longitude,
            latitude: latitude > 90 ? latitude - 180 : latitude < -90 ? latitude + 180 : latitude,
            altitude_meter,
        };
    }

    static convertDegreeToMatrix(heading_degree: number): AeroflyMatrix3Float {
        // TODO: This implementation is not correct
        const theta = heading_degree * (Math.PI / 180); // heading in radians

        const cosTheta = Math.cos(theta);
        const sinTheta = Math.sin(theta);

        return [cosTheta, -sinTheta, 0, sinTheta, cosTheta, 0, 0, 0, 1];
    }

    static convertMatrixToDegree(orientation: AeroflyMatrix3Float): number {
        const headingRad = Math.atan2(orientation[3], orientation[0]);
        let headingDeg = headingRad * (180 / Math.PI);
        // Normalize to [0, 360)
        if (headingDeg < 0) headingDeg += 360;
        return headingDeg;
    }

    static convertMeterToFeet(meter: number): number {
        return meter * 3.28084;
    }

    static convertFeetToMeter(feet: number): number {
        return feet / 3.28084;
    }

    static convertKgToLb(kg: number) {
        return kg;
    }

    static convertLbToKg(lb: number) {
        return lb;
    }
}
