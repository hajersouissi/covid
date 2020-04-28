import {articles_url, _api_key, country_code} from '../config/rest_config';
import i18n from 'i18next';

export async function getArticles (category = 'health') {
  let lang = 'us';
  if (i18n.language == 'fr') {
    lang = 'fr';
  }

  try {
    let articles = await fetch (
      `${articles_url}?country=${lang}&category=${category}`,
      {
        headers: {
          'X-API-KEY': _api_key,
        },
      }
    );

    let result = await articles.json ();
    articles = null;

    return result.articles;
  } catch (error) {
    throw error;
  }
}
