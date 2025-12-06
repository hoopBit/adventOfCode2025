import useFileReader from "../../utils/fileReader";

const lines = useFileReader().readFile("input.txt").split("\n");
const matrix: string[][] = []

lines.forEach(line => {
    matrix.push(line.trim().split(/\s+/));
});

const numRows = matrix.length;
const numCols = matrix[0].length;

var grandTotal = 0;
for (let column = 0; column < numCols; column++) {
    const operator = matrix[numRows - 1][column];
    let columnTotal = (operator === "+") ? 0 : 1;

    for (let row = 0; row < numRows - 1; row++) {
        if (matrix[numRows - 1][column] === "+")
            columnTotal += Number(matrix[row][column]);
        else
            columnTotal *= Number(matrix[row][column])
    }
    grandTotal += columnTotal;
}

console.log("Grand total (1): " + grandTotal);
