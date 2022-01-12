import "./Jumbotron.css";

const Jumbotron = ({ img }) => {
  return (
    <div className="container">
      <div className="section jumbotron">
        <div className="jumbotron-text">
          <h2 className="jumbotron-title">Twoja aplikacja do rozliczania</h2>
          <p>
            Jedyna w swoim rodzaju aplikacja, służąca do rozliczania dla
            każdego, kto wyrusza w podróż z Green Tour. Załóż konto już dziś i
            korzystaj ze wszystkich możliwośći Rozliczajki.{" "}
          </p>
        </div>
        <img src={img} className="jumbotron-image" alt="" />
      </div>
    </div>
  );
};

export default Jumbotron;
