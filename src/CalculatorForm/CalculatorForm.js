import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import "./index.css";

export default class CalculatorForm extends Component {
  state = {
    startDate: new Date(),
    loanAmount: 0,
    installmentInterval: "",
    installmentAmount: 0,
    interestRate: 0,
  };

  calculatePayment = (e) => {
    e.preventDefault();

    let paymentDatesList = [];

    let loanAmount = 10000;

    let startDate = new Date();

    let installmentAmount = 1000;

    let interestRate = 25 / 100;

    let totalInterest = loanAmount * interestRate;

    let totalAmount = totalInterest + loanAmount;

    let paymentsNumber = totalAmount / installmentAmount;

    let installmentInterval = "monthly";

    if (installmentInterval === "monthly") {
      console.log(totalAmount);
      console.log(paymentsNumber);
      startDate.setDate(startDate.getDate() + 60);
      console.log(startDate);

      for (let i = 0; i < paymentsNumber; i++) {
        let newDateToArray = startDate.setDate(startDate.getDate() + 30);

        paymentDatesList.push(newDateToArray);
      }
      console.log(paymentDatesList);
    }
  };
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
            <button onClick={this.calculatePayment}>Calculate</button>
            <button onClick={this.calculatePayment}>Clear</button>
          </div>
        </form>
      </div>
    );
  }
}
