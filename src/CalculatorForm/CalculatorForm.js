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
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

export default class CalculatorForm extends Component {
  state = {
    startDate: "",
    loanAmount: "",
    installmentInterval: "",
    installmentAmount: "",
    interestRate: "",
    paymentList: [],
  };

  calculatePayment = (e) => {
    e.preventDefault();

    let newDate = Date.parse(this.state.startDate);

    let dateMilli = newDate;

    const dateObject = new Date(dateMilli);
    console.log("Date milli", dateObject);

    let paymentDatesList = [];

    let loanAmount = Number(this.state.loanAmount);

    let installmentAmount = Number(this.state.installmentAmount);

    let interestRate = Number(this.state.interestRate) / 100;

    let totalInterest = loanAmount * interestRate;

    let totalAmount = totalInterest + loanAmount;

    let paymentsNumber = totalAmount / installmentAmount;

    let installmentInterval = "monthly";

    if (installmentInterval === "monthly") {
      for (let i = 0; i < paymentsNumber; i++) {
        const newDateToArray = dateObject.setDate(dateObject.getDate() + 30);

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
  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  render() {
    return (
      <div className="cal-form-div">
        <div className="sideBar">
          <h3>Payment Calculator</h3>
          <form>
            <div className="form-cal">
              <TextField
                id="datetime-local"
                label="Start Date"
                type="date"
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{ name: "startDate" }}
                onChange={this.onChange}
                value={this.state.startDate}
              />

              <TextField
                id="standard-basic"
                label="Loan Amount"
                variant="standard"
                InputProps={{ name: "loanAmount" }}
                onChange={this.onChange}
                value={this.state.loanAmount}
              />
              <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                <InputLabel id="demo-simple-select-label">
                  Payment Interval
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={this.state.installmentInterval}
                  label="Age"
                  variant="standard"
                  InputProps={{ name: "installmentInterval" }}
                  onChange={this.onChange}
                >
                  <MenuItem value={"daily"}>Daily</MenuItem>
                  <MenuItem value={"weekly"}>Weekly</MenuItem>
                  <MenuItem value={"monthly"}>Monthly</MenuItem>
                </Select>
              </FormControl>

              <TextField
                id="standard-basic"
                label=" Installment Amount"
                variant="standard"
                InputProps={{ name: "installmentAmount" }}
                onChange={this.onChange}
                value={this.state.installmentAmount}
              />

              <TextField
                id="standard-basic"
                label="Interest Rate (%)"
                variant="standard"
                InputProps={{ name: "interestRate" }}
                onChange={this.onChange}
                value={this.state.interestRate}
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
