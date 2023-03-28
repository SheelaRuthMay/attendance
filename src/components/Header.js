// External imports
import React from "react";

import Grid from "@mui/material/Unstable_Grid2";
import "../assets/styles/header.css";

import Card from "@mui/material/Card";
import SettingsIcon from "@mui/icons-material/Settings";

// functional component for header
function Header() {
  return (
    <Grid item xs={24} md={24}>
      <Card className="header-card" variant="outlined">
        <Grid
          container
          spacing={{ xs: 4, sm: 4, md: 4 }}
          columns={{ xs: 24, sm: 24, md: 24 }}
          style={{ padding: "15px 20px" }}
          alignItems="center"
        >
          <Grid item xs={16} md={10}>
            <p className="bread-crumb">User Dashboard / Attendance</p>
            <h3>Attendance</h3>
          </Grid>
          <Grid item xs={8} md={8} style={{ textAlign: "right" }}>
            <p className="pass">Set Password</p>
          </Grid>
          <Grid item xs={20} md={4} style={{ textAlign: "left" }}>
            <span className="logout top-right-text">LOGOUT</span>

            <span className="top-right-text">Hi, Mark </span>
          </Grid>
          <Grid item xs={4} md={2} style={{ textAlign: "center" }}>
            <span>
              <SettingsIcon className="header-icon" />
            </span>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

export default Header;
