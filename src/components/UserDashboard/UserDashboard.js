// import * as React from "react";
// import PropTypes from "prop-types";
// import SwipeableViews from "react-swipeable-views";
// import { useTheme } from "@mui/material/styles";
// import AppBar from "@mui/material/AppBar";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import "./UserDashboard.css";
// import { useEffect } from "react";
// import { useCookies } from "react-cookie";
// import { useState } from "react";
// import Avatar from "@mui/material/Avatar";
// import Chip from "@mui/material/Chip";
// import Stack from "@mui/material/Stack";
// import { red } from "@mui/material/colors";

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`full-width-tabpanel-${index}`}
//       aria-labelledby={`full-width-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `full-width-tab-${index}`,
//     "aria-controls": `full-width-tabpanel-${index}`,
//   };
// }

// function UserDashboard() {
//   const [cookies, setCookie] = useCookies(["userId", "token"]);
//   const [user, setUser] = useState(null);
//   const theme = useTheme();
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const handleChangeIndex = (index) => {
//     setValue(index);
//   };

//   useEffect(() => {
//     const userFetch = async () => {
//       const res = await fetch("http://localhost:8000/user/me", {
//         headers: {
//           authorization: `Abhi ${
//             localStorage.getItem("token") || cookies.token
//           }`,
//         },
//       });
//       const data = await res.json();
//       setUser(data);
//     };
//     userFetch();
//   }, []);

//   return (
//     <div id="userdashboard" className="container">
//       <Stack direction="row" spacing={1}>
//         <Chip
//           avatar={<Avatar>{user?.user?.name.charAt(0)}</Avatar>}
//           variant="outlined"
//           label={user?.user?.name}
//         />
//         <Chip
//           label={user?.user?.email}
//           sx={{ bgcolor: "#212529", color: "#dee2e6" }}
//         />
//       </Stack>
//       <Box className="box" sx={{ bgcolor: "background.paper", width: "100%" }}>
//         <AppBar position="static">
//           <Tabs
//             value={value}
//             onChange={handleChange}
//             indicatorColor="secondary"
//             textColor="inherit"
//             variant="fullWidth"
//             aria-label="full width tabs example"
//           >
//             <Tab
//               label="Profile"
//               {...a11yProps(0)}
//               sx={{ bgcolor: "#343a40" }}
//             />
//             <Tab
//               label="My orders"
//               sx={{ bgcolor: "#343a40" }}
//               {...a11yProps(1)}
//             />
//             <Tab
//               label="Item Three"
//               sx={{ bgcolor: "#343a40" }}
//               {...a11yProps(2)}
//             />
//           </Tabs>
//         </AppBar>
//         <SwipeableViews
//           axis={theme.direction === "rtl" ? "x-reverse" : "x"}
//           index={value}
//           onChangeIndex={handleChangeIndex}
//         >
//           <TabPanel value={value} index={0} dir={theme.direction}>
//             Item One
//           </TabPanel>
//           <TabPanel value={value} index={1} dir={theme.direction}>
//             Item Two
//           </TabPanel>
//           <TabPanel value={value} index={2} dir={theme.direction}>
//             Item Three
//           </TabPanel>
//         </SwipeableViews>
//       </Box>
//     </div>
//   );
// }

// export default UserDashboard;

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
import { display, textAlign } from "@mui/system";

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
  }, []);

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
          height: 224,
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
          <Tab label="Orders" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
          <Tab label="Item Four" {...a11yProps(3)} />
          <Tab label="Item Five" {...a11yProps(4)} />
          <Tab label="Item Six" {...a11yProps(5)} />
          <Tab label="Item Seven" {...a11yProps(6)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
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
        </TabPanel>
      </Box>
    </div>
  );
};
