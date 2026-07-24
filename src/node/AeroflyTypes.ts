export type AeroflyVector3FloatArray = [number, number, number];

export class AeroflyVector3Float {
    constructor(
        public x: number,
        public y: number,
        public z: number,
    ) {}

    normalize(): AeroflyVector3Float {
        const norm = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);

        if (norm === 0) {
            return new AeroflyVector3Float(0, 0, 0);
        }
        return new AeroflyVector3Float(this.x / norm, this.y / norm, this.z / norm);
    }

    cross(b: AeroflyVector3Float): AeroflyVector3Float {
        return new AeroflyVector3Float(
            this.y * b.z - this.z * b.y,
            this.z * b.x - this.x * b.z,
            this.x * b.y - this.y * b.x,
        );
    }

    static fromArray(array: AeroflyVector3FloatArray): AeroflyVector3Float {
        return new this(...array);
    }

    toArray(): AeroflyVector3FloatArray {
        return [this.x, this.y, this.z];
    }
}

export type AeroflyMatrix3FloatArray = [number, number, number, number, number, number, number, number, number];

export class AeroflyMatrix3Float {
    constructor(
        public xx: number,
        public yx: number,
        public zx: number,
        public xy: number,
        public yy: number,
        public zy: number,
        public xz: number,
        public yz: number,
        public zz: number,
    ) {}

    transpose(): AeroflyMatrix3Float {
        return new AeroflyMatrix3Float(this.xx, this.xy, this.xz, this.yx, this.yy, this.yz, this.zx, this.zy, this.zz);
    }

    multiplyVector(v: AeroflyVector3Float): AeroflyVector3Float {
        return new AeroflyVector3Float(
            this.xx * v.x + this.xy * v.y + this.xz * v.z,
            this.yx * v.x + this.yy * v.y + this.yz * v.z,
            this.zx * v.x + this.zy * v.y + this.zz * v.z,
        );
    }

    static fromArray(array: AeroflyMatrix3FloatArray): AeroflyMatrix3Float {
        return new this(...array);
    }

    toArray(): AeroflyMatrix3FloatArray {
        return [this.xx, this.yx, this.zx, this.xy, this.yy, this.zy, this.xz, this.yz, this.zz];
    }
}
