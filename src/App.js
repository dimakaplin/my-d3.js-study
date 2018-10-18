import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import { LineChart, Line } from 'recharts';
// import YAxis from 'recharts/lib/cartesian/YAxis';
// import { XAxis, YAxis } from 'recharts';
import * as d3 from "d3";
import axios from 'axios';

let jsonData = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{"label":"one", "value":20}, 
      {"label":"two", "value":55}, 
      {"label":"three", "value":25}],
      innerData: [{"label":"one", "value":15}, 
      {"label":"two", "value":15}, 
      {"label":"four", "value":30},
      {"label":"five", "value":35},
      {"label":"six", "value":5}],
      padAngle: false 
    }

  }

  componentDidMount() {

    this.twoPies();

  } 

  componentWillMount() {
    /*let newData = [];
    for (let i = 0; i < 10; i++) {
      
      // let elem = Math.ceil(Math.random() * 10);
      newData.push({x: Math.ceil(Math.random() * 100), y: Math.ceil(Math.random() * 100)});}
    // this.setState({data: newData});
    console.log(newData[1].x); */
    
   /* axios.get('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.data.map((item, i) => jsonData[i] = item))
  .then(this.setState({newData: jsonData})); */

  

  }
  onePieAnim() {
    const data = [14, 23, 18];
    const w = 400,
          h = 400,
          r = 150,
        color = d3.scaleLinear()
            .domain([0, 3])
            .range(["red", "white"]);

    const arc = d3.arc()
        .innerRadius(100)
        .outerRadius(0)

    const arc2 = d3.arc()
        .innerRadius(120)
        .outerRadius(0)
        .padAngle(0);

    const pie = d3.pie()
        .value(function (d) { return d;})
        .padAngle(0);
    const pie2 = d3.pie()
        .value(function (d) { return d;})
        .padAngle(0.03);
    

    const group = d3.select('svg')
        .append("g")                
        .attr("transform", "translate(" + r + "," + r + ")");

    const arcs1 =  group.selectAll(".arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc");

    const paths = arcs1.append("path")
        .attr('fill', (d, i)=> color(i))
        .attr("class", "arc1")
        .attr("d", arc);

    
    /*paths.transition()
        .delay(200)
        .duration(1000)
        .attr("d", arc2);*/
    
    const newPath = () => {
      paths.transition()
      .delay(200)
      .duration(1000)
      .attr("d", arc2);
    } 

    d3.select('h1').on('click', newPath)    
    
    
    

  }

  lineGraph() {
    console.log(this.state.data[1].x)

    const dataSortX = this.state.data.map((item)=>{let elem = item.x; return elem});
    const dataSortY = this.state.data.map((item)=>{let elem = item.y; return elem});

    const xScale = d3.scaleLinear()
    .domain([0, d3.max(dataSortX, (d)=>{return d})])
    .range([0, 300])
    const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataSortY, (d)=>{return d})])
    .range([0, 500]);

    console.log(xScale(15))

    const line = d3.pie()
    .x((d)=>{return xScale(d.x)})
    .y((d)=>{return yScale(d.y)});

 

    const svg = d3.select(".d3-elem").append('svg');
    
    console.log(dataSortX)
    console.log(d3.max(dataSortX, (d)=>{return d}))

    svg.attr('height', 500)
      .attr('width', 700);

    // console.log(d3.max(dataSort, (d)=>{return d[0]}))

    svg.append('path').attr('d', line(this.state.data));



  }

  firstPie() {
    const w = 400,
          h = 400,
          r = 200,
          color = d3.scaleLinear()
          .domain([0, 3])
          .range(["red", "white"]);

    const vis = d3.select(".d3-elem")
          .append("svg")              
          .data([this.state.data])                 
          .attr("width", w)           
          .attr("height", h)
          .append("g")                
          .attr("transform", "translate(" + r + "," + r + ")");

    const arc = d3.arc()
    .outerRadius(r)
    .innerRadius(100);



    const pie = d3.pie()
           .value((d)=> d.value);

    const arcs = vis.selectAll('g.slice')
          .data(pie)
          .enter()
          .append('svg:g')
          .attr('class', 'slice');

    arcs.append('svg:path')
          .attr('fill', (d, i)=> color(i))
          .attr('d', arc)
          .attr('class', 'arc')
          
    arcs.append("svg:text")                                    
        .attr("transform", function(d) {                   
          
          d.innerRadius = 0;
          d.outerRadius = r;
          return "translate(" + arc.centroid(d) + ")";        
      })
      .attr("text-anchor", "middle")                         
      .text((d, i) =>this.state.data[i].label); 
  }
  secondPie() {
    const w = 400,
    h = 400,
    r = 100,
    color = d3.scaleLinear()
    .domain([0, 6])
    .range(["grey", "green"]);

const vis = d3.select("svg")
     //.append("svg")              //create the SVG element inside the <body>
    .data([this.state.innerData])                   //associate our data with the document
   // .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
   // .attr("height", h)
    .append("g")                //make a group to hold our pie chart
    .attr("transform", "translate(" + r + "," + r + ")");

const arc = d3.arc()
.outerRadius(r)
.innerRadius(0);



const pie = d3.pie()
     .value((d)=> d.value);

const arcs = vis.selectAll('g.slice')
    .data(pie)
    .enter()
    .append('svg:g')
    .attr('class', 'slice');

arcs.append('svg:path')
    .attr('fill', (d, i)=> color(i))
    .attr('d', arc)
    .attr('class', 'arc')
    
arcs.append("svg:text")                                    
  .attr("transform", function(d) {                   
    
    d.innerRadius = 0;
    d.outerRadius = r;
    return "translate(" + arc.centroid(d) + ")";        
})
.attr("text-anchor", "middle")                         
.text((d, i) =>this.state.innerData[i].label); 
  }
  twoPies() {
    console.log(this.state.newData);
    let counterTextLeg = 0;
    let counterRectLeg = 0;
    const svgH = () => document.getElementsByTagName('svg')[0].getBoundingClientRect().height;
    const svgW = () => document.getElementsByTagName('svg')[0].getBoundingClientRect().width;
    const calcRadius = () => {if (h >= w) {return w} else {return h}}; 
    const w = svgW(),
          h = svgH(),
          r = 200,
          r2 = 100,
          color = d3.scaleLinear()
          .domain([0, 3])
          .range(["#4970FF", "#9172FF"]),
          color2 = d3.scaleLinear()
          .domain([0, 6])
          .range(["#6BC5FF", "#CA89FF"]),
          calcLegendText = (x) => {
            counterTextLeg = counterTextLeg + x
            return counterTextLeg },
          calcLegendRect = (x) => {
            counterRectLeg = counterRectLeg + x
            return counterRectLeg } 
    console.log(w)
    console.log(h)
    console.log(r2)


const vis = d3.select("svg")

    .data([this.state.data])                  
    .append("g")
    .attr('class', 'all')            
    .attr("transform", "translate(" + 250 + "," + 220 + ")");

    const vis2 = d3.select("svg")
    .data([this.state.innerData])              
    .append("g")
    .attr('class', 'all')                  
    .attr("transform", "translate(" + 250 + "," + 220 + ")");

    const arc = d3.arc()
      .outerRadius(r)
      .innerRadius(r / 2);
    const newArc = d3.arc()
      .outerRadius(r + 7)
      .innerRadius(r / 2 + 7)
      .padAngle(0.02)

    const arc2 = d3.arc()
      .outerRadius(r2)
      .innerRadius(0);
    const newArc2 = d3.arc()
      .outerRadius(r2 + 3)
      .innerRadius(0)
      .padAngle(0.04);



const pie = d3.pie()
     .value((d)=> d.value)


const pieAngle = () => {pie.padAngle(0.2); console.log('asdasd')};     

const arcs = vis.selectAll('g.slice')
    .data(pie)
    .enter()
    .append('svg:g')
    .attr('class', 'slice');

const arcs2 = vis2.selectAll('g.slice')
    .data(pie)
    .enter()
    .append('svg:g')
    .attr('class', 'slice');

const paths = arcs.append('path')
    .attr('fill', (d, i)=> color(i))
    .attr('d', arc)
    
const paths2 = arcs2.append('path')
    .attr('fill', (d, i)=> color2(i))
    .attr('d', arc2)
    
    
const text1 = arcs.append("svg:text")
  .attr('class', 'arc')                                    
  .attr("transform", function(d) {                   
    
    d.innerRadius = 0;
    d.outerRadius = r;
    return "translate(" + arc.centroid(d) + ")";        
})
.attr("text-anchor", "middle")                         
.text((d, i) =>this.state.data[i].label); 



const text2 = arcs2.append("svg:text")   
.attr('class', 'arc')                                 
  .attr("transform", function(d) {                   
    
    d.innerRadius = 0;
    d.outerRadius = r2;
    return "translate(" + arc2.centroid(d) + ")";        
})
.attr("text-anchor", "middle")                         
.text((d, i) =>this.state.innerData[i].label);

// func for anim

const animPathOver = ()=> {
  paths
  .transition()
  .delay(200)
  .duration(1000)
.attr('d', newArc)

text1.transition()
.delay(200)
.duration(1000)
.attr("transform", function(d) {                   
    
  d.innerRadius = 0;
  d.outerRadius = r;
  return "translate(" + newArc.centroid(d) + ")";        
}).text((d, i) =>d.value+'%')
paths2
.transition()
.delay(200)
.duration(1000)
.attr('d', newArc2)

text2.transition()
.delay(200)
.duration(1000)
.attr("transform", function(d) {                   
  
d.innerRadius = 0;
d.outerRadius = r;
return "translate(" + newArc2.centroid(d) + ")";        
}).text((d, i) =>d.value+'%')


}

const animPathOut = ()=> {
  paths
  .transition()
  .delay(50)
  .duration(500)
.attr('d', arc)

text1.transition()
.delay(50)
.duration(500)
.attr("transform", function(d) {                   
    
  d.innerRadius = 0;
  d.outerRadius = r;
  return "translate(" + arc.centroid(d) + ")";        
}).text((d, i) =>this.state.data[i].label);
paths2
.transition()
.delay(50)
.duration(500)
.attr('d', arc2)

text2.transition()
.delay(50)
.duration(500)
.attr("transform", function(d) {                   
  
d.innerRadius = 0;
d.outerRadius = r;
return "translate(" + arc2.centroid(d) + ")";        
}).text((d, i) =>this.state.innerData[i].label);

}


console.log(document.getElementsByTagName('svg')[0].getBoundingClientRect());


d3.selectAll('.all')// .transition().style("color","grey").duration(5000)
.on('mouseover', animPathOver)
.on('mouseout', animPathOut)

const legend = d3.select('svg')
  .append('g')
  .attr('class', 'legend');
const elems = legend.selectAll('.legendElem')
  .data(this.state.data)
  .enter()
  .append('text')
  .text((d, i) =>d.label)
  .attr('class', 'legendElem')
  .attr("x", (d) => calcLegendText(100))
  .attr("y", 500 - 30)
  
const rects = legend.selectAll('rect')
    .data(this.state.data)
    .enter()
    .append('rect')
    .attr('height', 10)
    .attr('width', 10)
    .attr("x", (d) => calcLegendRect(130))
    .attr("y", 500 - 39)
    .attr('fill', (d, i)=> color(i))

  

  }
  render() {

    return (
      <div className="App">
      
        <div className='d3-elem'>
          <svg></svg>
        </div>
        <h1>123123</h1>
      </div>
    );
  }
}

export default App;
