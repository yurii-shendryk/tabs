class Tabs {
  constructor({
    rootSelector,
    activeControlClass = "active",
    activePaneClass = "active",
    activeTab = 1,
  }) {
    this._refs = this._getRefs(rootSelector);
    this._activeControlClass = activeControlClass;
    this._activePaneClass = activePaneClass;
    this._activeTabIndex = activeTab - 1;
    this._bindEvents();
    this._setActiveTab();
  }
  _getRefs(root) {
    const refs = {};
    refs.controls = document.querySelector(`${root} [data-controls]`);
    refs.panes = document.querySelector(`${root} [data-panes]`);
    return refs;
  }

  _bindEvents() {
    this._refs.controls.addEventListener(
      "click",
      this._onControlsClick.bind(this)
    );
  }

  _onControlsClick(event) {
    event.preventDefault();
    if (event.target.nodeName !== "A") {
      return;
    }
    this._removeActiveTab();
    const control = event.target;
    control.classList.add(this._activeControlClass);
    const paneId = this._getPaneId(control);
    this._setActivePane(paneId);
  }

  _setActiveTab() {
    const controlItems = this._refs.controls.querySelectorAll("a");
    const control = controlItems[this._activeTabIndex];

    control.classList.add(this._activeControlClass);

    const paneId = this._getPaneId(control);
    this._setActivePane(paneId);
  }

  _removeActiveTab() {
    const currentActiveContorl = this._refs.controls.querySelector(
      `.${this._activeControlClass}`
    );
    if (!currentActiveContorl) {
      return;
    }
    currentActiveContorl.classList.remove(this._activeControlClass);
    const paneId = this._getPaneId(currentActiveContorl);
    this._removeActivePane(paneId);
  }

  _setActivePane(paneId) {
    const pane = this._getPaneById(paneId);
    pane.classList.add(this._activePaneClass);
  }

  _removeActivePane(paneId) {
    const pane = this._getPaneById(paneId);
    pane.classList.remove(this._activePaneClass);
  }

  _getPaneId(control) {
    return control.getAttribute("href").slice(1);
  }

  _getPaneById(id) {
    return this._refs.panes.querySelector(`#${id}`);
  }
}

const tabs1 = new Tabs({
  rootSelector: "#tabs-1",
  activeControlClass: "controls__item--active",
  activePaneClass: "pane--active",
  activeTab: 2,
});

const tabs2 = new Tabs({
  rootSelector: "#tabs-2",
  activeControlClass: "controls__item--active",
  activePaneClass: "pane--active",
  activeTab: 1,
});
