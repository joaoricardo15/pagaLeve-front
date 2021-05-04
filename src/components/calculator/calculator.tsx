/* eslint-disable no-template-curly-in-string */
import { FC, useState } from "react";
import { Form, Button, Spin, Tooltip, Input } from "antd";
import { InfoCircleOutlined } from '@ant-design/icons';
import ApiRequest from "../../services/requests";
import './calculator.css';

const numberValidation = [
  {
    required: true
  },
  () => ({
    validator(_: any, value: any) {
      console.log(value, typeof value, !value, value == 0)
      const isValidNumber = !value || value == 0 || parseInt(value)
      return isValidNumber ?
        Promise.resolve() :
        Promise.reject('Input is not a valid number');
    },
  })
]

const Calculator: FC = () => {
  const apiRequest = ApiRequest();
  const [fetching, setFetching] = useState<boolean>(false);
  const [emission, setEmission] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const simulateFootprint = (usage: { electricity: string, vehicle: string, waste: string }): void => {
    setFetching(true);
    console.log(usage)
    apiRequest.getSimulation(
      parseInt(usage.electricity),
      parseInt(usage.vehicle),
      parseInt(usage.waste))
      .then(response => setEmission(response.emission))
      .catch(response => setError(response.message))
      .finally(() => setFetching(false));
  };

  const reset = () => {
    setEmission(null);
    setError(null);
  }

  return (
    <div className="container">
      { fetching ?
        <div className="loading-container">
          <Spin size="large"/>
        </div>
        :
        <Form
          size="large"
          className="form-container"
          onFinish={simulateFootprint} 
          validateMessages={{ required: '${name} is required!' }}
        >
          { !error && emission == null ?
            <>
              <div className="title">
                Checkout your carbon footprint
                <Tooltip
                  title="values are based on 94114 zipcode emission factor">
                  <InfoCircleOutlined style={{ marginLeft: 10 }}/>
                </Tooltip>
              </div>
              <div className="subtitle">
                by typing your own usage of electricity, waste and water.
              </div>
              <Form.Item
                name={'electricity'} 
                label="Electricity"
                rules={numberValidation}
              >
                <Input
                  type="number"
                  className="input"
                  addonAfter="kWh/month"
                />
              </Form.Item>
              <Form.Item
                name="vehicle"
                label="Vehicle"
                rules={numberValidation}
              >
                <Input
                  type="number"
                  className="input"
                  addonAfter="miles/day"
                />
              </Form.Item>
              <Form.Item
                name={'waste'}
                label="Waste"
                rules={numberValidation}
              >
                <Input
                  type="number"
                  className="input"
                  addonAfter="kg/week"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  className="button"
                  htmlType="submit"
                  ghost
                >
                  Simulate
                </Button>
              </Form.Item>
            </>
            :
            <div className="result">
              { !error &&
                <>
                  <div className="title">
                    Your carbon footprint is:
                  </div>
                  <div className="subtitle">
                    Annual CO2 emissions (kg) based on the given amounts of electricity, vehicle and waste.
                  </div>
                </>
              }
              <div className="title result-text">
                { error || emission }
              </div>
              <Button
                className="button"
                onClick={reset}
                ghost
              >
                Reset
              </Button>
            </div>
          }
        </Form>
      }
    </div>
  );
};

export default Calculator;
