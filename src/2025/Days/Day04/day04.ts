import useFileReader from "../../utils/fileReader";

const useForkLifts = () => {
    var accessibleRollsPart2 = 0;
    var internalGrid;

    const checkAccessibleRolls = (grid: string[][]) => {
        internalGrid = structuredClone(grid);
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1],  [1, 0],  [1, 1]
        ];
        let removableRolls = 0;

        for (let x = 0; x < grid.length; x++) {
            for (let y = 0; y < grid[x].length; y++) {
                if (grid[x][y] !== "@") continue;

                const adjacentRolls = directions.reduce((count, [dx, dy]) => {
                    return (grid[x + dx]?.[y + dy] === "@") ? count + 1 : count;
                }, 0);

                if (adjacentRolls < 4) {
                    removableRolls++;
                    internalGrid[x][y] = "x"; 
                };
            }
        }
        return removableRolls;
    };

    const removeAndCountAccessibleRolls = (grid: string[][]) => {
        internalGrid = structuredClone(grid);
        let removedRolls = -1;
        while (removedRolls !== 0){
            removedRolls = checkAccessibleRolls(internalGrid);
            accessibleRollsPart2 += removedRolls;
        }

    }

    return {
        checkAccessibleRolls,
        removeAndCountAccessibleRolls,
        getAccessibleRollsPart2: () => accessibleRollsPart2,
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

const accessibleRolls = forklifts.checkAccessibleRolls(grid);
forklifts.removeAndCountAccessibleRolls(grid);

console.log("total accessible rolls (1): " + accessibleRolls);
console.log("total removed rolls (2): " + forklifts.getAccessibleRollsPart2());
