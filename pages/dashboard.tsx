import * as React from 'react'
import { IArticle } from './index'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
  } from '@chakra-ui/react'

export interface DashboardProps {
    articles: IArticle[]
}

const Dashboard: React.FC<DashboardProps> = (props) => {
    return (
      <div>
        <h1>Canopy Fragment</h1>
        <Table variant='simple'>
          {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>date</Th>
              <Th>author</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              props.articles.map((article) => {
                console.log(article)
                return (
                  <Tr key={article.title}>
                    <Td>{article.title}</Td>
                    <Td>{article.date}</Td>
                    <Td>{article.author}</Td>
                  </Tr>
                )
              })
            }
          </Tbody>
        </Table>
      </div>
    )
}

export default Dashboard