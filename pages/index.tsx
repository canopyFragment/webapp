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

import { getArticles } from '../lib/database/crud/article'
import { Article } from '../lib/database/entities/article'

import Dashboard from './dashboard'
import { DashboardProps } from './dashboard'


export interface IArticle {
  title: string,
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
  // Fetch the last article directly from the database
  let articles = await getArticles()

  // if articles is empty, create a empty array
  let iarticles: IArticle[] = []
  if (!articles) {
    iarticles = []
  } else {
    // convert the articles to a simple array of IArticle
    iarticles = articles.map((article: Article) => {
      return {
        title: article.title,
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