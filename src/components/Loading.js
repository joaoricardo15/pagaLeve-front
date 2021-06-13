import React from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";

const Loading = ({ loading }) => (
  <Backdrop style={{ backgroundColor: "#0000000a" }} open={loading}>
    <CircularProgress color="primary" />
  </Backdrop>
);

Loading.defaultProps = {
  loading: true
}

export default Loading;
