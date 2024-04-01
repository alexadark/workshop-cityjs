const AboutIntro = () => {
  console.log(
    "%cAboutIntro component is rendering",
    "color: orange; font-weight: bold;"
  );
  return (
    <div className="border-2 border-orange-500 bg-orange-900 bg-opacity-30 px-5">
      <h2>About Intro</h2>
      <p>This is the about index it takes the about.tsx layout</p>
    </div>
  );
};

export default AboutIntro;
