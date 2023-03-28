// External imports
import React, { useEffect, useState } from "react";
import { Stack, Stepper, Step, StepLabel } from "@mui/material";
import { styled } from "@mui/material/styles";
import Check from "@mui/icons-material/Check";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PropTypes from "prop-types";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import "../assets/styles/dashboard.css";
import Header from "../components/Header.js";
import Forms from "../components/Form.js";

import { Card, Alert, Button, Typography, Badge } from "@mui/material";

// Stepper Component
const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "firebrick",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "firebrick",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};


const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

// functional component for dashboard page
function DashboardPage() {
  const steps = [
    {
      key: 0,
      value: "Share Location",
    },
    {
      key: 1,
      value: "Clock In",
    },
    {
      key: 2,
      value: "Working On",
    },
    {
      key: 3,
      value: "Clock Out",
    },
  ];

  const [activeStep, setActiveStep] = useState(1);
  const [skipped, setSkipped] = useState(new Set());

  const [countDown, setCountDown] = useState(60 * 5);
  const [displayAlert, setDisplayAlert] = useState(false);
  const [finalValues, setFinalValues] = useState();
  const [errorText, setErrorText] = useState("");
  const [requiredCount, setRequiredCount] = useState(3);

  useEffect(() => {
    let timerId;
    timerId = setInterval(() => {
      setCountDown((countDown) => countDown - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (countDown === 0) {
      window.location.reload(true);
    }
  }, [countDown]);

  const isStepOptional = (step) => {
    return step !== steps.length - 1 && step !== 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(1);
  };

  const formSubmit = () => {
    if (finalValues.brand === undefined) {
      setDisplayAlert(true);

      setErrorText("Please Select Brand !!");
    } else if (finalValues.salesType === undefined) {
      setDisplayAlert(true);

      setErrorText("Please Select Sales Type !!");
    } else if (finalValues.productType === undefined) {
      setDisplayAlert(true);

      setErrorText("Please Select Product Type !!");
    } else {
      console.log("formValues", finalValues);
      setErrorText("Unable to Submit Data !!");
      setDisplayAlert(true);
    }
  };

  const formValues = (
    branchCode,
    branchName,
    brand,
    salesType,
    productType
  ) => {
    let rCount = 0;
    if (brand === undefined) {
      rCount = rCount + 1;
    }
    if (salesType === undefined) {
      rCount = rCount + 1;
    }
    if (productType === undefined) {
      rCount = rCount + 1;
    }
    setRequiredCount(rCount);
    setFinalValues({
      branchCode: branchCode,
      branchName: branchName,
      brand: brand,
      salesType: salesType,
      productType: productType,
    });
  };

  return (
    <div className="page">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container columns={{ xs: 24, sm: 24, md: 24 }}>
          <Header />

          <Grid item xs={24} md={24}>
            <Card className="content-card" variant="outlined">
              <Grid container columns={{ xs: 24, sm: 24, md: 24 }}>
                <Grid item xs={12} md={12}>
                  <Badge badgeContent={requiredCount} className="badge-count">
                    <ErrorOutlineIcon />
                  </Badge>
                </Grid>
                <Grid item xs={12} md={12}>
                  <SettingsIcon
                    style={{ float: "right" }}
                    className="inner-settings"
                  />
                </Grid>
              </Grid>
              <form autoComplete="off">
                <Stack className="stepper-stack" spacing={4}>
                  <Stepper alternativeLabel activeStep={activeStep}>
                    {steps.map((label) => (
                      <Step key={label.value}>
                        <StepLabel
                          StepIconComponent={QontoStepIcon}
                          className="cursor-pointer"
                          onClick={() => {
                            setActiveStep(label.key);
                            setDisplayAlert(false);
                          }}
                        >
                          {label.value}
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Stack>

                <div className="timer">
                  After
                  <span className="countdown">
                    {("0" + Math.floor(countDown / 60)).slice(-2)}:
                    {(
                      "0" +
                      (countDown - Math.floor(countDown / 60) * 60)
                    ).slice(-2)}
                  </span>
                  This Page Will Be Refreshed
                </div>

                <Stack className="alert-stack" spacing={2}>
                  <Alert
                    style={{ display: displayAlert ? "block" : "none" }}
                    severity="error"
                  >
                    {errorText}{" "}
                    <span
                      onClick={() => {
                        setDisplayAlert(false);
                        setActiveStep(1);
                      }}
                      className="float-right cursor-pointer"
                    >
                      X
                    </span>
                  </Alert>
                </Stack>

                {activeStep === 1 && (
                  <>
                    <h2 className="form-title">Enter Clock In Information</h2>
                    <Forms formValues={formValues} />
                  </>
                )}

                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button onClick={handleReset}>Reset</Button>
                    </Box>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>
                      <Box sx={{ flex: "1 1 auto" }} />
                      {isStepOptional(activeStep) && (
                        <Button
                          color="inherit"
                          onClick={handleSkip}
                          sx={{ mr: 1 }}
                        >
                          Skip
                        </Button>
                      )}

                      {activeStep === steps.length - 1 ? (
                        <Button onClick={formSubmit} variant="outlined">
                          Finish
                        </Button>
                      ) : (
                        <Button onClick={handleNext}>Next</Button>
                      )}
                    </Box>
                  </React.Fragment>
                )}
              </form>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default DashboardPage;
