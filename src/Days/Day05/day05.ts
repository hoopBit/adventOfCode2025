import useFileReader from "../../utils/fileReader";
import { Range } from "../Day02/day02";


const useIngredientChecker = () => {
    var availableFreshIngredients = 0;

    const checkAvailableFreshIngredients = (intervals: Range[], available: string[]) => {
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
    }

    return {
        checkAvailableFreshIngredients,
        getSum: () => availableFreshIngredients
    };
}

//----- main -----
const ingredientChecker = useIngredientChecker();
const sections = useFileReader().readFile("input.txt").trim().split("\n\n");
const freshIntervals = sections[0].split("\n") as Range[];
const availableIngredients = sections[1].split("\n");

ingredientChecker.checkAvailableFreshIngredients(freshIntervals, availableIngredients);

console.log("available fresh ingredients (1): " + ingredientChecker.getSum());