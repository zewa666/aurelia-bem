import { bemClassGenerator } from "../../src/bem";

describe("the bem class generator", () => {
  describe("called with a block", () => {
    it("should return the block as class", () => {
      const block = "my-component";
      const result = bemClassGenerator(block);
      const expected = [block];

      expect(result).toEqual(expected);
    });

    [
      { msg: "empty string", value: "" },
      { msg: "undefined", value: undefined },
      { msg: "null", value: null },
    ].forEach((mapped) => {
      it(`shouldn't return a block class for ${mapped.msg}`, () => {
        const block = mapped.value;
        const result = bemClassGenerator(block);
        const expected = [];

        expect(result).toEqual(expected);
      });
    });
  });

  describe("called with an element", () => {
    it("should return element class prefaced with block name", () => {
      const block = "my-component";
      const element = "my-element";
      const result = bemClassGenerator(block, element);
      const expected = [`${block}__${element}`];

      expect(result).toEqual(expected);
    });

    it("should return element class as is without block", () => {
      const block = "";
      const element = "my-element";
      const result = bemClassGenerator(block, element);
      const expected = [element];


      expect(result).toEqual(expected);
    });

    [
      { msg: "empty string", value: "" },
      { msg: "undefined", value: undefined },
      { msg: "null", value: null },
    ].forEach((mapped) => {
      it(`shouldn't return an element class for ${mapped.msg}`, () => {
        const block = "my-component";
        const element = mapped.value;
        const result = bemClassGenerator(block, element);
        const expected = [block];

        expect(result).toEqual(expected);
      });
    });
  });

  describe("called with a modifier", () => {
    it("should attach it to the full elementname if present", () => {
      const block = "my-component";
      const element = "my-element";
      const modifier = "active";
      const result = bemClassGenerator(block, element, modifier);
      const expected = [`${block}__${element}`, `${block}__${element}--${modifier}`];

      expect(result).toEqual(expected);
    });

    it("should attach it to the element if no block is present", () => {
      const block = "";
      const element = "my-element";
      const modifier = "active";
      const result = bemClassGenerator(block, element, modifier);
      const expected = [element, `${element}--${modifier}`];

      expect(result).toEqual(expected);
    });

    it("should attach it to the block if no element present", () => {
      const block = "my-component";
      const element = "";
      const modifier = "active";
      const result = bemClassGenerator(block, element, modifier);
      const expected = [block, `${block}--${modifier}`];

      expect(result).toEqual(expected);
    });

    it("should accept multiple modifiers", () => {
      const block = "my-component";
      const element = "my-element";
      const modifiers = ["active", "opaque"];
      const result = bemClassGenerator(block, element, modifiers);
      const expected = [`${block}__${element}`, ...modifiers.map((m) => `${block}__${element}--${m}`)];

      expect(result).toEqual(expected);
    });

    it("should exclude emptyish modifiers", () => {
      const block = "my-component";
      const element = "my-element";
      const modifiers = ["active", "", undefined, "opaque"];
      const result = bemClassGenerator(block, element, modifiers);
      const expected = [`${block}__${element}`, ...modifiers.filter((m) => m).map((m) => `${block}__${element}--${m}`)];

      expect(result).toEqual(expected);
    });
  })
});
