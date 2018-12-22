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

export const uploadFiles = files => {
  console.log(files);
  const uploaders = Array.from(files).map(file => {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return axios.post('api/v1/users/u1/tracks', formData, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    });
  });

  return apify(axios.all(uploaders));
};

export const downloadFile = url =>
  axios.get(url, {
    responseType: 'blob',
  });
