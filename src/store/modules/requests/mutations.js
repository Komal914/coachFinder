export default {
  addRequest(state, payload) {
    //dds to state requests array
    state.requests.push(payload);
  },
};
