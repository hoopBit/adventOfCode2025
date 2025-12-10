import useFileReader from "../../../utils/fileReader";

type Direction = `${'L' | 'R'}${number}`;

const useDial = () => {
    var arrowPointer = 50;
    var passwordPartOne = 0;
    var passwordPartTwo = 0;

    function movePointer(d: Direction){
        const rotation = d.charAt(0) as "L" | "R";
        const distance = Number(d.substring(1));
        const fullCycles = Math.floor(distance / 100);
        const delta = distance % 100;

        if (rotation === "L") {
            arrowPointer === 0 
                ? passwordPartTwo += fullCycles
                : passwordPartTwo += fullCycles + (delta >= arrowPointer ? 1 : 0);
            
            arrowPointer = (arrowPointer - delta + 100) % 100;
        } else {
            passwordPartTwo += Math.floor((arrowPointer + distance) / 100);
            arrowPointer = (arrowPointer + delta) % 100;
        }

        if (arrowPointer === 0) passwordPartOne++;
    }

    return {
        movePointer,
        getPasswordPartOne: () => passwordPartOne,
        getPasswordPartTwo: () => passwordPartTwo,
    }
}

//----- main -----
const dial = useDial();
const fileReader = useFileReader();
const directions = fileReader.readFileLines("input.txt") as Direction[]

directions.forEach(d => {
    dial.movePointer(d);
});
console.log("Password (1): "+ dial.getPasswordPartOne());
console.log("Password (2): "+ dial.getPasswordPartTwo());