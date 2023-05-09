import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./UserDashboard.css";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { TrackOrder } from "./TrackOrder";
import { DeliveryDate } from "./DeliveryDate";

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export const UserDashboard = () => {
  const [value, setValue] = React.useState(0);
  const [cookies, setCookie] = useCookies(["userId", "token"]);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const userFetch = async () => {
      const res = await fetch("http://localhost:8000/user/me", {
        headers: {
          authorization: `Abhi ${
            localStorage.getItem("token") || cookies.token
          }`,
        },
      });
      const data = await res.json();

      setUser(data);
    };
    userFetch();

    const orderFetch = async () => {
      const res = await fetch("http://localhost:8000/user/me/myorders", {
        method: "POST",
        headers: {
          authorization: `Abhi ${
            localStorage.getItem("token") || cookies.token
          }`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: localStorage.getItem("user_id") || cookies.userId,
        }),
      });
      const data = await res.json();
      console.log(data);
      setOrders(data.orders);
    };
    orderFetch();
  }, []);
  console.log(orders);

  return (
    <div id="userdashboard">
      <div className="user">
        <div>
          <Avatar
            sx={{
              bgcolor: "#e5b3fe",
              color: "#10002b",
              width: 150,
              height: 150,
              fontSize: "5rem",
            }}
          >
            {user?.user?.name.charAt(0)}
          </Avatar>
          <div className="user-details">
            <Chip label={user?.user?.name} sx={{ fontSize: "1.3rem" }} />
            <div className="email">{user?.user?.email}</div>
            <div className="phone">9706469235</div>
            <div className="edit-profile" style={{ marginTop: "10px" }}>
              Edit <i className="fa-solid fa-user-pen"></i>
            </div>
          </div>
        </div>
        <h1>DashBoard</h1>
      </div>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: 500,
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label="My Orders" {...a11yProps(0)} />
          {/* <Tab label="In Cart" {...a11yProps(1)} />
          <Tab label="In Wish List" {...a11yProps(2)} />
          <Tab label="Item Four" {...a11yProps(3)} />
          <Tab label="Item Five" {...a11yProps(4)} />
          <Tab label="Item Six" {...a11yProps(5)} />
          <Tab label="Item Seven" {...a11yProps(6)} /> */}
        </Tabs>
        <TabPanel className="tabpanel" value={value} index={0}>
          {orders?.map((order, key) => (
            <TableContainer
              component={Paper}
              key={key}
              sx={{ marginTop: "10px" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Image</StyledTableCell>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Quantity</StyledTableCell>
                    <StyledTableCell>Amount</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.products.map((product, key) => (
                    <StyledTableRow key={key}>
                      <StyledTableCell>
                        <img
                          className="order-product-img"
                          src={product.productId.image[0].url}
                        ></img>
                      </StyledTableCell>
                      <StyledTableCell>
                        {product.productId.name}
                      </StyledTableCell>
                      <StyledTableCell>{product.quantity}</StyledTableCell>
                      <StyledTableCell>
                        <i className="fa-solid fa-indian-rupee-sign"></i>{" "}
                        {product.quantity * product.productId.price}
                      </StyledTableCell>
                      {/* <StyledTableCell>qqq</StyledTableCell> */}
                    </StyledTableRow>
                  ))}
                  <TableRow sx={{ bgcolor: "#e4d9ff", padding: "1rem" }}>
                    <TableCell sx={{ fontWeight: "600", fontSize: "1rem" }}>
                      <TrackOrder status={order.status} />
                    </TableCell>
                    <TableCell>
                      <DeliveryDate deliveryDate={order.deliveryDate} />
                    </TableCell>
                    <TableCell>
                      <Chip
                        avatar={
                          <Avatar>
                            <i
                              style={{ fontSize: "1.3rem", color: "green" }}
                              class="fa-solid fa-circle-check"
                            ></i>
                          </Avatar>
                        }
                        label="Payment"
                      />
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ))}
        </TabPanel>
        {/* <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel> */}
      </Box>
    </div>
  );
};
