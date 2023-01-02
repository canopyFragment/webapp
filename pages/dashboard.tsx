import * as React from 'react'
import { IArticle } from './index'
import Image from 'next/image'
import {
    Container,
    Text,
    Box,
    Flex,
    Spacer,
    Heading
  } from '@chakra-ui/react'

export interface DashboardProps {
    articles: IArticle[][]
}

const Dashboard: React.FC<DashboardProps> = (props) => {
  const tableStyle = {
    row: {
      hover: {
        bg: "gray.100",
      }  
    }
  }

  return (
    <Container maxW={["md", "xl", "2xl", "4xl"]} p={4}>
      <Flex>
        <Spacer />
        <Image src="/logo.png" alt="logo" width={128} height={128}/>
        <Spacer />
        <Heading as="h1" m={"auto"}>Canopy Fragment</Heading>
        <Spacer />
      </Flex>

      <Box mt={8} maxW={["md", "xl", "2xl", "4xl"]}> 
        {
          props.articles.map((articles) => {
            const websiteTitle = articles[0].displayTitle
            return (
              <Box key={websiteTitle} m="auto">
                <Heading as="h3" my={8}>{websiteTitle}</Heading>

                {
                  articles.map((article) => {
                    // If the article.date is the same as today, the article is new and the text is bold
                    const currentDate = new Date();
                    const dateString = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate();
                    const textWeight = article.date === dateString ? "bold" : "normal"

                    // Change the date from YY-MM-DDDD to DD/MM
                    const dateDisplay = article.date.split("-").slice(1).join("/")

                    return (
                      <Flex key={article.title} _hover={{bg: "gray.50"}} fontWeight={textWeight} height="auto" borderColor={"gray.050"} borderBottomWidth={1}>
                        <a href={article.url}>
                          <Text noOfLines={3} whiteSpace={"normal"} minW={0}>
                            {article.title}
                          </Text>
                        </a>

                        <Spacer />

                        <Text ml={8}>{dateDisplay}</Text>
                        <Text ml={8}>{article.author === "NaN" ? "" : article.author }

                        </Text>
                      </Flex>
                    )


                  })
                }
              </Box>
            )
          })
        }
      </Box>
    </Container>
  )
}

export default Dashboard
