
import http from "../http-common";


const getAll = () => {
    return http.get("/structures");
}

const get = id => {
    return http.get(`/structures/${id}`);
}

const create = data => {
    return http.post("/structures", data)
}

const update = (id, data) => {
    return http.put(`/structures/${id}`, data)
}

const remove = id => {
    return http.delete(`/structures/${id}`)
}

const findBySiren = siren => {
    return http.get(`/structures/siren/${siren}`)
}

export default {
    getAll,
    get,
    create,
    update,
    remove,
    findBySiren
};