$(function () {
    $('#container').highcharts({
        colorAxis: {
            minColor: '#FFFFFF',
            maxColor: Highcharts.getOptions().colors[0]
        },
        series: [{
            type: 'treemap',
            layoutAlgorithm: 'squarified',
            data: [{
                name: 'A',
                value: 6,
                colorValue: 4
            }, {
                name: 'B',
                value: 6,
                colorValue: 4
            }, {
                name: 'C',
                value: 6,
                colorValue: 4
            }, {
                name: 'D',
                value: 6,
                colorValue: 4
            }, {
                name: 'E',
                value: 6,
                colorValue: 4
            }, {
                name: 'F',
                value: 6,
                colorValue: 4
            }, {
                name: 'G',
                value: 6,
                colorValue: 4
            },
                {
                name: 'H',
                value: 5,
                colorValue: 4
            },
            	{
                name: 'I',
                value: 6,
                colorValue: 4
            },
            {
            	
        type: 'scatter',
        name: 'scatter',
        data: [3, 2.67, 3, 1.33, 1.33, 3.2, 1.6, 2.5, 1.4, 0.2],
        marker: {
            lineWidth: 2,
            lineColor: Highcharts.getOptions().colors[3],
            fillColor: 'red'
        }
   
            

            }]
        }],
        title: {
            text: 'Highcharts Treemap'
        }
    });
});