import { AeroflyConfigurationNode } from "../node/AeroflyConfigurationNode.js";
import { AeroflyMission } from "./AeroflyMission.js";

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
     * @property {AeroflyMission[]} missions in this mission list
     */
    missions: AeroflyMission[];

    /**
     * @param {AeroflyMission[]} missions in this mission list
     */
    constructor(missions: AeroflyMission[] = []) {
        this.missions = missions;
    }

    getElement(): AeroflyConfigurationNode {
        return new AeroflyConfigurationNode("file", "").append(
            new AeroflyConfigurationNode("tmmissions_list", "").append(
                new AeroflyConfigurationNode("list_tmmission_definition", "missions").append(
                    ...this.missions.map((m): AeroflyConfigurationNode =>{
                        const mission = m.getElement();
                        mission._comment = `End of ${mission.name}`;
                        return mission;
                    }),
                ),
            ),
        );
    }

    /**
     * @returns {string} to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    toString(): string {
        return this.getElement().toString();
    }

    /**
     * @returns {string} XML represenation of this mission list
     */
    toXmlString(): string {
        return this.getElement().toXmlString();
    }
}
