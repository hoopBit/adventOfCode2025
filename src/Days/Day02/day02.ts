import useFileReader from "../../utils/fileReader";

type Range = `${number}-${number}`;

const useIDsChecker = () => {
    let invalidIDsSum = 0;

    const checkInvalidIDs = (ranges: Range[]) => {
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
                if ( firstHalf === secondHalf) invalidIDsSum += currentNumber;   
            }
        });
    }

    return {
        checkInvalidIDs,
        getInvalidIDsSum: () => invalidIDsSum,
    };
}

//----- main -----
const ranges = useFileReader().readFile("input.txt").split(",") as Range[];
const IDsChecker = useIDsChecker();

IDsChecker.checkInvalidIDs(ranges);
console.log("Sum of invalid IDs: " + IDsChecker.getInvalidIDsSum());