import React from "react";

function Display(props) {
  let displayValue = Number(props.displayValue).toPrecision(10);
  displayValue = displayValue.replace(/.0+$/, "");
  return <div className="display">{displayValue}</div>;
}

export default Display;
