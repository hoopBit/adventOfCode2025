import useFileReader from "../../../utils/fileReader";

interface Machine {
    targetState: number[];
    buttons: number[][]; 
}

function parseMachine(line: string): Machine {
    const lightDiagram = line.match(/\[([.#]+)\]/);
    const targetState = lightDiagram[1].split('').map(char => char === '#' ? 1 : 0);

    const buttonsRegex = /\(([\d,]+)\)/g;
    const buttons: number[][] = [];
    let match;
    
    while ((match = buttonsRegex.exec(line)) !== null) {
        buttons.push(match[1].split(',').map(Number));
    }

    return { targetState, buttons };
}

function solveBruteForce(machine: Machine): number {
    const numButtons = machine.buttons.length;
    const numLights = machine.targetState.length;
    let minPresses = Infinity;

    // use an integer 'i' as a bitmask to represent each combination.
    const maxCombinations = 1 << numButtons; 
    for (let i = 0; i < maxCombinations; i++) {
        const currentLights = new Array(numLights).fill(0);
        let pressesCount = 0;

        for (let btnIndex = 0; btnIndex < numButtons; btnIndex++) {
            if ((i >> btnIndex) & 1) {
                pressesCount++;
                const lightsToToggle = machine.buttons[btnIndex];
                for (const lightIndex of lightsToToggle) {
                    if (lightIndex < numLights) {
                        currentLights[lightIndex] ^= 1; // XOR
                    }
                }
            }
        }

        let isMatch = true;
        for (let l = 0; l < numLights; l++) {
            if (currentLights[l] !== machine.targetState[l]) {
                isMatch = false;
                break;
            }
        }

        if (isMatch) {
            if (pressesCount < minPresses) {
                minPresses = pressesCount;
            }
        }
    }

    return minPresses;
}

const solvePartOne = (lines: string[]) => {
    let totalPresses = 0;

    for (const line of lines) {
        const machine = parseMachine(line);
        const presses = solveBruteForce(machine);
        totalPresses += presses;
    }
    return totalPresses;
};

//----- main -----
const lines = useFileReader().readFile("input.txt").split("\n");
const part1 = solvePartOne(lines);
console.log(`Part 1: ${part1}`);