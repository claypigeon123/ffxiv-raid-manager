const prefix =                                                  '';

// Auth & related
export const AUTH =                                             `${prefix}/public/auth`;
export const RENEW =                                            `${prefix}/public/renew`;

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

// Misc
export const LATEST_NOTIFICATIONS =                             `${prefix}/notifications`

export const makeUri = (baseUri, pathVariables) => {
    let uri = "".concat(baseUri);

    pathVariables.forEach(pair => {
        uri = uri.replace(`{${pair.name}}`, pair.value);
    })

    return uri;
}