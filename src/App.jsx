/**
 * @author Felix Waßmuth, Kara Ádám
 * @license MIT
 *
 * @version 1.0.0
 * @since 0.2.0
 * @function App
 * @returns {JSX.Element} The main page of the application.
 */

import React from "react";
import {useState}from "react";
import * as XLSX from "xlsx";
import "./i18n";
import { Trans, useTranslation } from "react-i18next";
//import Content from "./example.json";



function App() {



  const { i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
  
      setContent(parsedData);
      console.log(Content);
    };
  };
  //TODO: actually display tha data. I couldn't do that. You have to display for example parsedDataG[0].Data. If you get that you are king!



  return (
    <div className="App">
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
                <Trans i18nKey="lr.language" />
              </span>
              <div className="navbar-dropdown">
                <span
                  className="navbar-item"
                  onClick={() => changeLanguage("hu")}
                >
                  Magyar
                </span>
                <span
                  className="navbar-item"
                  onClick={() => changeLanguage("en")}
                >
                  English
                </span>
                <span
                  className="navbar-item"
                  onClick={() => changeLanguage("de")}
                >
                  Deutsch
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <section className="hero is-primary">
        <div className="hero-body">
          <p className="title">LogiReader</p>
          <p className="subtitle">
            <Trans i18nKey="lr.subtitle" />
          </p>
        </div>
      </section>
      {Content.length > 0 && (
      <div className="container is-fluid mt-5 mb-5">
        <div className="columns is-multiline">
          <div className="column has-equal-height">
            <div className="card">
              <div className="card-header">
                <p className="card-header-title">
                  <Trans i18nKey="lr.content.about" />
                </p>
              </div>
              <div className="card-content">
                <dl className="field" id="age">
                  <dt className="label">
                    <Trans i18nKey="lr.content.age" />
                  </dt>
                  <dd>{Content.age}</dd>
                </dl>
                <dl className="field" id="campType">
                  <dt className="label">
                    <Trans i18nKey="lr.content.campType" />
                  </dt>
                  <dd>{Content.campType}</dd>
                </dl>
                <dl className="field" id="favorite">
                  <dt className="label">
                    <Trans i18nKey="lr.content.favorite" />
                  </dt>
                  <dd>
                    {Content.openText.likeTheMost
                      ? Content.openText.likeTheMost
                      : Content.likedTheMost}
                  </dd>
                </dl>
                {Content.openText.myBiggestAchievement ? (
                  <dl className="field" id="myBiggestAchievement">
                    <dt className="label">
                      <Trans i18nKey="lr.content.biggestAchievement" />
                    </dt>
                    <dd>{Content.openText.myBiggestAchievement}</dd>
                  </dl>
                ) : null}
                <dl className="field" id="favoriteActivity">
                  <dt className="label">
                    <Trans i18nKey="lr.content.favoriteActivity" />
                  </dt>
                  <dd>{Content.favoriteLeasureActivity}</dd>
                </dl>
                <dl className="field" id="knowMyLogiscool">
                  <dt className="label">
                    <label className="label">
                      <Trans i18nKey="lr.content.knowMyLogiscool" />
                    </label>
                  </dt>
                  <dd>{Content.knowMyLogiscool}</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="card has-equal-height" id="qualities">
              <div className="card-header">
                <p className="card-header-title">
                  <Trans i18nKey="lr.content.attributes" />
                </p>
              </div>
              <div className="card-content">
                <dl className="field" id="trainerAttributes">
                  <dt className="label">
                    <Trans i18nKey="lr.content.trainerAttributes" />
                  </dt>
                  <dd>
                    <ul>
                      {Object.values(Content.trainerAttributes.attributes).map(
                        (value, index) => {
                          return <li key={index}>{value}</li>;
                        }
                      )}
                    </ul>
                  </dd>
                </dl>
                <dl className="field" id="leadTrainerAttributes">
                  <dt className="label">
                    <Trans i18nKey="lr.content.leadTrainerAttributes" />
                  </dt>
                  <dd>
                    <ul>
                      {Object.values(Content.campLeadAttributes.attributes).map(
                        (value, index) => {
                          return value === "strict" ? (
                            <li
                              key={index}
                              className="has-text-danger has-text-weight-bold"
                            >
                              {value}
                            </li>
                          ) : (
                            <li key={index}>{value}</li>
                          );
                        }
                      )}
                    </ul>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="card has-equal-height">
              <div className="card-header">
                <p className="card-header-title">
                  <Trans i18nKey="lr.content.qualities.title" />
                </p>
              </div>
              <div className="card-content">
                <dl className="field">
                  <dt className="label">
                    <Trans i18nKey="lr.content.qualities.friendly" />
                  </dt>
                  <progress
                    className={
                      Content.trainerQuality.friendly > 1
                        ? "progress is-success"
                        : "progress is-danger"
                    }
                    value={Content.trainerQuality.friendly}
                    max="5"
                  >
                    {Content.trainerQuality.friendly}
                  </progress>
                </dl>
                <dl className="field">
                  <dt className="label">
                    <Trans i18nKey="lr.content.qualities.clear" />
                  </dt>
                  <progress
                    className={
                      Content.trainerQuality.clear > 1
                        ? "progress is-success"
                        : "progress is-danger"
                    }
                    value={Content.trainerQuality.clear}
                    max="5"
                  >
                    {Content.trainerQuality.clear}
                  </progress>
                </dl>
                <dl className="field">
                  <dt className="label">
                    <Trans i18nKey="lr.content.qualities.helpfulness" />
                  </dt>
                  <progress
                    className={
                      Content.trainerQuality.helpful > 1
                        ? "progress is-success"
                        : "progress is-danger"
                    }
                    value={Content.trainerQuality.helpful}
                    max="5"
                  >
                    {Content.trainerQuality.helpful}
                  </progress>
                </dl>
                <dl className="field">
                  <dt className="label">
                    <Trans i18nKey="lr.content.qualities.entertaining" />
                  </dt>
                  <progress
                    className={
                      Content.trainerQuality.entertaining > 1
                        ? "progress is-success"
                        : "progress is-danger"
                    }
                    value={Content.trainerQuality.entertaining}
                    max="5"
                  >
                    {Content.trainerQuality.entertaining}
                  </progress>
                </dl>
                <dl className="field">
                  <dt className="label">
                    <Trans i18nKey="lr.content.qualities.coolness" />
                  </dt>
                  <progress
                    className={
                      Content.trainerQuality.cool > 1
                        ? "progress is-success"
                        : "progress is-danger"
                    }
                    value={Content.trainerQuality.cool}
                    max="5"
                  >
                    {Content.trainerQuality.cool}
                  </progress>
                </dl>
                <dl className="field">
                  <dt className="label">
                    <Trans i18nKey="lr.content.qualities.animatorSatisfaction" />
                  </dt>
                  <progress
                    className={
                      Content.animatorsSatisfaction > 1
                        ? "progress is-success"
                        : "progress is-danger"
                    }
                    value={Content.animatorsSatisfaction}
                    max="5"
                  >
                    {Content.animatorsSatisfaction}
                  </progress>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
      <input 
        type="file" 
        accept=".xlsx, .xls" 
        onChange={handleFileUpload} 
      />
    </div>
  );
}

export default App;
