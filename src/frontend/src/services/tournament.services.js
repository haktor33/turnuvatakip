import { callApi } from "./base.services";

async function getAll() {
    var serviceName = `tournament/getAll`;
    try {
        let response = await callApi(serviceName, {});
        return response;
    } catch (err) {
        return Promise.reject(err);
    }
}

async function getById(id) {
    var serviceName = `tournament/getById?id=${id}`;
    try {
        let response = await callApi(serviceName, {});
        return response;
    } catch (err) {
        return Promise.reject(err);
    }
}

async function save(params) {
    var serviceName = "tournament/save";
    try {
        let response = await callApi(serviceName, { method: "POST", data: JSON.stringify(params) });
        return response;
    } catch (err) {
        return Promise.reject(err);
    }
}

async function deleteById(id) {
    var serviceName = `tournament/delete/${id}`;
    try {
        let response = await callApi(serviceName, { method: "DELETE" });
        return response;
    } catch (err) {
        return Promise.reject(err);
    }
}

export const tournamentService = { getAll, getById, save, deleteById };