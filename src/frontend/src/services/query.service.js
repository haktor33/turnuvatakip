import { callApi } from "./base.services";

export const queryService = { executeQuery, executeLink };

async function executeQuery(queryParams) {
    const { querName, ...queryFilters } = queryParams;
    let serviceName = querName;
    if (Object.keys(queryFilters).length > 0) {
        serviceName += "?" + new URLSearchParams(queryFilters);
    }
    try {
        let response = await callApi(serviceName, {});
        return response;
    } catch (err) {
        return Promise.reject(err);
    }
}

async function executeLink(pathName, urlParams) {
    try {
        let response = await callApi(pathName, urlParams);
        return response;
    } catch (err) {
        return Promise.reject(err);
    }
}

