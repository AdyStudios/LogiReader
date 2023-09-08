import React from "react";
import "../i18n";
import { Trans, useTranslation } from "react-i18next";
import flag_de from "../images/flags/de.svg";
import flag_gb from "../images/flags/gb.svg";
import flag_hu from "../images/flags/hu.svg";

const Navigation = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item has-text-weight-bold" href="/">
          LogiReader
        </a>
      </div>
      <div className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item has-dropdown is-hoverable">
            <span className="navbar-link">
              <span className="icon">
                <img
                  src={
                    i18n.language === "hu"
                      ? flag_hu
                      : i18n.language === "en"
                      ? flag_gb
                      : flag_de
                  }
                  alt=""
                />
              </span>{" "}
              &nbsp; <Trans i18nKey="lr.language" />
            </span>
            <div className="navbar-dropdown">
              <span
                className={`navbar-item ${
                  i18n.language === "hu" && "is-active"
                }`}
                onClick={() => changeLanguage("hu")}
              >
                <span className="icon">
                  <img src={flag_hu} alt="" />
                </span>{" "}
                &nbsp; Magyar
              </span>
              <span
                className={`navbar-item ${
                  i18n.language === "en" && "is-active"
                }`}
                onClick={() => changeLanguage("en")}
              >
                <span className="icon">
                  <img src={flag_gb} alt="" />
                </span>{" "}
                &nbsp; English
              </span>
              <span
                className={`navbar-item ${
                  i18n.language === "de" && "is-active"
                }`}
                onClick={() => changeLanguage("de")}
              >
                <span className="icon">
                  <img src={flag_de} alt="" />
                </span>{" "}
                &nbsp; Deutsch
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
