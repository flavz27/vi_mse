import React, { Component } from 'react';
import '../App.css';
import { Line } from 'react-chartjs-2';

class Charts extends Component {

    render() {
        console.log(this.props.gamesSales)
        console.log(this.props.crimes)

        const crimes = []
        for (let i = 0; i < this.props.crimes.length; i++) {
            if (this.props.crimes[i].continent == this.props.selectedRegion) {
                crimes.push(this.props.crimes[i]);
            }
        }

        const labels = new Set();
        const crimeData = []
        crimes.map((crime) => {

            labels.add(crime.year);
            let calculatedValue = crime.crimeRate + crime.otherRate + crime.robberyRate;
            crimeData.push(calculatedValue) //TODO calculations are false

        })
        const labelsTable = [...labels]

        const gameData = []
        for (let i = 0; i < this.props.gamesSales.length; i++) {
            if (labelsTable.includes(this.props.gamesSales[i].yearOfRelease)) {
                //  console.log(this.props.gamesSales[i]) //TODO not done
                gameData.push(this.props.gamesSales[i].northAmericaSales)
            }
        }



        const gameSalesData = {
            labels: [...labels],
            datasets: [
                {
                    label: 'Video games sales',
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: '#F95F62',
                    borderColor: '#F95F62',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#F95F62',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#F95F62',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: gameData
                }
            ]
        }
        const crimeTableData = {
            labels: [...labels],
            datasets: [
                {
                    label: 'Crimes',
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: crimeData
                }

            ]
        };

        const options = {
            ...global,
            responsive: true,
            // scales: {
            //     yAxes: [
            //         {
            //           type: 'linear',
            //           display: true,
            //           position: 'left',
            //           id: 'y-axis-1',
            //           gridLines: {
            //             display: false
            //           },
            //           labels: {
            //             show: true
            //           }
            //         },
            //         {
            //           type: 'linear',
            //           display: true,
            //           position: 'right',
            //           id: 'y-axis-2',
            //           gridLines: {
            //             display: false
            //           },
            //           labels: {
            //             show: true
            //           }
            //         }
            //        ]
            // }
        }



        return (
            <div className="chartsContainer">
                {this.props.selectedRegion}
                <div className="lineChart">
                <div className="crimeChart">
                <Line data={crimeTableData}
                        options={options}
                        width={300}
                        height={300}
                        options={{
                            maintainAspectRatio: false
                        }} />
                </div>
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


            </div>
        )
    }
}

export default Charts