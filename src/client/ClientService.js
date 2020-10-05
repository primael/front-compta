
import http from "../http-common";


const getAll = () => {
    return http.get("/entreprises");
}

const get = id => {
    return http.get(`/entreprises/${id}`);
}

const create = data => {
    return http.post("/entreprises", data)
}

const update = (id, data) => {
    return http.put(`/entreprises/${id}`, data)
}

const remove = id => {
    return http.delete(`/entreprises/${id}`)
}

const findBySiren = siren => {
    return http.get(`/entreprises/siren/${siren}`)
}

export default {
    getAll,
    get,
    create,
    update,
    remove,
    findBySiren
};