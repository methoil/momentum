import React from 'react';
import "../app/App.css";

interface IProps {
    dates: Date [];
}

export const TitleBar: React.FC<IProps> = ({dates}) => {

    const nameElements = dates.map(date => (<div>{date.toDateString()}</div>));

    return (
        <div className="time-period-container">
            <div>Habits:</div>
            {nameElements}
        </div>
        );
}