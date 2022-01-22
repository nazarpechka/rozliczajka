const Section = ({ title, className, children }) => {
  return (
    <section className={"container mx-auto my-8 " + className}>
      <h1 className="text-4xl font-medium mb-8">{title}</h1>
      {children}
    </section>
  );
};

export default Section;
