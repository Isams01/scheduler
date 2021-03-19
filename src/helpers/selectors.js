function selectUserByName(state, name) {
  const filteredNames = state.users.filter(user => user.name === name);
  return filteredNames;
}

export function getAppointmentsForDay(state, day) {
  let daysAppointments = [];
  const currentDay = state.days.find(selectedDay => selectedDay.name === day);

  if (currentDay) {
    currentDay.appointments.forEach(appointment => {
      daysAppointments.push(state.appointments[appointment]);
    });
    return daysAppointments;
  } else {
    return [];
  };
};


// [
//   {
//       "id": 1,
//       "name": "Monday",
//       "appointments": [
//           1,
//           2,
//           3,
//           4,
//           5
//       ],
//       "interviewers": [
//           3,
//           4,
//           5,
//           6,
//           8
//       ],
//       "spots": 3
//   },
//   {
//       "id": 2,
//       "name": "Tuesday",
//       "appointments": [
//           6,
//           7,
//           8,
//           9,
//           10
//       ],
//       "interviewers": [
//           2,
//           3,
//           5,
//           9,
//           10
//       ],
//       "spots": 3
//   },
//   {
//       "id": 3,
//       "name": "Wednesday",
//       "appointments": [
//           11,
//           12,
//           13,
//           14,
//           15
//       ],
//       "interviewers": [
//           1,
//           2,
//           3,
//           8,
//           9
//       ],
//       "spots": 3
//   },
//   {
//       "id": 4,
//       "name": "Thursday",
//       "appointments": [
//           16,
//           17,
//           18,
//           19,
//           20
//       ],
//       "interviewers": [
//           1,
//           3,
//           5,
//           6,
//           7
//       ],
//       "spots": 2
//   },
//   {
//       "id": 5,
//       "name": "Friday",
//       "appointments": [
//           21,
//           22,
//           23,
//           24,
//           25
//       ],
//       "interviewers": [
//           3,
//           4,
//           5,
//           7,
//           8
//       ],
//       "spots": 4
//   }
// ]

const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
      interviewers: [1,2]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
      interviewers: [2]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: { student: "Archie Cohen", interviewer: 1 } },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  },
  interviewers: {
    "1": {  
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }
  }
};

export function getInterview(state, interview){
  if (interview) {
    return { 
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    };
  } else {
    return null;
  }
};


export function getInterviewersForDay(state, day) {
  let interviewers = [];
  const currentDay = state.days.find(selectedDay => selectedDay.name === day);
  if (currentDay) {
    currentDay.interviewers.forEach(interviewerId => {
      interviewers.push(state.interviewers[interviewerId]);
    });
  }
  return interviewers;
}