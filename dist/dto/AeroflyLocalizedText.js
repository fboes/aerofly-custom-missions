import { AeroflyConfigFileSet } from "./AeroflyConfigFileSet.js";
/**
 * @class
 * A translation for the mission title and description.
 */
export class AeroflyLocalizedText {
    /**
     * @param {string} language ISO 639-1 like
     * - br
     * - cn
     * - de
     * - es
     * - fr
     * - id
     * - it
     * - jp
     * - kr
     * - pl
     * - sv
     * - tr
     * @param {string} title of this flight plan
     * @param {string} description text, mission briefing, etc
     */
    constructor(language, title, description) {
        this.language = language;
        this.title = title;
        this.description = description;
    }
    /**
     * @param {number} index if used in an array will se the array index
     * @returns {string} to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    toString(index = 0) {
        return new AeroflyConfigFileSet(4, "tmmission_definition_localized", "element", String(index))
            .push("string8u", "language", this.language)
            .push("string8", "title", this.title)
            .push("string8", "description", this.description)
            .toString();
    }
}
