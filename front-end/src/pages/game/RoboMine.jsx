import minerbg from "../../assets/img/mine-bg.png";
import stars from "../../assets/img/stars-robo.svg";
import robot from "../../assets/img/robot.png";
import { easeInOut, motion } from "framer-motion";
import energy from "../../assets/img/energy.svg";
import health from "../../assets/img/health.svg";
import defence from "../../assets/img/defence.svg";
import clock from "../../assets/img/clock.svg";
import upgrade from "../../assets/img/upgrade.svg";
import back from "../../assets/img/back-arrow.svg";

function RoboMine() {
  return (
    <div
      className="RoboMine relative h-screen bg-black bg-cover bg-no-repeat flex items-center justify-center px-2 flex-col py-4 bg-top pt-10"
      style={{ backgroundImage: `url(${minerbg})` }}
    >
      <button className="absolute top-0 left-0 m-2 bg-white p-3 rounded-full">
        <img src={back} className="w-4 h-4" alt="" />
      </button>
      <h1 className="font-bold text-4xl text-white">ROBO MINER</h1>
      <p className=" text-xl text-white">Upgrade your robot</p>
      <div className="robotcontainer relative flex">
        <img
          src={robot}
          className="h-80 w-auto z-20 small:h-60 small:w-60"
          alt=""
        />
        <motion.img
          src={stars}
          className="absolute  h-80 w-80 small:h-60 small:w-60"
          alt=""
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          initial={{ rotate: 0 }}
        />
        <motion.img
          src={stars}
          className="absolute  h-80 w-80 small:h-60 small:w-60"
          alt=""
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          initial={{ rotate: 0 }}
        />
        <div className="h-52 w-52 bg-[#39ff9571] rounded-full absolute top-1/2 -translate-y-1/2 z-0 blur-2xl left-1/2  -translate-x-1/2"></div>
      </div>
      <div className="stats w-full h-full bg-[#0b0b0b4f] backdrop-blur-md border-[1px] border-[#313131] rounded-3xl flex flex-col items-center justify-center gap-2">
        <div className="flex flex-row items-center w-5/6 justify-between gap-4">
          <img src={energy} className="w-6 h-6" alt="" />
          <div className="flex flex-col items-center justify-center w-full gap-1">
            <div className="flex flex-row items-center justify-between w-full">
              <h1 className="text-white font-bold text-sm">Energy</h1>
              <h1 className="text-white font-bold text-sm">5</h1>
            </div>
            <div className="progressbar w-full rounded-full relative  h-3 bg-[#050F08] border-[#45D470] border-[1px]">
              <div
                className="absolute  h-full bg-gradient-to-r from-[#0FF378] to-[#6ABE6A] bottom-0 rounded-full"
                style={{ width: `50%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center w-5/6 justify-between gap-4">
          <img src={health} className="w-6 h-6" alt="" />
          <div className="flex flex-col items-center justify-center w-full gap-1">
            <div className="flex flex-row items-center justify-between w-full">
              <h1 className="text-white font-bold text-sm">Health</h1>
              <h1 className="text-white font-bold text-sm">5</h1>
            </div>
            <div className="progressbar w-full rounded-full relative  h-3 bg-[#050F08] border-[#45D470] border-[1px]">
              <div
                className="absolute  h-full bg-gradient-to-r from-[#0FF378] to-[#6ABE6A] bottom-0 rounded-full"
                style={{ width: `50%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center w-5/6 justify-between gap-4">
          <img src={defence} className="w-6 h-6" alt="" />
          <div className="flex flex-col items-center justify-center w-full gap-1">
            <div className="flex flex-row items-center justify-between w-full">
              <h1 className="text-white font-bold text-sm">Defence</h1>
              <h1 className="text-white font-bold text-sm">5</h1>
            </div>
            <div className="progressbar w-full rounded-full relative  h-3 bg-[#050F08] border-[#45D470] border-[1px]">
              <div
                className="absolute  h-full bg-gradient-to-r from-[#0FF378] to-[#6ABE6A] bottom-0 rounded-full"
                style={{ width: `50%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-4">
          <button className="claim bg-[#0FF378] flex flex-row items-center justify-center gap-2 px-6 py-4 mt-2 rounded-2xl text-xl font-bold ">
            <img src={upgrade} className="h-6 w-6" />
            Upgrade
          </button>
          <button className="claim bg-[#0FF378] flex flex-row items-center justify-center gap-2 px-6 py-4 mt-2 rounded-2xl text-xl font-bold ">
            <img src={clock} className="h-6 w-6" /> 3 Hours
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoboMine;
