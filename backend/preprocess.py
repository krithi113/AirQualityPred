import joblib
import numpy as np

def process_data(data):
    features = [data['temperature'], data['humidity'],data['pm25'], data['pm10'], 
                data['no2'],data['so2'], data['co'],data['proximityToIndustrialAreas'],
                data['populationDensity']] #['Temperature', 'Humidity', 'PM2.5', 'PM10', 'NO2', 'SO2', 'CO', 'Proximity_to_Industrial_Areas', 'Population_Density']
    
    features = [list(map(float, features))]
    
    loaded_scaler = joblib.load('./models/scaler.pkl')

    x_new_scaled = loaded_scaler.transform(features)

    return x_new_scaled

def process_features(sample):
    print(type(sample), sample.shape)
    temperatureHumidityInteration = sample[0][0]*sample[0][1]

    print(len(sample[0][2:7]))
    

    averagePollutants = sum(sample[0][2:7])/5

    preprocessedFeatures = np.array([sample[0][4], sample[0][6], sample[0][7], averagePollutants, temperatureHumidityInteration])

    return preprocessedFeatures

 

def make_predictions(inputSample):
    with open('./models/AirQuality.pkl', 'rb') as file:
        loaded_model = joblib.load(file)

    print(inputSample)

    #check_consistency()

    print(type(inputSample), len(inputSample))
    pred = loaded_model.predict(inputSample.reshape(1,-1))

    encoding = {'Good' : 1, 'Poor': 0}
    decoding = {1 : 'Good', 0: 'Poor'}

    print(pred)

    return decoding[pred[0]] #pred, score 