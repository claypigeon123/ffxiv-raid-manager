const prefix =                                                  '/api';

// Auth & related
export const AUTH =                                             `${prefix}/auth`;
export const RENEW =                                            `${prefix}/renew`;

// Users
export const GET_USER =                                         `${prefix}/users/{id}`;
export const BATCH_GET_USERS =                                  `${prefix}/users`;
export const CHANGE_USER_DETAILS =                              `${prefix}/users`;

// Raids
export const GET_UPCOMING_RAIDS =                               `${prefix}/raids/query/current`;
export const GET_OLD_RAIDS =                                    `${prefix}/raids/query/old`;
export const GET_RAID =                                         `${prefix}/raids/{id}`;
export const CREATE_RAID =                                      `${prefix}/raids`;
export const SIGNUP_FOR_RAID =                                  `${prefix}/raids/{id}/signup`;
export const SIGNOFF_FROM_RAID =                                `${prefix}/raids/{id}/signoff`;

export const makeUri = (baseUri, pathVariables) => {
    let uri = "".concat(baseUri);

    pathVariables.forEach(pair => {
        uri = uri.replace(`{${pair.name}}`, pair.value);
    })

    return uri;
}