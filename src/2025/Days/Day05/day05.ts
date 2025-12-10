import useFileReader from "../../../utils/fileReader";
import { Range } from "../Day02/day02";


const useIngredientChecker = () => {

    const checkAvailableFreshIngredients = (intervals: Range[], available: string[]) => {
        let availableFreshIngredients = 0;
        const mappedAvailable = available.map(a => {
            return {
                id: Number(a),
                fresh: false 
            }
        })

        intervals.forEach(interval => {
            const [firstIdStr, lastIdStr] = interval.split("-");
                const firstId = Number(firstIdStr);
                const lastId = Number(lastIdStr);

            mappedAvailable.forEach(ingredient => {
                if (ingredient.fresh) return;
                if (ingredient.id >= firstId && ingredient.id <= lastId) {
                    availableFreshIngredients++;
                    ingredient.fresh = true;
                }
            })
        })

        return availableFreshIngredients;
    }

    const checkAllFreshIngredients = (intervals: Range[]) => {
        /* WHY: We merge overlapping intervals (e.g. 10-14 and 12-18) into single
        * continuous ranges before counting. This is required to avoid double-counting
        * the IDs present in multiple ranges (intersection) and allows us to simply
        * sum the lengths of the resulting disjoint intervals. */
        const mergedIntervals = [];
        const sortedRanges: number[][] = intervals
            .map(s => s.split('-').map(Number))
            .sort((a, b) => a[0] - b[0]);

        let previousRange = sortedRanges[0];
        for (let i = 1; i < sortedRanges.length; i++) {
            const currentRange = sortedRanges[i];
            
            if (currentRange[0] <= previousRange[1]) {
                previousRange[1] = Math.max(previousRange[1], currentRange[1]);
            } else {
                mergedIntervals.push(previousRange);
                previousRange = currentRange;
            }
        }
        mergedIntervals.push(previousRange);

        let total = 0;
        mergedIntervals.forEach(range => {
            total += (range[1] - range[0] + 1);
        });

        return total;
    }

    return {
        checkAvailableFreshIngredients,
        checkAllFreshIngredients
    };
}

//----- main -----
const ingredientChecker = useIngredientChecker();
const sections = useFileReader().readFile("input.txt").trim().split("\n\n");
const freshIntervals = sections[0].split("\n") as Range[];
const availableIngredients = sections[1].split("\n");

console.log("available fresh ingredients (1): " + 
    ingredientChecker.checkAvailableFreshIngredients(freshIntervals, availableIngredients)
);
console.log("All fresh ingredients (2): " + 
    ingredientChecker.checkAllFreshIngredients(freshIntervals)
);
