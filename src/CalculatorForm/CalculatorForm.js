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
import FormControl from "@mui/material/FormControl";
import { alpha, styled } from "@mui/material/styles";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
});

const holidays = {
  "0,2,1": "Martin Luther King, Jr. Day",
  "1,2,1": "President's Day",
  "2,1,0": "Daylight Savings Time Begins",
  "3,3,3": "Administrative Assistants Day",
  "4,1,0": "Mother's Day",
  "4,-1,1": "Memorial Day",
  "5,2,0": "Father's Day",
  "6,2,0": "Parents Day",
  "8,0,1": "Labor Day",
  "8,1,0": "Grandparents Day",
  "8,-1,0": "Gold Star Mothers Day",
  "9,1,1": "Columbus Day",
  "10,0,0": "Daylight Savings Time Ends",
  "10,3,4": "Thanksgiving Day",
};

export default class CalculatorForm extends Component {
  state = {
    startDate: "",
    loanAmount: "",
    installmentInterval: "",
    installmentAmount: "",
    interestRate: "",
    paymentList: [],
    lastPaymentDate: "",
  };

  calculatePayment = (e) => {
    e.preventDefault();

    console.log(this.getDateString(2021, 4, -1, 1));

    let newDate = Date.parse(this.state.startDate);

    let dateMilli = newDate;

    const dateObject = new Date(dateMilli);
    console.log("Interval", this.state.installmentInterval);

    let paymentDatesList = [];

    let loanAmount = Number(this.state.loanAmount);

    let installmentAmount = Number(this.state.installmentAmount);

    let interestRate = Number(this.state.interestRate) / 100;

    let totalInterest = loanAmount * interestRate;

    let totalAmount = totalInterest + loanAmount;

    let paymentsNumber = totalAmount / installmentAmount;

    let installmentInterval = this.state.installmentInterval;

    if (installmentInterval === "monthly") {
      for (let i = 0; i < paymentsNumber; i++) {
        const newDateToArray = dateObject.setDate(dateObject.getDate() + 30);
        const newDate = new Date(newDateToArray);

        console.log(this.getDateString(2021, 4, -1, 1));

        if (newDate.getDay() == 6) {
          newDate.setDate(newDate.getDate() + 2);
          console.log("New Date", newDate);
        }
        if (newDate.getDay() == 0) {
          newDate.setDate(newDate.getDate() + 1);
          console.log("New Date", newDate);
        }
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
    } else if (installmentInterval === "weekly") {
      for (let i = 0; i < paymentsNumber; i++) {
        const newDateToArray = dateObject.setDate(dateObject.getDate() + 7);

        const newDate = new Date(newDateToArray);
        if (newDate.getDay() == 6) {
          newDate.setDate(newDate.getDate() + 2);
          console.log("New Date", newDate);
        }
        if (newDate.getDay() == 0) {
          newDate.setDate(newDate.getDate() + 1);
          console.log("New Date", newDate);
        }

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
    } else if (installmentInterval === "daily") {
      for (let i = 0; i < paymentsNumber; i++) {
        const newDateToArray = dateObject.setDate(dateObject.getDate() + 1);

        const newDate = new Date(newDateToArray);
        if (newDate.getDay() == 6) {
          newDate.setDate(newDate.getDate() + 2);
          console.log("New Date", newDate);
        }
        if (newDate.getDay() == 0) {
          newDate.setDate(newDate.getDate() + 1);
          console.log("New Date", newDate);
        }
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
    } else {
      console.log("not valid input");
    }
  };
  getDate(year, month, week, day) {
    const firstDay = 1;
    if (week < 0) {
      month++;
    }
    const date = new Date(year, month, week * 7 + firstDay);
    if (day < date.getDay()) {
      day += 7;
    }
    date.setDate(date.getDate() - date.getDay() + day);
    return date;
  }
  getHoliday(month, week, day) {
    return holidays[month + "," + week + "," + day];
  }
  getDateString(year, month, week, day) {
    const date = this.getDate(year, month, week, day);
    const holiday = this.getHoliday(month, week, day);
    let dateString = date.toLocaleDateString();
    if (holiday) {
      dateString += " \xa0\xa0\xa0" + holiday;
    }
    return dateString;
  }
  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  clearData = () => {
    this.setState = {
      startDate: "",
      loanAmount: "",
      installmentInterval: "",
      installmentAmount: "",
      interestRate: "",
      paymentList: [],
    };
  };

  render() {
    return (
      <div className="cal-form-div">
        <div className="sideBar">
          <h3>Payment Calculator</h3>
          <form>
            <div className="form-cal">
              <CssTextField
                label="Start Date"
                id="custom-css-outlined-input"
                type="date"
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{ name: "startDate" }}
                onChange={this.onChange}
                value={this.state.startDate}
              />

              <CssTextField
                id="custom-css-outlined-input"
                label="Loan Amount"
                variant="standard"
                InputProps={{ name: "loanAmount" }}
                onChange={this.onChange}
                value={this.state.loanAmount}
              />
              <FormControl variant="standard" sx={{ m: 1 }}>
                <CssTextField
                  id="custom-css-outlined-input"
                  labelId="demo-simple-select-label"
                  select
                  variant="standard"
                  InputProps={{ name: "installmentInterval" }}
                  onChange={this.onChange}
                  value={this.state.installmentInterval}
                  margin="normal"
                  label="Payment Interval"
                >
                  <MenuItem value={"daily"}>Daily</MenuItem>
                  <MenuItem value={"weekly"}>Weekly</MenuItem>
                  <MenuItem value={"monthly"}>Monthly</MenuItem>
                </CssTextField>
              </FormControl>

              <CssTextField
                id="custom-css-outlined-input"
                label=" Installment Amount"
                variant="standard"
                InputProps={{ name: "installmentAmount" }}
                onChange={this.onChange}
                value={this.state.installmentAmount}
                color="primary"
              />

              <CssTextField
                id="custom-css-outlined-input"
                label="Interest Rate (%)"
                variant="standard"
                InputProps={{ name: "interestRate" }}
                onChange={this.onChange}
                value={this.state.interestRate}
              />
              <button className="submit-button" onClick={this.calculatePayment}>
                Calculate
              </button>
              <button className="clear-button" onClick={this.clearData}>
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
