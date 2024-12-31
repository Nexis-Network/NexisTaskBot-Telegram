import { easeInOut, motion } from "framer-motion";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import GameLayout from "../layout/GameLayout";

import {
  getAuth,
  setLocalStorage,
  getLocalStorage,
} from "../../utlis/localstorage";
import { getTGUser } from "../../utlis/tg";
import { debounce, dateTimeToTimestamp, isDiff } from "../../utlis/helperfun";
import {
  initializeAudio,
  playAudio,
  stopAudio,
  Vibration,
} from "../../utlis/audioUtils";

import AnimatedCounter from "../../components/taptap/AnimatedCounter";

import PlayIcon from "../../assets/img/play-icon.svg";
import coinBackgroundImg from "../../assets/img/coin-background.png";
import heroBackgroundImg from "../../assets/img/background-hero.png";
import LogoImg from "../../assets/img/logo.png";
import RobotImg from "../../assets/img/robot.png";
import CoinImg from "../../assets/img/coin.png";
import BoltIcon from "../../assets/img/bolt-icon.svg";
import tapaudio from "../../assets/sounds/mixkit-arcade-game-jump-coin-216.wav";

function Earn() {
  const navigate = useNavigate();

  const [clicks, setClicks] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isGameActive, setIsGameActive] = useState(false);
  const [timePlayed, setTimePlayed] = useState(0);
  const [deductCount, setDeductCount] = useState(1);
  const [overallCoin, setOverallCoin] = useState(0);
  const [presCoin, setPresCoin] = useState(0);
  const [cointToAdd, setCointToAdd] = useState(1);
  const [glow2x, setGlow2x] = useState(false);
  const [timeOver, setTimeOver] = useState(false);
  const [udetails, setUdetails] = useState({});
  const [playerlevel, setPlayerlevel] = useState("Level 1");
  const [volume, setVolume] = useState(0.5);
  const [isMultiplier, setIsMultiplier] = useState(false);
  const [multiplierVal, setMultiplierVal] = useState("");

  const effectRan = useRef(false);
  const gameEffectRan = useRef(false);
  const lastTapTimeRef = useRef(Date.now());
  const lastApiCallTimeRef = useRef(Date.now());
  const tapCountRef = useRef(0);

  const multipliers = {
    // '1x': { value: "1", threshold: 1, dedPoints: 0 },
    "2x": { value: "2", threshold: 10, dedPoints: 10 },
    "4x": { value: "4", threshold: 60, dedPoints: 15 },
    "6x": { value: "6", threshold: 120, dedPoints: 20 },
    "8x": { value: "8", threshold: 180, dedPoints: 25 },
    "10x": { value: "10", threshold: 240, dedPoints: 30 },
  };

  async function postAjaxCall(endpoint, data) {
    const token = getAuth();
    try {
      const response = await axios.post(endpoint, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      // console.error('Error in endpoint:', error);
      throw new Error("Error in endpoint", error);
    }
  }
  useEffect(() => {
    const initAudio = async () => {
      try {
        await initializeAudio(tapaudio);
      } catch (error) {
        console.error("Error initializing audio:", error);
      }
    };
    initAudio();

    return () => {
      stopAudio();
    };
  }, []);
  useEffect(() => {
    const getUserData = async (tgdata) => {
      try {
        let teleUser = tgdata;
        let tid = null;
        let currentTime = Date.now();
        if (teleUser) {
          tid = teleUser.id;
          const res = await postAjaxCall("/api/game/getscore", { tid });
          const uData = res.value;
          if (res && res.isthere === true) {
            setUdetails(uData);
            setPresCoin(
              uData?.tap_points !== 0 && uData?.tap_points >= 10
                ? Math.ceil(uData?.tap_points / 2)
                : 0
            );
            setPlayerlevel(uData?.game_level || "Level 1");

            let brlog = getLocalStorage("browserlog");
            // console.log("brlog",brlog)

            //TODO need to check
            let dbTap_points = uData?.tap_points;
            let synctime = dateTimeToTimestamp(uData?.sync || Date.now());

            if (!isDiff(synctime, Date.now())) {
              let tempScor =
                brlog.overallCoin != "" && brlog?.overallCoin != 0
                  ? brlog?.overallCoin
                  : uData?.tap_points;
              let tempSec =
                brlog?.balance_sec != "" && brlog?.balance_sec != 0
                  ? parseInt(brlog?.balance_sec) - 1
                  : 0;
              setOverallCoin(tempScor);
              setTimeLeft(tempSec);
            } else {
              var synUpData = {
                overallCoin: brlog?.overallCoin,
                deductedPoints: brlog?.deductedPoints || 0,
                timePlayed,
                timeOver,

                teleid: tid,
              };
              await postAjaxCall("/api/game/upscore", synUpData);

              let tempScor =
                brlog.overallCoin != "" && brlog?.overallCoin != 0
                  ? brlog?.overallCoin
                  : uData?.tap_points;
              let tempSec =
                brlog?.balance_sec != "" && brlog?.balance_sec != 0
                  ? parseInt(brlog?.balance_sec) - 1
                  : 0;
              setOverallCoin(tempScor);
              setTimeLeft(tempSec);
              // Update local storage with new sync time
              setLocalStorage("browserlog", {
                ...brlog,
                sync: Date.now(),
              });
            }
          } else {
            const inApptele = {
              firstname: teleUser.first_name,
              id: teleUser.id,
              username: teleUser.username,
            };
            setUdetails(inApptele);
            setOverallCoin(0);
          }
        } else {
          navigate("/game");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (effectRan.current === false) {
      const tgdata = getTGUser();
      getUserData(tgdata);
      effectRan.current = true;
    }
  }, [navigate]);

  useEffect(() => {
    if (isGameActive && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev > 1) return prev - 1;
          setTimeOver(true);
          clearInterval(timer);
          return 0;
        });
        setTimePlayed((prevTime) => prevTime + 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      stopAudio();
      // Vibration();
      setIsGameActive(false);
      setIsMultiplier(true);

      var localData = {
        currentTimestammp: Date.now(),
        overallCoin,
        deductedPoints:
          multiplierVal != null && multiplierVal != "" ? multiplierVal : "",
        timePlayed,
        isGameActive,
        balance_sec: timeLeft,
        istimeLeft: timeLeft > 0 ? true : false,
        used_multiplier: multiplierVal,
        timeOver,
      };
      setLocalStorage("browserlog", localData);
      localData["teleid"] = udetails.id || udetails.teleid;

      postAjaxCall("/api/game/upscore", localData);

      gameEffectRan.current = true;
    }
  }, [isGameActive, timeLeft]);

  const debouncedUpdate = debounce((localData) => {
    const currentTime = Date.now();
    if (currentTime - lastApiCallTimeRef.current >= 5000) {
      postAjaxCall("/api/game/upscore", localData);
      lastApiCallTimeRef.current = currentTime;
    }
  }, 5000);

  const handleTap = () => {
    if (isGameActive) {
      playAudio();
    }
    const currentTimestammp = Date.now();

    if (timeLeft > 0) {
      setIsGameActive(true);
      setScore((prevScore) => prevScore + cointToAdd);
      setOverallCoin((prevCoin) => {
        setPresCoin(prevCoin);
        const updatedCoin = prevCoin + cointToAdd;

        var localData = {
          currentTimestammp,
          overallCoin: updatedCoin,
          deductedPoints:
            multiplierVal != null && multiplierVal != "" ? multiplierVal : "",
          timePlayed,
          isGameActive,
          balance_sec: timeLeft,
          istimeLeft: timeLeft > 0 ? true : false,
          used_multiplier: multiplierVal,
        };

        setGlow2x(true);
        setLocalStorage("browserlog", localData);
        // console.log("localData from tap",localData)
        localData["teleid"] = udetails.id || udetails.teleid;
        lastTapTimeRef.current = Date.now();
        tapCountRef.current += 1;

        if (tapCountRef.current >= 50) {
          postAjaxCall("/api/game/upscore", localData);
          tapCountRef.current = 0;
          lastApiCallTimeRef.current = Date.now();
        }
        debouncedUpdate(localData);
        return updatedCoin;
      });
    } else if (timeOver) {
      var localData = {
        currentTimestammp,
        overallCoin,
        deductedPoints:
          multiplierVal != null && multiplierVal != "" ? multiplierVal : "",
        timePlayed,
        isGameActive,
        balance_sec: timeLeft,
        istimeLeft: timeLeft > 0 ? true : false,
        used_multiplier: multiplierVal,
        timeOver,
      };
      setLocalStorage("browserlog", localData);
      if (overallCoin < 0) {
        setGlow2x(false);
      }
    }
  };
  const handleMultiplierClick = (val) => {
    if (overallCoin >= val.dedPoints) {
      const multiplierValue = parseInt(val?.value || 0, 10);
      const additionalTime = parseInt(10 * multiplierValue, 10);
      const pointsToDeduct = val.dedPoints;

      const updateGameState = () => {
        setMultiplierVal(multiplierValue);
        setTimeLeft((prevTimeLeft) => prevTimeLeft + additionalTime);
        setOverallCoin((prevOverallCoin) => {
          const balancePoints = prevOverallCoin - pointsToDeduct;
          const currentTimestammp = Date.now();

          const localData = {
            currentTimestammp,
            overallCoin: balancePoints,
            deductedPoints: pointsToDeduct,
            timePlayed,
            balance_sec: additionalTime,
            istimeLeft: timeLeft > 0,
            used_multiplier: multiplierValue,
          };

          setLocalStorage("browserlog", localData);
          localData.teleid = udetails.id || udetails.teleid;
          debouncedUpdate(localData);

          return balancePoints;
        });
        setIsGameActive(true);
        setTimeOver(false);
        setGlow2x(false);
      };

      if (timeOver || timeLeft === 0) {
        updateGameState();
      }
    }
  };

  //ui
  const handleTouchStart = (e) => {
    handleTap();
    const touch = e.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;

    const newClick = {
      id: Math.random(),
      x,
      y,
    };

    setClicks((prevClicks) => [...prevClicks, newClick]);

    setTimeout(() => {
      setClicks((prevClicks) =>
        prevClicks.filter((click) => click.id !== newClick.id)
      );
    }, 1000);
  };

  return (
    <GameLayout>
      <div
        className="hero w-full h-24 min-h-24  mb-4 rounded-3xl bg-no-repeat bg-cover flex flex-col items-center justify-center"
        style={{ backgroundImage: `url(${heroBackgroundImg})` }}
      >
        <span className="flex flex-row items-center justify-center gap-2 text-xl font-black bg-[#181A1B]  rounded-full text-[#0FF378] py-2 px-2 pr-4">
          <img
            src={PlayIcon}
            className="w-8  h-8  object-contain rounded-full"
            alt=""
          />{" "}
          PLAY
        </span>
      </div>
      <div
        className={`coinsection w-full h-full bg-black flex flex-col items-center justify-center p-4 relative select-none mb-2 bg-center bg-no-repeat `}
        style={{
          backgroundImage: `url(${coinBackgroundImg})`,
          backgroundBlendMode: "hard-light",
        }}
      >
        <div className="topbar bg-black/35 backdrop-blur-sm  border-[#3131316c] border-[1px] w-[90%] py-2 absolute top-0 z-20 rounded-3xl">
          <Link
            to="/game/miner"
            className="miner flex flex-col items-center justify-center  absolute my-2 ml-4"
          >
            <img src={RobotImg} alt="" className="w-8 h-8" />
            <h1 className="font-bold text-sm text-white">LVL 1</h1>
          </Link>
          <div className="flex flex-col items-center justify-center gap-2 ">
            <h1 className="font-bold text-sm text-white">YOU'VE EARNED</h1>
            <h1 className="font-bold text-2xl text-white flex flex-row gap-2 items-center justify-center">
              <AnimatedCounter from={presCoin} to={overallCoin} />
              <img src={LogoImg} className="w-8 h-8" />
            </h1>
          </div>
        </div>

        <div className="coin-display  mt-14">
          <div className="flex">
            <div className="relative flex">
              <motion.img
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
                src={CoinImg}
                alt="Coin"
                className="img-fluid animate__animated animate__bounce w-60 h-60 z-10 rounded-full"
                onTouchStart={handleTouchStart}
              />
              {timeLeft
                ? clicks.map((click) => (
                    <motion.div
                      key={click.id}
                      initial={{ opacity: 1, y: 0 }}
                      animate={{ opacity: 0, y: -100 }}
                      transition={{ duration: 1 }}
                      className="absolute text-2xl font-bold text-white z-20 flex"
                      style={{ top: click.y - 300, left: click.x - 100 }}
                    >
                      +{deductCount || "5"}
                    </motion.div>
                  ))
                : ""}
              <div className="h-52 w-52 bg-[#0ff37969] rounded-full absolute top-1/2 -translate-y-1/2 z-0 blur-2xl left-1/2  -translate-x-1/2"></div>
            </div>
          </div>
        </div>
        <div className="rank flex small:flex-col flex-row gap-2 small:items-start items-center justify-center  my-2 left-0   small:absolute">
          <div className="progressbar small:h-40 w-60 rounded-full relative small:w-3 h-3 bg-[#050F08]">
            <div
              className="absolute small:w-full h-full bg-gradient-to-r from-[#0FF378] to-[#6ABE6A] bottom-0 rounded-full"
              style={{
                height: `${Math.min((timeLeft / 70) * 100, 100)}%`,
                width: `${Math.min((timeLeft / 70) * 100, 100)}%`,
              }}
            ></div>
          </div>
          <h1 className="text-sm text-[#0FF378] flex flex-row items-center gap-1">
            {`${timeLeft}s`} <img src={BoltIcon} className="w-3 h-4" alt="" />
          </h1>
        </div>
        {/* <div className="boost-links flex flex-row items-center justify-center gap-4 mt-4">
          {Object.keys(multipliers).map((key) => (
            <a
              key={key}
              href="#"
              className={`text-lg font-bold ${
                glow2x && overallCoin >= multipliers[key].threshold
                  ? "animate-pulse text-[#0FF378]"
                  : "text-[#808080]"
              }`}
              onClick={
                !isGameActive && isMultiplier
                  ? () => handleMultiplierClick(multipliers[key])
                  : undefined
              }
            >
              {key}
            </a>
          ))}
        </div> */}
      </div>
    </GameLayout>
  );
}

export default Earn;
