import useFileReader from "../../../utils/fileReader";

export type Range = `${number}-${number}`;

const useIDsChecker = () => {
    var sumPartOne = 0;
    var sumPartTwo = 0;

    const checkIDsDigitsRepeatedTwice = (ranges: Range[]) => {
        ranges.forEach(range => {
            const [firstIdStr, lastIdStr] = range.split("-");
            const firstId = Number(firstIdStr);
            const lastId = Number(lastIdStr);

            for (let currentNumber = firstId; currentNumber <= lastId; currentNumber++) {
                const currentNumberStr = currentNumber.toString();
                if (currentNumberStr.startsWith('0')) continue;
                if (currentNumberStr.length % 2 !== 0) continue;
                
                const firstHalfStr = currentNumberStr.slice(0, currentNumberStr.length / 2);
                const secondHalfStr = currentNumberStr.slice(currentNumberStr.length / 2);
                const firstHalf = Number(firstHalfStr);
                const secondHalf = Number(secondHalfStr);
                if ( firstHalf === secondHalf) sumPartOne += currentNumber;   
            }
        });
    }

    const checkIDsDigitsRepeatedAtLeastTwice = (ranges: Range[]) => {
        const regex = /^(\d+?)\1+$/;

        ranges.forEach(range => {
            const [firstIdStr, lastIdStr] = range.split("-");
            const firstId = Number(firstIdStr);
            const lastId = Number(lastIdStr);

            for (let currentNumber = firstId; currentNumber <= lastId; currentNumber++) {
                const currentNumberStr = currentNumber.toString();
                const match = currentNumberStr.match(regex);
                if (match) sumPartTwo += currentNumber;
            }
        });
    }

    return {
        checkIDsDigitsRepeatedTwice,
        checkIDsDigitsRepeatedAtLeastTwice,
        getSumPartOne: () => sumPartOne,
        getSumPartTwo: () => sumPartTwo
    };
}

//----- main -----
const ranges = useFileReader().readFile("input.txt").split(",") as Range[];
const IDsChecker = useIDsChecker();

IDsChecker.checkIDsDigitsRepeatedTwice(ranges);
IDsChecker.checkIDsDigitsRepeatedAtLeastTwice(ranges);
console.log("Sum of invalid IDs (1): " + IDsChecker.getSumPartOne());
console.log("Sum of invalid IDs (2): " + IDsChecker.getSumPartTwo());