import { useSelector } from "react-redux";

function Customer() {
  useSelector((store) => store.customer.fullName);

  return <h2>👋 Welcome, %NAME%</h2>;
}

export default Customer;
