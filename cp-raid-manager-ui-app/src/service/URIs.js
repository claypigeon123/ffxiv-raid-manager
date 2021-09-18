const prefix =                                                  '/api';

// Auth & related
export const AUTH =                                             `${prefix}/auth`;
export const RENEW =                                            `${prefix}/renew`;

// Users
export const CHANGE_USER_DETAILS =                              `${prefix}/users`;

// Raids
export const GET_UPCOMING_RAIDS =                               `${prefix}/raids/current`;
export const GET_OLD_RAIDS =                                    `${prefix}/raids/old`;

/*export const makeUri = (baseUri, pathVariables) => {
    let uri = "".concat(baseUri);

    pathVariables.forEach(pair => {
        uri = uri.replace(`{${pair.name}}`, pair.value);
    })

    return uri;
}*/