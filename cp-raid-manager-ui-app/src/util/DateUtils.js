import { DateTime } from 'luxon';

export const formatDate = (dateISO, utc = false, includeTime = true, includeYear = true) => {
    let obj = DateTime.fromISO(dateISO);
    if (utc) obj = obj.setZone("UTC");
    return includeTime ?
        obj.toFormat(`dd MMM ${includeYear ? "yyyy" : ""} HH:mm`) :
        obj.toFormat(`MMMM dd ${includeYear ? "yyyy" : ""}`);
}

export const jsDateToUtcIso = (jsDate) => {
    return DateTime.fromJSDate(jsDate).toUTC().toISO();
}

export const countdown = (dateISO) => {
    const raidTime = DateTime.fromISO(dateISO).setZone('local').toMillis();
    const now = DateTime.now().setZone('local').toMillis();

    const minutesRemaining = (raidTime - now) / 1000 / 60;

    if (minutesRemaining < 60) return `Starting in ${Math.floor(minutesRemaining)} minutes`;
    else if (minutesRemaining < 3600) return `Starting in ${Math.floor(minutesRemaining / 60)} hours`;
    else return `Starting in ${Math.floor(minutesRemaining / 60 / 24)} days`;
}