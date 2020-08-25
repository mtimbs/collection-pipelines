const width = 6;
const height = 6;


const world = [...Array(width)].map(_ => [...Array(height)].map(_ => 0))

world[1][1] = 1;
world[1][2] = 1;
world[2][1] = 1;
world[2][2] = 1;

world[3][3] = 1;
world[3][4] = 1;
world[4][3] = 1;
world[4][4] = 1;


const ALIVE = 1
const DEAD = 0

const arraySum = (a: number[]): number => a.reduce((a,b) => a+b, 0)

const gridSum = (xs: number[][], xi: number, yi: number): number => [
  ...xs.slice(Math.max(xi-1, 0), xi+2)
    .map(ys => ys.slice(Math.max(yi-1, 0), yi+2))
].reduce((total: number,ys: number[]) => total + arraySum(ys), 0)

export const nextGen = (world: number[][]): number[][] =>
  world.map((ys: number[], xi: number, xs: number[][]) =>
    ys.map((y: number, yi: number) => y === ALIVE
      ? [2,3].includes(gridSum(xs, xi, yi) - 1)
        ? ALIVE : DEAD
      : gridSum(xs, xi, yi) === 3
        ? ALIVE : DEAD
    )
  )

