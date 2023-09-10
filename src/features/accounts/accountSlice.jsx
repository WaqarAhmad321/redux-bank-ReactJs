import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducer: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = true;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan(state, action) {
      if (state.loan > 0) return;
      state.loan = action.payload.amount;
      state.loanPurpose = action.payload.loanPurpose;
      state.balance += action.payload.amount;
    },
    payLoan(state, action) {
      state.loan = 0;
      state.balance -= action.payload;
      state.loanPurpose = "";
    },
  },
});

export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.actions;

export default accountSlice.reducer;
// export default function accountReducer(state = initialStateAccount, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: true,
//       };
//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/requestLoan":
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.loanPurpose,
//         balance: state.balance + action.payload.amount,
//       };
//     case "account/payLoan":
//       return {
//         ...state,
//         loan: 0,
//         balance: state.balance - action.payload,
//         loanPurpose: "",
//       };
//     case "account/convertingCurrency":
//       return {
//         ...state,
//         isLoading: true,
//       };
//     default:
//       return state;
//   }
// }

// export function deposit(amount, currency) {
//   if (currency === "USD") return { type: "account/deposit", payload: amount };

//   return async function (dispatch) {
//     dispatch({ type: "account/convertingCurrency" });
//     const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`;
//     const res = await fetch(url);
//     const data = await res.json();
//     const convertedAmount = data.rates.USD;
//     dispatch({ type: "account/deposite", payload: convertedAmount });
//   };
// }
// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }

// export function requestLoan(amount, loanPurpose) {
//   return { type: "account/requestLoan", payload: { amount, loanPurpose } };
// }

// export function payLoan(amount) {
//   return { type: "account/payLoan", payload: amount };
// }
