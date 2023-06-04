import { callApi } from "./base.services";

async function getAll() {
    var serviceName = `team/match/getAll`;
    try {
        let response = await callApi(serviceName, {});
        return response;
    } catch (err) {
        return Promise.reject(err);
    }
}

async function getById(id) {
    var serviceName = `team/match/getById?id=${id}`;
    try {
        let response = await callApi(serviceName, {});
        return response;
    } catch (err) {
        return Promise.reject(err);
    }
}

async function save(params) {
    var serviceName = "team/match/save";
    try {
        let response = await callApi(serviceName, { method: "POST", data: JSON.stringify(params) });
        return response;
    } catch (err) {
        return Promise.reject(err);
    }
}

async function deleteById(id) {
    var serviceName = `team/match/delete/${id}`;
    try {
        let response = await callApi(serviceName, { method: "DELETE" });
        return response;
    } catch (err) {
        return Promise.reject(err);
    }
}

export const matchService = { getAll, getById, save, deleteById };