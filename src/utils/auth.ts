export const hasAuthToken = () => {
  return Boolean(localStorage.getItem('accessToken'));
};
