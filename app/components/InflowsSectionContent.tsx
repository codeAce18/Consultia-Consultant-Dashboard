import React from "react";
import TransactionsSectionContent, { transactions } from "./TransactionsSectionContent";

const InflowsSectionContent = () => {
  const inflowTransactions = transactions.filter(
    (transaction) => transaction.description.type === "TopUp"
  );
   
  return <TransactionsSectionContent transactions={inflowTransactions} />;
};

export default InflowsSectionContent;