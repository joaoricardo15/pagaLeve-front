import React from "react";
import { Fab, Tooltip, Button, IconButton } from "@material-ui/core";

const ButtomComponent = ({ children, onClick, color, size, type, icon, iconButton, tooltip, className }) => {
  const ContainerTag = tooltip ? Tooltip : 'div';
  const ButtonTag = type === 'hightLight' ? Fab : iconButton ? IconButton : Button;

  return (
    <ContainerTag title={tooltip} style={{ height: 'fit-content', alignSelf: 'center' }} className={className}>
      <ButtonTag 
        className={type === 'hightLight' ? iconButton && 'bg-transparent' : ''}
        size={size ? size : "medium"}
        variant={type === 'hightLight' && iconButton ? 'round' : type === 'text' ?  'text' : 'outlined'} 
        color={color ? color : 'default'}
        style={color ? {} : { color: 'gray' }}
        onClick={onClick}>
        { icon }
        { children && <div className="ml-1">{ children }</div> }
      </ButtonTag>
    </ContainerTag>
  )
};

export default ButtomComponent;
