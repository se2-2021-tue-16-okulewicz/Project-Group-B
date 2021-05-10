import React from "react";
import { useHistory } from "react-router-dom";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";
import { store } from "../app/store";
import { logoutThunk } from "../app/actions";
import config from "../config/config";

const Footer = (props:any) => {
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();
  const history = useHistory();

  const logOut = () => {
    removeCookie(config.cookies.token, { path: "/" });
    removeCookie(config.cookies.userType, { path: "/" });
    removeCookie(config.cookies.userId, { path: "/" });
    store.dispatch(logoutThunk(cookies));
    history.push("/");
  };

  return (
    <footer className={props.position?props.position:"footer"}>
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
          rel="noreferrer"
          className="GithubFooter"
        >
          <FontAwesomeIcon icon={faGithub} size="2x" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
