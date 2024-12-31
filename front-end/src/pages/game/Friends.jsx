import GameLayout from "../layout/GameLayout";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import React, { useState, useEffect, useRef, useCallback } from "react";

import LogoImg from "../../assets/img/logo.png";
import ActualizarImg from "../../assets/img/actualizar.png";
import PeopleImg from "../../assets/img/people.png";
import coinIcon from "../../assets/img/coin.png";
import InviteCard from "../../components/taptap/InviteCard";
import FriendsListItem from "../../components/taptap/FriendsListItem";
import { getTGUser } from "../../utlis/tg";
import { getAuth } from "../../utlis/localstorage";
import giftbox1 from "../../assets/img/giftbox1.png";
import giftbox2 from "../../assets/img/giftbox2.png";
import giftbox3 from "../../assets/img/giftbox3.png";

import axios from "axios";
function Friends() {
  const navigate = useNavigate();
  const effectRan = useRef(false);

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

  // useEffect(() => {
  //   const getUserData = async (tgdata) => {
  //     try {
  //       let teleUser = tgdata;
  //       let tid = null;
  //       if (teleUser) {
  //         tid = teleUser.id;
  //         const res = await postAjaxCall('/api/game/getref', { tid });
  //         const uData = res.value;
  //         console.log("res==>",res)
  //         if (res && res.isthere == true) {

  //         } else {

  //         }
  //       } else {
  //         navigate('/game');
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };

  //   if (effectRan.current === false) {
  //     const tgdata = getTGUser();
  //     getUserData(tgdata);
  //     effectRan.current = true;
  //   }
  // }, [navigate]);

  const handleCopyLink = (e) => {
    e.preventDefault();
    const inviteLink = "";
    navigator.clipboard
      .writeText(inviteLink)
      .then(() => {
        alert("Invite link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };
  return (
    <GameLayout>
      <div
        className="w-full overflow-y-auto"
        style={{ height: "calc(100% - 224px)" }}
      >
        <h1 className="text-white text-4xl font-bold">Invite Friends</h1>

        <InviteCard
          title="Invite friend"
          points="+100K TTC"
          description="for you and your friend"
          logo={LogoImg}
          background={giftbox1}
        />
        <InviteCard
          title="Invite friend with Telegram Premium"
          points="+150K TTC"
          description="for you and your friend"
          background={giftbox2}
          logo={LogoImg}
        />
        <InviteCard
          title="Invite friend with Referral"
          points="+200K TTC"
          description="for you and your friend"
          background={giftbox3}
          logo={LogoImg}
        />

        <div className="mt-4 relative w-[80%] text-center mx-auto">
          <h3 className="text-white text-[15px] font-bold">Friends List</h3>
          <button className="absolute right-0 top-0">
            <img
              className="h-[19px] w-[19px]"
              src={ActualizarImg}
              alt="Refresh"
            />
          </button>
        </div>

        {/* Dynamic friend list item */}
        <FriendsListItem name="John Adam" level="LVL 25" icon={coinIcon} />
        <FriendsListItem name="John Adam" level="LVL 25" icon={coinIcon} />
        <FriendsListItem name="John Adam" level="LVL 25" icon={coinIcon} />
        <FriendsListItem name="John Adam" level="LVL 25" icon={coinIcon} />
      </div>

      <div className="h-auto w-full fixed bottom-0  bg-[#0b0b0b5e] backdrop-blur-md pt-2">
        <a
          href="#"
          onClick={handleCopyLink}
          className="text-[#0b0b0b] text-base w-1/2 font-bold mb-28 rounded-[20px] bg-[#0FF378] px-6 py-2 mt-2 mx-auto flex items-center"
        >
          Invite friends{" "}
          <img src={PeopleImg} className="h-[34px] w-[34px] invert" alt="Invite" />
        </a>
      </div>
    </GameLayout>
  );
}

export default Friends;
