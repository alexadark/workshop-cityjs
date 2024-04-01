const Team = () => {
  console.log(
    "%cTeam component is rendering",
    "color: purple; font-weight: bold;"
  );
  return (
    <div className="border-2 border-purple-400 bg-purple-900 bg-opacity-30 px-5">
      <h2>Team Section</h2>
      <p>This is the team section, it takes the about.tsx layout</p>
    </div>
  );
};

export default Team;
