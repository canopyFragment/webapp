import * as React from 'react'
import { IArticle } from './index'
import Image from 'next/image'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Container,
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
    <div>
      <Flex>
        <Image src="/logo.svg" alt="logo" width={128} height={128} />
        <Heading as="h1" m={"auto"}>Canopy Fragment</Heading>
        <Spacer />
      </Flex>

      <Box mt={8}></Box>
        {
          props.articles.map((articles) => {
            const websiteTitle = articles[0].website
            return (
              <Box key={websiteTitle} maxW={["md", "xl", "2xl", "4xl"]} m="auto">
                <Heading as="h3" mt={16}>{websiteTitle}</Heading>
                <Table variant='simple' size="sm">
                  {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                  <Tbody>
                    {
                      articles.map((article) => {
                        console.log(article)
                        return (
                          <Tr _hover={{bg: "gray.50"}} key={article.title}>
                            <Td>
                              <a href={article.url} target="_blank" rel="noreferrer">
                                {article.title}
                              </a>
                            </Td>
                            <Td>{article.date}</Td>
                            <Td>{article.author === "NaN" ? "" : article.author }</Td>
                          </Tr>
                        )
                      })
                    }
                  </Tbody>
                </Table>
              </Box>
            )
          })
        }
    </div>
  )
}

export default Dashboard