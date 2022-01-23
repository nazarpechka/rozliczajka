import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseRow = ({ expense }) => {
  const data = {
    labels: expense.subexpenses.map(
      (sub) => sub.user.name + " " + sub.user.surname
    ),

    datasets: [
      {
        data: expense.subexpenses.map((sub) => sub.amount),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
          "rgb(255, 159, 64)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="grid grid-cols-5 gap-4 p-5 border-b border-primary items-center">
      <span>{new Date(expense.date).toLocaleDateString()}</span>
      <span>{expense.status}</span>
      <span>{expense.description ? expense.description : "nie ma opisu"}</span>
      <span>{expense.amount + " " + expense.currency}</span>
      <span className="w-64 h-64">
        <Pie data={data} />
      </span>
    </div>
  );
};

export default ExpenseRow;
