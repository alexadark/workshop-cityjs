import { type MetaFunction, Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    {
      title: `Remix AI cms - about`,
    },

    { name: "description", content: "A simple cms powered by Remix and AI" },
  ];
};

const About = () => {
  console.log(
    "%cAbout component is rendering",
    "color: green; font-weight: bold;"
  );
  return (
    <div className="border-2 border-green-400 p-5 bg-green-900 bg-opacity-30">
      <h1>This is the about section</h1>
      <Outlet />
    </div>
  );
};
export default About;
