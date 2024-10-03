export function getUrl({page, count}) {
  if (page === undefined) {
    // Returns a random integer from 1 to 10:
    page = Math.floor(Math.random() * 10) + 1;
  };
  return `https://picsum.photos/v2/list?page=${page}&limit=${count}`;
}