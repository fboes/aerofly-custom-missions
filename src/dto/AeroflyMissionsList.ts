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

    /**
     * @returns {string} to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    toString(): string {
        const separator = "\n// -----------------------------------------------------------------------------\n";
        return `\
<[file][][]
    <[tmmissions_list][][]
        <[list_tmmission_definition][missions][]${separator + this.missions.join(separator) + separator}        >
    >
>`;
    }
}
