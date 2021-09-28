const PREFIX =                                                  '';

// Auth & related
const PUBLIC_PREFIX =                                           `${PREFIX}/public`
export const AUTH =                                             `${PUBLIC_PREFIX}/auth`;
export const RENEW =                                            `${PUBLIC_PREFIX}/renew`;

// Users
const USERS_PREFIX =                                            `${PREFIX}/users`
export const GET_USER =                                         `${USERS_PREFIX}/{id}`;
export const BATCH_GET_USERS =                                  `${USERS_PREFIX}`;
export const REGISTER_NEW_USER =                                `${USERS_PREFIX}/register`;
export const RESET_PASSWORD =                                   `${USERS_PREFIX}/reset-password`
export const CHANGE_USER_DETAILS =                              `${USERS_PREFIX}`;

// Raids
const RAIDS_PREFIX =                                            `${PREFIX}/raids`;
export const GET_UPCOMING_RAIDS =                               `${RAIDS_PREFIX}/query/current`;
export const GET_OLD_RAIDS =                                    `${RAIDS_PREFIX}/query/old`;
export const GET_RAID =                                         `${RAIDS_PREFIX}/{id}`;
export const CREATE_RAID =                                      `${RAIDS_PREFIX}`;
export const SIGNUP_FOR_RAID =                                  `${RAIDS_PREFIX}/{id}/signup`;
export const SIGNOFF_FROM_RAID =                                `${RAIDS_PREFIX}/{id}/signoff`;
export const CONFIRM_SIGNUP =                                   `${RAIDS_PREFIX}/{id}/confirm-signup`;
export const UNCONFIRM_SIGNUP =                                 `${RAIDS_PREFIX}/{id}/unconfirm-signup`;
export const DELETE_RAID =                                      `${RAIDS_PREFIX}/{id}`;

// Misc
const MISC_PREFIX =                                             `${PREFIX}`
export const LATEST_NOTIFICATIONS =                             `${MISC_PREFIX}/notifications`

export const makeUri = (baseUri, pathVariables) => {
    let uri = "".concat(baseUri);

    pathVariables.forEach(pair => {
        uri = uri.replace(`{${pair.name}}`, pair.value);
    })

    return uri;
}