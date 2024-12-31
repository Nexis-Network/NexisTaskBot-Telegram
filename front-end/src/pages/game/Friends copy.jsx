import GameLayout from "../layout/GameLayout";

import LogoImg from "../../assets/img/logo.png";
import ActualizarImg from "../../assets/img/actualizar.png";
import PeopleImg from "../../assets/img/people.png";
import coinIcon from "../../assets/img/coin.png";

function Friends() {
  return (
    <GameLayout>
      <div
        className="w-full overflow-y-auto"
        style={{ height: "calc(100% - 224px)" }}
      >
        <h1 className="text-white text-[25px] font-bold">Invite Friends!</h1>
        <h3 className="text-white text-[15px] font-bold">
          You and your friends will receive bonus
        </h3>
        <div className="h-[85px] flex flex-col items-center justify-center w-full bg-[#6ABE6A] rounded-[19px] mt-2 shadow-[0_0_24px_-6px_#6ABE6A]">
          <h3 className="text-white text-[15px] font-bold">Invite friend</h3>
          <div className="flex">
            <img src={LogoImg} className="h-[18px] w-[18px]" />
            <p className="text-white text-[15px] font-bold">+100K TTC </p>
          </div>
          <p className="text-white text-[15px] font-bold">
            for you and your friend
          </p>
        </div>
        <div className="h-[85px] flex flex-col items-center justify-center w-full bg-[#6ABE6A] rounded-[19px] mt-2 shadow-[0_0_24px_-6px_#6ABE6A]">
          <h3 className="text-white text-[15px] font-bold">
            Invite frriend with Telegram Premium
          </h3>
          <div className="flex">
            <img src={LogoImg} className="h-[18px] w-[18px]" />
            <p className="text-white text-[15px] font-bold">+150K TTC</p>
          </div>
          <p className="text-white text-[15px] font-bold">
            for you and your friend
          </p>
        </div>
        <div className="h-[85px] flex flex-col items-center justify-center w-full bg-[#6ABE6A] rounded-[19px] mt-2 shadow-[0_0_24px_-6px_#6ABE6A]">
          <h3 className="text-white text-[15px] font-bold">
            Invite frriend with Referal
          </h3>
          <div className="flex">
            <img src={LogoImg} className="h-[18px] w-[18px]" />
            <p className="text-white text-[15px] font-bold">+200K TTC</p>
          </div>
          <p className="text-white text-[15px] font-bold">
            for you and your friend
          </p>
        </div>
        <div className="mt-4 relative w-[80%] text-center mx-auto">
          <h3 className="text-white text-[15px] font-bold">Friends List</h3>{" "}
          <button className="absolute right-0 top-0">
            <img className="h-[19px] w-[19px]" src={ActualizarImg} />
          </button>
        </div>

        {/* dynamic */}
        <div className="h-[65px] flex items-center w-[90%] bg-[#6ABE6A] rounded-[19px] mt-2 shadow-[0_0_24px_-6px_#6ABE6A] px-4 mx-auto">
          <img
            src={coinIcon}
            className="w-12 h-12 m-1 border-2 border-[#0B2113] rounded-full basis-[10%]"
            alt="Profile"
            width="50"
          />
          <div className="flex flex-col basis-[90%] text-left ml-2">
            <p className="text-white text-[15px] font-bold">John adam</p>
            <p className="text-white text-[15px] font-bold">LVL 25</p>
          </div>
        </div>
      </div>
      <div className="h-[150px] w-full fixed bottom-0 bg-[#0B0B0B] shadow-[0_0_10px_2px_#0B0B0B]">
        <button className="text-white text-[15px] font-bold rounded-[20px] bg-[#0FF378] px-6 py-2 mt-2 mx-auto flex items-center">
          Invite friends <img src={PeopleImg} className="h-[34px] w-[34px]" />
        </button>
      </div>
    </GameLayout>
  );
}

export default Friends;
