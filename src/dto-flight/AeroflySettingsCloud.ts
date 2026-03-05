import { AeroflyConfigurationNode, AeroflyConfigurationNodeComment } from "../node/AeroflyConfigurationNode.js";

export type AeroflySettingsCloudDensityCode = "CLR" | "FEW" | "SCT" | "BKN" | "OVC";

export class AeroflySettingsCloud {
    /**
     * @property {number} density as normalized value [0,1], e.g. 0.5 for 50% cloud cover
     */
    density: number;

    /**
     * @property {number} height in 10,000 ft AGL, e.g. 0.5 for 5,000 ft AGL
     */
    height: number;

    /**
     * @param {number} density as normalized value [0,1], e.g. 0.5 for 50% cloud cover
     * @param {number} height in 10,000 ft AGL, e.g. 0.5 for 5,000 ft AGL
     */
    constructor(density: number, height: number) {
        this.density = density;
        this.height = height;
    }

    /**
     * @param {number} density as normalized value [0,1], e.g. 0.5 for 50% cloud cover
     * @param {number} height_ft altitude in feet AGL
     * @returns {AeroflySettingsCloud} with height converted to meters AGL
     */
    static createInFeet(density: number, height_ft: number): AeroflySettingsCloud {
        return new AeroflySettingsCloud(density, height_ft / 10_000);
    }

    /**
     * @returns {number} height_ft altitude in feet AGL
     */
    get height_ft(): number {
        return this.height * 10_000;
    }

    set height_ft(height_ft: number) {
        this.height = height_ft / 10_000;
    }

    /**
     * @returns {AeroflySettingsCloudDensityCode} density code based on the density value
     * CLR: 0, FEW: >0 to 1/8, SCT: >1/8 to 2/8, BKN: >2/8 to 7/8, OVC: >7/8 to 1
     */
    get density_code(): AeroflySettingsCloudDensityCode {
        if (this.density < 1 / 8) {
            return "CLR";
        } else if (this.density <= 2 / 8) {
            return "FEW";
        } else if (this.density <= 4 / 8) {
            return "SCT";
        } else if (this.density <= 7 / 8) {
            return "BKN";
        }
        return "OVC";
    }

    set density_code(density_code: AeroflySettingsCloudDensityCode) {
        switch (density_code) {
            case "FEW":
                this.density = 1 / 8;
                break;
            case "SCT":
                this.density = 3 / 8;
                break;
            case "BKN":
                this.density = 5 / 8;
                break;
            case "OVC":
                this.density = 1;
                break;
            default:
                this.density = 0;
                break;
        }
    }

    /**
     * @param {number} index if used in an array will set the array index
     * @returns {AeroflyConfigurationNode[]} to use in Aerofly FS4's `main.mcf`
     */
    getElements(index: number = 0): AeroflyConfigurationNode[] {
        const getIndexString = (index: number) => {
            switch (index) {
                case 0:
                    return "cumulus";
                case 1:
                    return "cirrus";
                case 2:
                    return "cumulus_mediocris";
                default:
                    return "more_clouds";
            }
        };

        const indexString = getIndexString(index);

        return index <= 2
            ? [
                  new AeroflyConfigurationNode("float64", `${indexString}_density`, this.density, this.density_code),
                  new AeroflyConfigurationNode(
                      "float64",
                      `${indexString}_height`,
                      this.height,
                      `${Math.floor(this.height_ft)} ft AGL`,
                  ),
              ]
            : [
                  new AeroflyConfigurationNodeComment(
                      "float64",
                      `${indexString}_density`,
                      this.density,
                      this.density_code,
                  ),
                  new AeroflyConfigurationNodeComment(
                      "float64",
                      `${indexString}_height`,
                      this.height,
                      `${Math.floor(this.height_ft)} ft AGL`,
                  ),
              ];
    }

    /**
     * @param {number} index if used in an array will set the array index
     * @returns {string} to use in Aerofly FS4's `main.mcf`
     */
    toString(index: number = 0): string {
        return this.getElements()
            .map((element) => element.toString(index))
            .join("\n");
    }
}
