import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { LineChart, Line } from 'recharts';
// import YAxis from 'recharts/lib/cartesian/YAxis';
import { XAxis, YAxis } from 'recharts';
import * as d3 from "d3";
import { ResponsivePie } from '@nivo/pie';
import axios from 'axios';

let jsonData = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{"label":"one", "value":20}, 
      {"label":"two", "value":50}, 
      {"label":"three", "value":30}],
      innerData: [{"label":"one", "value":15}, 
      {"label":"two", "value":15}, 
      {"label":"four", "value":30},
      {"label":"five", "value":35},
      {"label":"six", "value":5}] 
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
          .append("svg")              //create the SVG element inside the <body>
          .data([this.state.data])                   //associate our data with the document
          .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
          .attr("height", h)
          .append("g")                //make a group to hold our pie chart
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
    const svgH = () => document.getElementsByTagName('svg')[0].getBoundingClientRect().height;
    const svgW = () => document.getElementsByTagName('svg')[0].getBoundingClientRect().width;
    const calcRadius = () => {if (h >= w) {return w} else {return h}}; 
    const w = svgW(),
    h = svgH(),
    r = calcRadius() / 2,
    r2 = calcRadius() / 4,
    color = d3.scaleLinear()
    .domain([0, 3])
    .range(["red", "white"]),
    color2 = d3.scaleLinear()
    .domain([0, 6])
    .range(["grey", "green"]);
console.log(w)
console.log(h)
console.log(r2)    

const vis = d3.select("svg")
   // .append("svg")              //create the SVG element inside the <body>
    .data([this.state.data])                   //associate our data with the document
    //.attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
    //.attr("height", h)
    .append("g")                //make a group to hold our pie chart
    .attr("transform", "translate(" + w/2 + "," + r + ")");

    const vis2 = d3.select("svg")
    // .append("svg")              //create the SVG element inside the <body>
    .data([this.state.innerData])                   //associate our data with the document
    //.attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
    //.attr("height", h)
    .append("g")                //make a group to hold our pie chart
    .attr("transform", "translate(" + w/2 + "," + r + ")");

const arc = d3.arc()
.outerRadius(r)
.innerRadius(r / 2);
const arc2 = d3.arc()
.outerRadius(r2)
.innerRadius(0);



const pie = d3.pie()
     .value((d)=> d.value);

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

arcs.append('svg:path')
    .attr('fill', (d, i)=> color(i))
    .attr('d', arc)
    .attr('class', 'arc')

arcs2.append('svg:path')
    .attr('fill', (d, i)=> color2(i))
    .attr('d', arc2)
    .attr('class', 'arc')
    
arcs.append("svg:text")
  .attr('class', 'arc')                                    
  .attr("transform", function(d) {                   
    
    d.innerRadius = 0;
    d.outerRadius = r;
    return "translate(" + arc.centroid(d) + ")";        
})
.attr("text-anchor", "middle")                         
.text((d, i) =>this.state.data[i].label); 

arcs2.append("svg:text")                                    
  .attr("transform", function(d) {                   
    
    d.innerRadius = 0;
    d.outerRadius = r2;
    return "translate(" + arc2.centroid(d) + ")";        
})
.attr("text-anchor", "middle")                         
.text((d, i) =>this.state.innerData[i].label);

console.log(document.getElementsByTagName('svg')[0].getBoundingClientRect());

  }
  render() {

    return (
      <div className="App">
      
        <div className='d3-elem'>
        <svg></svg></div>
      </div>
    );
  }
}

export default App;
