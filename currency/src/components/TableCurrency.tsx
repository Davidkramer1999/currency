import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { format } from "date-fns";
import React from "react";
import { Currency } from "../App";

type CurrencyDropdownProps = {
  data: Currency[];
};

const TableCurrency: React.FC<CurrencyDropdownProps> = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Currency</TableCell>
            <TableCell align="right">Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length !== 0
            ? data.map((row: any) => (
                <TableRow key={row}>
                  <TableCell>{format(new Date(row?.date), "dd.MM.yyyy")}</TableCell>
                  <TableCell align="right">{row?.currency_code || ""}</TableCell>
                  <TableCell align="right">{row?.rate || ""}</TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableCurrency;
