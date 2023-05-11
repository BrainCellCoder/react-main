import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import StarRating from "../ProductDetails/StarRating";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const Products = (props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Product ID</StyledTableCell>
            <StyledTableCell align="left">Image</StyledTableCell>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="left">Price&nbsp;(₹)</StyledTableCell>
            <StyledTableCell align="left">Ratings</StyledTableCell>
            {/* <StyledTableCell align="left">Protein&nbsp;(g)</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.products?.map((product, key) => (
            <StyledTableRow key={key}>
              <StyledTableCell>{product._id}</StyledTableCell>
              <StyledTableCell align="left">
                <img src={product.image[0].url} style={{ width: "100px" }} />
              </StyledTableCell>
              <StyledTableCell align="left">{product.name}</StyledTableCell>
              <StyledTableCell align="left">
                {new Intl.NumberFormat("en-IN", {
                  maximumSignificantDigits: 3,
                }).format(product.price)}
              </StyledTableCell>
              <StyledTableCell align="left">
                <StarRating rating={product.rating} />
              </StyledTableCell>
              {/* <StyledTableCell align="left"></StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
