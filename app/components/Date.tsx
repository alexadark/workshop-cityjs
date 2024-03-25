const DateComponent = ({ date }: { date: string }) => {
  return (
    <div className="text-sm text-gray-500">
      {new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </div>
  );
};

export default DateComponent;
