import { useState, useEffect } from "react"

import { placeServiceFactory } from "../../services/placeService";

import Button from 'react-bootstrap/Button';
import Fade from 'react-bootstrap/Fade';

import "./Search.modules.css"

export const Search = ({
    found,
    getDataFromSearch,
}) => {

    const [value, setValue] = useState('');

    const [open, setOpen] = useState(false);

    // Get all place
    const [allPlaces, setAllPlaces] = useState([]);
    const allPlaceService = placeServiceFactory();
    useEffect(() => {
        allPlaceService.getAll()
            .then(result => {
                setAllPlaces(result)
            })
    }, [])
    // Get all place

    const onChange = (e) => {
        setValue(e.target.value);
    }

    const onSearch = (searchTerm, latLong) => {
        setValue(searchTerm);
    }

    // Send data to Section
    const ClickHandler = () => {
        getDataFromSearch(value)
    }
    // Send data to Section

    return (
        <>
            <button
                className="transitionButton"
                onClick={() => setOpen(!open)} >
                {
                    !open ?
                        <img src="../images/magnifying-glass.png" alt="Search" title="Search"></img>
                        :
                        <img src="../images/close.png" alt="Close" title="Close Search"></img>
                }
            </button>

            <div >
                <Fade in={open}>
                    <div id="example-fade-text">
                        <div className="search">
                            <div className="searchContainer">
                                <div className="search-inner">
                                    <input className="searchInput" type="search" value={value} onChange={onChange} />
                                    <Button className="searchBtn" variant="info" onClick={ClickHandler}>Search</Button>
                                </div>
                                <div className="dropdown">
                                    {allPlaces
                                        .filter(item => {
                                            const searchTerm = value.toLowerCase();
                                            const place = item.place.toLowerCase();

                                            return searchTerm && place.startsWith(searchTerm) && place !== searchTerm
                                            // Slice function give limit of the show results
                                        }).slice(0, 5)
                                        .map((item) => (
                                            <div
                                                onClick={() => onSearch(item.place)}
                                                className="dropdown-row"
                                                key={item.id}
                                            >
                                                <span className="spanFindPlace">{item.place}</span> {item.latitude_takes_off} {item.longitude_takes_off}
                                            </div>
                                        ))}
                                </div>
                                {/* Not Found */}
                                {!found &&
                                    < div className="notFoundField">
                                        <span className="spanNotFound">{value} Not Found</span>
                                    </div>
                                }
                                {/* Not Found */}
                            </div>
                        </div>
                    </div>
                </Fade >
            </div >
        </>
    )
}