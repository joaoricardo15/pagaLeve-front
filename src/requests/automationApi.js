import { customersApi } from "../services/requests.service";

const ApiRequest = () => {

    const getEndpoints = () => {
        return new Promise((resolve, reject) => {
            customersApi.get(`/getBots`)//, { headers: { Authorization: `Bearer ${token}` } })
                .then(response => resolve(response.data))
                .catch(error => reject(error));
        })
    }

    const getLogs = botName => {
        return new Promise((resolve, reject) => {
            customersApi.get(`/getLogs/${botName}`)//, { headers: { Authorization: `Bearer ${token}` } })
                .then(response => resolve(response.data))
                .catch(error => reject(error));
        })
    }

    const getEndpointsStatus = botName => {
        return new Promise((resolve, reject) => {
            customersApi.get(`/getBotStatus/${botName}`)//, { headers: { Authorization: `Bearer ${token}` } })
                .then(response => resolve(response.data))
                .catch(error => reject(error));
        })
    }

    return {
        getEndpoints,
        getLogs,
        getEndpointsStatus
    }
}

export default ApiRequest;
