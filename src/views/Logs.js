import React, { useEffect, useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Chip } from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import RefreshIcon from '@material-ui/icons/Refresh';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Highlight from "../components/Highlight";
import ApiRequest from "../requests/automationApi";
import ButtomComponent from "../components/Button";
import TextComponent from "../components/Text";

export const LogsComponent = ({ location, history }) => {
  const botName = location.state.botName;
  const [fetching, setFetching] = useState(false);
  const [botLogs, setBotLogs] = useState(null);

  const apiRequest = ApiRequest();

  const navigateBack = () => {
    history.goBack();
  }

  const refreshLogs = () => {
    setFetching(true);

    apiRequest.getLogs(botName)
      .then(result => setBotLogs(result.logs))
      .finally(() => setFetching(false));
  };

  const replayBot = payload => {
    setFetching(true);
    
    apiRequest.replayBot(botName, payload)
      .then(() => alert('Bot replayed successfully'))
      .catch(() => alert('Bot could not be replayed'))
      .finally(() => setFetching(false));
  };
 
  useEffect(() => {
    return (
      refreshLogs()
    )
  }, [])

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <ButtomComponent
          iconButton
          icon={<ArrowBackIcon/>}
          tooltip="Atualizar"
          onClick={navigateBack}
        />
        <TextComponent type="h5">
          { botName }
        </TextComponent>
        <div className="d-flex ml-3">
          <ButtomComponent
            iconButton
            icon={<RefreshIcon/>}
            tooltip="Refresh"
            onClick={refreshLogs}
          />
        </div>
      </div>
      <div className="mt-5">
        { !fetching && botLogs ? 
          (botLogs.length > 0 ? 
            botLogs.map(logSet => 
              <div className="mb-5" key={logSet.timestamp}>
                <Accordion>
                  <div className={`p-3 d-flex align-items-center justify-content-between
                    ${logSet.status === 'success' ? 'bg-success' : 
                    logSet.status === 'filtred' ? 'bg-secondary' :  
                    logSet.status === 'fail' ? 'bg-danger' : '' }`}>
                    <div className="d-flex align-items-center ">
                      <Chip 
                        label={`${new Date(logSet.timestamp).toLocaleDateString()} - ${new Date(logSet.timestamp).toLocaleTimeString()}`}
                        className="bg-white"
                      />
                    </div>
                    <TextComponent color="text-light" type={"caption"}>
                      { logSet.result }
                    </TextComponent>
                    { logSet.status !== 'success' && 
                      <ButtomComponent
                        iconButton
                        tooltip="Replay bot"
                        icon={<VideogameAssetIcon style={{ color: 'white' }}/>}
                        onClick={() => replayBot(logSet.inputData)}
                      />
                    }
                  </div>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <div className="align-self-center">Entrada</div>
                  </AccordionSummary>
                  <AccordionDetails className="d-block">
                    <Highlight>{ JSON.stringify(logSet.inputData, null, 2) }</Highlight>
                  </AccordionDetails>
                </Accordion>
                { logSet.steps.map(stepLog => 
                  <Accordion key={stepLog.timestamp}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <div className="align-self-center">{ stepLog.stepName }</div>
                    </AccordionSummary>
                    <AccordionDetails className="d-block">
                      { stepLog.inputData &&
                        <div>
                          <div className="mb-1">Input</div>
                          <Highlight>{ JSON.stringify(stepLog.inputData, null, 2) }</Highlight>
                        </div>
                      }
                      { stepLog.outputData && 
                        <div>
                          <div className="mb-1">Output</div>
                          <Highlight className="p-5">{ JSON.stringify(stepLog.outputData, null, 2) }</Highlight>
                        </div>
                      }
                    </AccordionDetails>
                  </Accordion>
                )}
              </div>)
            : <TextComponent className="mt-5 d-flex justify-content-center">
                Esse bot ainda não tem nenhum log!
              </TextComponent>
          ) :
          ['', '', '', ''].map((el, i) => <Skeleton key={i} className="rounded mb-3" animation="wave" variant="rect" height={120}></Skeleton>)
        }
      </div>
    </div>
  );
};

export default LogsComponent;
