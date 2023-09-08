import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createAt: "",
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.loanPurpose,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        balance: state.balance - action.payload,
        loanPurpose: "",
      };
    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
      };

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(accountReducer);

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

store.dispatch(deposit(500));
console.log(store.getState());

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

store.dispatch(withdraw(500));
console.log(store.getState());

function requestLoan(amount, loanPurpose) {
  return { type: "account/requestLoan", payload: { amount, loanPurpose } };
}

store.dispatch(requestLoan(500, "Buy a computer"));
console.log(store.getState());

function payLoan(amount) {
  return { type: "account/payLoan", payload: amount };
}

store.dispatch(payLoan(500));
console.log(store.getState());

// customer

function createCustomer(fullName, nationalId) {
  return {
    type: "customer/creatCustomer",
    payload: { fullName, nationalId, createdAt: new Date().toISOString() },
  };
}

function updateCustomer(fullName) {
  return {
    type: "customer/updateCustomer",
    payload: fullName,
  };
}

store.dispatch(createCustomer("Waqar", "123"));
