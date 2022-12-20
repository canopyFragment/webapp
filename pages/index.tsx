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
}


export default function Home(props: DashboardProps) {
  console.log("props -------------------")
  console.log(props)

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
  // trigger a article database reload, and wait for it to finish
  // const response = await fetch("http://localhost:8080/fetch/korben")
  // const data = await response.json()

  // // Create a new Article object from the data
  // const article: IArticle = {
  //   title: data.title,
  //   date: data.date,
  //   author: data.author
  // }


  // Fetch the last article directory from the database
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
        author: article.author
      }
    })
  }

  return {
    props: {
      articles: iarticles,
    },
  }
}