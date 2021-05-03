/* eslint-disable no-template-curly-in-string */
import { FC, useState } from "react";
import { Form, Button, InputNumber } from "antd";
import ApiRequest from "../../services/requests";
import './calculator.css';

const layout = {
  labelCol: { textAlign: 'center', span: 18 },
  wrapperCol: { span: 18 },
};

const validateMessages = {
  required: '${name} is required!',
  number: {
    range: '${name} must be between ${min} and ${max}',
  },
};

const Calculator: FC = () => {
  const apiRequest = ApiRequest();
  const [fetching, setFetching] = useState(false);
  const [emission, setEmission] = useState(null);

  const simulateFootprint = (usage: { electricity: number, waste: number, water: number }): void => {
    setFetching(true);
    apiRequest.getSimulation(usage.electricity, usage.waste, usage.water)
      .then(response => setEmission(response.emission))
      .finally(() => setFetching(false));
  };

  const reset = () => {
    setEmission(null)
  }

  return (
    <div className="container">
      { !fetching &&
        <>
          { !emission ?
            <Form {...layout} name="nest-messages" onFinish={simulateFootprint} validateMessages={validateMessages}>
              <Form.Item name={'electricity'} label="Electricity (kWh/month)" rules={[{ required: true }, { type: 'number' }]}>
                <InputNumber min={0}/>
              </Form.Item>
              <Form.Item name={'waste'} label="Waste (kg/week)" rules={[{ required: true }, { type: 'number' }]}>
                <InputNumber min={0}/>
              </Form.Item>
              <Form.Item name={'water'} label="Water (litres/day)" rules={[{ required: true }, { type: 'number' }]}>
                <InputNumber min={0}/>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 18 }}>
                <Button type="primary" htmlType="submit">
                  Simulate
                </Button>
              </Form.Item>
            </Form>
            :
            <div className="result">
              { emission } kg CO2e/yr
              <Button type="primary" onClick={reset}>
                Simulate again
              </Button>
            </div>
          }
        </>
      }
    </div>
  );
};

export default Calculator;
