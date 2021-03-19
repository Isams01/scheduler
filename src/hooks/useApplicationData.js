import { useState, useEffect } from 'react';
import axios from 'axios';

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

  function bookInterview(id, interview) {
    return new Promise ((resolve, reject) => {
    axios.put(`/api/appointments/${id}`, {interview}).then(res => {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
  
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      
      setState({
        ...state, 
        appointments
      });
      resolve(res);
    })
    .catch(err => reject(err));
    });
  };

  function setDay(day){
    setState({...state, day});
  }

  function deleteInterview(id) {
    return new Promise ((resolve, reject) => {
    axios.delete(`/api/appointments/${id}`).then(res => {
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
  
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      
      setState({
        ...state, 
        appointments
      });
      resolve(res);
    })
    .catch(err => reject(err));
    });
  };

  return {state, setDay, bookInterview, deleteInterview}

}