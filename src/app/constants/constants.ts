export const WIN_RULES: number[][] = [
  [1, 2, 3], // top horizontal line
  [4, 5, 6], // middle horizontal line
  [7, 8, 9], // bottom horizontal line
  [1, 4, 7], // left vertical line
  [2, 5, 8], // middle vertical line
  [3, 6, 9], // right vertical line
  [1, 5, 9], // \ line
  [3, 5, 7], // / line
];

export const CELL_CLASS_NAMES_MAP: Map<number, string> = new Map([
  [1, 'cell top left bottom right'],
  [2, 'cell top bottom'],
  [3, 'cell top right bottom left'],
  [4, 'cell left right'],
  [5, 'cell'],
  [6, 'cell left right'],
  [7, 'cell top left bottom right'],
  [8, 'cell top bottom'],
  [9, 'cell top left bottom right'],
]);
