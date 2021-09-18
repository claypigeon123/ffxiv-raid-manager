import { DateTime } from 'luxon';

export const formatDate = (dateISO, includeTime = true) => {
    let obj = DateTime.fromISO(dateISO).setZone("UTC");
    return includeTime ?
        obj.toFormat("dd MMM yyyy HH:mm") :
        obj.toFormat("MMMM dd yyyy");
}

export const jsDateToUtcIso = (jsDate) => {
    return DateTime.fromJSDate(jsDate).toUTC().toISO();
}