import useFileReader from '../../utils/fileReader';

type Coordinates = {
    x: number,
    y: number
}

const solve = (redTiles: Coordinates[]) => {
    let largestArea = 0;

    for (let i = 0; i < redTiles.length; i++) {
        for (let j = i + 1; j < redTiles.length; j++) {
            const r1 = redTiles[i];
            const r2 = redTiles[j];
            
            // rectangle area for tiles
            const area = Math.abs(((r1.x - r2.x)+ 1) * ((r1.y - r2.y)+ 1));
            
            if (area > largestArea) largestArea = area
        }
    }

    return {
        largestArea: () => largestArea
    };
}

//----- main -----
const lines = useFileReader().readFile("input.txt").split("\n");
const redTiles: Coordinates[] = lines.map(line => {
    const [x, y] = line.trim().split(",").map(Number);
    return { x, y } 
})

const results = solve(redTiles);

console.log(`Part 1: ${results.largestArea()}`);