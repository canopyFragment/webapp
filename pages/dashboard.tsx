import * as React from 'react'
import { IArticle } from './index'
import {
  Text,
  Box,
  Flex,
  Spacer,
  Heading,
  Grid,
  GridItem
} from '@chakra-ui/react'
import { formatDate, currentDateToString, alternateColor } from '../lib/utils'


const ArticleRow: React.FC<IArticle> = (props) => {
  const { title, displayTitle, date, author, url, website } = props
  console.log(`article date: ${formatDate(date)} - current: ${formatDate(currentDateToString())}`)
  const textWeight = formatDate(date) === formatDate(currentDateToString()) ? "bold" : "normal"

  return (
    <Flex
      key={title}
      _hover={{ bg: "gray.100" }}
      fontWeight={textWeight}
      height="auto"
      borderColor={"gray.050"}
      borderBottomWidth={1}
    >
      <a href={url}>
        <Text fontSize={'smaller'} noOfLines={3} whiteSpace={"normal"} minW={0}>
          {title}
        </Text>
      </a>

      <Spacer />

      <Text ml={8}>{formatDate(date)}</Text>
      <Text ml={8}>{author === "NaN" ? "" : author}

      </Text>
    </Flex>
  )
}

export interface DashboardProps {
  articles: IArticle[][]
}

const Dashboard: React.FC<DashboardProps> = (props) => {
  return (
    <Grid templateColumns='repeat(1, 1fr)' gap={2}>
      {props.articles.map((articles, index) => {
        const websiteTitle = articles[0].displayTitle
        const bg = alternateColor(index) ? "gray.50" : "gray.200"

        return (
          <GridItem key={websiteTitle} m="auto" w='100%' bg={bg} borderRadius={4}>
            <Flex direction='column' p={4} boxShadow={"3px 3px 1px 0px #00000035;"}>
              <Flex borderBottomWidth={2} mb={8}>
                <Spacer />
                <Heading size={'lg'} my={8}>
                  {websiteTitle}
                </Heading>
                <Spacer />
              </Flex>
              {
                articles.map((article) => <ArticleRow key={article.title} {...article} />)
              }
            </Flex>
          </GridItem>
        )

      })
      }
    </Grid>
  )
}

export default Dashboard
