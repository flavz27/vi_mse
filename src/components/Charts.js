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
        console.log("game data", this.props.gameSales)
        console.log("crime data", this.props.crimes)
        const crimes = []
        //filter by region
        for (let i = 0; i < this.props.crimes.length; i++) {
            if (this.props.crimes[i].continent == this.props.selectedRegion) {
                crimes.push(this.props.crimes[i]);
            }
        }

        const crimeLabels = [];
        const crimeData = [];
        crimes.map((crime) => {

            crimeData.push([crime.year, crime.crimeRate, crime.otherRate, crime.robberyRate]) //TODO calculations are false

        });

         //console.log("crime data PA", crimeData);
        const crimeNumbers = []
        const otherCrimeNumbers = []
        const roberyCrimeNumbers = []
        //create two tables
        crimeData.map((crime) => {
            crimeLabels.push(crime[0])
            crimeNumbers.push(crime[1])
            otherCrimeNumbers.push(crime[2])
            roberyCrimeNumbers.push(crime[3])
        })
        // console.log(crimeData)
        const crimesYearComparison = 0;
        // const dataFromThisYear = crimeData[this.props.selectedYear]
        // //const crimesYearComparison = (crimeData[this.props.selectedYear][1] - crimeData[this.props.selectedYear-1][1])/crimeData[this.props.selectedYear-1][1];
        // console.log("year",dataFromThisYear);

        // GAMES SALES
        const regions = {
            "AMERICA": "northAmericaSales",
            "EUROPE": "europeSales",
            "ASIA": "japanSales"
        }
        const gameData = []
        for (let i = 0; i < this.props.gamesSales.length; i++) {
            if (crimeLabels.includes(this.props.gamesSales[i].yearOfRelease)) {
                gameData.push([this.props.gamesSales[i].yearOfRelease, this.props.gamesSales[i][regions[this.props.selectedRegion]]])
            }
        }
        console.log("data PA", gameData)

        const gamesLabels = []
        const gamesNumbers = []
        gameData.sort().map((game) => {

            gamesNumbers.push(game[1])
            gamesLabels.push(game[0])
        })
        const colors = {
            "gold" : "#e6b214",
            "blue": "rgba(75,192,192,1)" ,
            "magenta" : "#F95F62",
            "dark-blue" : "#246591",
            "light-green" : "#77D353",
            "dark-green": "#006D2C",
            "orange":"#FF9052",
            "dark-red": "#CC3333",
            "purple":"#976DD0",
            "blue-grey":"#37474F"


        }
            
        
        //const gamesYearComparison = (gameData[this.props.selectedYear][1] - gameData[this.props.selectedYear-1][1])/gameData[this.props.selectedYear-1][1];
        const gamesYearComparison = 0
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
                    pointBorderColor:colors["light-green"],
                    pointBackgroundColor: '#fff',
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
                    pointBackgroundColor: '#fff',
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
                    pointBackgroundColor: '#fff',
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
                    pointBackgroundColor: '#fff',
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
        console.log(this.props.releasedGamesYear)

        const gamePieChartData = {
            labels: gameSalesYearLabel.slice(0, 10),
            datasets: [{
                data: gameSalesYearData.slice(0, 10),
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
        // const roberyCrimeTableData = {
        //     labels: crimeLabels,
        //     datasets: [
        //         {
        //             label: 'Robery Crimes',
        //             fill: false,
        //             lineTension: 0.5,
        //             backgroundColor: '#F95F62',
        //             borderColor: 'rgba(75,192,192,1)',
        //             borderCapStyle: 'butt',
        //             borderDash: [],
        //             borderDashOffset: 0.0,
        //             borderJoinStyle: 'miter',
        //             pointBorderColor: 'rgba(75,192,192,1)',
        //             pointBackgroundColor: '#fff',
        //             pointBorderWidth: 1,
        //             pointHoverRadius: 5,
        //             pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        //             pointHoverBorderColor: 'rgba(220,220,220,1)',
        //             pointHoverBorderWidth: 2,
        //             pointRadius: 1,
        //             pointHitRadius: 10,
        //             data: roberyCrimeNumbers
        //         }

        //     ]
        // };
        // const otherCrimeTableData = {
        //     labels: crimeLabels,
        //     datasets: [
        //         {
        //             label: 'Other crimes',
        //             fill: false,
        //             lineTension: 0.5,
        //             backgroundColor: '#F95F62',
        //             borderColor: 'rgba(75,192,192,1)',
        //             borderCapStyle: 'butt',
        //             borderDash: [],
        //             borderDashOffset: 0.0,
        //             borderJoinStyle: 'miter',
        //             pointBorderColor: 'rgba(75,192,192,1)',
        //             pointBackgroundColor: '#fff',
        //             pointBorderWidth: 1,
        //             pointHoverRadius: 5,
        //             pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        //             pointHoverBorderColor: 'rgba(220,220,220,1)',
        //             pointHoverBorderWidth: 2,
        //             pointRadius: 1,
        //             pointHitRadius: 10,
        //             data: otherCrimeNumbers
        //         },
        //         {
        //             label: 'Robery Crimes',
        //             fill: false,
        //             lineTension: 0.5,
        //             backgroundColor: 'pink',
        //             borderColor: 'rgba(75,192,192,1)',
        //             borderCapStyle: 'butt',
        //             borderDash: [],
        //             borderDashOffset: 0.0,
        //             borderJoinStyle: 'miter',
        //             pointBorderColor: 'rgba(75,192,192,1)',
        //             pointBackgroundColor: '#fff',
        //             pointBorderWidth: 1,
        //             pointHoverRadius: 5,
        //             pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        //             pointHoverBorderColor: 'rgba(220,220,220,1)',
        //             pointHoverBorderWidth: 2,
        //             pointRadius: 1,
        //             pointHitRadius: 10,
        //             data: roberyCrimeNumbers
        //         }

        //     ]
        // };

        const options = {
            ...global,
            responsive: true,
            scales: {
                yAxes: [
                    {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        id: 'y-axis-1',
                        gridLines: {
                            display: false
                        },
                        labels: {
                            show: true
                        }
                    },
                    {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        id: 'y-axis-2',
                        gridLines: {
                            display: false
                        },
                        labels: {
                            show: true
                        }
                    }
                ]
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
                        <Line data={crimeTableData}
                            options={options}
                            width={500}
                            height={300}
                            options={{
                                maintainAspectRatio: false
                            }} />
                    </div>
                    {/* <div className="crimeChart">
                        <Line data={roberyCrimeTableData}
                            options={options}
                            width={300}
                            height={300}
                            options={{
                                maintainAspectRatio: false
                            }} />
                    </div>
                    <div className="crimeChart">
                        <Line data={otherCrimeTableData}
                            options={options}
                            width={300}
                            height={300}
                            options={{
                                maintainAspectRatio: false
                            }} />
                    </div> */}

                    <div className="gameSalesChart">
                        <Line data={gameSalesData}
                            options={options}
                            width={300}
                            height={300}
                            options={{
                                maintainAspectRatio: false
                            }} />
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
                <h3 className="previousyeartitle">Top video games sales for {this.props.selectedYear} (in M of $)</h3>
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
        if (this.props.value < 0) {
            return (<h2 className="negativeComparison"><span className="comparisonTitle">{this.props.title}</span> {this.props.value} % </h2>)
        } else {
            return (<h2 className="positiveComparison"><span className="comparisonTitle">{this.props.title}</span> + {this.props.value} % </h2>)
        }

    }
}
export default Charts

