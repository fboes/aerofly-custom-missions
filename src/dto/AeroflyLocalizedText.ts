import { AeroflyConfigFileSet } from "./AeroflyConfigFileSet.js";

/**
 * @class
 * A translation for the mission title and description.
 */
export class AeroflyLocalizedText {
    /**
     * @property {string} language ISO 639-1 like
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
     */
    language: string;

    /**
     * @property {string} title of this flight plan
     */
    title: string;

    /**
     * @property {string} description text, mission briefing, etc
     */
    description: string;

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
    constructor(language: string, title: string, description: string) {
        this.language = language;
        this.title = title;
        this.description = description;
    }

    /**
     * @param {number} index if used in an array will se the array index
     * @returns {string} to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    toString(index: number = 0): string {
        return new AeroflyConfigFileSet(4, "tmmission_definition_localized", "element", String(index))
            .push("string8u", "language", this.language)
            .push("string8", "title", this.title)
            .push("string8", "description", this.description)
            .toString();
    }
}
