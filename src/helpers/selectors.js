// function selectUserByName(state, name) {
//   const filteredNames = state.users.filter(user => user.name === name);
//   return filteredNames;
// }

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