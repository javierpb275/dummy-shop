export const getQuery = (queryObject: any): string => {
  let counter = 0;
  let query = "?";
  let keys = Object.keys(queryObject);
  keys.forEach((key) => {
    counter++;
    query += `${key}=${queryObject[key]}`;
    if (counter < keys.length) {
      query += "&";
    }
  });
  return query;
};
