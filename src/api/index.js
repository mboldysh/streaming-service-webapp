import axios from 'axios';

const apify = axiosPromise =>
  new Promise((resolve, reject) =>
    axiosPromise.then(({ data }) => resolve(data)).catch(reject)
  );

export const fetchTrackList = () => apify(axios.get('api/v1/users/u1/tracks'));
export const getPresignUrl = trackName =>
  apify(axios.get(`api/v1/users/u1/tracks/TapDance.mp3`));
