const prefix =                                                  '/api';

export const AUTH =                                             `${prefix}/auth`;
export const RENEW =                                            `${prefix}/renew`;

export const CHANGE_USER_DETAILS =                              `${prefix}/users`;

export const makeUri = (baseUri, pathVariables) => {
    let uri = "".concat(baseUri);

    pathVariables.forEach(pair => {
        uri = uri.replace(`{${pair.name}}`, pair.value);
    })

    return uri;
}