export default {
  contactCoach(context, payload) {
    //object to send to store
    const newRequest = {
      id: new Date().toISOString(),
      coachId: payload.coachId,
      userEmail: payload.email,
      message: payload.message,
    };
    //pass data to mutation
    context.commit('addRequest', newRequest);
  },
};
