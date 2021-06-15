import React, { useState, useEffect } from "react";

import PageTitle from "../components/Typography/PageTitle";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination,
} from "@windmill/react-ui";

function PageMarkup({ title, bulkData, columns }) {
  // setup pages control for every table
  const [index, setIndex] = useState(1);
  const [data, setData] = useState([]);

  // setup data for every table

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = data.length;

  // pagination change control
  function onPageChange(index) {
    setIndex(index);
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(
      bulkData.slice((index - 1) * resultsPerPage, index * resultsPerPage)
    );
  }, [index]);

  return (
    <>
      <PageTitle>{title}</PageTitle>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              {columns.map((column) => (
                <TableCell>column</TableCell>
              ))}
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i}>
                {columns.map((column) => {
                  return (
                    <TableCell>
                      <span className="text-sm">$ {row[column]}</span>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChange}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </>
  );
}

export default PageMarkup;
