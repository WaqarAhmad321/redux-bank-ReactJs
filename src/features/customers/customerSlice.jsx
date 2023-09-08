const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createAt: "",
};

export function createCustomer(fullName, nationalId) {
  return {
    type: "customer/creatCustomer",
    payload: { fullName, nationalId, createdAt: new Date().toISOString() },
  };
}

export function updateCustomer(fullName) {
  return {
    type: "customer/updateCustomer",
    payload: fullName,
  };
}

export function customerReducer(state = initialStateCustomer, action) {
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
