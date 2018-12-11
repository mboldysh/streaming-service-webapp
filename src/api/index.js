import axios from 'axios';

// axios.defaults.baseURL = `http://streaming-service-2138331631.us-east-2.elb.amazonaws.com`;

const apify = axiosPromise =>
  new Promise((resolve, reject) =>
    axiosPromise.then(({ data }) => resolve(data)).catch(reject)
  );

export const fetchTrackList = () => apify(axios.get('api/v1/users/u1/tracks'));
export const getPresignUrl = trackName =>
  apify(axios.get(`api/v1/users/u1/tracks/${trackName}`));
export const deleteObject = trackName =>
  apify(axios.delete(`api/v1/users/u1/tracks/${trackName}`));
