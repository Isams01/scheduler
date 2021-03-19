import React, { useState, useEffect } from "react";
import axios from 'axios';
import "components/Appointment"
import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from '../helpers/selectors'

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });



  useEffect(() => {
    const requests = {
      "GET_DAYS": "http://localhost:8001/api/days",
      "GET_APPOINTMENTS": "http://localhost:8001/api/appointments",
      "GET_INTERVIEWERS": "http://localhost:8001/api/interviewers"
    }
    const daysRequest = axios.get(requests.GET_DAYS);
    const appointmentsRequest = axios.get(requests.GET_APPOINTMENTS);
    const interviewsRequest = axios.get(requests.GET_INTERVIEWERS);
    axios.all([daysRequest, appointmentsRequest, interviewsRequest])
      .then(axios.spread((...responses) => {
        const days = responses[0].data;
        const appointments = responses[1].data;
        const interviewers = responses[2].data;

        setState(prev => ({...prev, days: days, appointments: appointments, interviewers: interviewers }));

        // setDays(days);
        // setAppointments(appointments)
      })
    );
  },[])
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const daysInterviewers = getInterviewersForDay(state, state.day);
  const appointmentsList = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    console.log(state);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={daysInterviewers}
      /> 
    )
  })

  appointmentsList.push(<Appointment key="last" time="5pm" />);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={day => setState({...state, day})}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentsList}
      </section>
    </main>
  );
}
