import axios from 'axios';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDqFZcUp6EG_JZNoY_yvWxLDrJP67tsNRo';

const geocodeAddress = async (address) => {
    try {
        var splitAddress = address.split(' ');
        var formattedAdd = '';
        for (let i = 0; i < splitAddress.length; i++) {
            if (i === splitAddress.length - 1) {
                formattedAdd += splitAddress[i] + '%';
            } else {
                formattedAdd += splitAddress[i];
            }
        }
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Singapore+${formattedAdd}&key=${GOOGLE_MAPS_API_KEY}`);
        const data = response.data;
        // console.log(response.data);

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

export default geocodeAddress;