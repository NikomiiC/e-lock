import { useState, useEffect } from 'react';
import { Container, Button, Form, Table, Row, Col, Card } from 'react-bootstrap';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'; //npm install google-maps-react
import geocodePostalCode from './geocodePostalCode';

const GMaps = () => {
    const [postalCode, setPostalCode] = useState('');
    const [markerPosition, setMarkerPosition] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(14);
    const [nearbyLocations, setNearbyLocations] = useState([]);
    const sembawangMarkerPosition = { lat: 1.4491, lng: 103.8201 };

    const lockerMarkerPositions = [
        { lat: 1.4491, lng: 103.8201, name: 'Sembawang', address: 'Sembawang, Singapore' },
    ];
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance;
    };

    useEffect(() => {
    }, []);
    const handleSearch = async () => {
        try {
            const coordinates = await geocodePostalCode(postalCode);
            setMarkerPosition(coordinates);

            if (coordinates) {
                const nearbyLocationsDetails = lockerMarkerPositions.map(marker => {
                    const distance = calculateDistance(coordinates.lat, coordinates.lng, marker.lat, marker.lng);
                    return {
                        ...marker,
                        distance: distance
                    };
                });
                setNearbyLocations(nearbyLocationsDetails);
                setZoomLevel(14);
            }
        } catch (error) {
            console.error('Error geocoding:', error);
        }
    };

    const handleUseCurrentLocation = () => {
        setPostalCode('');
        setMarkerPosition({ lat: 0, lng: 0 });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setMarkerPosition({ lat: latitude, lng: longitude });

                },
                (error) => {
                    console.error('Error getting current location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    const handleCardClick = (position) => {
        setMarkerPosition(position);
    };

    return (
        <>
            <div className="Searchcontainer">
                <div className="row">
                    <div className="col-lg-12">
                        <input
                            id="search-box"
                            type="text"
                            className="form-control"
                            placeholder="Enter postal code"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                        />
                        <button className="btn btn-primary mt-3" onClick={handleSearch}>Search</button>
                        <button className="btn btn-secondary mt-3" onClick={handleUseCurrentLocation}>Or use your current location</button>
                        {markerPosition && (
                            <div>
                                <p>Number of nearby locations: {nearbyLocations.length}</p>
                                <div className="card-columns">
                                    {nearbyLocations.map((location, index) => (
                                        <div className="text p-4 p-xl-5 text-center">
                                            <div className="card" key={index} onClick={() => handleCardClick(location)}>
                                                <h5 className="mb-3"><a href="#" >
                                                    <div className="card-body">
                                                        <h5 className="card-title">{location.name}</h5>
                                                        <p className="card-text">{location.address}</p>
                                                        <p className="card-text">Distance: {location.distance} km</p>
                                                    </div>
                                                </a></h5>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <LoadScript
                            googleMapsApiKey="AIzaSyDqFZcUp6EG_JZNoY_yvWxLDrJP67tsNRo"
                        >
                            <GoogleMap
                                mapContainerStyle={{ width: '100%', height: '400px', marginTop: '20px' }}
                                center={markerPosition || { lat: 1.3521, lng: 103.8198 }}
                                zoom={14}
                            >
                                {markerPosition && <Marker position={markerPosition} />}
                                {lockerMarkerPositions.map((marker, index) => (
                                    <Marker key={index} position={marker} />
                                ))}
                            </GoogleMap>
                        </LoadScript>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GMaps;