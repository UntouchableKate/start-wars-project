const fetchSearchHero = searchQuery => {
  return fetch(
    `https://swapi.py4e.com/api/people/?search=${searchQuery}`,
  )
    .then(res => res.json())
    .then(data => {
      const {results} = data;
      return results;
    });
};

export default {fetchSearchHero};
