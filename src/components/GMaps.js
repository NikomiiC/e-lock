import { useState, useEffect, useContext, } from 'react';
import { Container, Card, Row, Col, Alert } from 'react-bootstrap';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'; //npm install google-maps-react
import geocodePostalCode from './geocodePostalCode';
import { useNavigate } from 'react-router-dom';
import geocodeAddress from './geocodeAddress';
import { Context as LocationContext } from '../context/LocationContext';



const GMaps = () => {
    const [postalCode, setPostalCode] = useState('');
    const [address, setAddress] = useState('');
    const [markerPosition, setMarkerPosition] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(14);
    const [isSearched, setSearchBoolean] = useState(false);
    const [allLocations, setAllLocations] = useState([]);
    const [nearbyLocations, setNearbyLocations] = useState([]);
    const navigate = useNavigate();


    const {
        state,
        getLocations, clearErrorMessage, addLocation, deleteLocation, getLocationById, updateLocation, getLocByLonLat
    } = useContext(LocationContext);

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = (parseFloat(lat2) - parseFloat(lat1)) * (Math.PI / 180);
        const dLon = (parseFloat(lon2) - parseFloat(lon1)) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance.toFixed(2);
    };

    function updateNearby(allLoc) {
        var updateList = [];
        for (let loc of allLoc) {
            if (parseFloat(loc.distance) <= 5) {
                updateList.push(loc);
            }
        }
        setNearbyLocations(updateList);
    }

    const viewLockers = (locInfo) => {
        localStorage.setItem('locationInfo', JSON.stringify(locInfo));
        // console.log(localStorage.getItem('locationInfo'))
        navigate('/locker-form');
    }


    const handleSearch = async () => {
        var coordinates = '';
        setSearchBoolean(true);
        try {
            if (address == "") {
                coordinates = await geocodePostalCode(postalCode);
            } else if (postalCode == "") {
                coordinates = await geocodeAddress(address);
            }

            setMarkerPosition(coordinates);

            if (coordinates) {

                if (state.result) {
                    const locationDetails = state.result.map(marker => {
                        const distance = calculateDistance(coordinates.lat, coordinates.lng, marker.loc.coordinates[1], marker.loc.coordinates[0]);
                        return {
                            ...marker,
                            distance: distance
                        };
                    });
                    setAllLocations(locationDetails);
                    updateNearby(allLocations);
                    setZoomLevel(14);
                    setAddress('');
                    setPostalCode('');
                    document.getElementById('search-box-postal').disabled = false;
                    document.getElementById('search-box-addr').disabled = false;
                } else {
                    alert("Locker locations not yet loaded");
                }

            }
        } catch (error) {
            console.error('Error geocoding:', error);
        }
    };

    const handleUseCurrentLocation = () => {
        setPostalCode('');
        setAddress('');
        setSearchBoolean(true);
        document.getElementById('search-box-postal').disabled = false;
        document.getElementById('search-box-addr').disabled = false;
        setMarkerPosition({ lat: 0, lng: 0 });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setMarkerPosition({ lat: latitude, lng: longitude });

                    if (state.result) {
                        const locationDetails = state.result.map(marker => {
                            const distance = calculateDistance(latitude, longitude, marker.loc.coordinates[1], marker.loc.coordinates[0]);
                            // console.log(marker)
                            return {
                                ...marker,
                                distance: distance
                            };


                        });
                        setAllLocations(locationDetails);
                        updateNearby(allLocations);
                    } else {
                        alert("Locker locations not yet loaded")
                    }

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
        // console.log(position);
        setMarkerPosition(position);
    };

    const disableAdd = (e) => {
        setPostalCode(e.target.value);
        if (postalCode == '') {
            document.getElementById('search-box-addr').disabled = true;
        } else {
            document.getElementById('search-box-addr').disabled = false;
        }
    }

    const disablePostal = (e) => {
        setAddress(e.target.value);
        if (address == '') {
            document.getElementById('search-box-postal').disabled = true;
        } else {
            document.getElementById('search-box-postal').disabled = false;
        }
    }

    async function getAllLockerLoc() {
        try {
            await getLocations();
        } catch (err) {
            console.error(`Error: ${err}`);
        }
    }


    useEffect(() => {
        getAllLockerLoc();
        if (isSearched) {
            updateNearby(allLocations);
        }
    }, [state.result], nearbyLocations);

    return (
        <>
            <Container className='headerComponentSpace'>
                <h1 className="text-light text-center">Rent Locker</h1>
                <div className="mt-5">
                    <div className="row flex-row">
                        <div className="col-lg-2 flex-column">
                            <input
                                id="search-box-postal"
                                type="text"
                                className="form-control col-items"
                                placeholder="Enter postal code"
                                value={postalCode}
                                onInput={disableAdd}
                            />
                        </div>

                        <div className="col-lg-5 flex-column">
                            <input
                                id="search-box-addr"
                                type="text"
                                className="form-control col-items"
                                placeholder="Enter address"
                                value={address}
                                onInput={disablePostal}
                            />
                        </div>
                        <div className="col-lg-2 flex-column"><button className="btn btn-info mapSearchBtn" onClick={handleSearch}>Search</button></div>
                        <div className="col-lg-3 flex-column"><button className="btn btn-info mapSearchBtn" onClick={handleUseCurrentLocation}>Use current location</button></div>
                    </div>

                    {isSearched ? (<h3 className='my-5 text-center'>Locker locations within 5km: <span className='text-success'>{nearbyLocations.length}</span></h3>)
                        : (<h3 className='my-5 text-center'>Start a search to find nearby lockers</h3>)}

                    <LoadScript
                        googleMapsApiKey="AIzaSyDqFZcUp6EG_JZNoY_yvWxLDrJP67tsNRo"
                    >
                        <GoogleMap
                            mapContainerStyle={{ width: '100%', height: '400px', marginTop: '20px' }}
                            center={markerPosition || { lat: 1.3521, lng: 103.8198 }}
                            zoom={14}
                        >
                            {markerPosition && <Marker position={markerPosition} />}
                            {isSearched ? (nearbyLocations.map((marker) => (
                                <Marker key={marker._id} position={{ lat: marker.loc.coordinates[1], lng: marker.loc.coordinates[0] }} />)))
                                : (<></>)
                            }
                        </GoogleMap>
                    </LoadScript>

                    {markerPosition && (
                        nearbyLocations ? (
                            <Container className='headerComponentSpace' id="locationCards">
                                <Row>
                                    {
                                        nearbyLocations.map((loc) => (
                                            <Col lg='4' md='6' sm='12'>
                                                <Card onClick={() => {viewLockers(loc)}} key={loc._id} className="mt-3 text-center" style={{cursor: "pointer"}}>
                                                    <Card.Title className='mt-3'>{loc.formatted_address}</Card.Title>
                                                    <Card.Body>
                                                        <h5 className="card-title">{loc.postcode}</h5>
                                                        <p className="card-text">Number of Lockers: {loc.locker_list.length}</p>
                                                        <p className="card-text">Distance: {loc.distance} km</p>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        ))
                                    }
                                </Row>
                            </Container>
                        ) : <Alert variant='danger'> Locker locations cannot be loaded! </Alert>
                    )}

                </div>
            </Container>
        </>
    )
}

export default GMaps;