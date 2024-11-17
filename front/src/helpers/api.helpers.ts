export const getFakeApi = (data: any, error = false, delay = 2000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (error) reject();
      resolve(data);
    }, delay);
  });
};
