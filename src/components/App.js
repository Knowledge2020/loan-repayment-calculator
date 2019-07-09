import React, { Component } from 'react';
import '../css/App.css';
import { Grid, Form, Row, Col } from 'react-bootstrap';
import SliderAmount from './SliderAmount';
import SliderDuration from './SliderDuration';
import RightSide from './RightSide';
import LoanRepaymentDate from './LoanRepaymentDate';
import RepaymentSchedule from './RepaymentSchedule';

class LoanCalculator extends Component {

    /**
    * ================================
    * ==========CONSTRUCTOR ==========
    * ===============================
    * @param props
    */

    constructor(props) {
        super(props);

        // SET STARTER CALCULATUION
        let MPR = this.props.APR1 / 100 / 12;
        let amount = this.props.valueA;
        let duration = this.props.valueD;
        let totalAmountToRepay = amount + ((amount * MPR) * duration);
        let monthly = totalAmountToRepay / duration;
        let newstartDate = new Date();


        /**
         *
         console.log('Before Fixing');
         console.log('total amount to repay: ' + totalAmountToRepay + '=' + amount + '+((' + amount + '*' + MPR +')' + '*' + duration + ')');
         console.log('monthly inst: '+ monthly + '=' + totalAmountToRepay+'/'+duration);
         console.log('after fixing');
         console.log('total amount: ' +  Math.round(totalAmountToRepay).toFixed(2));
         console.log('monthly inst: '+ Math.round(monthly).toFixed(2));
         */



        // save props values in to the state
        this.state = {

            valueAmount: this.props.valueA,
            stepAmount: this.props.stepA,
            maxAmount: this.props.maxA,
            minAmount: this.props.minA,
            valueDuration: this.props.valueD,
            stepDuration: this.props.stepD,
            maxDuration: this.props.maxD,
            minDuration: this.props.minD,
            APR: this.props.APR1,
            amountToRepay: Math.round(totalAmountToRepay).toFixed(),
            monthlyInst: Math.round(monthly).toFixed(),
            startDate: newstartDate,
            payoffDate: '',
            elementRepaymentSchedule: []
        };


    }


    /**
     * ===============================================
     * ======== UPDATE FUNCTION ==================
     * =============================================
     * @param e
     */


    update(e) {

        let changedID, value;

        // Assign to let changedID ID of slider which has been changed
        changedID = e.target.id;
        value = e.target.value;

        if (changedID === 'sliderAmount') {
            this.setState({ valueAmount: e.target.value });
            // console.log('EVENT TIME: ' + this.getNewDate());
            // console.log('NEW ACTION DETECTED: ID - '+e.target.id + ': has been changed. New value: '+this.props.currancy + e.target.value);
        }
        if (changedID === 'sliderDuration') {
            this.setState({ valueDuration: e.target.value });
            // console.log('EVENT TIME: ' + this.getNewDate());
            // console.log('NEW ACTION DETECTED: ID - '+e.target.id + ': has been changed. New value: '+ e.target.value+' months');
        }


        this.calculate(changedID, value, this.state.startDate);
    }

    onChangeLoanRepaymentDate(date, dateString) {

        this.setState({ startDate: new Date(date) })
        this.calculate(null, this.state.valueDuration, new Date(date))
    }
    // getNewDate() {

    //     let newDate = new Date();
    //     let h,m,s;
    //     h = newDate.getHours();
    //     m = "0"+newDate.getMinutes();
    //     s = "0"+newDate.getSeconds();
    //     m = m.slice(-2);
    //     s = s.slice(-2);

    //     let event_date = h +":"+m+":"+s;
    //     return event_date;
    // };

    // /**
    //  * ===============================================
    //  * ======== CALCULATE FUNCTION ==================
    //  * =============================================
    //  * @param id
    //  * @param value
    //  */

    calculate(id, value, startDate) {

        let amount, duration;
        let MPR = this.state.APR / 100 / 12;  // MPR monthly APR for calculation
        let aprNew;
        // if calculate is after Duration is changed take value of duration from slider, but value of amount from state
        if (id === 'sliderDuration') {
            duration = parseFloat(value);
            amount = parseFloat(this.state.valueAmount);
        }
        // if calculate is after Amount is changed take value of Amount from slider, but value of duration from state
        else if (id === 'sliderAmount') {
            amount = parseFloat(value);
            duration = parseFloat(this.state.valueDuration);
        }
        else {
            amount = parseFloat(this.state.valueAmount);
            duration = parseFloat(this.state.valueDuration);
        }


        // calculate total and monthly inst
        let totalAmountToRepay = amount + ((amount * MPR) * duration);
        let monthly = totalAmountToRepay / duration;

        // fixing numbers
        totalAmountToRepay = Math.round(totalAmountToRepay).toFixed();
        monthly = Math.round(monthly).toFixed();



        //save results into state
        this.setState({ amountToRepay: totalAmountToRepay });
        this.setState({ monthlyInst: monthly });
        this.setState({ payoffDate: this.payoffDateCalculate(startDate, duration) });
        this.GetElementRepaymentSchedule(startDate, duration, monthly, totalAmountToRepay);
    }

    payoffDateCalculate(date, valueDuration) {
        date = new Date(date);

        date.setMonth(date.getMonth() + valueDuration);
        var dd = date.getDate();
        var month = date.toLocaleString('en-us', { month: 'long' });
        var yyyy = date.getFullYear();

        var result = `${month}-${dd}-${yyyy}`;
        return result;

    }


    GetElementRepaymentSchedule(startDate, valueDuration, monthlyInst, amountToRepay) {
        var elements = [];
        let remainingBalance = amountToRepay;

        startDate = new Date(startDate);

        for (var i = 0; i < valueDuration; i++) {

            let date = new Date(startDate.setMonth(startDate.getMonth() + 1));


            let dd = date.getDate();
            let month = date.toLocaleString('en-us', { month: 'long' });
            let yyyy = date.getFullYear();


            let mRate = this.state.APR / 100 / 12;
            let interestcalculate = remainingBalance * mRate;
            remainingBalance = remainingBalance * (1 + mRate) - this.state.monthlyInst;

            let data = (
                <tr key={i}>
                    <td> {i + 1}</td>
                    <td> {`${month}-${dd}-${yyyy}`}</td>
                    <td>{this.props.currancy}{monthlyInst}</td>
                    <td>{this.props.currancy}{parseInt(interestcalculate)}</td>
                </tr>);

            // push the component to elements!
            elements.push(data);
        }

        this.setState({ elementRepaymentSchedule: elements })
    }

    componentWillMount() {
        this.calculate(null, null, this.state.startDate);
    }


    /**
       * ===  ==============================================
       * =========== RENDER ============================
       * =============================================
       * @returns {XML}
       */
    render() {

        return (
            <Grid className="show-grid mainContainer">
                <Row>
                    <Col className="leftSide" xs={12} md={6}>
                        <Form horizontal>
                            <SliderAmount
                                value={this.state.valueAmount}
                                min={this.state.minAmount}
                                max={this.state.maxAmount}
                                onChange={this.update.bind(this)}
                                step={this.state.stepAmount}
                                currancy={this.props.currancy}
                            />
                            <SliderDuration
                                value={this.state.valueDuration}
                                min={this.state.minDuration}
                                max={this.state.maxDuration}
                                onChange={this.update.bind(this)}
                                step={this.state.stepDuration}
                            />

                            <LoanRepaymentDate
                                onChange={this.onChangeLoanRepaymentDate.bind(this)}
                            />

                        </Form>


                    </Col>

                    <Col className="rightSide" xs={12} md={6}>
                        <RightSide
                            loanAmount={this.state.valueAmount}
                            currancy={this.props.currancy}
                            amount={this.state.amountToRepay}
                            monthly={this.state.monthlyInst}
                            APR={this.state.APR}
                            btnOnClick={this.update.bind(this)}
                            payoffDate={this.state.payoffDate}
                        />
                    </Col>


                </Row>

                <Row className="rightSide">
                    <div className="centered"><h3>Loan Repayment Schedule</h3></div>
                    <RepaymentSchedule
                        loanAmount={this.state.valueAmount}
                        currancy={this.props.currancy}
                        amount={this.state.amountToRepay}
                        monthly={this.state.monthlyInst}
                        APR={this.state.APR}
                        elementRepaymentSchedule={this.state.elementRepaymentSchedule}
                    />

                </Row>
            </Grid>

        );

    }

}

//  Assign Types for props
LoanCalculator.propTypes = {

    valueD: React.PropTypes.number,
    stepD: React.PropTypes.number,
    maxD: React.PropTypes.number,
    minD: React.PropTypes.number,

    valueA: React.PropTypes.number,
    stepA: React.PropTypes.number,
    maxA: React.PropTypes.number,
    minA: React.PropTypes.number,
    APR1: React.PropTypes.number,
    currancy: React.PropTypes.string,
};

// Assign deafault values to props

LoanCalculator.defaultProps = {
    valueD: 24,
    stepD: 1,
    maxD: 72,
    minD: 1,

    valueA: 2000,
    stepA: 100,
    maxA: 10000,
    minA: 100,
    APR1: 25,
    currancy: '$',
};

export default LoanCalculator;


