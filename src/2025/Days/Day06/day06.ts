import useFileReader from "../../utils/fileReader";

const useMathResolver = () => {

    const resolveWithRegularMath = (matrix: string[][]) => {
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
        return grandTotal;
    }

    const resolveWithCephalopodMath = (lines: string[]) => {
        const numRows = lines.length;
        const numCols = lines[0].length;
        var grandTotal = 0;
        let digits: number[] = [];

        for (let column = numCols - 1; column >= 0; column--) {
            let currentDigit = '';

            for (let row = 0; row < numRows - 1; row++) {
                let char = lines[row].charAt(column);
                if (char === ' ') char = '';
                currentDigit = `${currentDigit}${char}`;
            }
            digits.push(Number(currentDigit));

            const operator = lines[lines.length-1].charAt(column);
            if (operator !== '*' && operator !== '+') continue;

            let subtotal = (operator === "+") ? 0 : 1;
            digits.forEach(digit => {
                operator === "+" 
                    ? subtotal += digit 
                    : subtotal *= digit 
            })

            grandTotal += subtotal;
            digits = [];
            column--; // used to skip column separator with all " "
        }
        return grandTotal;
    }

    return {
        resolveWithRegularMath,
        resolveWithCephalopodMath
    }
}

//----- main ----
const mathResolver = useMathResolver();
const lines = useFileReader().readFile("input.txt").split("\n");
const matrix: string[][] = []

//part 1
lines.forEach(line => {
    matrix.push(line.trim().split(/\s+/));
});

console.log("Grand total (1): " + mathResolver.resolveWithRegularMath(matrix));
console.log("Grand total (2): " + mathResolver.resolveWithCephalopodMath(lines));

