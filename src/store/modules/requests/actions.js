export default {
  async contactCoach(context, payload) {
    //object to send to store
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };

    //storing in database
    const response = await fetch(
      `https://coachfinder-fc75c-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to send');
      throw error;
    }

    //firebase gives you a property called name for id
    newRequest.id = responseData.name; //setting id

    //pass data to mutation
    context.commit('addRequest', newRequest);
  },
};
