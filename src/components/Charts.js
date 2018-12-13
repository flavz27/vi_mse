import React, { Component } from 'react';
import '../App.css';
import { Line, Pie } from 'react-chartjs-2';

class Charts extends Component {
    constructor(props) {
        super(props);
        this.handleSelectedRegion = this.handleSelectedRegion.bind(this)
    }
    handleSelectedRegion = (e) => {
        this.props.onSelectRegion(e.target.value);
        //console.log("in chart handle",e.target.value);
    }

    render() {


        const crimes = []
        //filter by region
        for (let i = 0; i < this.props.crimes.length; i++) {
            if (this.props.crimes[i].continent == this.props.selectedRegion) {
                crimes.push(this.props.crimes[i]);
            }
        }
        const crimeReducer = function (acc, current) {
            const [key, ...value] = current

            if (acc.has(key)) {
                const nums = acc.get(key)
                nums.forEach((e, i) => nums[i] = e + value[i])
                acc.set(key, nums)
            }
            else
                acc.set(key, value)
            return acc
        }

        const reducer = function (acc, current) {
            const [key, ...value] = current
            if (acc.has(key)) {
                const nums = acc.get(key)
                nums.forEach((e, i) => nums[i] = e + value[i])
                acc.set(key, nums)
            }
            else
                acc.set(key, value)
            return acc
        }

        const crimeLabels = [];
        let crimeData = [];
        crimes.map((crime) => {
            crimeData.push([crime.year, crime.crimeRate, crime.otherRate, crime.robberyRate])
        });

        const testcrimeData = crimeData.reduce(reducer, new Map())

        crimeData = Array.from(testcrimeData)

        const crimeNumbers = []
        const otherCrimeNumbers = []
        const roberyCrimeNumbers = []


        crimeData.sort().map((crime) => {
            console.log(crime)
            crimeLabels.push(crime[0])
            crimeNumbers.push(crime[1][0].toFixed(1))
            otherCrimeNumbers.push(crime[1][1].toFixed(1))
            roberyCrimeNumbers.push(crime[1][2].toFixed(1))
        })





        const datafromThisYear = []
        const datafromLastYear = []
        let crimesYearComparison = 0
        crimeData.forEach((crime, i) => { if (crime[0] == this.props.selectedYear) datafromThisYear.push(crime[1]) })
        if (!this.props.selectedYear - 1) {
            console.log("in if", this.props.selectedYear - 1)
        } else {
            crimeData.forEach((crime, i) => { if (crime[0] == this.props.selectedYear - 1) datafromLastYear.push(crime[1]) })
            const uniqueValueThisYear = (parseFloat(datafromThisYear[0][0]) + parseFloat(datafromThisYear[0][1]) + parseFloat(datafromThisYear[0][2])) / 3
            const uniqueValueLastYear = (parseFloat(datafromLastYear[0][0]) + parseFloat(datafromLastYear[0][1]) + parseFloat(datafromLastYear[0][2])) / 3

            crimesYearComparison = ((uniqueValueThisYear - uniqueValueLastYear) / uniqueValueLastYear * 100).toFixed(1)
            console.log("this", crimesYearComparison);
        }

        // GAMES SALES
        const regions = {
            "AMERICA": "northAmericaSales",
            "EUROPE": "europeSales",
            "ASIA": "japanSales"
        }
        let gameData = []
        for (let i = 0; i < this.props.gamesSales.length; i++) {
            if (crimeLabels.includes(this.props.gamesSales[i].yearOfRelease)) {
                gameData.push([this.props.gamesSales[i].yearOfRelease, this.props.gamesSales[i][regions[this.props.selectedRegion]]])
            }
        }




        const testData = gameData.reduce(reducer, new Map())
        gameData = [...testData]

        const gamesLabels = []
        const gamesNumbers = []
        gameData.sort().map((game) => {

            gamesNumbers.push(game[1][0].toFixed(1))

            gamesLabels.push(game[0])
        })
        const colors = {
            "gold": "#e6b214",
            "blue": "rgba(75,192,192,1)",
            "magenta": "#F95F62",
            "dark-blue": "#246591",
            "light-green": "#77D353",
            "dark-green": "#006D2C",
            "orange": "#FF9052",
            "dark-red": "#CC3333",
            "purple": "#976DD0",
            "blue-grey": "#37474F"
        }


        //const gamesYearComparison = (gameData[this.props.selectedYear][1] - gameData[this.props.selectedYear-1][1])/gameData[this.props.selectedYear-1][1];


        const gamesdatafromThisYear = []
        const gamesdatafromLastYear = []
        gameData.forEach((game, i) => { if (game[0] == this.props.selectedYear) gamesdatafromThisYear.push(game[1][0]) })
        gameData.forEach((game, i) => { if (game[0] == this.props.selectedYear - 1) gamesdatafromLastYear.push(game[1][0]) })

        const gamesYearComparison = ((gamesdatafromThisYear - gamesdatafromLastYear) / gamesdatafromThisYear * 100).toFixed(1)
        console.log(gamesdatafromLastYear)
        // gameData.forEach((game, i) => {if(game[0] == this.props.selectedYear-1) datafromLastYear.push(game[1])})
        // const uniqueValueThisYear = (parseFloat(datafromThisYear[0][0])+parseFloat(datafromThisYear[0][1])+parseFloat(datafromThisYear[0][2]))/3
        // const uniqueValueLastYear = (parseFloat(datafromLastYear[0][0])+parseFloat(datafromLastYear[0][1])+parseFloat(datafromLastYear[0][2]))/3

        // const crimesYearComparison = ((uniqueValueThisYear-uniqueValueLastYear)/uniqueValueLastYear*100).toFixed(1)
        // console.log("this", crimesYearComparison);


        const gameSalesData = {
            labels: gamesLabels,
            datasets: [
                {
                    label: 'Video games sales',
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: colors["light-green"],
                    borderColor: colors["light-green"],
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: colors["light-green"],
                    pointBackgroundColor: colors["light-green"],
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: colors["light-green"],
                    pointHoverBorderColor: colors["light-green"],
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: gamesNumbers
                }
            ]
        }
        const crimeTableData = {
            labels: crimeLabels,
            datasets: [
                {
                    label: 'Crimes',
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: colors.magenta,
                    borderColor: colors.magenta,
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: colors.magenta,
                    pointBackgroundColor: colors.magenta,
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: colors.magenta,
                    pointHoverBorderColor: colors.magenta,
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: crimeNumbers
                },
                {
                    label: 'Robery Crimes',
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: colors.blue,
                    borderColor: colors.blue,
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: colors.blue,
                    pointBackgroundColor: colors.blue,
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: colors.blue,
                    pointHoverBorderColor: colors.blue,
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: roberyCrimeNumbers
                },
                {
                    label: 'Other crimes',
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: colors.gold,
                    borderColor: colors.gold,
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: colors.gold,
                    pointBackgroundColor: colors.gold,
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: colors.gold,
                    pointHoverBorderColor: colors.gold,
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: otherCrimeNumbers
                }

            ]
        };

        //for current year, get all the sales.
        //labels: game names
        //data: sales in $
        const piechartOptions = {
            legend: {
                display: false
            }
        }
        const gameSalesForYear = []
        this.props.gamesSales.map((game) => {
            if (game.yearOfRelease == this.props.selectedYear) {
                gameSalesForYear.push(game)
            }
        })
        const gameSalesYearLabel = [];
        const gameSalesYearData = [];
        gameSalesForYear.map((game) => {
            gameSalesYearLabel.push(game.name + " on " + game.platform);
            gameSalesYearData.push(game.globalSales)
        })


        const gamePieChartData = {
            labels: gameSalesYearLabel.slice(0, 5),
            datasets: [{
                data: gameSalesYearData.slice(0, 5),
                backgroundColor: [
                    colors.gold,
                    colors.blue,
                    colors.magenta,
                    colors["blue-grey"],
                    colors["light-green"],
                    colors.orange,
                    colors["dark-blue"],
                    colors["dark-red"],
                    colors.purple,
                    colors["dark-green"]

                ],
                hoverBackgroundColor: [
                    colors.gold,
                    colors.blue,
                    colors.magenta,
                    colors["blue-grey"],
                    colors["light-green"],
                    colors.orange,
                    colors["dark-blue"],
                    colors["dark-red"],
                    colors.purple,
                    colors["dark-green"]

                ]
            }]
        };

        const gameSalesOptions = { //TODO not working
            annotation: {
                annotations: [
                    {
                        type: "line",
                        mode: "vertical",
                        scaleID: "x-axis-0",
                        value: this.props.selectedYear,
                        borderColor: "red",
                        label: {
                            content: this.props.selectedYear,
                            enabled: true,
                            position: "top"
                        }
                    }
                ]
            }

        }


        const options = {
            ...global,
            responsive: true,
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'probability'
                    }
                }]
            }
        }




        return (
            <div className="chartsContainer">
                <div className="headerChart">
                    <h2 className="selectedRegionTitle">{this.props.selectedRegion}</h2>
                    <select onChange={e => this.handleSelectedRegion(e)}>
                        <option value="AMERICA">America</option>
                        <option value="EUROPE">Europe</option>
                        <option value="ASIA">Asia</option>
                    </select>
                </div>
                <div className="lineChart">
                    <div className="crimeChart">
                        <h3 className="chartTitle">Crimes (per 100'000 people)</h3>
                        <Line data={crimeTableData}
                            options={options}
                            width={500}
                            height={300}
                            options={{
                                maintainAspectRatio: false
                            }} />

                        <p className="lineLegend">years</p>
                    </div>

                    <div className="gameSalesChart">
                        <h3 className="chartTitle">Video games sales (in M of copies)</h3>
                        <Line data={gameSalesData}
                            options={gameSalesOptions}
                            width={300}
                            height={300}
                            options={{
                                maintainAspectRatio: false
                            }} />
                        <p className="lineLegend">years</p>
                    </div>


                </div>
                <div className="stats">
                    <h3 className="previousyeartitle">Comparison with the previous year</h3>
                    <Comparison value={gamesYearComparison} title="Game Sales" />
                    <Comparison value={crimesYearComparison} title="Crimes" />
                    {/* <h2 className="gamescomparison" id="{}">{gamesYearComparison} % </h2>
                            <h2 className="crimecomparison">{crimesYearComparison}% </h2> */}


                </div>
                <div className="gameSalesPieChart">
                    <h3 className="previousyeartitle">Top video games sales for {this.props.selectedYear} (in M of copies)</h3>
                    <Pie data={gamePieChartData}
                        options={piechartOptions}
                    />
                </div>
            </div>
        )
    }
}
class Comparison extends Component {
    render() {
        if (this.props.value < 0 && this.props.title === "Crimes") {
            return (<h2 className="positiveComparison"><span className="comparisonTitle">{this.props.title}</span> {this.props.value} % </h2>)
        } else if (this.props.value < 0 && this.props.title === "Game Sales") {
            return (<h2 className="negativeComparison"><span className="comparisonTitle">{this.props.title}</span> {this.props.value} % </h2>)
        } else if (this.props.value >= 0 && this.props.title === "Crimes") {
            return (<h2 className="negativeComparison"><span className="comparisonTitle">{this.props.title}</span> + {this.props.value} % </h2>)
        } else {
            return (<h2 className="positiveComparison"><span className="comparisonTitle">{this.props.title}</span> + {this.props.value} % </h2>)
        }

    }
}
export default Charts

