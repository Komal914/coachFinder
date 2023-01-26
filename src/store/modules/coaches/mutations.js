export default {
  //add coach to database
  registerCoach(state, payload) {
    state.coaches.push(payload); //add new coach
  },
  //fetching over coaches from firebase
  setCoaches(state, payload) {
    state.coaches = payload;
  },
  //setting time for last fetch for coaches
  setFetchTimeStamp(state) {
    state.lastFetch = new Date().getTime();
  },
};
