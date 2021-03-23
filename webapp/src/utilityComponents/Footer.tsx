import React from "react";
import { useHistory } from "react-router-dom";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";
import { store } from "../app/store";
import { logoutThunk } from "../app/actions";

const Footer = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const history = useHistory();

  const logOut = () => {
    console.log(cookies);
    removeCookie("token", { path: "/" });
    removeCookie("userType", { path: "/" });
    store.dispatch(logoutThunk());
    history.push("/");
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <button
          className="LogoutButton"
          disabled={cookies["userType"] === undefined}
          onClick={logOut}
        >
          Logout
        </button>

        <div className="Copyrights">
          <span style={{ paddingRight: 5 }}>Copyright </span>
          <FontAwesomeIcon icon={faCopyright} />{" "}
          <span style={{ paddingLeft: 5 }}>
            {new Date().getFullYear()} SE2 Group B. All Rights Reserved.
          </span>
        </div>
        <a
          href="https://github.com/se2-2021-tue-16-okulewicz/Project-Group-B"
          target="_blank"
          className="Github"
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;