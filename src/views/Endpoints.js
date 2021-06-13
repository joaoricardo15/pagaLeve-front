import React, { useEffect, useState } from "react";
import { Card, Chip } from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import RefreshIcon from '@material-ui/icons/Refresh';
import ButtonBase from '@material-ui/core/ButtonBase';
import ButtomComponent from "../components/Button";
import ApiRequest from "../requests/customersApi";
import TextComponent from "../components/Text";

export const Endpoints = ({ history }) => {
  const apiRequest = ApiRequest();
  const [fetching, setFetching] = useState(false);
  const [endpoints, setEndpoints] = useState([]);

  const navigateToLogs = endpointName => {
    history.push('/logs', { endpointName });
  }

  const refreshEndpoints = () => {
    setFetching(true);

    apiRequest.getEndpoints()
      .then(endpoints => setEndpoints(endpoints))
      .finally(() => setFetching(false))
  };

  useEffect(() => {
    return (
      refreshEndpoints()
    )
  }, [])

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <TextComponent type="h5">
          Endpoints
        </TextComponent>
        <ButtomComponent
          iconButton
          icon={<RefreshIcon />}
          tooltip="Refresh"
          onClick={refreshEndpoints}
        />
      </div>
      <div className="mt-5">
        {!fetching && endpoints ?
          (endpoints.length > 0 ?
            endpoints.map(bot =>
              <Card key={bot.endpointName} className="d-flex mb-3">
                <ButtonBase
                  className="w-100 justify-content-between  p-3"
                  onClick={() => navigateToLogs(bot.endpointName)}
                >
                  <TextComponent style={{ alignSelf: 'center' }}>
                    {bot.endpointName}
                  </TextComponent>
                  {bot.lastActivity &&
                    <Chip
                      label={`${new Date(bot.lastActivity.timestamp).toLocaleDateString()} - ${new Date(bot.lastActivity.timestamp).toLocaleTimeString()}`}
                      className={bot.lastActivity.status === 'fail' ? 'bg-danger' : bot.lastActivity.status === 'success' ? 'bg-success' : ''}
                    />
                  }
                </ButtonBase>
              </Card>
            ) :
            <TextComponent>
              Você ainda não tem nenhum endpoint!
            </TextComponent>
          ) :
          ['', '', '', '', '', '', '', ''].map((el, i) => <Skeleton key={i} className="rounded mb-3" animation="wave" variant="rect" height={80}></Skeleton>)
        }
      </div>
    </div>
  );
};

export default Endpoints;