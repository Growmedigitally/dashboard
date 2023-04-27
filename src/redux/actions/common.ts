import { TOGGLE_DARK_MODE } from "src/constants/common";
import { consoleLog } from "src/utils/conole.log";

export const toggleDarkMode = (newSate: boolean) => {
    return { type: TOGGLE_DARK_MODE, payload: newSate };
}