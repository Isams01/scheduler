import React from 'react';
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  
  let dayList = props.days.map(dayItems => {
    return <DayListItem key={dayItems.id} name={dayItems.name} spots={dayItems.spots} selected={dayItems.name === props.day} setDay={props.setDay}  />
  })
  return (
     <ul>
       {dayList}
     </ul>
  );
}