export function toDateStr(date: Date | string) : DateStr {
    if (typeof date === 'string') {
        if (checkValidDateStr(date)) return date;
        else throw new Error(`Invalid date string : ${date}`);
    } else {
        const dateString = date.toDateString();
        if (checkValidDateStr(dateString)) return dateString;
    }
    throw new Error(`Invalid date string : ${date}`);
}

function checkValidDateStr(str: string): str is DateStr {
    return str.match(/^\d{4}-\d{2}-\d{2}$/) !== null;
}

enum DateStrBrand {};

export type DateStr = string & DateStrBrand;