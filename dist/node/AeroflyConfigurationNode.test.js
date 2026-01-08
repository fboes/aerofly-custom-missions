import { AeroflyConfigurationNode, AeroflyConfigurationNodeComment } from "../node/AeroflyConfigurationNode.js";
import { assertValidAeroflyStructure, assertIncludes } from "../check/TestHelpers.js";
import { describe, it } from "node:test";
describe("AeroflyConfigurationNode", () => {
    const file = new AeroflyConfigurationNode("file", "");
    file.append(new AeroflyConfigurationNode("tmmissions_list", "").append(new AeroflyConfigurationNode("list_tmmission_definition", "missions")
        .append(new AeroflyConfigurationNode("tmmission_definition", "mission")
        .appendChild("string8", "title", "KCCR #1: Concord / Buchanan Field")
        .appendChild("float64", "origin_alt", 1066.799965862401, "3500 ft MSL")
        .appendChild("bool", "is_featured", true)
        .appendChild("bool", "is_scheduled", false))
        .append(new AeroflyConfigurationNodeComment("tmmission_definition", "mission", undefined, "Second mission").appendChild("string8", "title", "KCCR #2: Concord / Buchanan Field"))));
    const fileString = file.toString();
    const xmlString = file.toXmlString();
    it("should correctly convert values", () => {
        assertIncludes(fileString, "[true]");
        assertIncludes(fileString, "[false]");
        assertIncludes(fileString, "// 3500 ft MSL");
    });
    it("should generate valid Aerofly structure", () => {
        assertValidAeroflyStructure(fileString);
    });
    it("should correctly convert XML values", () => {
        assertIncludes(xmlString, ">true<");
        assertIncludes(xmlString, ">false<");
        assertIncludes(xmlString, "<!-- 3500 ft MSL");
    });
});
