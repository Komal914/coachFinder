export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    //checks if we have any coaches, returns true or false
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(_, getters, _2, rootGetters) {
    const coaches = getters.coaches; //all coaches
    const userId = rootGetters.userId; //usernow
    return coaches.some((coach) => coach.id === userId); //check if user is a coach
  },
};
