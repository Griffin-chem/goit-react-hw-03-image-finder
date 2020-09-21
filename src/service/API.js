const KEY = "17444544-23cadc231d8229819c84cd722";

export default function (request, page) {
    return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${request}&page=${page}&per_page=12&key=${KEY}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
      .then(response => {
        return response.json()
      })
      .catch(() => {
        return 'err'
      });
  }