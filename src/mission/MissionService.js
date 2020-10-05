
import http from "../http-common";


const getAll = () => {
    return http.get("/missions");
}

const get = id => {
    return http.get(`/missions/${id}`);
}

const getEntreprise = id => {
    return http.get(`/missions/${id}/entreprise`);
}

const getStructure = id => {
    return http.get(`/missions/${id}/structure`);
}

const create = data => {
    return http.post("/missions", data)
}

const update = (id, data) => {
    return http.post(`/missions/${id}`, data)
}

const remove = id => {
    return http.delete(`/missions/${id}`)
}

export default {
    getAll,
    get,
    getEntreprise,
    getStructure,
    create,
    update,
    remove
};