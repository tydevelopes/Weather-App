const API_KEY = "Olo0GOQlQwULhkG6iHijkuTGSf55IQqq";

export const getCity = async city => {
  const base = "https://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${API_KEY}&q=${city}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
};

export const getWeather = async cityKey => {
  const base = "https://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${cityKey}?apikey=${API_KEY}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
};
