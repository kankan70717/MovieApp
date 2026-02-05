import { BASE_URL, options } from "./tmdb";

type SearchQuery = {
  type: string;
  keyword: string;
};

export const search = async (query: SearchQuery) => {

  const { type, keyword } = query;

  try {
    const response = await fetch(
      BASE_URL +
        `/search/${type}?query=${encodeURIComponent(keyword)}&language=en-US&page=1`,
      options,
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
  }
};
