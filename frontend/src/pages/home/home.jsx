/* eslint-disable no-unused-vars */
import { useContext } from "react";
import Top10released from "../../components/Top10Released";
import "./style.css";
import AsyncSearch from "../../components/SearchEngine";
import Top10Upcomming from "../../components/Top10Upcomming";
function Home() {
  return (
    <div>
      <div className="container mx-auto">
        <h2 className="text-center p-4">Search Movie Here....</h2>

        <AsyncSearch />
        <div className="mx-auto">
          <h2 className="text-center p-4">Top 10 Released Movies</h2>
          <div className="row flex justify-content-center">
            <Top10released />
          </div>
          <h2 className="text-center p-4">Top 10 Upcomming Movies</h2>
          <div className="row felx justify-content-center">
            <Top10Upcomming />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
