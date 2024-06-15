export let getDirection: (
  direction: string,
  activeKeys: Set<string>
) => string = (direction, activeKeys) => {
   
  if (activeKeys.size == 2) {
    if (activeKeys.has("ArrowUp") && activeKeys.has("ArrowRight")) direction = "DiagonalUp-Right";
    if (activeKeys.has("ArrowDOwn") && activeKeys.has("ArrowRight")) direction = "DiagonalDown-Right";
    if (activeKeys.has("ArrowUp") && activeKeys.has("ArrowLeft")) direction = "DiagonalUp-Left";
    if (activeKeys.has("ArrowDown") && activeKeys.has("ArrowLeft")) direction = "DiagonalDown-Left";
  }
  return direction;

};
export let rotate: (direction: string, bug: HTMLElement | null) => void = (
  direction,
  bug
) => {
  if (bug) {
    let elementAngle: string | "none" = window.getComputedStyle(bug).rotate;
    let angle: number = 0;
    if (elementAngle == "none") {
      angle = parseInt(elementAngle.replace("deg", ""));
    }
    switch (direction) {
      case "ArrowUp":
        angle = 0;
        break;
      case "ArrowLeft":
        angle = 270;
        break;
      case "ArrowRight":
        angle = 90;
        break;
      case "ArrowDown":
        angle = 180;
        break;
      case "DiagonalUp-Right":
        angle = 45;
        break;
      case "DiagonalBottom-Right":
        angle = 90 + 45;
        break;
      case "DiagonalUp-Left":
        angle = 270 + 45;
        break;
      case "DiagonalBottom-left":
        angle = 180 + 45;
        break;
    }
    bug.style.rotate = `${angle}deg`;
  }
};
