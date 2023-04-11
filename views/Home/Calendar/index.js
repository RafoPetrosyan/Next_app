import React from 'react';
import { DatePicker } from 'antd';
import moment from "moment";
const { RangePicker } = DatePicker;


const CustomCell = (date) => {
    const dayOfWeek = moment(date['$d']).format('ddd');
    return (
        <div style={{borderRadius: '50%', border: '1px solid black', display: 'flex', flexDirection: 'column', width: 60, height: 60}}>
            <p>{dayOfWeek}</p>
            <p>{date.date()}</p>
        </div>
    )
}

const Calendar = () => {

    return (
        <div className='calendar'>
            <RangePicker
                open
                popupClassName='customCalendar'
                format={"YYYY-MM-DD HH:mm:ss"}
                cellRender={CustomCell}
            />
        </div>
    );
};

export default Calendar;
