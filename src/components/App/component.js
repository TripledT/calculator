import React from 'react'
import './style.css'
import { Panel } from 'react-bootstrap'

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      contributionLimit: 18000,
      salary: 117021,
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
    const percentageToReachLimit = Math.floor(this.state.contributionLimit / (payPerPeriod * remainingPayPeriods / 100))

    const valueOfInitialPercentage = percentageToReachLimit/100 * payPerPeriod * remainingPayPeriods
    const valueOfRemainder = contributionLimit - valueOfInitialPercentage
    const percentageToReachRemainder = Math.floor(valueOfRemainder / payPerPeriod * 100)

    const valueUnreached = contributionLimit - valueOfInitialPercentage - (percentageToReachRemainder/100 * payPerPeriod)

    this.setState({
      results: {
        normal: {
          initialPercentageToReachLimit: percentageToReachLimit,
          valueOfInitialPercentage: parseFloat(valueOfInitialPercentage).toFixed(2),
          valueOfRemainder: parseFloat(valueOfRemainder).toFixed(2),
          valueUnreached: parseFloat(valueUnreached).toFixed(2),
          percentageToReachRemainder
        },
        frontLoad: {
          initialPercentageToReachLimit: 0,
          monthsForInitialPercentage: 0,
          valueOfInitialPercentage: parseFloat(0).toFixed(2),,
        }
      }
    })
  }

  renderStandardMaxResults() {
    const { normal, frontLoad } = this.state.results

    const result = (
      <div>
        With a salary of
        <font color="blue"> {this.state.salary} </font>
        and a
        <font color="blue"> {this.state.payFrequency} </font>
        pay frequency.  Your total pay per period should be
        <font color="blue"> {parseFloat(this.state.salary / this.state.payFrequency).toFixed(2)}.</font>
        <br />
        In order to reach the 401k contribution limit, you may contribute
        <font color="red"> {normal.initialPercentageToReachLimit}% </font>
        per pay period to total
        <font color="red"> ${normal.valueOfInitialPercentage}</font>.
        <br />
        The remaining amount of
        <font color="red"> ${normal.valueOfRemainder} </font>
        can be reached by using an additional
        <font color="red"> {normal.percentageToReachRemainder}% </font>
        (
        <font color="red">{normal.initialPercentageToReachLimit + normal.percentageToReachRemainder}%</font>
        ) in any pay period. With
        <font color="red"> {normal.valueUnreached} </font>
        remaining.
        <br />
        <br />
        In order to front load your contributions, you may instead use your maximum contribution rate of
        <font color="red">{this.state.maxContributionRate}%</font>
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