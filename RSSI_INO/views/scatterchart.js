

var drawGridLines = function(width, height, container){
  // Using for loop to draw multiple horizontal lines
  for (var j=0; j <= width; j=j+25) {
    container.append("svg:line")
      .attr("x1", 0)
      .attr("y1", j)
      .attr("x2", width)
      .attr("y2", j)
      .style("stroke", "rgb(6,120,155)")
      .style("opacity", "0.2")
      .style("stroke-width", 1);            
  };
   
  // Using for loop to draw multiple vertical lines
  for (var j=0; j <= height; j=j+25) {
    container.append("svg:line")
      .attr("x1", j)
      .attr("y1", 0)
      .attr("x2", j)
      .attr("y2", height)
      .style("stroke", "rgb(6,120,155)")
      .style("opacity", "0.2")
      .style("stroke-width", 1);            
  };
  
  return false;
  
}
$(document).ready(function() {
  //var data = [[5,3], [10,17], [15,4], [2,8]];
width = 1200;
height = 1200;
var margin = {top: 20, right: 15, bottom: 60, left: 60}
      , width = 1400 - margin.left - margin.right
      , height = 1400 - margin.top - margin.bottom;
   var chart = d3.select('body')
  .append('svg:svg')
  .attr('width', width + margin.right + margin.left)
  .attr('height', height+ margin.top + margin.bottom)
  .attr('class', 'chart')

    var main = chart.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  .attr('width', width)
  .attr('height', height)
  .attr('class', 'main')   
       

   var svgContainer = chart.append("g").attr("width", width).attr("height", height);
    

  //d3.tsv("data.tsv", function(data) {
    
  //console.log(data);
 //var data = [[0,5],[4.6,0],[4.6,4.6],[5,0.48]];

 /* d3.json("data.json", function( data) {
   

   var xa = d3.scale.linear()
              .domain(d3.extent(data, function(d) { return d.x; })).nice()
              .range([ 0, width ]);
    
    var ya = d3.scale.linear()
            .domain(d3.extent(data, function(d) { return d.y; })).nice()
            .range([ height, 0 ]);


var g = main.append("svg:g");            
g.selectAll("scatter-dots")
      .data(data)
      .enter().append("svg:circle")
          .attr("cx", function (d,i) { return xa(d.x); } )
          .attr("cy", function (d) { return ya(d.y); } )
          .attr("r", 8);    

          });
  //d3.json("loc.json", function( data2) {
   
     var data2 = [[{"x":6,"y":0}],[{"x":20,"y":0}],[{"x":23,"y":0}]];
   var x2 = d3.scale.linear()
              .domain(d3.extent(data2, function(d) { return d.x; })).nice()
              .range([ 0, width ]);
    
    var y2 = d3.scale.linear()
            .domain(d3.extent(data2, function(d) { return d.y; })).nice()
            .range([ height, 0 ]);

  var g = main.append("svg:g");            
  g.selectAll(".red.dot")
      .data(data2)
      .enter().append("svg:circle")
          .attr("cx", function (d,i) { return x2(d.x); } )
          .attr("cy", function (d) { return y2(d.y); } )
          .attr("r", 4);*/
/*g.selectAll("scatter-dots")
            .data(data2)
            .enter().append("svg:circle")
            .attr("class", "dot")
            .attr("r", 1)
            .attr("cx", function(dd,i) { return x2(dd.x); })
            .attr("cy", function(dd) { return y2(dd.y); })
            .style("fill","green"); */    

        //  });
d3.loadData() 
      .json('data', 'data.json') 
      .json('loc', 'loc.json') 
      
      .onload(function(data) { 
           var x2 = d3.scale.linear()
              .domain(d3.extent(data.loc, function(d) { return d.x; })).nice()
              .range([ 0, width ]);
    
    var y2 = d3.scale.linear()
            .domain(d3.extent(data.loc, function(d) { return d.y; })).nice()
            .range([ height, 0 ]);

  //var g = main.append("svg:g");            
  g.selectAll("scatter-dots")
      .data(data.loc)
      .enter().append("svg:circle")
          .attr("cx", function (d,i) { return x2(d.x); } )
          .attr("cy", function (d) { return y2(d.y); } )
          .attr("r", 4);  
var xa = d3.scale.linear()
              .domain(d3.extent(data.data, function(d) { return d.x; })).nice()
              .range([ 0, width ]);
    
    var ya = d3.scale.linear()
            .domain(d3.extent(data.data, function(d) { return d.y; })).nice()
            .range([ height, 0 ]);


var g = main.append("svg:g");            
g.selectAll(".dot")
      .data(data.data)
      .enter().append("svg:circle")
          .attr("cx", function (d,i) { return xa(d.x); } )
          .attr("cy", function (d) { return ya(d.y); } )
          .attr("r", 8);  
     
      }); 

drawGridLines(width+400, height+200, svgContainer);
});
//Make an SVG Container

d3.loadData = function() { 
        var loadedCallback = null; 
        var toload = {}; 
        var data = {}; 
        var loaded = function(name, d) { 
          delete toload[name]; 
          data[name] = d; 
          return notifyIfAll(); 
        }; 
        var notifyIfAll = function() { 
          if ((loadedCallback != null) && d3.keys(toload).length === 
0) { 
            loadedCallback(data); 
          } 
        }; 
        var loader = { 
          json: function(name, url) { 
            toload[name] = url; 
            d3.json(url, function(d) { 
              return loaded(name, d); 
            }); 
            return loader; 
          }, 
          csv: function(name, url) { 
            toload[name] = url; 
            d3.csv(url, function(d) { 
              return loaded(name, d); 
            }); 
            return loader; 
          }, 
          onload: function(callback) { 
            loadedCallback = callback; 
            notifyIfAll(); 
          } 
        }; 
        return loader; 
      }; 



 
  
    
/*function make_x_axis() {        
    return d3.svg.axis()
        .scale(x)
         .orient("bottom")
         .ticks(5)
}

function make_y_axis() {        
    return d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5)
}

    main.append("g")         
        .attr("class", "grid")
        .attr("transform", "translate(0," + height + ")")
        .call(make_x_axis()
            .tickSize(-height, 0, 0)
            .tickFormat("")
        )

    main.append("g")         
        .attr("class", "grid")
        .call(make_y_axis()
            .tickSize(-width, 0, 0)
            .tickFormat("")
        )*/



