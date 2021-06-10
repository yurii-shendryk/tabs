const refs = {
  constrols: document.querySelector("#tabs-1 [data-controls]"),
  panes: document.querySelector("[data-panes]"),
};

refs.constrols.addEventListener("click", onCickHandler);

function onCickHandler(event) {
  if (event.target.nodeName !== "A") {
    return;
  }
  const currentAciveControl = refs.constrols.querySelector(
    ".controls__item--active"
  );
  if (currentAciveControl) {
    currentAciveControl.classList.remove("controls__item--active");
    const paneId = currentAciveControl.getAttribute("href").slice(1);
    const pane = refs.panes.querySelector(`#${paneId}`);
    pane.classList.remove("pane--active");
  }
  const controlItem = event.target;
  controlItem.classList.add("controls__item--active");
  // const pane = ;
  const paneId = controlItem.getAttribute("href").slice(1);
  const pane = refs.panes.querySelector(`#${paneId}`);
  pane.classList.add("pane--active");
}
