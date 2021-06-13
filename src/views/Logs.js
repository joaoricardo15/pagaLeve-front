import React, { useEffect, useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Chip } from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import RefreshIcon from '@material-ui/icons/Refresh';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Highlight from "../components/Highlight";
import ApiRequest from "../requests/customersApi";
import ButtomComponent from "../components/Button";
import TextComponent from "../components/Text";

export const LogsComponent = ({ location, history }) => {
  const endpointName = location.state.endpointName;
  const [fetching, setFetching] = useState(false);
  const [logs, setLogs] = useState(null);

  const apiRequest = ApiRequest();

  const navigateBack = () => {
    history.goBack();
  }

  const refreshLogs = () => {
    setFetching(true);

    apiRequest.getLogs(endpointName)
      .then(logs => setLogs(logs))
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
          tooltip="Refresh"
          onClick={navigateBack}
        />
        <TextComponent type="h5">
          { endpointName }
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
        { !fetching && logs ? 
          (logs.length > 0 ? 
            logs.map(logSet => 
              <div className="mb-5" key={logSet.timestamp}>
                <Accordion>
                  <div className={`p-3 d-flex align-items-center justify-content-between
                    ${logSet.status === 'success' ? 'bg-success' :
                    logSet.status === 'fail' ? 'bg-danger' : '' }`}>
                    <div className="d-flex align-items-center ">
                      <Chip 
                        label={`${new Date(logSet.timestamp).toLocaleDateString()} - ${new Date(logSet.timestamp).toLocaleTimeString()}`}
                        className="bg-white"
                      />
                    </div>
                    {logSet.status !== 'success' && 
                      <TextComponent color="text-light" type={"caption"}>
                        { JSON.stringify(logSet.result, null, 2) }
                      </TextComponent>
                    }
                  </div>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <div className="align-self-center">Request</div>
                  </AccordionSummary>
                  <AccordionDetails className="d-block">
                    <Highlight>{ JSON.stringify(logSet.inputData, null, 2) }</Highlight>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <div className="align-self-center">Response</div>
                  </AccordionSummary>
                  <AccordionDetails className="d-block">
                    <Highlight>{ JSON.stringify(logSet.result, null, 2) }</Highlight>
                  </AccordionDetails>
                </Accordion>
              </div>)
            : <TextComponent className="mt-5 d-flex justify-content-center">
                This endpoint has no logs yet!
              </TextComponent>
          ) :
          ['', '', '', ''].map((el, i) => <Skeleton key={i} className="rounded mb-3" animation="wave" variant="rect" height={120}></Skeleton>)
        }
      </div>
    </div>
  );
};

export default LogsComponent;
