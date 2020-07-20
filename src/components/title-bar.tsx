import React from 'react';
import "../app/App.css";

interface IProps {
    dates: Date [];
}

export const TitleBar: React.FC<IProps> = ({dates}) => {

    const nameElements = dates.map(date => (<div className="date-string-in-title">{date.toDateString()}</div>));

    return (
        <div className="time-period-container dates-title-bar">
            <div className="date-titlebar-left-label">Habits:</div>
            {nameElements}
        </div>
        );
}