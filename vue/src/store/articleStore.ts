import { IArticleItem } from './Itype';

const STORAGE_KEY = 'ydc_articles';

function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function getArticles(): IArticleItem[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  }
  const defaultArticles: IArticleItem[] = [
    {
      id: '1',
      title: '锤子R1价格赶超苹果iPhoneX，顶配骁龙845+1T卖到8848元你入手吗',
      content: '',
      img: '../images/img-ad1.jpg',
      category1: '01',
      category2: '01',
      isPass: false,
      status: 'published',
      publishTime: '2018-05-15 23:37:33',
      tjCount: 10,
      ydCount: 100,
      fxCount: 9
    },
    {
      id: '2',
      title: '在国内为什么丰田阿尔法加价那么厉害还是会有人买？',
      content: '',
      img: '../images/img-ad2.jpg',
      category1: '01',
      category2: '01',
      isPass: true,
      status: 'published',
      publishTime: '2018-05-15 23:37:33',
      tjCount: 100,
      ydCount: 1000,
      fxCount: 90
    },
    {
      id: '3',
      title: '大号"思域"全新十代雅阁，革新换代后的全新十代雅阁到底如何！',
      content: '',
      img: '../images/img-ad3.jpg',
      category1: '01',
      category2: '01',
      isPass: true,
      status: 'published',
      publishTime: '2018-05-15 23:37:33',
      tjCount: 20,
      ydCount: 300,
      fxCount: 19
    }
  ];
  saveArticles(defaultArticles);
  return defaultArticles;
}

function saveArticles(articles: IArticleItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
}

function createArticle(
  title: string,
  content: string,
  img: string,
  category1: string,
  category2: string,
  status: 'published' | 'draft'
): IArticleItem {
  const article: IArticleItem = {
    id: generateId(),
    title,
    content,
    img,
    category1,
    category2,
    isPass: status === 'published',
    status,
    publishTime: formatDate(new Date()),
    tjCount: 0,
    ydCount: 0,
    fxCount: 0
  };
  const articles = getArticles();
  articles.unshift(article);
  saveArticles(articles);
  return article;
}

function getPublishedArticles(): IArticleItem[] {
  return getArticles().filter(a => a.status === 'published');
}

function getDraftArticles(): IArticleItem[] {
  return getArticles().filter(a => a.status === 'draft');
}

function getArticlesByPage(page: number, pageSize: number, status?: string): { articles: IArticleItem[], total: number } {
  let articles = getArticles();
  if (status === 'published') {
    articles = articles.filter(a => a.status === 'published');
  } else if (status === 'draft') {
    articles = articles.filter(a => a.status === 'draft');
  }
  const total = articles.length;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedArticles = articles.slice(startIndex, endIndex);
  return { articles: paginatedArticles, total };
}

export {
  getArticles,
  saveArticles,
  createArticle,
  getPublishedArticles,
  getDraftArticles,
  getArticlesByPage
};
