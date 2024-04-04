import axios from 'axios';
// axios.defaults.baseURL = import.meta.env.VITE_STRAPI_BASE_URL;

export async function getArticles() {
  const res = await axios
    .get(
      `${import.meta.env.VITE_STRAPI_BASE_URL}/api/articles?fields[0]=title&fields[1]=description&populate[coverPhoto][fields][0]=name&populate[coverPhoto][fields][1]=url&populate[localizations][fields][0]=title&populate[localizations][fields][1]=description&populate[localizations][populate][coverPhoto][fields][0]=name&populate[localizations][populate][coverPhoto][fields][1]=url`,
      {
        headers: {
          Authorization: import.meta.env.VITE_STRAPI_USER_TOKEN
        }
      }
    )
    .then((res) => {
      // console.log(res.data.data);
      return res.data.data;
    })
    .catch((e) => {
      console.error(e.message);
      throw new Error(e.message);
    });

  return res;
}

export async function findArticle(id: number) {
  const res = await axios
    .get(
      `${import.meta.env.VITE_STRAPI_BASE_URL}/api/articles/${id}?populate[coverPhoto][fields][0]=name&populate[coverPhoto][fields][1]=url&fields[0]=title&fields[1]=publishedAt&fields[2]=content&fields[3]=author`,
      {
        headers: {
          Authorization: import.meta.env.VITE_STRAPI_USER_TOKEN
        }
      }
    )
    .then((res) => {
      // console.log(res.data.data);
      return res.data.data;
    })
    .catch((e) => {
      console.error(e.message);
      throw new Error(e.message);
    });
  return res;
}
