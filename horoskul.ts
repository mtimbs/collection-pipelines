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

type Grid = number[][]
const ALIVE = 1
const DEAD = 0

const arraySum = (a: number[]): number => a.reduce((a,b) => a+b, 0)

const gridSum = (grid: Grid): number => grid.reduce((total: number,ys: number[]) => total + arraySum(ys), 0)

const subGrid = ({x, y}, grid: Grid): Grid => [
  ...grid.slice(Math.max(x-1, 0), x+2)
    .map(ys => ys.slice(Math.max(y-1, 0), y+2))
]

export const nextGen = (world: Grid): Grid =>
  world.map((ys: number[], xi: number, xs: Grid) =>
    ys.map((y: number, yi: number) => y === ALIVE
      ? [2,3].includes(gridSum(subGrid({x: xi, y: yi}, xs)) - 1)
        ? ALIVE : DEAD
      : gridSum(subGrid({x: xi, y: yi}, xs)) === 3
        ? ALIVE : DEAD
    )
  )

