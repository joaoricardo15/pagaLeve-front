import { customersApi } from "../services/requests.service";

const ApiRequest = () => {

    const getCustomers = () => {
        return new Promise((resolve, reject) => {
            customersApi.get(`/customers`)
                .then(response => resolve(response.data.data))
                .catch(error => reject(error));
        })
    }

    const searchCustomers = searchText => {
        return new Promise((resolve, reject) => {
            customersApi.get(`/customers/search/${searchText}`)
                .then(response => resolve(response.data))
                .catch(error => reject(error));
        })
    }
    
    const getEndpoints = () => {
        return new Promise((resolve, reject) => {
            customersApi.get(`/logs`)
                .then(response => resolve(response.data.data))
                .catch(error => reject(error));
        })
    }

    const getLogs = endpointName => {
        return new Promise((resolve, reject) => {
            customersApi.get(`/logs/${endpointName}`)
                .then(response => resolve(response.data.data.logs))
                .catch(error => reject(error));
        })
    }

    return {
        getCustomers,
        searchCustomers,
        getEndpoints,
        getLogs
    }
}

export default ApiRequest;
