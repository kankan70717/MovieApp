import { BASE_URL, options } from "./tmdb";

export const getMovieList = async (category: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${category}?language=en-US&page=1`,
      options,
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
  }
};

export const getMovieDetails = async (id: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}?language=en-US`,
      options,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
