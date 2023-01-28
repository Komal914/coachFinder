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
    newRequest.id = responseData.name; //setting id to store in firebase
    newRequest.coachId = payload.coachId; //for local data

    //pass data to mutation
    context.commit('addRequest', newRequest);
  },

  //fetching all requests for current coach
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    //need token from firebase for user -> inside auth module
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://coachfinder-fc75c-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=` +
        token
    );

    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to fetch requests'
      );
      throw error;
    }
    console.log(responseData);

    //transform the data from firebase to the data object we use locally

    const requests = [];
    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
      };
      requests.push(request);
    }
    //passing the payload to our mutation
    context.commit('setRequests', requests);
  },
};
