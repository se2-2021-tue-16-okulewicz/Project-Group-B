import React from "react";
import { useHistory } from "react-router-dom";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const isLoggedIn = false;
  const history = useHistory();

  const logOut = () => {
    history.push("/");
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <button className="LogoutButton" disabled={!isLoggedIn} onClick={logOut}>
          Logout
        </button>

        <div className="Copyrights">
          <span style={{ paddingRight: 5 }}>Copyright </span>
          <FontAwesomeIcon icon={faCopyright} />{" "}
          <span style={{ paddingLeft: 5 }}>
            {new Date().getFullYear()} Ceeski Team. All Rights Reserved.
          </span>
        </div>
        <a
          href="https://github.com/orgs/ceeski/"
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