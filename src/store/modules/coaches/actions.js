export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };
    //getting auth token from auth module
    const token = context.rootGetters.token;

    //firebase
    const response = await fetch(
      `https://coachfinder-fc75c-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=` +
        token,
      {
        method: 'PUT',
        body: JSON.stringify(coachData),
      }
    );

    //const responseData = await response.json();

    if (!response.ok) {
      //error
      const error = new Error(error.message || 'oops');
    }

    context.commit('registerCoach', {
      ...coachData,
      id: userId,
    });
  },

  //getting coaches in database
  async loadCoaches(context, payload) {
    //if we do not need to fetch yet (60 secs), return from func
    if (payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    //getting coaches
    const response = await fetch(
      `https://coachfinder-fc75c-default-rtdb.firebaseio.com/coaches.json`
    );

    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    const coaches = [];

    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      };
      coaches.push(coach);
    }
    context.commit('setCoaches', coaches);
    context.commit('setFetchTimeStamp');
  },
};
