import React, { Component } from 'react';
import '../App.css';
import { Line } from 'react-chartjs-2';

class Charts extends Component {

    render() {

        const crimes = []
        for (let i = 0; i < this.props.crimes.length; i++) {
            if (this.props.crimes[i].continent == this.props.selectedRegion) {
              crimes.push(this.props.crimes[i]);
            }
          }
         
          const labels = new Set();
          const crimeData = []
          crimes.map((crime)=>{
      
            labels.add(crime.year);
            let calculatedValue= crime.crimeRate + crime.otherRate + crime.robberyRate;
            crimeData.push(calculatedValue) //TODO calculations are false
          
          })
          const labelsTable = [...labels]
        
          const gameData = []
          for (let i = 0; i < this.props.gamesSales.length; i++) {
            if(labelsTable.includes(this.props.gamesSales[i].yearOfRelease)) {
                console.log(this.props.gamesSales[i]) //TODO not done
            }
          }

          


        const data = {
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
        return (
            <div className="chartsContainer">
                {this.props.selectedRegion}
                <div className="lineChart">
                    <Line data={data}
                        width={100}
                        height={500}
                        options={{
                            maintainAspectRatio: false
                        }} />
                </div>


            </div>
        )
    }
}

export default Charts