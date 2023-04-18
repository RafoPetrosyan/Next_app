import React from 'react';
import useParams from "hooks/useParams";
import CustomCalendar from "views/Home/CustomCalendar";

const Events = () => {
    const params = useParams();
    console.log(params, 'events')
    return (
        <div>
            <CustomCalendar />
        </div>
    );
};

export default Events;
