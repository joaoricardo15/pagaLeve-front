import React, { useEffect, useState } from "react";
import { Card, Chip, TextField } from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import RefreshIcon from '@material-ui/icons/Refresh';
import ButtonBase from '@material-ui/core/ButtonBase';
import ButtomComponent from "../components/Button";
import ApiRequest from "../requests/automationApi";
import TextComponent from "../components/Text";
import { Autocomplete } from "@material-ui/lab";

export const Bots = ({ history }) => {
  const apiRequest = ApiRequest();
  const [fetching, setFetching] = useState(false);
  const [automationBots, setAutomationBots] = useState([]);
  const [automationBotsBackup, setAutomationBotsBackup] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState('');

  const navigateToLogs = botName => {
    history.push('/logs', { botName });
  }

  const refreshBots = () => {
    setFetching(true);

    apiRequest.getBots()
      .then(bots => {
        setAutomationBotsBackup(bots)
        setAutomationBots(bots)
      })
      .finally(() => setFetching(false))
  };

  useEffect(() => {
    if (!value) {
      setAutomationBots(automationBotsBackup)
      return
    }
    setAutomationBots(automationBotsBackup.filter(bot => bot.botName == value))
  }, [value])

  useEffect(() => {
    return (
      refreshBots()
    )
  }, [])

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <TextComponent type="h5">
          Endpoints PagaLeve Customers API
        </TextComponent>
        <Autocomplete
          id="Procure seu bot Aqui"
          options={automationBotsBackup.map(bot => bot.botName)}
          value={value}
          inputValue={inputValue}
          onChange={(event, newValue) => {
            setValue(newValue)
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue)
          }}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Procure seu bot aqui"
          />}
        />
        <ButtomComponent
          iconButton
          icon={<RefreshIcon />}
          tooltip="Atualizar"
          onClick={refreshBots}
        />
      </div>
      <div className="mt-5">
        {!fetching && automationBots ?
          (automationBots.length > 0 ?
            automationBots.map(bot =>
              <Card key={bot.botName} className="d-flex mb-3">
                <ButtonBase
                  className="w-100 justify-content-between  p-3"
                  onClick={() => navigateToLogs(bot.botName)}
                >
                  <TextComponent style={{ alignSelf: 'center' }}>
                    {bot.botName}
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
              Você ainda não tem nenhum bot!
            </TextComponent>
          ) :
          ['', '', '', '', '', '', '', ''].map((el, i) => <Skeleton key={i} className="rounded mb-3" animation="wave" variant="rect" height={80}></Skeleton>)
        }
      </div>
    </div>
  );
};

export default Bots;