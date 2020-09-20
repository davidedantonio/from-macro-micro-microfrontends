import {action, observable} from "mobx";

class AppShellStore {
  @observable title = 'Page Title';
  @observable message = null;
  @observable drawerOpen = localStorage.getItem("@mf-tickets/drawer") !== 'false';

  constructor() {
    console.log(this.drawerOpen, localStorage.getItem("@mf-tickets/drawer"));
  }

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

  @action
  openCloseDrawer () {
    this.drawerOpen = !this.drawerOpen;
    localStorage.setItem("@mf-tickets/drawer", this.drawerOpen)
  }
}

export const appShellStore = new AppShellStore();