export default {
  //add to state requests array
  addRequest(state, payload) {
    state.requests.push(payload);
  },
  //set transformed data from firebase to local state array
  setRequests(state, payload) {
    state.requests = payload;
  },
};
