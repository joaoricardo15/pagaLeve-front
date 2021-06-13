import React from "react";
import { Typography } from "@material-ui/core";

const TextComponent = ({ children, type = "body1", onClick, color, size, icon, iconButton, tooltip, className, style }) =>
  <Typography
    className={className}
    size={size ? size : "medium"}
    variant={type}
    color={color}
    style={style}
    onClick={onClick}>
    {icon}
    {children && <span className={icon && 'ml-1'}>{children}</span>}
  </Typography>;

export default TextComponent;
