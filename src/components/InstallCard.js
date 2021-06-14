import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CloseIcon from "@material-ui/icons/Close";
import GetAppIcon from "@material-ui/icons/GetApp";
import { Button, Typography } from "@material-ui/core";

const CardInstallComponent = () => {
  const [installationEvent, setInstallationEvent] = useState(null);

  const installApp = () => {
    installationEvent.prompt();
    installationEvent.userChoice.then(choiceResult => {
      if (choiceResult.outcome === "accepted") setInstallationEvent(null);
    });
  };

  const showInstalattionPainel = event => {
    event.preventDefault();
    setInstallationEvent(event);
  };

  const closePainel = () => {
    setInstallationEvent(null);
  };

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", e =>
      showInstalattionPainel(e)
    );
  }, []);

  return (
    installationEvent && (
      <Card
        style={{
          left: 10,
          right: 10,
          bottom: 10,
          padding: 10,
          display: "flex",
          position: "fixed",
          alignItems: "center"
        }}
      >
        <CloseIcon color="secondary" onClick={closePainel} />
        <Typography
          style={{
            flex: 1,
            fontSize: 10,
            textAlign: "end",
            marginRight: 20
          }}
        >
          Have a complete mobile experience!
        </Typography>
        <Button
          color="primary"
          variant="outlined"
          startIcon={<GetAppIcon />}
          onClick={installApp}
        >
          Install
        </Button>
      </Card>
    )
  );
};

export default CardInstallComponent;
