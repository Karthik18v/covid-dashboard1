import { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import Footer from "../Footer";
import Header from "../Header";
import Stats from "../Stats";
import "./index.css";

import statesList from "../StateList";

const Home = () => {
  const [stateWiseData, setStateWiseData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetails = async () => {
      const fetchedData = await fetch(
        "https://apis.ccbp.in/covid19-state-wise-data"
      );
      const response = await fetchedData.json();
      const data = convertObjectsDataIntoListItemsUsingForInMethod(response);
      setStateWiseData(data);
      setLoading(false);
    };

    getDetails();
  }, []);

  const convertObjectsDataIntoListItemsUsingForInMethod = (response) => {
    const resultList = [];
    const keyNames = Object.keys(response);
    keyNames.forEach((keyName) => {
      if (response[keyName]) {
        const { total } = response[keyName];
        const confirmed = total.confirmed || 0;
        const deceased = total.deceased || 0;
        const recovered = total.recovered || 0;
        const tested = total.tested || 0;
        const population = response[keyName].meta.population || 0;
        const stateMatch = statesList.find(
          (state) => state.state_code === keyName
        );
        const stateName = stateMatch ? stateMatch.state_name : "Unknown State";

        resultList.push({
          stateCode: keyName,
          stateName,
          confirmed,
          deceased,
          recovered,
          tested,
          population,
          active: confirmed - (deceased + recovered),
        });
      }
    });
    return resultList;
  };

  const totalConfirms = stateWiseData.reduce(
    (accumalator, eachState) => accumalator + eachState.confirmed,
    0
  );
  const totalDeceased = stateWiseData.reduce(
    (accumalator, eachState) => accumalator + eachState.deceased,
    0
  );
  const totalRecovered = stateWiseData.reduce(
    (accumalator, eachState) => accumalator + eachState.recovered,
    0
  );
  const totalActive = totalConfirms - totalRecovered;

  const caseDetails = [
    {
      id: 0,
      heading: "Confirmed",
      imageUrl: image1,
      number: totalConfirms,
      color: "#FF073A",
    },
    {
      id: 1,
      heading: "Active",
      imageUrl: image2,
      number: totalActive,
      color: "#007BFF",
    },
    {
      id: 2,
      heading: "Recovered",
      imageUrl: image3,
      number: totalRecovered,
      color: "#28A745",
    },
    {
      id: 3,
      heading: "Deceased",
      imageUrl: image4,
      number: totalDeceased,
      color: "#6C757D",
    },
  ];

  return (
    <div className="home-container">
      <Header />
      {!loading ? (
        <>
          <div className="main">
            <div className="search-bar">
              <IoSearch size="20" />
              <input
                className="search-input"
                type="text"
                placeholder="Enter state"
              />
            </div>
          </div>
          <Stats caseDetails={caseDetails} />
          <table
            border="1"
            style={{
              width: "956px",
              height: "2080px",
              textAlign: "left",
              marginLeft: "150px",
              borderRadius: "15px",
            }}
          >
            <thead>
              <tr>
                <th>States/UT</th>
                <th>Confirmed</th>
                <th>Active</th>
                <th>Recovered</th>
                <th>Deceased</th>
                <th>Population</th>
              </tr>
            </thead>
            <tbody>
              {stateWiseData.map((eachState) => (
                <tr className="table-row" key={eachState.stateCode}>
                  <td className="table-state-name">
                    <Link
                      to={`/state/${eachState.stateCode}`}
                      style={{
                        textDecoration: "none",
                        color: "white",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.textDecoration = "underline")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.textDecoration = "none")
                      }
                      title={`Click to view details of ${eachState.stateName}`}
                    >
                      {eachState.stateName}
                    </Link>
                  </td>
                  <td className="confirmed-cases">{eachState.confirmed}</td>
                  <td className="active-cases">{eachState.active}</td>
                  <td className="recovered-cases">{eachState.recovered}</td>
                  <td className="deceased-cases">{eachState.deceased}</td>
                  <td className="population">{eachState.population}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Footer />
        </>
      ) : (
        <div className="loader-container">
          <Oval color="white" height={50} width={50} />
        </div>
      )}
    </div>
  );
};

export default Home;
