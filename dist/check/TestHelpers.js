import { strict as assert } from "node:assert";
export const assertValidAeroflyStructure = (aeroflyString) => {
    const openingBrackets = aeroflyString.match(/</g);
    const closingBrackets = aeroflyString.match(/>/g);
    const openingBrackets2 = aeroflyString.match(/\[/g);
    const closingBrackets2 = aeroflyString.match(/\]/g);
    assert.ok(openingBrackets?.length ?? 0 > 0, "Has opening <");
    assert.strictEqual(openingBrackets?.length, closingBrackets?.length, "Number of <> matches");
    assert.strictEqual(openingBrackets2?.length, closingBrackets2?.length, "Number of [] matches");
};
export const assertIncludes = (string, includes) => {
    assert.ok(string.includes(includes), `Includes "${includes}"`);
};
