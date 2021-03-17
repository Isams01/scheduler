import React, { useState } from "react";

import "components/Appointment"
import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment";

export default function Application(props) {
  const days = [
    {
      id: 1,
      name: "Monday",
      spots: 2,
    },
    {
      id: 2,
      name: "Tuesday",
      spots: 5,
    },
    {
      id: 3,
      name: "Wednesday",
      spots: 0,
    },
  ];

  const [day, setDay] = useState("Monday");

  const appointments = [
    {
      id: 1,
      time: "12pm",
    },
    {
      id: 2,
      time: "1pm",
      interview: {
        student: "Lydia Miller-Jones",
        interviewer: {
          id: 1,
          name: "Sylvia Palmer",
          avatar: "https://i.imgur.com/LpaY82x.png",
        }
      }
    },
    {
      id: 3,
      time: "2pm",
      interview: {
        student: "Alice the Cat",
        interviewer: {
          id: 1,
          name: "Sven Jones",
          avatar: "https://i.imgur.com/twYrpay.jpg",
        }
      }
    },
    {
      id: 4,
      time: "3pm",
      interview: {
        student: "Lydia Miller-Jones",
        interviewer: {
          id: 1,
          name: "Mildred Nazir",
          avatar: "https://i.imgur.com/T2WwVfS.png",
        }
      }
    },
    {
      id: 4,
      time: "4pm",
    }
  ];
  
  const appointmentsList = appointments.map(appointment => {
    return <Appointment key={appointment.id} {...appointment}/> 
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
          days={days}
          day={day}
          setDay={setDay}
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
