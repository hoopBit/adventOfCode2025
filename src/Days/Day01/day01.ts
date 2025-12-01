import useFileReader from "../../utils/fileReader";

type Direction = `${'L' | 'R'}${number}`;

const useDial = () => {
    var arrowPointer = 50;
    var password = 0;

    function movePointer(d: Direction){
        const rotation = d.charAt(0) as "L" | "R";
        const distance = Number(d.substring(1));
        const delta = distance % 100

        rotation === "L" 
            ? arrowPointer = (arrowPointer - delta % 100 + 100) % 100
            : arrowPointer = (arrowPointer + delta) % 100

        if(arrowPointer === 0) password++;
    }

    return {
        movePointer,
        getPassword: () => password,
        getArrowPointer: () => arrowPointer
    }
}

//----- main -----
const dial = useDial();
const fileReader = useFileReader();
const directions = fileReader.readFileLines("input.txt") as Direction[]

// part one
directions.forEach(d => {
    dial.movePointer(d);
});
console.log("Password: "+ dial.getPassword());