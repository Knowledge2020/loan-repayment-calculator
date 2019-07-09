import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class RightSide extends Component {

  render() {

    let totalInterest = this.props.amount - this.props.loanAmount;

    return (


      <Table >
        <tbody>
          <tr>
            <td>
              <h4>
                Monthly payments
        </h4><br></br>
              <span>{this.props.currancy}{this.props.monthly}</span>
            </td>

            <td>
              <h4>
                Loan amount
        </h4><br></br>
              <span>{this.props.currancy}{this.props.loanAmount}</span>
            </td>

          </tr>
          <tr>
            <td>
              <h4>
                Total interest
        </h4><br></br>
              <span>{this.props.currancy}{totalInterest}</span>
            </td>

            <td>
              <h4>
                Total to be repaid
        </h4><br></br>
              <span>{this.props.currancy}{this.props.amount}</span>
            </td>

          </tr>
          <tr>
            <td>
              <h4>
                Effective annual rate
        </h4><br></br>
              <span>{this.props.APR}%</span>
            </td>

            <td>
              <h4>
                Estimated payoff date
        </h4><br></br>
              <span>{this.props.payoffDate}</span>
            </td>

          </tr>
        </tbody>
      </Table>

    )
  }


}

export default RightSide;