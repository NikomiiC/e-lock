import React, {useContext, useLayoutEffect, useState} from "react";
import {Context as LockerContext} from "../../context/LockerContext";
import {Button, ListGroup} from "react-bootstrap";
/*
todo: u can import components such as pop up or list items, this is just an example
import AddLockerPopup from "./popup/AddLockerPopup";
import LockerItem from "./LockerItem";
 */

const ManageLocker = () => {

    const [userInput, setUserInput] = useState();
    const [exercise, setExercise] = useState();
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [loadingPopup, setLoadingPopup] = useState(false);
    const {
        state,
        getLockers, clearErrorMessage, addLockers, deleteLockers, getLocker
    } = useContext(LockerContext);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);

    const startLoadingPopup = () => setLoadingPopup(true);
    const stopLoadingPopup = () => setLoadingPopup(false);

    useLayoutEffect(() => {

        async function makeRequest() {
            await getLockers();
        }

        makeRequest();
    }, []);

    return (
        <div>
            <div className="Body container h-100 w-75 ">
                <div className="row h-100 justify-content-center align-items-center"></div>
                <div style={{display: "flex"}}>
                    <Button style={{marginLeft: "auto"}} variant="dark" className="Add-Button" onClick={handleShow}>Add
                        Award</Button>
                </div>
                {/*<AddAwardPopup*/}
                {/*    errorMessage={state.errorMessage}*/}
                {/*    onSubmit={addAwards}*/}
                {/*    showModel={show}*/}
                {/*    onHide={handleClose}*/}
                {/*    onLoad={clearErrorMessage}*/}
                {/*    displayLoading={startLoadingPopup}*/}
                {/*    stopLoading={stopLoadingPopup}*/}
                {/*    loadingStatus={loadingPopup}*/}
                {/*    getAwards={getAwards}*/}
                {/*/>*/}
                <ListGroup>
                    {/*<AwardItem*/}
                    {/*    value={state.result}*/}
                    {/*    stopLoading={stopLoading}*/}
                    {/*    deleteAward={deleteAwards}*/}
                    {/*    errorMessage={state.errorMessage}*/}
                    {/*    onLoad={clearErrorMessage}*/}
                    {/*    displayLoading={startLoading}*/}
                    {/*    loadingStatus={loading}*/}
                    {/*    getAwards={getAwards}*/}
                    {/*/>*/}

                </ListGroup>
            </div>
            <div className="h-75 d-inline-block"></div>
        </div>
    )
};
const styles = {
    defaultImg: {
        height: '80px',
        width: '100px',
    },
    content: {
        height: '100%',
        width: '100%',
    },
    listBtn: {
        height: '60px',
        width: '100px',
        fontSize: '18px',
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '20px',
        display: 'inline-block',
    },
    searchBtn: {
        height: '60px',
        width: '100px',
        fontSize: '18px',
        fontWeight: 'bold',
    }

}
export default ManageLocker;