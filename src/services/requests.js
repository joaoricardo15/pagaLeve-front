import Axios from 'axios';

const SIMULATION_API_URL = 'https://mfgols2j25.execute-api.us-east-1.amazonaws.com/dev/'

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': 'afltkysd0vxc908ej5'
};

const simulationApi = Axios.create({ baseURL: SIMULATION_API_URL, headers });

const ApiRequest = () => {

    const getSimulation = () => {
        return new Promise((resolve, reject) => {
            simulationApi.post(`/simulateFootprint`)
                .then(response => resolve(response.data))
                .catch(error => reject(error));
        })
    }

    return {
        getSimulation
    }
}

export default ApiRequest;
