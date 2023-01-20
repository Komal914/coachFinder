export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    //checks if we have any coaches, returns true or false
    return state.coaches && state.coaches.length > 0;
  },
};
