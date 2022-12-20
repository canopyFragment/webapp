import { getAppDataSource } from "../data-source";
import { Article } from "../entities/article";


export interface IArticle {
    id: number;
    title: string;
    author: string;
    date: string;
}


const _exist = (v: any) => v !== undefined && v !== null;


export const createArticle = async (user: IArticle) => {
  getAppDataSource()
    .then(DataSource => {
      const newArticle = new Article();

      if (_exist(user.title)) newArticle.title = user.title;
      if (_exist(user.author)) newArticle.author = user.author;
      if (_exist(user.date)) newArticle.date = user.date;

      return DataSource.manager.save(newArticle);
    })
}


export const updateArticle = async (article: IArticle) => {
  const dataSource = await getAppDataSource()

    const _article = await dataSource.manager.findOne(Article, {where: {id: article.id}});

    // Check if the user exists
    if (!_article) {
        throw new Error(`Article with id ${article.id} does not exist`);
    }

    if (_exist(article.title)) _article.title = article.title;
    if (_exist(article.author)) _article.author = article.author;
    if (_exist(article.date)) _article.date = article.date;

    return dataSource.manager.save(_article);
}


// A function to fetch the last 10 articles
export const getArticles = async () => {
  const dataSource = await getAppDataSource()

  return dataSource.manager.find(Article, {take: 10});

}
