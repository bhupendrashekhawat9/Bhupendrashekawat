import { getDirection, rotate } from "./bugDirection";

interface moveProps {
  direction: string;
  activeKeys: Set<string>;

}
let moveStraight: (
    direction: string,
    coordinates: [number, number]
  ) => [number, number] = (direction, coordinates) => {
    switch (direction) {
        case "ArrowRight":
          coordinates[1] += 2;
          break;
        case "ArrowLeft":
          coordinates[1] -= 2;
          break;
        case "ArrowUp":
          coordinates[0] -= 2;
          break;
        case "ArrowDown":
          coordinates[0] += 2;
          break;
      }
      return coordinates;
  }
let moveDiagonal: (
  direction: string,
  coordinates: [number, number]
) => [number, number] = (direction, coordinates) => {
    switch (direction) {
        case "DiagonalUp-Right":
          coordinates[0] -= 2;
          coordinates[1] += 2;
          break;
        case "DiagonalDown-Right":
          coordinates[0] += 2;
          coordinates[1] += 2;

          break;
        case "DiagonalDown-Left":
          coordinates[0] += 2;
          coordinates[1] -= 2;

          break;
        case "DiagonalUp-Left":
          coordinates[0] -= 2;
          coordinates[0] -= 2;

          break;
      }
return coordinates;
};

export let move: (args : moveProps) => void = (args) => {
  let { direction, activeKeys } = args;
  let bug: HTMLElement | null = document.getElementById("Bug");
  let coordinates: [number, number] = [50, 50];

  if (!bug) return;
  
  const { gridRowStart, gridColumnStart } = window.getComputedStyle(bug);
  const row = parseInt(gridRowStart);
  const column = parseInt(gridColumnStart);
  coordinates = [row, column];
 
  if(activeKeys.size == 2){
    direction = getDirection(direction,activeKeys)
    coordinates = moveDiagonal(direction,coordinates);
  }else{
    coordinates = moveStraight(direction,coordinates);
  }

  rotate(direction, bug);
  bug.style.gridRowStart = coordinates[0].toString();
  bug.style.gridColumnStart = coordinates[1].toString();
};
