import React, { useState, useEffect, useMemo } from "react";
import './Country.css'; 

const Card = ({ image, title }) => {
  return (
    <div className="countryCard">
      {image && <img src={image} alt={title} />} 
      <p>{title}</p>
    </div>
  );
};

const Country = () => {
  const [searchData, setSearchData] = useState("");
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setCountryList(data);
      })
      .catch((error) => console.error("Error :", error));
  }, []);

  const currentCountryList = useMemo(() => {
    const searchStr = searchData.toLowerCase();
    return countryList.filter((country) => {
      const commonName = country.name?.common;
      return commonName && commonName.toLowerCase().includes(searchStr);
    });
  }, [searchData, countryList]);

  function handleChange(e) {
    setSearchData(e.target.value);
  }

  return (
    <div>
      <div className="inputDiv">
        <input
          type="text"
          value={searchData}
          placeholder="Search for countries"
          onChange={handleChange}
        />
      </div>
      <hr />
      <div className="cardContainer">
        {currentCountryList.map((country) => { 
          return (
            <Card
              key={country.name.common} 
              title={country.name.common}
              image={country.flags.png} 
            />
          );
        })}
      </div>
    </div>
  );
};

export default Country;