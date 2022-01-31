import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import "./index.css";

export default class CalculatorForm extends Component {
  render() {
    return (
      <div className="cal-form-div">
        <form>
          <div className="form-cal">
            <TextField
              id="standard-basic"
              label=" Start Date"
              variant="standard"
            />

            <TextField
              id="standard-basic"
              label="Loan Amount"
              variant="standard"
            />
            <TextField
              id="standard-basic"
              label=" Installment Interval"
              variant="standard"
            />

            <TextField
              id="standard-basic"
              label="Standard"
              variant="standard"
            />

            <TextField
              id="standard-basic"
              label="Simple Interest Rate(%)"
              variant="standard"
            />
            <button>Calculate</button>
            <button>Clear</button>
          </div>
        </form>
      </div>
    );
  }
}
