import React from 'react'
import './style.css'
import { Panel } from 'react-bootstrap'

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      contributionLimit: 18000,
      salary: 117000,
      payFrequency: 26,
      remainingPayPeriods: 26,
      matchPercentage: 4,
      maxContributionRate: 50,
      results: {
        normal: {
          initialPercentageToReachLimit: 0,
          valueOfInitialPercentage: 0,
          percentageToReachRemainder: 0,
          valueOfRemainder: 0,
          valueUnreached: 0
        },
        frontLoad: {
          numberOfMaxContributionsRequired: 0,
          valueOfInitialMax: 0,
          percentageToReachRemainder: 0,
          valueOfRemainder: 0
        }
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.calculate = this.calculate.bind(this)
    //this.renderStandardMaxResults = this.renderStandardMaxResults(this)
  }

  handleChange(e) {
    var nextState = {}
    nextState[e.target.name] = e.target.value
    this.setState(nextState)

  }

  calculate() {
    const {contributionLimit, salary, payFrequency, remainingPayPeriods, matchPercentage, maxContributionRate } = this.state;

    const payPerPeriod = salary / payFrequency
    const amountReachedByMatch = payPerPeriod * remainingPayPeriods * (matchPercentage/100)

    const amountRemainingAfterMatch = contributionLimit - amountReachedByMatch
    const maxContributionInSinglePayPeriod = payPerPeriod * (maxContributionRate / 100)
    const amountOfMaxContributionNeeded = amountRemainingAfterMatch / maxContributionInSinglePayPeriod

    const amountRemainingAfterMaxContributions = (amountOfMaxContributionNeeded % 1) * maxContributionInSinglePayPeriod
    const percentOfPayPeriodForRemainingAmount = amountRemainingAfterMaxContributions / payPerPeriod
    const percentageToReachLimit = Math.floor(this.state.contributionLimit / (payPerPeriod * remainingPayPeriods / 100))

    const valueOfInitialPercentage = parseFloat(Math.floor(percentageToReachLimit/100 * payPerPeriod * remainingPayPeriods)).toFixed(2)
    const valueOfRemainder = contributionLimit - valueOfInitialPercentage
    const valueUnreached = contributionLimit - valueOfInitialPercentage + valueOfRemainder

    this.setState({
      results: {
        normal: {
          initialPercentageToReachLimit: percentageToReachLimit,
          valueOfInitialPercentage,
          valueOfRemainder,
          valueUnreached,
          percentageToReachRemainder: Math.floor(valueOfRemainder / payPerPeriod * 100)
        },
        frontLoad: {

        }
      }
    })
  }

  renderStandardMaxResults() {
    const { normal } = this.state.results

    const result = (
      <div>
        In order to reach the 401k contribution limit, you may contribute
        <font color="red"> {normal.initialPercentageToReachLimit}% </font>
        per pay period to total
        <font color="red"> ${normal.valueOfInitialPercentage}</font>.
        <br />
        The remaining amount of
        <font color="red"> ${normal.valueOfRemainder} </font>
        can be reached by using an additional
        <font color="red"> {normal.percentageToReachRemainder}% </font>
        in any pay period. With
        <font color="red"> {normal.valueUnreached} </font>
        remaining.
      </div>
    )


    return result
  }

  render() {
    return (
      <div className="container">
        <div >
          <Panel header={(<h3>Input</h3>)}>
            <form>
              Contribution Limit: <br/>
              <input type="number" name="contributionLimit" value={this.state.contributionLimit} onChange={this.handleChange}/> <br/><br/>
              Salary: <br/>
              <input type="number" name="salary" value={this.state.salary} onChange={this.handleChange}/> <br/><br/>
              Pay Frequency: <br/>
              <select name="payFrequency" value={this.state.payFrequency} onChange={this.handleChange}>
                <option value="52">Weekly</option>
                <option value="26">Bi-Weekly</option>
                <option value="24">Semi-Monthly</option>
                <option value="12">Monthly</option>
              </select>
              <br/><br/>
              Remaining Pay Periods: <br/>
              <input type="number" name="remainingPayPeriods" value={this.state.remainingPayPeriods} onChange={this.handleChange} /> <br/><br/>
              Match Percentage: <br/>
              <input type="number" name="matchPercentage" value={this.state.matchPercentage} onChange={this.handleChange} /> <br/><br/>
              Max Contribution Rate: <br/>
              <input type="number" name="maxContributionRate" value={this.state.maxContributionRate} onChange={this.handleChange} /> <br/><br/>
            </form>
            <button onClick={this.calculate}>
              Calculate
            </button>
          </Panel>
        </div>
        <div>
          <Panel header={(<h3>Results</h3>)}>
            {this.renderStandardMaxResults()}
          </Panel>
        </div>
      </div>

    )
  }
}