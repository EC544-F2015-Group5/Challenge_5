    $(document).ready(function() {
                var chart,
                 options = {
                    chart: {
                        renderTo: 'container',
                        type: 'scatter',
                        zoomType: 'xy'

                    },
                    title: {
                        text: 'RSSI KNN LOCALIZATION'
                    },
                     plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgba(223, 83, 83, .5)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                   // headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '{point.x} , {point.y} '
                }
            }
        },
                    xAxis: {
                   // gridZIndex: 40,
                    lineWidth: 0,
                    minorGridLineWidth: 1,
                    lineColor: 'transparent',
            
                    labels: {
                     enabled: false
                        },
                    minorTickLength: 0,
                    tickLength: 0,
                     minorTickInterval: 'auto',
                            tickWidth: 1,
                    },
                    yAxis: {
                            minorTickInterval: 'auto',
                            tickWidth: 1,
                    },
                   

       /* rangeSelector: {
            buttons: [{
                count: 1,
                type: 'minute',
                text: '1M'
            }, {
                count: 5,
                type: 'minute',
                text: '5M'
            }, {
                type: 'all',
                text: 'All'
            }],
            inputEnabled: false,
            selected: 0
        },

        title : {
            text : 'Live random data'
        },

        exporting: {
            enabled: false
        },*/

        

                    series: []
                };
                create();
                /*
                 Load the data from the CSV file. This is the contents of the file:

                 Apples,Pears,Oranges,Bananas,Plums
                 John,8,4,6,5
                 Jane,3,4,2,3
                 Joe,86,76,79,77
                 Janet,3,16,13,15

                 */
                 function create() {
            if(chart) chart.destroy();
                $.get('data1.csv', function(data) {
                    // Split the lines
                    var lines = data.split('\n');
                    $.each(lines, function(lineNo, line) {
                        var items = line.split(',');

                        // header line containes categories
                      /*  if (lineNo == 0) {
                            $.each(items, function(itemNo, item) {
                                if (itemNo > 0)
                                    options.xAxis.categories.push(item);
                            });
                        }*/

                        // the rest of the lines contain data with their name in the first position
                        //else {
                            var series = {
                                data:[]
                            };
                            $.each(items, function(itemNo, item) {
                                //if (itemNo == 0) {
                                  //  series.name = item;
                              //  } else {
                                    
                                
                            
                                   // data:[item[0],item[1]]
                                   series.data.push(parseFloat(item));

                               // }
                            });
                                var chart = new Highcharts.Chart(options);
                                   //chart.setData(series.data);
                            options.series.push(series);
                            


                       var series2 = {
                                data: [[12,34],[5,6],[7,8]]
                            };
                           

                            options.series.push(series2);


                        //}

                    });
                    var chart = new Highcharts.Chart(options);
                    //chart.redraw();
                   // chart.series.setData(data,true);
                   
                });
            }
});