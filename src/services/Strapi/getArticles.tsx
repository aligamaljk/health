import axios from 'axios';
import { getLang } from '../user-storage';
import {
  ArticleBothLangIdsAfterFetechedType,
  ArticleType
} from '../../types/articleBlocksTypes';
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
  const res:
    | {
        articleData: ArticleType;
        articleIds: ArticleBothLangIdsAfterFetechedType;
      }
    | string
    | null = await axios
    .get(
      `${import.meta.env.VITE_STRAPI_BASE_URL}/api/articles/${id}?populate[coverPhoto][fields][0]=name&populate[coverPhoto][fields][1]=url&fields[0]=title&fields[1]=publishedAt&fields[2]=content&fields[3]=author`,
      {
        headers: {
          Authorization: import.meta.env.VITE_STRAPI_USER_TOKEN
        }
      }
    )
    .then(async (res) => {
      // console.log(res.data.data);
      if (
        !res.data.data ||
        !res.data.data.id ||
        typeof res.data.data.id !== 'number'
      ) {
        throw new Error("Article wasn't found");
      }
      const articleIds = await getBothArticleLangIds(
        res.data.data.id
      );
      return { articleData: res.data.data, articleIds: articleIds };
    })
    .catch((e) => {
      console.error(e.message);
      if (e.message === 'Request failed with status code 404') {
        throw new Error("Article wasn't found");
      }

      throw new Error(e.message);
      // return e.message;
    });

  return res;
}

export async function getBothArticleLangIds(articlePageId: number) {
  const requestUrlToGetEnId = `${import.meta.env.VITE_STRAPI_BASE_URL}/api/articles?filters[localizations][id][$eq]=${articlePageId}&fields[0]=id&populate[localizations][fields][1]=id`;
  const requestUrlToGetArId = `${import.meta.env.VITE_STRAPI_BASE_URL}/api/articles?filters[id][$eq]=${articlePageId}&fields[0]=id&populate[localizations][fields][1]=id`;
  const requestId =
    getLang() === 'en' ? requestUrlToGetArId : requestUrlToGetEnId;

  const res = await axios
    .get(requestId, {
      headers: {
        Authorization: import.meta.env.VITE_STRAPI_USER_TOKEN
      }
    })

    .then((res) => {
      // console.log(res.data.data, 'before');
      // console.log(requestId, 'before');
      if (
        !res.data.data[0] || // Check if res.data.data[0] is undefined
        typeof res.data.data[0].id !== 'number' ||
        !res.data.data[0].attributes.localizations.data[0] || // Check if res.data.data[0].attributes.localizations.data[0] is undefined
        typeof res.data.data[0].attributes.localizations.data[0]
          .id !== 'number'
      ) {
        throw new Error('The translated article was not found');
      }
      // console.log(res.data.data);
      // console.log(requestId);
      return res.data.data;
    })
    .catch((e) => {
      console.error(e.message);
      throw new Error(e.message);
      // return e.message;
    });
  // console.log('===res===');
  // console.log(res);
  return res;
}
