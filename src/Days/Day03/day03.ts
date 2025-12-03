import useFileReader from "../../utils/fileReader";

const useBatteries = () => {
    var totalOutput = 0;

    const checkBanks = (banks: number[]) => {
        const max = Math.max(...banks);
        const maxIndex = banks.findIndex((n) => n === max);
        const maxInLastIndex = maxIndex === banks.length - 1
        const copy = maxInLastIndex ? banks.slice(0, maxIndex) : banks.slice(maxIndex + 1);
        const secondMax = Math.max(...copy);
        totalOutput += Number(maxInLastIndex ? secondMax.toString() + max.toString() : max.toString() + secondMax.toString());
    }

    return {
        checkBanks,
        getTotalOutput: () => totalOutput
    }
}

//----- main -----
const batteries = useBatteries();
const lines = useFileReader().readFile("input.txt").split("\n");

lines.forEach((line) => {
    const banks = line.split("").map(n => Number(n));
    batteries.checkBanks(banks);
});
console.log("total output joltage: " + batteries.getTotalOutput());

