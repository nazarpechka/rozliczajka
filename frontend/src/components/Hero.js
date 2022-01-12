const Hero = ({ img }) => {
  return (
    <section className="container mx-auto flex items-center p-8 mb-16 relative bg-gradient-to-r from-orange-500 to-primary text-white">
      <div>
        <h2 className="text-8xl">Twoja aplikacja do rozliczania</h2>
        <p className="mt-2 text-lg text-gray-100">
          Jedyna w swoim rodzaju aplikacja, służąca do rozliczania dla każdego,
          kto wyrusza w podróż z Green Tour. Załóż konto już dziś i korzystaj ze
          wszystkich możliwośći Rozliczajki.{" "}
        </p>
      </div>
      <img src={img} className="w-1/2" alt="" />
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

export default Hero;
