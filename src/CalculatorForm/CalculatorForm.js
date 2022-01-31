import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import "./index.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default class CalculatorForm extends Component {
  state = {
    startDate: new Date(),
    loanAmount: 0,
    installmentInterval: "",
    installmentAmount: 0,
    interestRate: 0,
    paymentList: [],
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
      console.log(startDate);

      for (let i = 0; i < paymentsNumber; i++) {
        const newDateToArray = startDate.setDate(startDate.getDate() + 30);
        // newDateToArray.toTimeString();
        const newDate = new Date(newDateToArray);
        const paymentMonth = newDate.toLocaleString("en-US", {
          month: "numeric",
        });
        const paymentDay = newDate.toLocaleString("en-US", {
          day: "numeric",
        });
        const paymentYear = newDate.toLocaleString("en-US", {
          year: "numeric",
        });
        let payment = {
          paymentNumber: i + 1,
          amount: installmentAmount,
          paymentDate: `${paymentMonth}/${paymentDay}/${paymentYear}`,
        };

        paymentDatesList.push(payment);
      }
      console.log(paymentDatesList);
      this.setState({
        paymentList: paymentDatesList,
      });
    }
  };
  render() {
    return (
      <div className="cal-form-div">
        <div className="sideBar">
          <h3>Payment Calculator</h3>
          <form>
            <div className="form-cal">
              <TextField
                id="standard-basic"
                label=" Start Date"
                variant="standard"
                className="inputText"
                style={{ color: "white" }}
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
              <button className="submit-button" onClick={this.calculatePayment}>
                Calculate
              </button>
              <button className="clear-button" onClick={this.calculatePayment}>
                Clear
              </button>
            </div>
          </form>
        </div>
        <div className="content">
          {!this.state.paymentList.length == 0 ? (
            <TableContainer component={Paper} className="payment-table">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Payment #</TableCell>
                    <TableCell align="left">Payment Amount</TableCell>
                    <TableCell align="left">Payment Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.paymentList.map((payment) => (
                    <TableRow
                      key={payment.paymentNumber}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {payment.paymentNumber}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        ${payment.amount}
                      </TableCell>
                      <TableCell align="left">{payment.paymentDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div>
              <h3>No Data</h3>
            </div>
          )}
        </div>
      </div>
    );
  }
}
