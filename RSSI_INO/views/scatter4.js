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
                turboThreshold:5000,
                
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
                    categories:[],
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

                $.get('loc.tsv', function(data) {
                    // Split the lines
                    var lines = data.split('\n');

              
                   $.each(lines, function(lineNo, line) {
                        
                        
                        var items = line.split('\t');
                        // header line containes categories
                    
                        var series = {
                                data:[[parseFloat(items[0]),parseFloat(items[1])]]
                                
                                

                              //  data: [document.getElementById('csv').innerHTML]
                              //data:lines
                              //data:csv
                            };

                           // series.update({marker:{radius:8}}); 
                          //series.data.push(parseFloat(x,y));
                       
                            options.series.push(series);
                       });
                    
                    
                         // });  
                           // });

                       var series1 = {
                                data: [[39,40],[29,36],[32,40],[35,35],[20,36],[20,32],[25,33],[28,33],[32,36],[32,36],[40,29]]
                            };
                           
                                //    series1.update({marker:{radius:5}});

                            options.series.push(series1);


                        //}
                        var series2 = {
                                data: [[20,40],[16,36],[15,32],[10,32],[10,32],[5,32],[5,36],[14,38],[12,39],[11,40]]
                        };

                        // series2.update({marker:{radius:5}});
                                                    options.series.push(series2);

                        var series3 = {
                                data: [[39,32],[35,32],[32,28],[28,30],[30,32],[20,24],[25,26],[27,30],[31,26],[27,30],[31,26]]
                        };
                        // series3.update({marker:{radius:5}});
                             options.series.push(series3);

                        var series4 = {
                                data:[[20,24],[15,20],[4,18],[6,20],[10,18],[18,24],[19,28],[17,29],[2,24],[7,20]]
                        };
                        // series4.update({marker:{radius:5}});
                        options.series.push(series4);
                    
                        var series5 = {
                                data: [[36,15],[40,20],[32,24],[28,22],[30,18],[30,20],[29,22],[23,16],[27,16]]
                        };
                        // series5.update({marker:{radius:5}});
                        options.series.push(series5);

                        var series6 = {
                                data: [[20,15], [18,20],[16,24],[10,22],[8,20],[2,22],[4,16],[14,20],[13,16]]
                        };
                       //  series6.update({marker:{radius:5}});
                        options.series.push(series6);

                        var series7 = {
                            data: [[20,8],[24,9],[30,12],[34,14],[36,16],[40,9],[32,12],[28,12]]
                        };
                       //  series7.update({marker:{radius:5}});
                        options.series.push(series7);

                        var series8 = {
                            data: [[3,9],[4,16],[7,10],[9,10],[17,16],[14,13],[12,12],[14,16]]
                        };
                       //  series8.update({marker:{radius:5}});
                        options.series.push(series8);

                        var series9 = {
                            data:[[4,5],[6,8],[7,3],[16,2],[14,3],[10,5],[14,6],[13,8],[25,7],[32,6],[37,5]]
                        };
                         //series9.update({marker:{radius:5}});
                        options.series.push(series9);


                    var chart = new Highcharts.Chart(options);
                    //chart.redraw();
                   // chart.series.setData(data,true);
                   
                
            });
            }
        });