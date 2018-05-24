import axios from 'axios';

const protocol = 'https';
const INSTA = `${ protocol }://api.instagram.com/v1`;
const serviceURLs = {
  SELF: `${ INSTA }/users/self`,
  SELF_RECENT_PUB: `${ INSTA }/users/self/media/recent`,
  SELF_FOLOWERS: `${ INSTA }/users/self/media/followed-by`,
  SELF_FOLLOWS: `${ INSTA }/users/self/media/follows`,

  USER: `${ INSTA }/users/%id%`,
};

export function getURL(service) {
  const { instagramToken } = window.sessionStorage;
  return `${ serviceURLs[service] }/?access_token=${ instagramToken }`;
}

export function getGontentType(data) {
  return (typeof data === 'object') ? 'application/json' : 'application/xml';
}

export function replaceUrlPlaceholders(url, parameters) {
  let tmp = url;
  if (typeof parameters !== 'undefined') {
    for (const key in parameters) { // eslint-disable-line
      tmp = tmp.replace(`%${ key }%`, parameters[key]);
    }
  }
  return tmp;
}

export function getData(service, parameters) {
  const url = replaceUrlPlaceholders(getURL(service), parameters);
  const contentType = 'application/json';

  return axios.get(url, {
    headers: {
      Accept: contentType,
    },
  }).then((response) => response.data);
}

export function postData(service, data, parameters) {
  const url = replaceUrlPlaceholders(getURL(service), parameters);
  const contentType = getGontentType(data);

  return axios.post(url, data, {
    headers: {
      'Content-Type': contentType,
      Accept: contentType,
    },
  }).then((response) => response.data);
}

export function putData(service, data, parameters) {
  const url = replaceUrlPlaceholders(getURL(service), parameters);
  const contentType = getGontentType(data);

  return axios.put(url, data, {
    headers: {
      'Content-Type': contentType,
      Accept: contentType,
    },
  }).then((response) => response.data);
}

export function patchData(service, data, parameters) {
  const url = replaceUrlPlaceholders(getURL(service), parameters);
  const contentType = getGontentType(data);

  return axios.patch(url, data, {
    headers: {
      'Content-Type': contentType,
      Accept: contentType,
    },
  }).then((response) => response.data);
}

export function deleteData(service, parameters) {
  const url = replaceUrlPlaceholders(getURL(service), parameters);
  const contentType = 'application/json';

  return axios.delete(url, {
    headers: {
      Accept: contentType,
    },
  }).then((response) => response.data);
}
