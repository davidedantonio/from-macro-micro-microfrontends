import {action, observable} from "mobx";

class AppShellStore {
  @observable title = 'Page Title';
  @observable message = null;

  @action
  showMessage (message, milliseconds = 5000) {
    this.message = message;

    setTimeout(() => {
      this.message = null;
    }, milliseconds);
  }

  @action
  resetMessage () {
    this.message = null;
  }

  @action
  changeTitle (title) {
    this.title = title;
  }
}

export const appShellStore = new AppShellStore();