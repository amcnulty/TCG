import axios from 'axios';

const localHost = (process.env.NODE_ENV === 'production') ? '' : 'http://localhost:3005';
const config = { withCredentials: true };
/**
 * The API utility makes api callouts simplified by not needing to worry about the endpoints.
 */
export const API = {
  getAllLocations: () => (
    axios.get(localHost + '/api/locations')
    .then(res => res.data)
    .catch(error => {
      console.log('from api: ', error);
      throw new Error(error);
    })
  ),

}
