import React from 'react';
import 'components/InterviewerListItem.scss'
import classNames from 'classnames';

export default function InterviewerListItem(props) {
  const interviewerClass = classNames({
    "interviewers__item":!props.selected,
    "interviewers__item--selected": props.selected
  });

  return (
    <li id={props.id} onClick={props.setInterviewer} className={interviewerClass}>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
      {interviewerClass === "interviewers__item--selected" ? props.name : ""}
    </li>

  );
}