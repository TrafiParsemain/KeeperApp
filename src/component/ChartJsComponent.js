import React from "react";


function ChartJsComponent  ({TypeChartJs,dataLabel,dataNumber,width,height}) {
    const dataNumberChart = []
    const dataChartLabel = []

    dataLabel.map((value,index) =>
        dataChartLabel.push(value)
    )
    dataNumber.map((value,index) =>
        dataNumberChart.push(value)

    )

    
   //Debug
   console.log(dataNumberChart)
   console.log(dataChartLabel)
   


    return (
        <TypeChartJs
            data={{
                labels: dataChartLabel,
                datasets: [{
                    data: dataNumberChart,
                    borderColor: [
                        'rgb(0, 0, 0)',
                    ],
                    backgroundColor: ['rgb(75, 231, 72)','rgb(255, 165, 0)'],
                    borderWidth: 0,
                    borderJoinStyle: 'bevel',
                    lineTension: 0.4,
                    pointBackgroundColor: 'rgb(255, 255, 255)',
                    pointBorderColor: 'rgb(75, 231, 72)',
                }]
            }}
            width={width}
            height={height}
            options={{
                keepAspectRatio: false ,
                responsive:false,
                plugins: {
                    legend: {
                        display: true,
                    }
                }
            }}
        />
    )
}

export default ChartJsComponent;