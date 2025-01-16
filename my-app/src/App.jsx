import React, { useState } from 'react';
import './App.css';
 
const App = () => {
  const [formData, setFormData] = useState({
    region: '',
    temperature: '',
    humidity: '',
    pm25: '',
    pm10: '',
    no2: '',
    so2: '',
    co: '',
    proximityToIndustrialAreas: '',
    populationDensity: '',
  });
  const [prediction, setPrediction] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPrediction('');
 
    if (!formData.region || isNaN(parseFloat(formData.temperature))) {
      setError('Please fill out all required fields with valid data.');
      return;
    }
 
    const data = {
      region: formData.region,
      temperature: parseFloat(formData.temperature) || 0,
      humidity: parseFloat(formData.humidity) || 0,
      pm25: parseFloat(formData.pm25) || 0,
      pm10: parseFloat(formData.pm10) || 0,
      no2: parseFloat(formData.no2) || 0,
      so2: parseFloat(formData.so2) || 0,
co: parseFloat(formData.co) || 0,
      proximityToIndustrialAreas: parseFloat(formData.proximityToIndustrialAreas) || 0,
      populationDensity: parseFloat(formData.populationDensity) || 0,
    };
 
    console.log("Data sent to backend:", data);
 
    setLoading(true);
    try {
const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
 
      const result = await response.json();
      if (response.ok) {
        setPrediction(result.prediction);
      } else {
        setError(result.error || 'An error occurred while fetching the prediction.');
      }
    } catch (err) {
      setError('Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className='container'>

<div style={{ padding: '20px' }}>
      <h1>Air Quality Prediction</h1>
      <form onSubmit={handleSubmit}>
  {/* Region Field */}
  <div>
    <label>Region:</label>
    <input
      type="text"
      name="region"
      value={formData.region}
      onChange={handleChange}
      required
    />
  </div>
 
  {/* Temperature Field */}
  <div>
    <label>Temperature:</label>
    <input
      type="number"
      step="0.1"
      name="temperature"
      value={formData.temperature}
      onChange={handleChange}
      required
    />
  </div>
 
  {/* Humidity Field */}
  <div>
    <label>Humidity:</label>
    <input
      type="number"
      step="0.1"
      name="humidity"
      value={formData.humidity}
      onChange={handleChange}
      required
    />
  </div>
 
  {/* PM2.5 Field */}
  <div>
    <label>PM2.5:</label>
    <input
      type="number"
      step="0.1"
      name="pm25"
      value={formData.pm25}
      onChange={handleChange}
      required
    />
  </div>
 
  {/* PM10 Field */}
  <div>
    <label>PM10:</label>
    <input
      type="number"
      step="0.1"
      name="pm10"
      value={formData.pm10}
      onChange={handleChange}
      required
    />
  </div>
 
  {/* NO2 Field */}
  <div>
    <label>NO2:</label>
    <input
      type="number"
      step="0.1"
      name="no2"
      value={formData.no2}
      onChange={handleChange}
      required
    />
  </div>
 
  {/* SO2 Field */}
  <div>
    <label>SO2:</label>
    <input
      type="number"
      step="0.1"
      name="so2"
      value={formData.so2}
      onChange={handleChange}
      required
    />
  </div>
 
  {/* CO Field */}
  <div>
    <label>CO:</label>
    <input
      type="number"
      step="0.1"
      name="co"
value={formData.co}
      onChange={handleChange}
      required
    />
  </div>
 
  {/* Proximity to Industrial Areas Field */}
  <div>
    <label>Proximity to Industrial Areas:</label>
    <input
      type="number"
      step="0.1"
      name="proximityToIndustrialAreas"
      value={formData.proximityToIndustrialAreas}
      onChange={handleChange}
      required
    />
  </div>
 
  {/* Population Density Field */}
  <div>
    <label>Population Density:</label>
    <input
      type="number"
      step="0.1"
      name="populationDensity"
      value={formData.populationDensity}
      onChange={handleChange}
      required
    />
  </div>
 
  {/* Submit Button */}
  <button type="submit" disabled={loading}>Predict</button>
</form>
    {loading && <p className="result">Loading...</p>}
    {prediction && <p className="result">Prediction: {prediction}</p>}
    {error && <p className="error">Error: {error}</p>}
    </div>

    </div>  

  );
};
 
export default App;