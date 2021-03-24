import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function getDay(state) {
    const currentDay = state.days.find(day => day.name===state.day)
    return currentDay;
  }

  useEffect(() => {
    const requests = {
      "GET_DAYS": "/api/days",
      "GET_APPOINTMENTS": "/api/appointments",
      "GET_INTERVIEWERS": "/api/interviewers"
    }
    const daysRequest = axios.get(requests.GET_DAYS);
    const appointmentsRequest = axios.get(requests.GET_APPOINTMENTS);
    const interviewsRequest = axios.get(requests.GET_INTERVIEWERS);
    Promise.all([daysRequest, appointmentsRequest, interviewsRequest])
      .then((responses) => {
        const days = responses[0].data;
        const appointments = responses[1].data;
        const interviewers = responses[2].data;
        setState(prev => ({...prev, days: days, appointments: appointments, interviewers: interviewers }));
      })
  },[])

  function bookInterview(id, interview, mode) {
    return new Promise ((resolve, reject) => {
    axios.put(`/api/appointments/${id}`, {interview}).then(res => {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      let day;
      let days;

      if(mode !== "EDIT") {
        day = {...getDay(state)};
        day['spots'] = day['spots'] - 1;
        days = [...state.days];
        days[days.findIndex(element => element.id === day.id)] = day; 
      } else {
        day = {...getDay(state)};
        days = [...state.days];
        days[days.findIndex(element => element.id === day.id)] = day;
      }
      
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      
      setState({
        ...state, 
        appointments,
        days
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
  
      const day = {...getDay(state)};
      day['spots'] = day['spots'] + 1;
      const days = [...state.days];
      days[days.findIndex(element => element.id === day.id)] = day; 

      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      
      setState({
        ...state, 
        appointments,
        days
      });
      resolve(res);
    })
    .catch(err => reject(err));
    });
  };


  return {state, setDay, bookInterview, deleteInterview}

}