import http from "../../http-common";


const getNaf = (code_naf) => {
    return http.get(encodeURI(`/siren/naf/${code_naf}`));
}


export default {
    getNaf
};