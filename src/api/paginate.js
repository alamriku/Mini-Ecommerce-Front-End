import website from "./api";
const URL = process.env.VUE_APP_API+'/website'
export default{
    paginate ({resource, page}) {
        return website.get(`${URL}/${resource}?page=${page}`)
    }
}


