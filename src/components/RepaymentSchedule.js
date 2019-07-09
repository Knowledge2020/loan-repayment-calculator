import React, { Component } from 'react';
import { Table, Row, Col } from 'react-bootstrap';

class RepaymentSchedule extends Component {


    render() {
        return (
            <Table >
                <thead>
                    <tr>
                        <th>NO</th>
                        <th>Payment date</th>
                        <th>Payment</th>
                        <th>Interest</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.elementRepaymentSchedule.map(function (item, i) {

                        return item;

                    }, this)}
                </tbody>
            </Table>
        )
    }


}

export default RepaymentSchedule;