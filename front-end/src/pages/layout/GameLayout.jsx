import Tabs from "../../components/taptap/Tabs";
import TGAuth from "../../components/taptap/TGAuth";

import { getTGUser } from "../../utlis/tg";

import walletIcon from "../../assets/img/wallet-icon.svg";
import leaderboard from "../../assets/img/leaderboard.svg";
import coinIcon from "../../assets/img/coin.png";
import { Link } from "react-router-dom";

function GameLayout({ children }) {
  let tg_user = getTGUser();

  return (
    <TGAuth>
      {tg_user !== false && (
        <div className="container text-center h-screen flex flex-col items-center px-2 bg-transparent backdrop-blur-md">
          <div className="top-bar w-full flex flex-row items-center justify-between py-2 h-[74px]">
            <div className="flex flex-row justify-between align-items-center w-full">
              <div className="flex flex-row items-center justify-center">
                <img
                  src={coinIcon}
                  className="w-12 h-12 m-1 border-2 border-[#0B2113] rounded-full"
                  alt="Profile"
                  width="50"
                />
                <span className="ml-2 text-white text-xl font-bold">
                  {tg_user.first_name}
                </span>
              </div>
              <div className="menu flex flex-row items-center justify-center gap-4">
                <button className=" ">
                  <img
                    className="w-12 h-12 p-2 rounded-xl bg-[#0B2113]"
                    src={walletIcon}
                  />
                </button>
                <Link to="/game/leaderboard" className=" ">
                  <img
                    className="w-12 h-12 p-2 rounded-xl bg-[#0B2113]"
                    src={leaderboard}
                  />
                </Link>
              </div>
            </div>
          </div>
          {children}
          <Tabs />
        </div>
      )}
      {tg_user === false && (
        <h1 className="text-7xl text-white font-bold text-center">
          Please open in TG
        </h1>
      )}
    </TGAuth>
  );
}

export default GameLayout;
