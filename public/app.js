import apiRequest from "./apirequest.js";

export default class App {
  constructor() {
    this._onWorks = this._onWorks.bind(this);
    this._onFAC = this._onFAC.bind(this);
    this._onAbout = this._onAbout.bind(this);
    this._onSubmit = this._onSubmit.bind(this);

    this._worksButton = document.querySelector(".works");
    this._worksButton.addEventListener("click", this._onWorks);

    this._facButton = document.querySelector(".FAC");
    this._facButton.addEventListener("click", this._onFAC);

    this._aboutButton = document.querySelector(".about");
    this._aboutButton.addEventListener("click", this._onAbout);

    this._submitButton = document.querySelector("#submitButton");
    this._submitButton.addEventListener("click", this._onSubmit);
  }

  toJSON(theirName, email, message) {
    let person = {
      id: email,
      name: theirName,
      content: message
    };
    return person;
  }

  hideAllPages() {
    document.querySelector("#mainPage").className = "hidden";
    document.querySelector("#aboutPage").className = "hidden";
    document.querySelector("#worksPage").className = "hidden";
    document.querySelector("#showcasePage").className = "hidden";
  }

  _onWorks() {
    this.hideAllPages();
    document.querySelector("#worksPage").className = "works";
  }

  _onFAC() {
    this.hideAllPages();
    document.querySelector("#mainPage").className = "FAC";
  }

  _onAbout() {
    this.hideAllPages();
    document.querySelector("#aboutPage").className = "about";
  }

  showCase(data) {
    this.hideAllPages();
    let cont;
    for (let elem of data) {
      cont = document.createTextNode(elem);
      document.querySelector("#div1").append(cont);
      document.querySelector("#div1").append(document.createElement("br"));
      document.querySelector("#div1").append(document.createElement("br"));
    }
    document.querySelector("#showcasePage").className = "about";
  }

  async _onSubmit() {
    event.preventDefault();
    let emailField = document.querySelector("#email");
    let nameField = document.querySelector("#name");
    let messageField = document.querySelector("#message");
    if (nameField.value === "F8") {
      let data = await apiRequest("GET", "/people");
      this.showCase(data.people);
      emailField.value = "";
      nameField.value = "";
      messageField.value = "";
      return;
    }
    let obj = this.toJSON(nameField.value, emailField.value, messageField.value);
    await apiRequest("POST", "/people", obj);
    emailField.value = "";
    nameField.value = "";
    messageField.value = "";
  }
}
