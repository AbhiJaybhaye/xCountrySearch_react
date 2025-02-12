import React, { useState, useEffect, useMemo } from "react";
import "./Country.css";

const Card = ({ image, title }) => {
  return (
    <div className="countryCard" data-testid="country-card">
      {image && <img src={image} alt={title} />}
      <p>{title}</p>
    </div>
  );
};

const Country = () => {
  const [searchData, setSearchData] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCountryList(data);
      } catch (error) {
        console.error("API Fetch Error:", error);
        setError("Failed to load countries. Please try again.");
      }
    };

    fetchCountries();
  }, []);

  const currentCountryList = useMemo(() => {
    const searchStr = searchData.toLowerCase();
    return countryList.filter((country) => 
      country.name?.common?.toLowerCase().includes(searchStr)
    );
  }, [searchData, countryList]);

  return (
    <div>
      <div className="inputDiv">
        <input
          type="text"
          value={searchData}
          placeholder="Search for countries"
          onChange={(e) => setSearchData(e.target.value)}
          data-testid="search-input"
        />
      </div>
      <hr />
      {error && <p className="error-message">{error}</p>}
      <div className="cardContainer">
        {currentCountryList.length > 0 ? (
          currentCountryList.map((country) => (
            <Card
              key={country.cca3} 
              title={country.name.common}
              image={country.flags?.png}
            />
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Country;
