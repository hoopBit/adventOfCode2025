import useFileReader from '../../../utils/fileReader';

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
            const area = (Math.abs(r1.x - r2.x) + 1) * (Math.abs(r1.y - r2.y)+ 1);
            
            if (area > largestArea) largestArea = area
        }
    }

    return {
        largestArea: () => largestArea
    };
}

const solvePart2 = (redTiles: Coordinates[]) => {
    let largestArea = 0;

    const segmentIntersectsRect = (
        segStart: Coordinates, 
        segEnd: Coordinates, 
        minX: number, maxX: number, minY: number, maxY: number
    ): boolean => {
        const segMinX = Math.min(segStart.x, segEnd.x);
        const segMaxX = Math.max(segStart.x, segEnd.x);
        const segMinY = Math.min(segStart.y, segEnd.y);
        const segMaxY = Math.max(segStart.y, segEnd.y);

        const isHorizontal = segStart.y === segEnd.y;

        if (isHorizontal)
            return (segStart.y > minY && segStart.y < maxY) && (segMaxX > minX && segMinX < maxX);
        else
            return (segStart.x > minX && segStart.x < maxX) && (segMaxY > minY && segMinY < maxY);
    }

    // Ray Casting
    const isCenterInsidePolygon = (
        c: Coordinates, 
        polygon: Coordinates[]
    ): boolean => {
        let inside = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            const xi = polygon[i].x, yi = polygon[i].y;
            const xj = polygon[j].x, yj = polygon[j].y;

            const intersect = ((yi > c.y) !== (yj > c.y)) && (c.x < (xj - xi) * (c.y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    }

    const polygonEdges: Coordinates[][] = [];
    for (let i = 0; i < redTiles.length; i++) {
        const p1 = redTiles[i];
        const p2 = redTiles[(i + 1) % redTiles.length];
        polygonEdges.push([p1, p2]);
    }

    for (let i = 0; i < redTiles.length; i++) {
        for (let j = i + 1; j < redTiles.length; j++) {
            const r1 = redTiles[i];
            const r2 = redTiles[j];
            
            const minX = Math.min(r1.x, r2.x);
            const maxX = Math.max(r1.x, r2.x);
            const minY = Math.min(r1.y, r2.y);
            const maxY = Math.max(r1.y, r2.y);

            const currentArea = (Math.abs(r1.x - r2.x) + 1) * (Math.abs(r1.y - r2.y)+ 1);
            if (currentArea <= largestArea) continue;

            let isCleanRectangle = true;
            for (const edge of polygonEdges) {
                if (segmentIntersectsRect(edge[0], edge[1], minX, maxX, minY, maxY)) {
                    isCleanRectangle = false;
                    break;
                }
            }
            if (!isCleanRectangle) continue;

            const centerX = (minX + maxX) / 2;
            const centerY = (minY + maxY) / 2;
            
            if (isCenterInsidePolygon({x: centerX, y: centerY}, redTiles)) {
                largestArea = currentArea;
            }
        }
    }

    return largestArea;
}

//----- main -----
const lines = useFileReader().readFile("input.txt").split("\n");
const redTiles: Coordinates[] = lines.map(line => {
    const [x, y] = line.trim().split(",").map(Number);
    return { x, y } 
})

const result1 = solve(redTiles);
const result2 = solvePart2(redTiles);


console.log(`Part 1: ${result1.largestArea()}`);
console.log(`Part 2: ${result2}`);