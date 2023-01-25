export default {
  registerCoach(state, payload) {
    state.coaches.push(payload); //add new coach
  },
  //passing over coaches from firebase
  setCoaches(state, payload) {
    state.coaches = payload;
  },
};
