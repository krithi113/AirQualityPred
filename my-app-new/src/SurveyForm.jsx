import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Your CSS with animations, backgrounds, etc.
 
function SurveyForm() {
  const [page, setPage] = useState(1);
  //const [progressWidth, setProgressWidth] = useState('0%');
   
  // Final result
  const [resultStatus, setResultStatus] = useState('');
  const [resultDescription, setResultDescription] = useState('');
  const [resultEmoji, setResultEmoji] = useState('');
 
  // Background image (initially "paraplane.jpg")
  const [bgImage, setBgImage] = useState('paraplane.jpg');
 
  // Form data
  const [formData, setFormData] = useState({
    region: '',
    temperature: '',
    humidity: '',
    proximityToIndustrialAreas: '',
    populationDensity: '',
    pm25: '',
    pm10: '',
    co: '',
    so2: '',
    no2: ''
  });
 
  // ---- Handlers ----
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
 
  const nextPage = () => {
    setPage(2);
    //setProgressWidth('50%');
  };
 
  const previousPage = () => {
    setPage(1);
    //setProgressWidth('0%');
  };
 
  const handleReset = () => {
    setFormData({
      region: '',
      temperature: '',
      humidity: '',
      proximityToIndustrialAreas: '',
      populationDensity: '',
      pm25: '',
      pm10: '',
      co: '',
      so2: '',
      no2: ''
    });
    setPage(1);
  
    setResultStatus('');
    setResultDescription('');
    setResultEmoji('');
    setBgImage('paraplane.jpg');
  };
 
  // **Real API call** to Flask back end
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPage(3);
 
    try {
      // Replace with your actual Flask endpoint:
// e.g. 'http://127.0.0.1:5000/predict' or 'https://myflaskapp.com/predict'

      
        const response = await axios.post('https://airqualitypredict.onrender.com/predict', formData);
 
        // Expecting { prediction: "Good" } or { prediction: "Bad" }
        const { prediction } = response.data;
        setResultStatus(prediction);

        setTimeout(()=>{
   
        if (prediction.toLowerCase() === 'good') {
          setResultDescription('The air quality is good. Enjoy your day!');
          setResultEmoji('😊');
          setBgImage('good.jpg'); // background changes to good
          //setBgColor
         
        } else if (prediction.toLowerCase() === 'poor') {
          setResultDescription('The air quality is poor. Consider wearing a mask.');
          setResultEmoji('😷');
          setBgImage('poor.jpg');
        } else {
          // If server returns something else
          setResultDescription(`Server says: ${prediction}`);
          setResultEmoji('❓');
          setBgImage('paraplane.jpg');
        }
        setPage(4);
      }, 2000);


    } catch (error) {
      console.error('API call error:', error);
      setResultStatus('Error');
      setResultDescription('Unable to fetch results. Please try again.');
      setResultEmoji('❌');
      setBgImage('paraplane.jpg');
      setPage(4);
    } 
  };
 
  // ---- Rendering ----
  const pageStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    transition: 'background-image 0.5s'
  };
 
  return (
    <div className="bg_page" id="surveyContainer" style={pageStyle}>
      <div className="container">
        <h1>Know the Air You Breathe 😃</h1>
 
        {/* <div className="progress-bar">
          <div className="progress" style={{ width: progressWidth }}></div>
        </div> */}
 
        {page === 1 && (
          <div className="section animated fadeIn" id="page1">
            <h2>Air Prediction Survey</h2>
 
            <label htmlFor="region">Where are you from?</label>
            <input
              type="text"
              id="region"
              name="region"
              value={formData.region}
              onChange={handleInputChange}
              required
            />
 
            <label htmlFor="temperature">What's the temperature?</label>
            <input
              type="text"
              id="temperature"
              name="temperature"
              value={formData.temperature}
              onChange={handleInputChange}
              required
            />
 
            <label htmlFor="humidity">What's the humidity?</label>
            <input
              type="text"
              id="humidity"
              name="humidity"
              value={formData.humidity}
              onChange={handleInputChange}
              required
            />
 
            <label htmlFor="proximityToIndustrialAreas">
              Distance from the nearest industrial areas:
            </label>
            <input
              type="text"
              id="proximityToIndustrialAreas"
              name="proximityToIndustrialAreas"
              value={formData.proximityToIndustrialAreas}
              onChange={handleInputChange}
              required
            />
 
            <label htmlFor="populationDensity">
              Population density in your area?
            </label>
            <input
              type="text"
              id="populationDensity"
              name="populationDensity"
              value={formData.populationDensity}
              onChange={handleInputChange}
              required
            />
 
            <button type="button" onClick={nextPage}>
              Next
            </button>
          </div>
        )}
 
        {page === 2 && (
          <form onSubmit={handleSubmit} className="section animated fadeIn" id="page2">
            <h2>Air Prediction Survey</h2>
 
            <label htmlFor="pm25">Particulate Matter (PM2.5)</label>
            <input
              type="text"
              id="pm25"
              name="pm25"
              value={formData.pm25}
              onChange={handleInputChange}
              required
            />
 
            <label htmlFor="pm10">Particulate Matter (PM10)</label>
            <input
              type="text"
              id="pm10"
              name="pm10"
              value={formData.pm10}
              onChange={handleInputChange}
              required
            />
 
            <label htmlFor="co">Carbon Monoxide (CO)</label>
            <input
              type="text"
              id="co"
              name="co"
value={formData.co}
              onChange={handleInputChange}
              required
            />
 
            <label htmlFor="so2">Sulphur Dioxide (SO2)</label>
            <input
              type="text"
              id="so2"
              name="so2"
              value={formData.so2}
              onChange={handleInputChange}
              required
            />
 
            <label htmlFor="no2">Nitrogen Dioxide (NO2)</label>
            <input
              type="text"
              id="no2"
              name="no2"
              value={formData.no2}
              onChange={handleInputChange}
              required
            />
 
            <button type="submit">Submit</button>
            <button type="button" onClick={previousPage}>
              Back
            </button>
            <button type="reset" onClick={handleReset}>
              Reset
            </button>
          </form>
        )}
 
        {page === 3 && (
          <div className="section" id="resultsSection">
            <h2> Thank you so much for filling in the survey!</h2>
            <p>We will let you know the results shortly...</p>

            <div className='loader'></div>
            </div>

        )}

        {page === 4 &&(

              <div className="animated bounceIn" id="results" style={{ display: 'block' }}>
                <h3>Here you GO!</h3>
                <div id="resultBox" className={resultStatus === 'Good'? 'goodResult':'poorResult'}>
                  <p>
                    <span id="resultStatus">{resultStatus}</span>
                  </p>
                  <p id="resultDescription">{resultDescription}</p>
                  <div id="resultEmoji" style={{ fontSize: '2em', marginTop: '10px' }}>
                    {resultEmoji}
                  </div>
                </div>
                <br />
                <button type="button" onClick={handleReset}>
                  Restart
                </button>
              </div>
            )}
          
      </div>
    </div>
  );
}
 
export default SurveyForm;