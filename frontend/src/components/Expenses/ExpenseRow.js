const ExpenseRow = ({ expense }) => {
  return (
    <div className="grid grid-cols-5 gap-4 p-5 border-b border-primary">
      <span>{expense._id}</span>
      <span>{new Date(expense.date).toLocaleDateString()}</span>
      <span>{expense.status}</span>
      <span>{expense.description ? expense.description : "nie ma opisu"}</span>
      <span>
        {expense.amount} {expense.currency}
      </span>
    </div>
  );
};

export default ExpenseRow;