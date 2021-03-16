import React from "react";
import classNames from 'classnames';
import "components/DayListItem.scss";

export default function DayListItem(props) {
  let listClass = classNames({
    "day-list__item":!(props.selected && props.spots === 0), 
    "day-list__item--selected": props.selected, 
    ".day-list__item--full": (props.spots === 0)
  })
  function formatSpots() {
    let spotsRemaining = ``;
    if(props.spots === 0) {
      spotsRemaining = `no spots remaining`;
    } else if (props.spots === 1) {
      spotsRemaining = `${props.spots} spot remaining`;
    } else {
      spotsRemaining = `${props.spots} spots remaining`;
    }
    return spotsRemaining;
  }
  
  return (
    <li onClick={ () => {props.setDay(props.name)} } className={listClass}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
