export const CLEAR = "CLEAR";
export const INPUT_OPERATOR = "INPUT_OPERATOR";
export const INPUT_NUMBER = "INPUT_NUMBER";
export const SET_DISPLAY = "SET_DISPLAY";

export function clear() {
  return {
    type: CLEAR
  };
}

export function inputOperator(operator) {
  return {
    type: INPUT_OPERATOR,
    operator
  };
}

export function inputNumber(number) {
  return {
    type: INPUT_NUMBER,
    number
  };
}

// export function setDisplay(value) {
//   return {
//     type: SET_DISPLAY,
//     value
//   };
// }
