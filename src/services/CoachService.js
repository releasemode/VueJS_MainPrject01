import axios from 'axios';
const baseurl = 'https://coachapp-14b2b-default-rtdb.firebaseio.com/';
export default {
  async getAllCoaches() {
    console.log('I am being called..');
    let coaches = [];
    await axios
      .get(`${baseurl}/coaches.json`)
      .then((res) => {
        var data = res.data;

        for (var docId in data) {
          coaches.push({
            id: 1,
            firstName: data[docId].firstName,
            lastName: data[docId].lastName,
            description: data[docId].description,
            hourlyRate: data[docId].hourlyRate,
            area: data[docId].areas,
          });
        }
        console.log('I am data inside service', coaches);
        return coaches;
      })
      .catch((err) => console.log('unable to access the firebase db..', err));
  },
};
