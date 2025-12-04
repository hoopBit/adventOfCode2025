import useFileReader from "../../utils/fileReader";

const useForkLifts = () => {
    var accessibleRolls = 0;

    const checkAccessibleRolls = (grid) => {
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1],  [1, 0],  [1, 1]
        ];

        for (let x = 0; x < grid.length; x++) {
            for (let y = 0; y < grid[x].length; y++) {
                if (grid[x][y] !== "@") continue;

                const adjacentRolls = directions.reduce((count, [dx, dy]) => {
                    return (grid[x + dx]?.[y + dy] === "@") ? count + 1 : count;
                }, 0);

                if (adjacentRolls < 4) accessibleRolls++;
            }
        }
    };

    return {
        checkAccessibleRolls,
        getAccessibleRolls: () => accessibleRolls
    }
}

//----- main -----
const forklifts = useForkLifts();
const lines = useFileReader().readFile("input.txt").split("\n");
const grid: string[][] = [];

lines.forEach((line) => {
    const rolls = line.split("");
    grid.push(rolls);
});
forklifts.checkAccessibleRolls(grid);

console.log("total accessible rolls (1): " + forklifts.getAccessibleRolls());
