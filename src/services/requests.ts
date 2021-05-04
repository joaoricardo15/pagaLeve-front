import Axios from 'axios';

const simulationApi = Axios.create({ 
    baseURL: 'https://mfgols2j25.execute-api.us-east-1.amazonaws.com/dev/',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

interface simulationSuccessResult {
    emission: number;
}

interface simulationFailResult {
    emission: number;
}

const ApiRequest = () => {

    const getSimulation = (electricity: number, waste: number, water: number): 
        Promise<simulationSuccessResult | simulationFailResult> => {
            return new Promise((resolve, reject) => {
                simulationApi.post(`/simulateFootprint`, { electricity, waste, water })
                    .then(response => resolve(response.data))
                    .catch(error => reject(error));
            })
        }

    return {
        getSimulation
    }
}

export default ApiRequest;
