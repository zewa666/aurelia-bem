import { FrameworkConfiguration } from 'aurelia-framework';
import { BemBinder } from './bem';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    BemBinder
  ]);
}
