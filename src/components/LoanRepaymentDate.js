import React, { Component } from 'react';
import { Row, Col, FormGroup } from 'react-bootstrap';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { DatePicker } from 'antd';
import Moment from 'moment';

class LoanRepaymentDate extends Component {

    render() {
        const dateFormat = 'YYYY/MM/DD';

        return (
            <FormGroup>
                <Row>
                    <Col sm={12}>
                        <Row>
                            <Col className="labelSlider" xs={12} sm={4}>
                                Repayment date
                            </Col>
                            <Col className="descSlider" xs={12} sm={6}>
                                What date do you want to pay a loan??
                            </Col>
                        </Row>
                    </Col>

                    <Col xs={12} sm={6}>
                        <DatePicker
                            defaultValue={Moment(new Date(), dateFormat)} format={dateFormat}
                            onChange={this.props.onChange} />

                    </Col>
                </Row>
            </FormGroup>
        )
    }

}

export default LoanRepaymentDate