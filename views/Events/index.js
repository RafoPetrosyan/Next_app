import React from 'react';
import useParams from "../../hooks/useParams";

const Events = () => {
    const params = useParams();
    console.log(params, 'events')
    return (
        <div>
            Events
        </div>
    );
};

export default Events;
