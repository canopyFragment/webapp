import { Inter } from '@next/font/google'
import * as React from 'react'

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'

import { getArticles, getArticlesByWebsite } from '../lib/database/crud/article'
import { Article } from '../lib/database/entities/article'

import Dashboard from './dashboard'
import { DashboardProps } from './dashboard'


export interface IArticle {
  title: string,
  displayTitle: string,
  date: string,
  author: string,
  url: string,
  website: string,
}


export default function Home(props: DashboardProps) {
  return (
    <TableContainer>
      <Dashboard articles={props.articles} />
    </TableContainer>
  )
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getServerSideProps() {

  const websites = ["lesnumeriques", "generation-nt", "01net", "Korben", "developpez"]
  const displayTitle: Map<string, string> = new Map([
    ["lesnumeriques", "Les Numériques"],
    ["generation-nt", "Génération NT"],
    ["01net", "01net"],
    ["Korben", "Korben"],
    ["developpez", "Développez"],
  ])

  // For every website, fetch the 10 last articles
  let allArticles: any = []
  for (let i = 0; i < websites.length; i++) {
    const website = websites[i]
    let articles = await getArticlesByWebsite(website);

    if (!articles) {
      articles = []
    }

    allArticles = allArticles.concat(articles)
  }
  
  let iarticles: IArticle[] = []

  if (!allArticles) {
    iarticles = []

  } else {
    // convert the articles to a simple array of IArticle
    iarticles = allArticles.map((article: Article) => {
      return {
        title: article.title,
        displayTitle: displayTitle.get(article.website) || article.website,
        date: article.date,
        author: article.author,
        url: article.url,
        website: article.website
      }
    })
  }

  // Create a list of list of articles. One list for every website
  let articlesByWebsite: IArticle[][] = []
  for (let i = 0; i < iarticles.length; i++) {
    let article = iarticles[i]
    let website = article.website
    let index = articlesByWebsite.findIndex((a) => a[0].website === website)
    if (index === -1) {
      articlesByWebsite.push([article])
    } else {
      articlesByWebsite[index].push(article)
    }
  }

  // for every sublist, sort the articles by date
  articlesByWebsite = articlesByWebsite.map((articles) => {
    return articles.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  })

  return {
    props: {
      articles: articlesByWebsite,
    },
  }
}