import { createContext, useState, useEffect, useContext } from "react";

import { useNavigate } from 'react-router-dom';
import { placeServiceFactory } from '../services/placeService'

export const PlaceContext = createContext();

export const PlaceProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [places, setPlaces] = useState([]);
    const placeService = placeServiceFactory(); //auth.accessToken

    useEffect(() => {
        placeService.getAll()
            .then(result => {
                setPlaces(result)
            })
    }, []);
    
    const onCreatePlaceSubmit = async (data) => {
        const newPlace = await placeService.create(data);

        setPlaces(state => [...state, newPlace])

        navigate('/')
    };

    const onPlaceEditSubmit = async (values) => {
        const placeId = values.id
        
        const result = await placeService.edit(values.id, values);

        setPlaces(state => state.map(x => x.id === values.id ? result : x))

        navigate(`place-details/${placeId}`)
    };

    const deletePlace = (placeId) => {
        setPlaces(state => state.filter(place => place.id !== placeId))
    }

    const getPlace = (placeId) => {
        return places.find(place => place._id === placeId);
    };

    const constextValues = {
        places,
        onCreatePlaceSubmit,
        onPlaceEditSubmit,
        deletePlace,
        getPlace,
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