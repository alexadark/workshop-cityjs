import { SpinnerCircularSplit } from "spinners-react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center w-full flex-col">
      <SpinnerCircularSplit
        size={61}
        thickness={141}
        speed={100}
        color="rgba(172, 57, 157, 1)"
        secondaryColor="rgba(57, 172, 158, 0.99)"
      />
      <h3>Generating...</h3>
    </div>
  );
};

export default Spinner;
