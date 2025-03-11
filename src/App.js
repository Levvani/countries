import React, { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [searchItem, setSearchItem] = useState('')
  const [fileteredCountries, setFilteredCountries] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
    if(data){
      const filteredItems = data.filter((item) => item.name.common.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredCountries(filteredItems);
    }
    
  }
  

  const fetchData = async () => {
    setLoading(true); // Set loading to true while fetching
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const json = await response.json();
      setData(json);
      setFilteredCountries(json) // Update state with the fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  return (
    <div className="App">
      <h1>API Request on Button Click</h1>
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Data'}
      </button>
      <br/>
      <input type='text' value={searchItem} onChange={handleInputChange} placeholder='Type to search'></input>
      
      {fileteredCountries && (
        <div>
          <h2>Fetched Data:</h2>
          
          <div className="countryGrid">
            {fileteredCountries.map((item, index) => (
              <li key={index} className="singleCountry">
                
                <img src={item.flags.svg} alt={`Flag of ${item.name.common}`} />
                <div class="country-name">{item.name.common}</div>
                <div class="country-description">
                  <strong>
                    Population:</strong> {item.population}
                </div>

                <div> <strong>Region:</strong> {item.region}</div>
              
                <div><strong>Capital:</strong> {item.capital}</div>
              </li>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;