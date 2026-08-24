import { AeroflyConfigurationNode } from "../node/AeroflyConfigurationNode.js";
/**
 * @class Represents the UTC time for a mission in Aerofly FS4.
 */
export declare class AeroflyTimeUtc {
    /**
     * @property {Date} time of flight plan. Relevant is the UTC part, so
     *    consider setting this date in UTC.
     */
    time: Date;
    /**
     * @param {Date} time of flight plan. Relevant is the UTC part, so
     *    consider setting this date in UTC.
     */
    constructor(time: Date);
    static createFromComponents(year: number, month: number, day: number, hours: number): AeroflyTimeUtc;
    /**
     * @returns {number} the Aerofly value for UTC year
     */
    get timeYear(): number;
    set timeYear(year: number);
    /**
     * @returns {number} the Aerofly value for UTC month (1-12)
     */
    get timeMonth(): number;
    set timeMonth(month: number);
    /**
     * @returns {number} the Aerofly value for UTC day of the month (1-31)
     */
    get timeDay(): number;
    set timeDay(day: number);
    /**
     * @returns {number} the Aerofly value for UTC hours + minutes/60 + seconds/3600. Ignores milliseconds ;)
     */
    get timeHours(): number;
    set timeHours(hours: number);
    /**
     * @returns {string} Time representation like "20:15:00"
     */
    get time_presentational(): string;
    getElement(): AeroflyConfigurationNode;
    /**
     * @returns {string} to use in Aerofly FS4's `main.mcf`
     */
    toString(): string;
}
//# sourceMappingURL=AeroflyTimeUtc.d.ts.map
