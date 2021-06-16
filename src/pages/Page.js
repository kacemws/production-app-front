import React, { useState, useEffect } from "react";

import PageTitle from "../components/Typography/PageTitle";
import {
  Button,
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Pagination,
} from "@windmill/react-ui";

function PageMarkup({ title, cta, bulkData, columns, rowClick }) {
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
  }, [index, bulkData]);

  return (
    <>
      <PageTitle>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{title}</span>
          {cta && <Button onClick={cta.onClick}>{cta.title}</Button>}
        </div>
      </PageTitle>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              {columns.map((column, i) => (
                <TableCell key={i}>{column.title}</TableCell>
              ))}
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((row, i) => (
              <TableRow
                key={i}
                className="cursor-pointer"
                onClick={(_) => {
                  rowClick(row);
                }}
              >
                {columns.map((column, i) => {
                  return (
                    <TableCell key={i}>
                      <span className="text-sm">{row[column.dataIndex]}</span>
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
