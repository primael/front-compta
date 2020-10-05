import http from "../http-common";

const getAll = () => {
    return http.get("/curriculaVitae");
}

export default {
    getAll,
};