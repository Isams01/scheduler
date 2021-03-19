import React from 'react';
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(res => {
      transition(SHOW);
    });
  }

  function deleteInterviewItem() {
    transition(DELETING);
    props.deleteInterview(props.id).then(res => {
      transition(EMPTY);
    });
  }

  function confirmDelete() {
    transition(CONFIRM);
  }





  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onEdit={() => {transition(EDIT)}}
          onDelete={confirmDelete}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() =>{back()}}
          onChange={() =>{console.log('change')}}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onSave={save}
          onCancel={() =>{back()}}
          onChange={() =>{console.log('change')}}
        />
      )}
      {mode === SAVING && (
        <Status message={"Saving"} />
      )}
      {mode === DELETING && (
        <Status message={"Deleting"} />
      )}
      {mode === CONFIRM && (
        <Confirm onCancel={() => back()} onConfirm={()=>{deleteInterviewItem()}} message={"Are you sure you would like to delete?"} />
      )}
    </article>
  )
  }
