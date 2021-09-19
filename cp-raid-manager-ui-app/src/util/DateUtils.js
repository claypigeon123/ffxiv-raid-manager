import { DateTime } from 'luxon';

export const formatDate = (dateISO, utc = false, includeTime = true) => {
    let obj = DateTime.fromISO(dateISO);
    if (utc) obj = obj.setZone("UTC");
    return includeTime ?
        obj.toFormat("dd MMM yyyy HH:mm") :
        obj.toFormat("MMMM dd yyyy");
}

export const jsDateToUtcIso = (jsDate) => {
    return DateTime.fromJSDate(jsDate).toUTC().toISO();
}