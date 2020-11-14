import { time } from "console";

export const throttle = (func: Function, waitTime: number) => {
    let timeout:  number | null = null;

    const toExecute = (...args: any []) => {
        if (timeout) {
            return;
        }
        timeout = window.setTimeout(() => {
            timeout = null;
            func(...args);

        }, waitTime);
    }

    return toExecute;
}