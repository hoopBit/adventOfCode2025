import useFileReader from "../../utils/fileReader";

const CHARS = {
        BEAM: '|',
        SOURCE: 'S',
        SPLITTER: '^',
        EMPTY: '.'
};

const countBeamSplits = (matrix: string[][]): number => {
    const numRows = matrix.length; 
    const numCols = matrix[0].length;

    let splits = 0;

    for (let row = 1; row < numRows; row++) {
        for (let col = 1; col < numCols - 1; col++) {
            const upperChar = matrix[row - 1][col];
            const currentChar = matrix[row][col];

            if (upperChar === CHARS.SOURCE) {
                matrix[row][col] = CHARS.BEAM;
                continue;
            }

            if (upperChar === CHARS.BEAM) {
                if (currentChar === CHARS.EMPTY) {
                    matrix[row][col] = CHARS.BEAM;
                } else if (currentChar === CHARS.SPLITTER) {
                    matrix[row][col - 1] = CHARS.BEAM;
                    matrix[row][col + 1] = CHARS.BEAM;
                    splits++;
                }
            }
        }
    }

    return splits;
};

const countQuantumTimelines = (matrix: string[][]): bigint => {
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    const countsTimelines: bigint[][] = Array.from({ length: numRows }, () => 
        Array(numCols).fill(BigInt(0))
    );

    for (let column = 0; column < numCols; column++)
        if (matrix[0][column] === 'S') {
                countsTimelines[0][column] = BigInt(1);
            }

    for (let row = 1; row < numRows; row++) {
        for (let columns = 0; columns < numCols; columns++) {
            const incomingTimelines = countsTimelines[row - 1][columns];
            if (incomingTimelines === BigInt(0)) continue;

            const currentChar = matrix[row][columns];

            if (currentChar === CHARS.SPLITTER) {
                countsTimelines[row][columns - 1] += incomingTimelines;
                countsTimelines[row][columns + 1] += incomingTimelines;            
            } else {
                countsTimelines[row][columns] += incomingTimelines;
            }
        }
    }

    const lastRowTotal = countsTimelines[numRows - 1].reduce((sum, val) => sum + val, BigInt(0));
    
    return lastRowTotal;
};

const lines = useFileReader().readFile("input.txt").split("\n");
const matrix: string[][] = lines.map(line => line.trim().split(""));

console.log("total beam splits (1): " + countBeamSplits(matrix));
console.log("total timelines (2): " + countQuantumTimelines(matrix));

