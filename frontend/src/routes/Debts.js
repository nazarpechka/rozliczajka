import Nav from "../components/Nav";

const Debts = ({ user }) => {

  return(
    <div>
      <Nav isLoggedIn={user} className="shadow-md shadow-orange-500/25" />
      <h1 className="text-center text-4xl font-medium mb-11 mt-10">Your debts</h1>
    </div>
  );
};
export default Debts;