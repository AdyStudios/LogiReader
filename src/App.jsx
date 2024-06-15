/**
 * @author Felix Waßmuth, Kara Ádám
 * @license MIT
 *
 * @version 1.0.0
 * @since 0.2.0
 * @function App
 * @returns {JSX.Element} The main page of the application.
 */

import React, { useState } from "react";
import * as XLSX from "xlsx";
import "./i18n";
import { Trans } from "react-i18next";
import "./components/Navigation";
import Navigation from "./components/Navigation";


import logo from "./logo.png";
import githubIcon from "./mark-github-24.svg";

function App() {

  const [content, setContent] = useState([]);
  const [bigContent, setBigContent] = useState([]);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [strictCount, setStrictCount] = useState(0);
  const [viewedPages, setViewedPages] = useState(new Set());
  const [isStrictCounterActive, setIsStrictCounterActive] = useState(false);

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      const firstRow = testForFirstDataRow(parsedData);
      if (firstRow === null) {
        console.log("No real data in file");
      } else {
        const jsonData = parsedData.map(row => {
          if (row.Data) {
            try {
              return JSON.parse(row.Data);
            } catch (e) {
              console.error("Invalid JSON data in row", row);
            }
          }
          return null;
        }).filter(row => row !== null);
        UseContent(jsonData, firstRow);
        handleSetPage(firstRow);
        setFileUploaded(true);
      }
    };
  };

  function UseContent(read, pg) {
    setBigContent(read);
    setContent(read[pg]);
    
    if (!viewedPages.has(pg)) {
      // Ensure attributes are in an array before using includes
      console.log(read[pg]?.campLeadAttributes?.attributes);
      const leadAttributes = read[pg]?.campLeadAttributes?.attributes;
      for(let key in leadAttributes) {
        if (leadAttributes[key] === "strict") {
          setStrictCount(prevCount => prevCount + 1);
        }
      }
      // Mark the page as viewed
      setViewedPages(prevPages => new Set(prevPages).add(pg));
    }
  }

  const handleSetPage = (pg) => {
    setCurrentPage(pg);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      UseContent(bigContent, currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < bigContent.length - 1) {
      setCurrentPage(currentPage + 1);
      UseContent(bigContent, currentPage + 1);
    }
  };

  const toggleStrictCounter = () => {
    setIsStrictCounterActive((prevState) => !prevState);
  };

  const getCurrentPage = () => {
    return currentPage;
  };

  function testForFirstDataRow(parsedData) {
    // Define a function to check if a row has readable data
    const hasReadableData = (row) => {
      // Check if any cell in the row contains data (you can adjust this condition as needed)
      return Object.values(row).some((cell) => cell !== null && cell !== undefined && cell !== "");
    };

    // Find the first row with readable data
    for (let i = 0; i < parsedData.length; i++) {
      if (hasReadableData(parsedData[i])) {
        return i; // Return the index of the first row with readable data
      }
    }

    // If no readable data is found, return null
    return null;
  }

  return (
    <div className="App">
      <Navigation />
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="logo-title-container">
          <img
              src={logo}
              alt="Logo"
              className="logo"
              style={{ maxWidth: "100px", marginRight: "10px" }} // Adjust the maxWidth and other styles as needed
            />
          <p className="title">LogiReader</p>
          <p className="subtitle">
            <Trans i18nKey="lr.subtitle" />
          </p>
          
          <p><Trans i18nKey="lr.madeby"/></p>
          <p>/sethome bohém productions</p>
          <p className="contributions"><br></br><Trans i18nKey="lr.thanks"/></p><p className="contributors">Felix - D1strict<br/>Sprik M.</p>
        </div>
        <a
          href="https://github.com/AdyStudios/LogiReader"
          target="_blank"
          rel="noopener noreferrer"
          className="button is-primary is-dark view-source-button"
        >
          <img src={githubIcon} alt="GitHub Icon" style={{ width: "24px" }} />
        </a>
        </div>
      </section>
      <div className="strict-counter">
        {isStrictCounterActive && <p>Strict Counter: {strictCount}</p>}
      </div>
      <div className="container">
        <button
          className={`button ${isStrictCounterActive ? 'is-danger' : 'is-primary'}`}
          onClick={toggleStrictCounter}
        >
          {isStrictCounterActive ? <Trans i18nKey="lr.deactivatestrict" /> : <Trans i18nKey="lr.activatestrict" />}
        </button>
      </div>
      <section className="pageSelect">
        <div className="container">
          <button
            className="button is-primary is-light is-outlined"
            onClick={handlePrevPage}
            disabled={currentPage === 0}
          >
            <Trans i18nKey="lr.prevpage" />
          </button>
          <button
            className="button is-primary is-light is-outlined"
            onClick={handleNextPage}
            disabled={currentPage === content.length - 1}
          >
            <Trans i18nKey="lr.nextpage" />
          </button>
        </div>
      </section>
      
      {fileUploaded ? (
        <DataDisplay obj={content} />
      ) : (
        <p>Upload an Excel file to see the data.</p>
      )}
      <input 
        type="file" 
        accept=".xlsx, .xls" 
        onChange={handleFileUpload} 
      />
    </div>
  );

  function DataDisplay({ obj }) {
    if (!obj) return null;

    const data = obj; // Directly use the object

    return (
      <div>
        <div className="pagenum">
          <p className="card-header-title">
            {getCurrentPage()}.<Trans i18nKey="lr.currentPage" />
          </p>
        </div>
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
                    <dd>{data.age}</dd>
                  </dl>
                  <dl className="field" id="campType">
                    <dt className="label">
                      <Trans i18nKey="lr.content.campType" />
                    </dt>
                    <dd>{data.campType}</dd>
                  </dl>
                  <dl className="field" id="favorite">
                    <dt className="label">
                      <Trans i18nKey="lr.content.favorite" />
                    </dt>
                    <dd>
                      {data.openText?.likeTheMost
                        ? data.openText.likeTheMost
                        : data.likedTheMost}
                    </dd>
                  </dl>
                  {data.openText?.myBiggestAchievement ? (
                    <dl className="field" id="myBiggestAchievement">
                      <dt className="label">
                        <Trans i18nKey="lr.content.biggestAchievement" />
                      </dt>
                      <dd>{data.openText.myBiggestAchievement}</dd>
                    </dl>
                  ) : null}
                  <dl className="field" id="favoriteActivity">
                    <dt className="label">
                      <Trans i18nKey="lr.content.favoriteActivity" />
                    </dt>
                    <dd>{data.favoriteLeasureActivity}</dd>
                  </dl>
                  <dl className="field" id="knowMyLogiscool">
                    <dt className="label">
                      <Trans i18nKey="lr.content.knowMyLogiscool" />
                    </dt>
                    <dd>{data.knowMyLogiscool}</dd>
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
                        {data.trainerAttributes?.attributes && Object.values(data.trainerAttributes.attributes).map(
                          (value, index) => (
                            <li key={index}>{value}</li>
                          )
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
                        {data.campLeadAttributes?.attributes && Object.values(data.campLeadAttributes.attributes).map(
                          (value, index) => (
                            value === "strict" ? (
                              <li
                                key={index}
                                className="has-text-danger has-text-weight-bold"
                              >
                                {value}
                              </li>
                            ) : (
                              <li key={index}>{value}</li>
                            )
                          )
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
                        data.trainerQuality?.friendly > 1
                          ? "progress is-success"
                          : "progress is-danger"
                      }
                      value={data.trainerQuality?.friendly}
                      max="5"
                    >
                      {data.trainerQuality?.friendly}
                    </progress>
                  </dl>
                  <dl className="field">
                    <dt className="label">
                      <Trans i18nKey="lr.content.qualities.clear" />
                    </dt>
                    <progress
                      className={
                        data.trainerQuality?.clear > 1
                          ? "progress is-success"
                          : "progress is-danger"
                      }
                      value={data.trainerQuality?.clear}
                      max="5"
                    >
                      {data.trainerQuality?.clear}
                    </progress>
                  </dl>
                  <dl className="field">
                    <dt className="label">
                      <Trans i18nKey="lr.content.qualities.helpfulness" />
                    </dt>
                    <progress
                      className={
                        data.trainerQuality?.helpful > 1
                          ? "progress is-success"
                          : "progress is-danger"
                      }
                      value={data.trainerQuality?.helpful}
                      max="5"
                    >
                      {data.trainerQuality?.helpful}
                    </progress>
                  </dl>
                  <dl className="field">
                    <dt className="label">
                      <Trans i18nKey="lr.content.qualities.entertaining" />
                    </dt>
                    <progress
                      className={
                        data.trainerQuality?.entertaining > 1
                          ? "progress is-success"
                          : "progress is-danger"
                      }
                      value={data.trainerQuality?.entertaining}
                      max="5"
                    >
                      {data.trainerQuality?.entertaining}
                    </progress>
                  </dl>
                  <dl className="field">
                    <dt className="label">
                      <Trans i18nKey="lr.content.qualities.coolness" />
                    </dt>
                    <progress
                      className={
                        data.trainerQuality?.cool > 1
                          ? "progress is-success"
                          : "progress is-danger"
                      }
                      value={data.trainerQuality?.cool}
                      max="5"
                    >
                      {data.trainerQuality?.cool}
                    </progress>
                  </dl>
                  <dl className="field">
                    <dt className="label">
                      <Trans i18nKey="lr.content.qualities.animatorSatisfaction" />
                    </dt>
                    <progress
                      className={
                        data.animatorsSatisfaction > 1
                          ? "progress is-success"
                          : "progress is-danger"
                      }
                      value={data.animatorsSatisfaction}
                      max="5"
                    >
                      {data.animatorsSatisfaction}
                    </progress>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
