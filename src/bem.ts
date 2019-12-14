import { viewEngineHooks } from 'aurelia-templating';

export function bemClassGenerator(
  block?: string,
  element?: string,
  modifier?: string | string[]
) {
  const result = [];

  if (block && !element) {
    result.push(checkForValidName(block));
  }

  if (element) {
    checkForValidName(element, !block);
    result.push(block ? `${block}__${element}` : element);
  }

  function pushModifier(m) {
    checkForValidName(m);
    if (element) {
      result.push((
        block
          ? `${block}__${element}--${m}`
          : `${element}--${m}`
      ));
    } else {
      result.push((`${block}--${m}`));
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


function checkForValidName(name: string, noBlock = false) {
  const tester = new RegExp(`[-${noBlock ? "" : "|_"}]{2,}`);

  if (name.match(tester) || name.match(/_{2,}.*_{2,}/)) {
    console.error(`Usage of invalid separators in given name ${name}`);
  }

  if (noBlock && !name.includes("__")) {
    console.error(`Given name ${name} includes no __ and no block provided`);
  }

  return name;
}

export function bem(
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
