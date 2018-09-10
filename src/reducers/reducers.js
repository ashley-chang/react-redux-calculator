import { CLEAR, INPUT_NUMBER, INPUT_OPERATOR } from "../actions/actions";

const initialState = {
  currentValue: 0,
  inputValue: 0,
  displayValue: 0,
  operator: null,
  history: {
    inputValue: null,
    operator: null
  }
};

const operators = {
  //https://stackoverflow.com/questions/13077923/how-can-i-convert-a-string-into-a-math-operator-in-javascript
  "+": (x, y) => Number(x) + Number(y),
  "-": (x, y) => Number(x) - Number(y),
  "*": (x, y) => Number(x) * Number(y),
  "/": (x, y) => Number(x) / Number(y),
  "=": (x, y) => Number(x)
};

const currentInputZero = (inputValue, number) => {
  let newValue;
  switch (number) {
    case ".":
      newValue = "0.";
      break;
    case "0":
      newValue = "" + inputValue;
      break;
    default:
      newValue = "" + number;
      break;
  }
  return newValue;
};

const currentInputNonZero = (inputValue, number) => {
  let newValue;
  if (number === ".") {
    let check = "" + inputValue;
    if (check.match(/\./)) {
      check.match(/^./) ? (newValue = "0.") : (newValue = check);
    } else {
      newValue = check + number;
    }
  } else {
    newValue = inputValue + number;
  }
  return newValue;
};

//try to organize/simplify for readability... :|
export default function(state = initialState, action) {
  switch (action.type) {
    case CLEAR:
      return { ...initialState };
    case INPUT_NUMBER:
      let newValue;
      state.inputValue === 0
        ? (newValue = currentInputZero(state.inputValue, action.number))
        : (newValue = currentInputNonZero(state.inputValue, action.number));
      //truncate
      //continuing from the last result (=)? or starting new expression?
      if (state.operator !== null && state.currentValue === 0) {
        let actionNumber = action.number === "." ? "0." : action.number;
        return {
          ...state,
          currentValue: state.inputValue,
          inputValue: actionNumber,
          displayValue: actionNumber
        };
      } else {
        console.log(action.number);
        return { ...state, inputValue: newValue, displayValue: newValue };
      }
    case INPUT_OPERATOR:
      let calc;
      //if we are starting fresh/after a '=' click
      if (state.operator === null) {
        //uses previous operation if '=' clicked multiple times on existing currentValue
        if (
          action.operator === "=" &&
          state.history.operator &&
          state.history.inputValue
        ) {
          calc = operators[state.history.operator](
            state.currentValue,
            state.history.inputValue
          );
          console.log(calc);
          return {
            ...state,
            currentValue: calc,
            inputValue: 0,
            displayValue: calc
          };
        }
        //continuing on a result
        if (state.inputValue === 0) {
          //inputValue needs to be changed to currentValue since
          //INPUT_NUMBER formats based on whether there is existing input.
          //We want to add an operand without actually appending to the last result.
          return {
            ...state,
            currentValue: 0,
            inputValue: state.currentValue,
            operator: action.operator
          };
        }
        return {
          ...state,
          currentValue: state.inputValue,
          inputValue: 0,
          operator: action.operator
        };
      } else {
        calc = operators[state.operator](state.currentValue, state.inputValue);
        console.log(calc);
        let newOperator = action.operator === "=" ? null : action.operator;
        return {
          ...state,
          currentValue: calc,
          inputValue: 0,
          displayValue: calc,
          operator: newOperator,
          history: {
            ...state.history,
            inputValue: state.inputValue,
            operator: state.operator
          }
        };
      }

    default:
      return state;
  }
}
