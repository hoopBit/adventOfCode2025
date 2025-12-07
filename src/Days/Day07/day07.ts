import useFileReader from "../../utils/fileReader";

const countBeamSplits = (matrix: string[][]): number => {
    const numRows = matrix.length; 
    const numCols = matrix[0].length;
    const CHARS = {
        BEAM: '|',
        SOURCE: 'S',
        SPLITTER: '^',
        EMPTY: '.'
    } as const;

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

const lines = useFileReader().readFile("input.txt").split("\n");
const matrix: string[][] = lines.map(line => line.trim().split(""));

console.log("total beam splits (1): " + countBeamSplits(matrix));

