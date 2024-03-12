import axios from 'axios';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDqFZcUp6EG_JZNoY_yvWxLDrJP67tsNRo';

const geocodePostalCode = async (postalCode) => {
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${postalCode}&key=${GOOGLE_MAPS_API_KEY}`);
        const data = response.data;

        if (data.status === 'OK') {
            const result = data.results[0];
            const { lat, lng } = result.geometry.location;
            return { lat, lng };
        } else {
            throw new Error('Geocoding failed');
        }
    } catch (error) {
        console.error('Error geocoding:', error);
        throw error;
    }
};

export default geocodePostalCode;
