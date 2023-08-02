import { createContext, useState, useEffect, useContext } from "react";

import { useNavigate } from 'react-router-dom';
import { placeServiceFactory } from '../services/placeService'

export const PlaceContext = createContext();

export const PlaceProvider = ({
    children,
}) => {

    // Try error
    const [errors, setErrors] = useState("")
    // Try error
    const navigate = useNavigate();
    const [places, setPlaces] = useState([]);
    const placeService = placeServiceFactory(); //auth.accessToken

    useEffect(() => {
        placeService.getAll()
            .then(result => {
                setPlaces(result)
            })
    }, []);

    const catchServerError = (error, message) => {
        if (error) {
            setErrors(message)
            setTimeout(() => {
                setErrors("");
            }, 3500);
        }
    }

    const onCreatePlaceSubmit = async (data) => {
        try {
            const newPlace = await placeService.create(data);
            setPlaces(state => [...state, newPlace]);
            navigate('/');
        } catch (error) {
            catchServerError(error, (<span>Something get wrong place check
                <br></br>
                if place already exist or try later!</span>));
        }
    };

    const onPlaceEditSubmit = async (values) => {
        try {
            const placeId = values.id
            const result = await placeService.edit(values.id, values);
            setPlaces(state => state.map(x => x.id === values.id ? result : x));
            navigate(`place-details/${placeId}/detail`);
        } catch (error) {
            catchServerError(error, (<span>Something get wrong place check
                <br></br>
                if place already exist or try later!</span>));
        }
    };

    const deletePlace = (placeId) => {
        try {
            setPlaces(state => state.filter(place => place.id !== placeId));
        } catch (error) {
            catchServerError(error, "Something get wrong please try to delete this place again later!");
        }
    }

    const getPlace = (placeId) => {
        return places.find(place => place.id === placeId);
    }

    const constextValues = {
        places,
        onCreatePlaceSubmit,
        onPlaceEditSubmit,
        deletePlace,
        getPlace,
        errors,
    };

    return (
        <PlaceContext.Provider value={constextValues}>
            {children}
        </PlaceContext.Provider>
    );
};

export const usePlaceContext = () => {
    const context = useContext(PlaceContext);

    return context;
};