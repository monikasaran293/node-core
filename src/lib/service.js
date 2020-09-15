export const StarWarsService = {
    fetchStarWarsData: (type, page=1, starwarsData = []) => {
        const url = `https://swapi.dev/api/${type}/?page=${page}`
        return new Promise((resolve, reject) => fetch(url)
            .then(response => {
                response.json().then(data => {
                    starwarsData = starwarsData.concat(data.results);
                    if (data.next) {
                        StarWarsService.fetchStarWarsData(type, ++page, starwarsData).then(resolve).catch(reject)
                    } else {
                        resolve(starwarsData);
                    }
                }).catch(reject);
            }).catch(reject));
    }
}