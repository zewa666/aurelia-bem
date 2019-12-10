import {viewEngineHooks} from 'aurelia-templating';

export function bemClassGenerator(
  block?: string,
  element?: string,
  modifier?: string | string[]
) {
  const result = [];

  if (block && !element) {
    result.push(block);
  }

  if (element) {
    result.push(block ? `${block}__${element}` : element);
  }

  function pushModifier(m) {
    if (element) {
      result.push(
        block
          ? `${block}__${element}--${m}`
          : `${element}--${m}`
      );
    } else {
      result.push(`${block}--${m}`);
    }
  }

  if (modifier) {
    if (Array.isArray(modifier)) {
      modifier.filter((m) => m).forEach((m) => pushModifier(m));
    } else {
      pushModifier(modifier)
    }
  }

  return result;
}

function bem(
  block?: string,
  element?: string,
  modifier?: string | string[]) {
  return bemClassGenerator(block, element, modifier).join(" ");
}

@viewEngineHooks()
export class BemBinder {
  beforeBind(view) {
    view.overrideContext.bem = bem;
  }
}
