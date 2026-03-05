export type AeroflyVector3Float = [number, number, number];
export type AeroflyMatrix3Float = [number, number, number, number, number, number, number, number, number];
export declare class AeroflyBasicTypes {
    static convertLonLatToVector(longitude: number, latitude: number, altitude_meter: number): AeroflyVector3Float;
    static convertVectorToLonLat(coordinates: AeroflyVector3Float): {
        longitude: number;
        latitude: number;
        altitude_meter: number;
    };
    static convertDegreeToMatrix(heading_degree: number): AeroflyMatrix3Float;
    static convertMatrixToDegree(orientation: AeroflyMatrix3Float): number;
}
//# sourceMappingURL=AeroflyBasicTypes.d.ts.map
