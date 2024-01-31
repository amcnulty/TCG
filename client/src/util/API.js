import axios from 'axios';

const localHost =
    process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3005';
const config = { withCredentials: true };
/**
 * The API utility makes api callouts simplified by not needing to worry about the endpoints.
 */
export const API = {
    /**
     * Gets all locations in the database.
     * @returns Promise that will resolve with the location data
     */
    getAllLocations: () =>
        axios
            .get(localHost + '/api/locations')
            .then((res) => res.data)
            .catch((error) => {
                console.log('from api: ', error);
                throw new Error(error);
            }),
    /**
     * Gets a single location document based on the given Url slug.
     * @param {String} slug Url slug for location record
     * @returns Promise that will resolve with the location data
     */
    getLocationBySlug: (slug) =>
        axios
            .get(localHost + `/api/location/${slug}`)
            .then((res) => res.data)
            .catch((error) => {
                console.log('from api: ', error);
                throw new Error(error);
            }),
    /**
     * Gets a preview of a location by the given id.
     * @param {String} id The Id of the preview record that was created.
     * @returns Promise that will resolve with the preview data
     */
    getPreviewLocation: (id) =>
        axios
            .get(localHost + `/api/location/preview/${id}`)
            .then((res) => res.data)
            .catch((error) => {
                console.log('from api: ', error);
                throw new Error(error);
            }),

    submitSeminarSignupForm: (formData) =>
        axios
            .post(localHost + `/api/seminar/sign-up`, formData)
            .then(console.log)
            .catch((error) => {
                console.log('from api: ', error);
                throw new Error(error);
            })
};
