import Nav from "../components/Nav";
import img from "../assets/people.png";
import "./Home.css";

const Home = ({ user }) => {
  return (
    <section className="bg-gradient-to-tr from-orange-500 to-primary relative mb-16">
      <div className="container mx-auto flex flex-col items-center gap-16 pb-32 text-white">
        <Nav isLoggedIn={user} />
        <div className="flex items-center">
          <div>
            <h2 className="text-8xl font-light">
              Twoja aplikacja do rozliczania
            </h2>
            <p className="mt-10 text-lg text-gray-100">
              Jedyna w swoim rodzaju aplikacja, służąca do rozliczania dla
              każdego, kto wyrusza w podróż z Green Tour. Załóż konto już dziś i
              korzystaj ze wszystkich możliwośći Rozliczajki.{" "}
            </p>
          </div>
          <img src={img} className="w-1/2" alt="" />
        </div>
      </div>
      <div className="custom-shape-divider-bottom-1642021370">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Home;
