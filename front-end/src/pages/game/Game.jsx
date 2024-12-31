import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import Error500 from "../error/Error500";

import { getTGUser } from "../../utlis/tg";
import { setAuth } from "../../utlis/localstorage";

function Game() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ref = queryParams.get("tgWebAppStartParam");

  const [error, setError] = useState(false);
  const [isTg, setIsTg] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(function () {
    let unmounted = false;
    let tg_user = getTGUser();
    setIsTg(tg_user !== false);
    if (tg_user !== false) {
      tg_user["ref"] = ref;
      axios
        .post("/api/tg/auth/", tg_user)
        .then((res) => {
          var data = res.data;
          if (data.token) {
            
            if (setAuth(data.token)) {
              setIsLoading(false);
              navigate("/game/earn");
            } else {
              throw new Error("auth_token has not been set");
            }
          }
        })
        .catch((err) => {
          if (!unmounted) {
            setError(true);
            setIsLoading(false);
          }
        });
    } else {
      setIsLoading(false);
    }

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <>
      {isLoading === true && <h1 className="text-white">Loading</h1>}
      {isLoading === false && error === true && <Error500 />}
      {isLoading === false && error === false && isTg === false && (
        <h1 className="text-7xl text-white font-bold text-center">
          Please open in TG
        </h1>
      )}
    </>
  );
}

export default Game;
