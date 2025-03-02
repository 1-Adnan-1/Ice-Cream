const TrendButton = () => {
  return (
    <div className="flex justify-end mb-20 mt-[-80px]">
      <button className="list-btn">
        Trendler
        <img
          src="/fire.png"
          alt="trends"
          className="w-10 absolute right-1 bottom-0"
        />
      </button>
    </div>
  );
};

export default TrendButton;
