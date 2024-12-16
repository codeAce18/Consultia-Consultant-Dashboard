import React from "react";
import TransactionsSectionContent, { transactions } from "./TransactionsSectionContent";

const OutflowsSectionContent = () => {
  const outflowTransactions = transactions.filter(
    (transaction) => transaction.description.type === "Payment"
  );
   
  return <TransactionsSectionContent transactions={outflowTransactions} />;
};

export default OutflowsSectionContent;