import useFileReader from "../../../utils/fileReader";

const useBatteries = () => {
    var totalOutput2Digit = 0;
    var totalOutput12Digit = 0;

    const checkBanks2Digit = (banks: number[]) => {
        const max = Math.max(...banks);
        const maxIndex = banks.indexOf(max);
        const maxInLastIndex = maxIndex === banks.length - 1
        const copy = maxInLastIndex ? banks.slice(0, maxIndex) : banks.slice(maxIndex + 1);
        const secondMax = Math.max(...copy);
        totalOutput2Digit += Number(maxInLastIndex ? secondMax.toString() + max.toString() : max.toString() + secondMax.toString());
    }

    const checkBanks12Digit = (banks: number[]) => {
        let total = '', currentIndex = 0;
        for (let i = 12; i > 0; i--) {
            const remainingBatteries = banks.slice(currentIndex, banks.length - i + 1);
            const max = Math.max(...remainingBatteries);
            currentIndex += remainingBatteries.indexOf(max) + 1;
            total += new String(max);
        }
        totalOutput12Digit += Number(total);
    }

    return {
        checkBanks2Digit,
        checkBanks12Digit,
        getTotalOutput2Digit: () => totalOutput2Digit,
        getTotalOutput12Digit: () => totalOutput12Digit
    }
}

//----- main -----
const batteries = useBatteries();
const lines = useFileReader().readFile("input.txt").split("\n");

lines.forEach((line) => {
    const banks = line.split("").map(Number);
    batteries.checkBanks2Digit(banks);
    batteries.checkBanks12Digit(banks);
});
console.log("total output joltage (1): " + batteries.getTotalOutput2Digit());
console.log("total output joltage (2): " + batteries.getTotalOutput12Digit());

