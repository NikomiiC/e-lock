import { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'; //npm install google-maps-react
import geocodePostalCode from './geocodePostalCode';
import geocodeAddress from './geocodeAddress';
import { Context as LockerContext } from '../context/LockerContext';



const GMaps = () => {
    const [postalCode, setPostalCode] = useState('');
    const [address, setAddress] = useState('');
    const [markerPosition, setMarkerPosition] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(14);
    const [nearbyLocations, setNearbyLocations] = useState([]);
    const sembawangMarkerPosition = { lat: 1.4491, lng: 103.8201 };
    // const [lockers, setLockers] = useState([]);

    const {
        state,
        getLockers, clearErrorMessage, addLockers, deleteLockers, getLocker
    } = useContext(LockerContext);

    const lockerMarkerPositions = [
        { lat: 1.4491, lng: 103.8201, name: 'Sembawang', address: 'Sembawang, Singapore' }, // To include all the lat longs of all our locker locations from db
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
        return distance.toFixed(2);
    };

    // useEffect(() => {
    //     async function getAllLockers() {
    //         try {
    //             const lockerData = await getLockers();
    //             setLockers(lockerData);
    //         } catch (err) {
    //             console.error('Error fetching lockers:', err);
    //         }
    //     }
    //     getAllLockers();
    //     // console.log(lockers)
    // }, []); returns empty array



    const handleSearch = async () => {
        var coordinates = ''
        try {
            if (address == "") {
                coordinates = await geocodePostalCode(postalCode);
            } else if (postalCode == "") {
                coordinates = await geocodeAddress(address);
            }

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
                setAddress('');
                setPostalCode('');
            }
        } catch (error) {
            console.error('Error geocoding:', error);
        }
    };

    const handleUseCurrentLocation = () => {
        setPostalCode('');
        setAddress('');
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
        console.log(position);
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

    useEffect(() => {
        async function getAllLockers() {
            await getLockers()
        }
        getAllLockers();
        console.log("useEffect log: " + state.result);

        // console.log(lockers)
    }, []);

    if (!state.result) {
        return <>Loading lockers...</>
    }
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

                        {/*test*/}
                        <div>
                            {state.result ?

                                <div>{state.result[0].passcode}</div> : <div></div>}

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
                    <h3 className='my-5 text-center'>Locker locations nearby: {nearbyLocations.length}</h3>
                    <LoadScript
                        googleMapsApiKey="AIzaSyDqFZcUp6EG_JZNoY_yvWxLDrJP67tsNRo"
                    >
                        <GoogleMap
                            mapContainerStyle={{ width: '100%', height: '400px', marginTop: '20px' }}
                            center={markerPosition || { lat: 1.3521, lng: 103.8198 }}
                            zoom={14}
                            onLoad={handleUseCurrentLocation}
                        >
                            {markerPosition && <Marker position={markerPosition} />}
                            {lockerMarkerPositions.map((marker, index) => (
                                <Marker key={index} position={marker} />
                            ))}
                        </GoogleMap>
                    </LoadScript>

                    {markerPosition && (
                        <div>
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
                </div>
            </Container>

            {/* <Container className='headerComponentSpace'>
                {
                    lockers.map((locker, index) => (
                        <Card key={index}>
                            <Card.Body>
                                <h5 className="card-title">{locker.status}</h5>
                                <p className="card-text">{locker.size}</p>
                                <p className="card-text">Distance: {locker.location_id} km</p>
                            </Card.Body>
                        </Card>
                    ))
                }
            </Container> */}
        </>
    )
}

export default GMaps;