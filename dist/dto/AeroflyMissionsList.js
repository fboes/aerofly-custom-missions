import { AeroflyConfigurationNode } from "../node/AeroflyConfigurationNode.js";
/**
 * @class
 * A list of flight plans.
 *
 * The purpose of this class is to collect data needed for Aerofly FS4's
 * `custom_missions_user.tmc` flight plan file format, and export the structure
 * for this file via the `toString()` method.
 */
export class AeroflyMissionsList {
    /**
     * @param {AeroflyMission[]} missions in this mission list
     */
    constructor(missions = []) {
        this.missions = missions;
    }
    getElement() {
        return new AeroflyConfigurationNode("file", "").append(new AeroflyConfigurationNode("tmmissions_list", "").append(new AeroflyConfigurationNode("list_tmmission_definition", "missions").append(...this.missions.map((m) => m.getElement()))));
    }
    /**
     * @returns {string} to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    toString() {
        return this.getElement().toString();
    }
    /**
     * @returns {string} XML represenation of this mission list
     */
    toXmlString() {
        return this.getElement().toXmlString();
    }
}
