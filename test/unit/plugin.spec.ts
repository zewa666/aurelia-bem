import { FrameworkConfiguration, Aurelia } from "aurelia-framework";
import { configure, BemBinder, bem } from "../../src/index";

describe("using the plugin in Aurelia", () => {
  it("should register the viewEngineHooks globally", () => {
    const config = new FrameworkConfiguration(new Aurelia());
    const spy = jest.spyOn(config, "globalResources");

    configure(config);

    expect(spy).toHaveBeenCalledWith([BemBinder]);
  });

  it("should override the viewContext and define a global bem helper", () => {
    const view = { overrideContext: { bem: undefined }};

    new BemBinder().beforeBind(view);

    expect(view.overrideContext.bem).toBe(bem);
  });
});
