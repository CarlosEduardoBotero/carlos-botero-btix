import React from "react";
import InfiniteScroll from "../../components/InfiniteScroll/InfiniteScroll";

const Home = () => {
  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-gray-300 py-20"
      data-testid="home-wrapper"
    >
      <div
        className="w-[320px] md:w-[650px]"
        data-testid="infinite-scroll-wrapper"
      >
        <InfiniteScroll />
      </div>
    </div>
  );
};

export default Home;
