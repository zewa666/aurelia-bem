import { bemClassGenerator } from "bem";

describe("using the bem helpers validation", () => {
  let ce;

  beforeEach(() => {
    ce = jest.spyOn(console, "error").mockReturnValue();
  })
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the name if it's ok", () => {
    expect(bemClassGenerator("test")).toEqual(["test"]);
  });

  describe("in order to prevent oversight or deep nesting", () => {
    const wrongNames = [
      "block--as-modifier",
      "block__as_element"
    ];

    it("should report an error when using bem separators within blocks", () => {
      wrongNames.forEach((name) => {
        bemClassGenerator(name);

        expect(ce).toHaveBeenCalled();
      });
    });

    it("should report an error when using bem separators within elements", () => {
      wrongNames.forEach((name) => {
        bemClassGenerator("test", name);

        expect(ce).toHaveBeenCalled();
      });
    });

    it("should not fail with __ for elements without given block", () => {
      bemClassGenerator("", "test__element")

      expect(ce).not.toHaveBeenCalled();
    });

    it("should report an error for nested elements", () => {
      bemClassGenerator("test", "test__sub__element");

      expect(ce).toHaveBeenCalled();
    });

    it("should report an error for elements without block if no block provided", () => {
      bemClassGenerator("", "test");

      expect(ce).toHaveBeenCalled();
    });

    it("should report an error when using bem separators within modifiers", () => {
      wrongNames.forEach((name) => {
        bemClassGenerator("test", "test__test", name);

        expect(ce).toHaveBeenCalled();
      });
    });
  });
});
