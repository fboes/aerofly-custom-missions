import { AeroflyConfigurationNode } from "../node/AeroflyConfigurationNode.js";
/**
 * @class Represents the UTC time for a mission in Aerofly FS4.
 */
export class AeroflyTimeUtc {
    /**
     * @property {Date} time of flight plan. Relevant is the UTC part, so
     *    consider setting this date in UTC.
     */
    time;
    /**
     * @param {Date} time of flight plan. Relevant is the UTC part, so
     *    consider setting this date in UTC.
     */
    constructor(time) {
        this.time = time;
    }
    static createFromComponents(year, month, day, hours) {
        const time = new AeroflyTimeUtc(new Date());
        time.timeYear = year;
        time.timeMonth = month;
        time.timeDay = day;
        time.timeHours = hours;
        return time;
    }
    /**
     * @returns {number} the Aerofly value for UTC year
     */
    get timeYear() {
        return this.time.getUTCFullYear();
    }
    set timeYear(year) {
        this.time.setUTCFullYear(year);
    }
    /**
     * @returns {number} the Aerofly value for UTC month (1-12)
     */
    get timeMonth() {
        return this.time.getUTCMonth() + 1;
    }
    set timeMonth(month) {
        this.time.setUTCMonth(month - 1);
    }
    /**
     * @returns {number} the Aerofly value for UTC day of the month (1-31)
     */
    get timeDay() {
        return this.time.getUTCDate();
    }
    set timeDay(day) {
        this.time.setUTCDate(day);
    }
    /**
     * @returns {number} the Aerofly value for UTC hours + minutes/60 + seconds/3600. Ignores milliseconds ;)
     */
    get timeHours() {
        return this.time.getUTCHours() + this.time.getUTCMinutes() / 60 + this.time.getUTCSeconds() / 3600;
    }
    set timeHours(hours) {
        const totalSeconds = Math.round(hours * 3600);
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        this.time.setUTCHours(h, m, s, 0);
    }
    /**
     * @returns {string} Time representation like "20:15:00"
     */
    get time_presentational() {
        return [this.time.getUTCHours(), this.time.getUTCMinutes(), this.time.getUTCSeconds()]
            .map((t) => {
            return String(t).padStart(2, "0");
        })
            .join(":");
    }
    getElement() {
        return new AeroflyConfigurationNode("tm_time_utc", "time_utc")
            .appendChild("int32", "time_year", this.timeYear)
            .appendChild("int32", "time_month", this.timeMonth)
            .appendChild("int32", "time_day", this.timeDay)
            .appendChild("float64", "time_hours", this.timeHours, `${this.time_presentational} UTC`);
    }
    /**
     * @returns {string} to use in Aerofly FS4's `main.mcf`
     */
    toString() {
        return this.getElement().toString();
    }
}
