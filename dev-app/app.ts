export class App {
  public message: string = 'from Aurelia!';
  public isActive = false;

  clicked() {
    // eslint-disable-next-line no-alert
    alert('A primary button click or a touch');
  }
}
