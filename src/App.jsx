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
import { useState } from 'react';
import * as XLSX from "xlsx";
import "./i18n";
import { Trans } from "react-i18next";
import "./components/Navigation";
import Navigation from "./components/Navigation";
//import Content from "./example.json";



function App() {

  const [content, setContent] = useState([]);
  const [bigContent, setBigContent] = useState([]);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

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
        UseContent(parsedData, firstRow);
        handleSetPage(firstRow);
        setFileUploaded(true);
      }
    };

    
  };

  function UseContent(read, pg){
      setBigContent(read);
      setContent(read[pg].Data);
    }

    const handleSetPage = (pg) => {
      setCurrentPage(pg)
    } 
    const handlePrevPage = () => {
      if (currentPage > 0) {
        setCurrentPage(currentPage - 1);
        UseContent(bigContent, currentPage);
      }
      console.log(currentPage);
    };
  
    const handleNextPage = () => {
      if (currentPage < content.length - 1) {
        setCurrentPage(currentPage + 1);
        UseContent(bigContent, currentPage);
      }
      console.log(currentPage);
    };

    const getCurrentPage = () => {
      return currentPage;
    }

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
          <p className="title">LogiReader</p>
          <p className="subtitle">
            <Trans i18nKey="lr.subtitle" />
          </p>
        </div>
      </section>
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
  if(obj === undefined) return null;
  const data = JSON.parse(obj);

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
                  {<dd>
                    {data.openText.likeTheMost
                      ? data.openText.likeTheMost
                      : data.likedTheMost}
                    </dd>}
                </dl>
                {data.openText.myBiggestAchievement ? (
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
                    <label className="label">
                      <Trans i18nKey="lr.content.knowMyLogiscool" />
                    </label>
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
                      {Object.values(data.trainerAttributes.attributes).map(
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
                      {Object.values(data.campLeadAttributes.attributes).map(
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
                      data.trainerQuality.friendly > 1
                        ? "progress is-success"
                        : "progress is-danger"
                    }
                    value={data.trainerQuality.friendly}
                    max="5"
                  >
                    {data.trainerQuality.friendly}
                  </progress>
                </dl>
                <dl className="field">
                  <dt className="label">
                    <Trans i18nKey="lr.content.qualities.clear" />
                  </dt>
                  <progress
                    className={
                      data.trainerQuality.clear > 1
                        ? "progress is-success"
                        : "progress is-danger"
                    }
                    value={data.trainerQuality.clear}
                    max="5"
                  >
                    {data.trainerQuality.clear}
                  </progress>
                </dl>
                <dl className="field">
                  <dt className="label">
                    <Trans i18nKey="lr.content.qualities.helpfulness" />
                  </dt>
                  <progress
                    className={
                      data.trainerQuality.helpful > 1
                        ? "progress is-success"
                        : "progress is-danger"
                    }
                    value={data.trainerQuality.helpful}
                    max="5"
                  >
                    {data.trainerQuality.helpful}
                  </progress>
                </dl>
                <dl className="field">
                  <dt className="label">
                    <Trans i18nKey="lr.content.qualities.entertaining" />
                  </dt>
                  <progress
                    className={
                      data.trainerQuality.entertaining > 1
                        ? "progress is-success"
                        : "progress is-danger"
                    }
                    value={data.trainerQuality.entertaining}
                    max="5"
                  >
                    {data.trainerQuality.entertaining}
                  </progress>
                </dl>
                <dl className="field">
                  <dt className="label">
                    <Trans i18nKey="lr.content.qualities.coolness" />
                  </dt>
                  <progress
                    className={
                      data.trainerQuality.cool > 1
                        ? "progress is-success"
                        : "progress is-danger"
                    }
                    value={data.trainerQuality.cool}
                    max="5"
                  >
                    {data.trainerQuality.cool}
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
