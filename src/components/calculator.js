import React, { useEffect, useState } from "react";
import { Input } from "antd";
import ApiRequest from "../services/requests";

export const Calculator = () => {
  const apiRequest = ApiRequest();
  const [fetching, setFetching] = useState(false);
  const [automationBots, setAutomationBots] = useState(null);

  const simulateFootprint = () => {
    setFetching(true);

    apiRequest.getSimulation()
      .then(simulation => console.log(simulation))
      .finally(() => setFetching(false))
  };

  useEffect(() => {
    return (
      simulateFootprint()
    )
  }, [])

  return (
    <div>
      <Input />
    </div>
  );
};

export default Calculator;
