import { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";
import Header from "../Header";
import "./index.css";

const About = () => {
  const [faqsData, setFaqsData] = useState([]);
  const [factoidsData, setFactoidsData] = useState([]);
  const [aboutLoader, setAboutLoader] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const apiUrl = "https://apis.ccbp.in/covid19-faqs";
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data);
      setFactoidsData(data.factoids);
      setFaqsData(data.faq);
      setAboutLoader(false);
    };

    getData();
  }, []);

  return (
    <div>
      <Header />
      {!aboutLoader ? (
        <div className="about-container">
          <h1>About</h1>
          <p className="update-date">Last update on March 28th, 2021.</p>
          <p className="sub-heading">
            COVID-19 vaccines be ready for distribution
          </p>
          <h3>FAQs</h3>
          {faqsData.map((each, index) => (
            <div key={index}>
              <p className="question">{each.question}</p>
              <p className="answer">{each.answer}</p>
            </div>
          ))}
          <h3>Factoids</h3>
          {factoidsData.map((each, index) => (
            <p key={index} className="question">
              {each.banner}
            </p>
          ))}
        </div>
      ) : (
        <div className="loader-container">
          <Oval color="white" height={50} width={50} />
        </div>
      )}
    </div>
  );
};

export default About;
