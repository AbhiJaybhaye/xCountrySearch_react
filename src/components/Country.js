import { useEffect, useState } from "react";
import "./Country.css"; // Ensure the correct path to CSS file exists

export default function CountrySearch() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    fetch("https://countries-search-data-prod-812920491762.asia-south1.run.app/countries")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data); 
        if (Array.isArray(data)) {
          const newData = data.map((country) => ({
            common: country.common, 
            png: country.png, 
            code: country.common, 
          }));
          setCountries(newData);
          setFilteredCountries(newData);
        } else {
          console.error("Invalid data format received:", data);
        }
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredCountries(countries);
    } else {
      setFilteredCountries(
        countries.filter(
          (country) => country.common && country.common.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, countries]);

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <div className="countries-grid">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div key={country.common} className="countryCard">
              <img
                src={country.png}
                alt={`Flag of ${country.common}`}
                className="flag"
              />
              <p className="country-name">{country.common}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No countries found</p>
        )}
      </div>
    </div>
  );
}
