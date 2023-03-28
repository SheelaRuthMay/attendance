// External imports
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import "../assets/styles/form.css";
import { Input, MenuItem, FormControl, Select } from "@mui/material";

// functional component for form
function Forms({ formValues }) {
  const bCode = [
    {
      label: "ABC 111",
      value: "ABC 111",
      branchName: "Branch Name 1",
    },
    {
      label: "ABC 222",
      value: "ABC 222",
      branchName: "Branch Name 2",
    },
    {
      label: "ABC 333",
      value: "ABC 333",
      branchName: "Branch Name 3",
    },
  ];

  const brandOptions = [
    {
      label: "XYZ 111",
      value: "XYZ 111",
    },
    {
      label: "XYZ 222",
      value: "XYZ 222",
    },
    {
      label: "XYZ 333",
      value: "XYZ 333",
    },
  ];

  const salesTypeOptions = [
    {
      label: "Sales Type 1",
      value: "Sales Type 1",
    },
    {
      label: "Sales Type 2",
      value: "Sales Type 2",
    },
    {
      label: "Sales Type 3",
      value: "Sales Type 3",
    },
  ];

  const productTypeOptions = [
    {
      label: "Product Type 1",
      value: "Product Type 1",
    },
    {
      label: "Product Type 2",
      value: "Product Type 2",
    },
    {
      label: "Product Type 3",
      value: "Product Type 3",
    },
  ];

  const [branchCode, setBranchCode] = useState();
  const [branchName, setBranchName] = useState();
  const [brand, setBrand] = useState();
  const [salesType, setSalesType] = useState();
  const [productType, setProductType] = useState();

  useEffect(() => {
    formValues(branchCode, branchName, brand, salesType, productType);
    // eslint-disable-next-line
  }, [branchCode, branchName, brand, salesType, productType]);

  const branchChange = (event, val1, val2) => {
    setBranchCode(val1);
    setBranchName(val2);
  };

  const brandChange = (event, val) => {
    setBrand(val);
  };

  const salesTypeChange = (event, val) => {
    setSalesType(val);
  };

  const productTypeChange = (event, val) => {
    setProductType(val);
  };

  return (
    <Grid
      container
      className="form"
      columns={{ xs: 24, sm: 24, md: 24 }}
      spacing={{ xs: 2, sm: 2, md: 2 }}
    >
      <Grid item xs={24} md={12}>
        <FormControl fullWidth>
          <label>Branch Code</label>
          <Select
            labelId="demo-simple-select-label"
            className="form-select"
            placeholder="Branch Code"
            id="demo-simple-select"
            value={branchCode ? branchCode : "0"}
            label="branchCode"
          >
            {!branchCode && (
              <MenuItem disabled value="0">
                Select Branch Code
              </MenuItem>
            )}
            {bCode &&
              bCode.map((item) => (
                <MenuItem
                  value={item.value}
                  onClick={(event) =>
                    branchChange(event, item.value, item.branchName)
                  }
                >
                  {item.label}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={24} md={12}>
        <FormControl fullWidth>
          <label>Branch Name</label>
          <Input
            className="form-input"
            value={branchName}
            disabled
            placeholder="Store Name"
          />
        </FormControl>
      </Grid>
      <Grid item xs={24} md={24}>
        <FormControl fullWidth>
          <label>
            Brand <b className="required-star">*</b>
          </label>
          <Select
            labelId="demo-simple-select-label"
            className="form-select"
            id="demo-simple-select"
            required
            value={brand ? brand : "0"}
            label="brand"
          >
            {!brand && (
              <MenuItem disabled value="0">
                Select Brand
              </MenuItem>
            )}
            {brandOptions &&
              brandOptions.map((item) => (
                <MenuItem
                  value={item.value}
                  onClick={(event) => brandChange(event, item.value)}
                >
                  {item.label}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={24} md={24}>
        <FormControl fullWidth>
          <label>
            Sales Type <b className="required-star">*</b>
          </label>
          <Select
            labelId="demo-simple-select-label"
            className="form-select"
            id="demo-simple-select"
            required
            value={salesType ? salesType : "0"}
            label="salesType"
          >
            {!salesType && (
              <MenuItem disabled value="0">
                Select Sales Type
              </MenuItem>
            )}
            {salesTypeOptions &&
              salesTypeOptions.map((item) => (
                <MenuItem
                  value={item.value}
                  onClick={(event) => salesTypeChange(event, item.value)}
                >
                  {item.label}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={24} md={24}>
        <FormControl fullWidth>
          <label>
            Product Type <b className="required-star">*</b>
          </label>
          <Select
            labelId="demo-simple-select-label"
            className="form-select"
            id="demo-simple-select"
            required
            value={productType ? productType : "0"}
            label="productType"
          >
            {!productType && (
              <MenuItem disabled value="0">
                Select Sales Type
              </MenuItem>
            )}
            {productTypeOptions &&
              productTypeOptions.map((item) => (
                <MenuItem
                  value={item.value}
                  onClick={(event) => productTypeChange(event, item.value)}
                >
                  {item.label}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default Forms;
