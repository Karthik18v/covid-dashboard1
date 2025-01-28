import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Importing useParams
import { Oval } from "react-loader-spinner";
import Header from "../Header";
import Footer from "../Footer";
import Stats from "../Stats";
import "./index.css";
import ChartData from "../ChartData/index";
import statesList from "../StateList";

const SpecificState = () => {
  const { stateCode } = useParams(); // Using useParams to get the stateCode from the URL
  const [stateName, setStateName] = useState("");
  const [totalConfirms, setTotalConfirms] = useState(0);
  const [totalActive, setTotalActive] = useState(0);
  const [totalDeceased, setTotalDeceased] = useState(0);
  const [totalRecovered, setTotalRecovered] = useState(0);
  const [totalTested, setTotalTested] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [activeTab, setActiveTab] = useState("confirmed");
  const [loading, setLoading] = useState(true);
  const [districtData, setDistrictData] = useState([]);

  useEffect(() => {
    const name = statesList.find(
      (state) => state.state_code === stateCode
    ).state_name;
    setStateName(name);
    getStateDetails(stateCode);
    getDateWiseCase(stateCode);
  }, [stateCode]);

  const getDateWiseCase = async (stateCode) => {
    const fetchedData = await fetch(
      `https://apis.ccbp.in/covid19-timelines-data/${stateCode}`
    );
    const response = await fetchedData.json();
    const dates = Object.keys(response[stateCode].dates);

    const totalDaysData = dates.map((each) => {
      const dailyData = response[stateCode].dates[each].total;
      return { data: each, value: dailyData };
    });

    setChartData(totalDaysData);
    setLoading(false);
  };

  const getStateDetails = async (stateCode) => {
    const fetchedData = await fetch(
      `https://apis.ccbp.in/covid19-state-wise-data`
    );
    const response = await fetchedData.json();
    const totalDistricts = response[stateCode].districts;
    const districtsNames = Object.keys(totalDistricts);
    const districtWiseData = districtsNames.map((each) => ({
      districtName: each,
      confirmed: response[stateCode].districts[each].total.confirmed,
      deceased: response[stateCode].districts[each].total.deceased,
      recovered: response[stateCode].districts[each].total.recovered,
      active:
        response[stateCode].districts[each].total.confirmed -
        response[stateCode].districts[each].total.deceased -
        response[stateCode].districts[each].total.recovered,
      tested: response[stateCode].districts[each].total.tested,
    }));

    const { confirmed, deceased, recovered, tested } =
      response[stateCode].total;
    const active = confirmed - recovered;
    setTotalConfirms(confirmed);
    setTotalActive(active);
    setTotalRecovered(recovered);
    setTotalDeceased(deceased);
    setTotalTested(tested);
    setDistrictData(districtWiseData);
  };

  const onChangeCategory = (category) => {
    setActiveTab(category.toLowerCase());
  };

  const caseDetails = [
    {
      id: 0,
      heading: "Confirmed",
      imageUrl: "https://i.imghippo.com/files/ZndV8710Oks.png",
      number: totalConfirms,
      color: "#FF073A",
    },
    {
      id: 1,
      heading: "Active",
      imageUrl: "https://i.imghippo.com/files/rCbe7377VU.png",
      number: totalActive,
      color: "#007BFF",
    },
    {
      id: 2,
      heading: "Recovered",
      imageUrl: "https://i.imghippo.com/files/OvUT8922ETc.png",
      number: totalRecovered,
      color: "#28A745",
    },
    {
      id: 3,
      heading: "Deceased",
      imageUrl: "https://i.imghippo.com/files/Sgro2647PC.png",
      number: totalDeceased,
      color: "#6C757D",
    },
  ];

  const sortedDistricts = districtData.sort(
    (a, b) => b[activeTab] - a[activeTab]
  );

  return (
    <>
      <Header />
      <div className="specific-state-container">
        {!loading ? (
          <>
            <div className="state-container">
              <div className="state-header-container">
                <div>
                  <h2 className="state-container-name">{stateName}</h2>
                  <p>Last update on march 28th 2021.</p>
                </div>
                <div>
                  <p>Tested</p>
                  <p>{totalTested}</p>
                </div>
              </div>
            </div>
            <Stats
              caseDetails={caseDetails}
              onChangeCategory={onChangeCategory}
              activeTab={activeTab}
            />
            <h1 className="district-heading">Top Districts</h1>
            <div className="top-districts-container">
              <ul className="top-districts">
                {sortedDistricts.map((each) => (
                  <li key={each.districtName} className="top-district-item">
                    <div className="district-item">
                      <p className="district-confirmed">
                        {each.confirmed || 0}
                      </p>
                      <p className="district-name">{each.districtName}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <ChartData activeTab={activeTab} chartData={chartData} />
            <Footer />
          </>
        ) : (
          <>
            <div className="loader-container">
              <div className="loader">
                <Oval color="white" height={50} width={50} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SpecificState;
