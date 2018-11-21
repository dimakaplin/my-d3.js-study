import React, { Component } from 'react';
import './App.css';
import * as d3 from "d3";
import axios from 'axios';
import { LineChart, Brush, ReferenceLine, LabelList, ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, } from 'recharts';

// import csv from 'csvtojson'

// const fs = require('fs')

class CustomToolTip extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { active } = this.props;
        if (active) {
            const { payload, label } = this.props;
            return (
              <div className="custom-tooltip">
                <p className="label">{`${label} : ${payload[0].value}`}</p>
                <p className="intro">{this.getIntroOfPage(label)}</p>
                <p className="desc">Anything you want can be displayed here.</p>
              </div>)}
    }
}




let jsonData = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: [
            {"label":"one", "value":20}, 
            {"label":"two", "value":55}, 
            {"label":"three", "value":25}
        ],
        innerData: [
            {"label":"one", "value":15}, 
            {"label":"two", "value":15}, 
            {"label":"four", "value":30},
            {"label":"five", "value":35},
            {"label":"six", "value":5}
        ],
        padAngle: false 
    }

  }

  componentDidMount() {
    console.log('123')
        console.log(this.state.dataLine)




   // this.twoPies();
   //this.lineGraph()
   

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

  const dataCsv = d3.csvParse(`count,daym
5034,30
6186,29
6049,28
6074,27
6117,26
6108,25
6071,24
6069,23
6091,22
6033,21
6036,20
6097,19
5996,18
6041,17
5830,16`);

const dataNew = dataCsv.map((item)=> {item.count = +item.count;
                                      item.daym = item.daym;
                                      const newItem = {count: item.count, daym: item.daym}
                                        return newItem  }).reverse()
 
                                   
  this.setState({dataLine: dataNew})
let miners = d3.csvParse(`miner,sum_gas
0xea674fdde714fd979de3edf0f56aa9716b898ec8,12132020104
0x5a0b54d5dc17e0aadc383d2db43b0a0d3e029c4c,6866655065
0x829bd824b016326a401d083b33d092293333a830,5471115574
0xb2930b35844a230f00e51431acae96fe543a0347,4312417083
0x52bc44d5378309ee2abf1539bf71de1b7d7be3b5,3896785047
0xf3b9d2c81f2b24b0fa0acaaa865b7d9ced5fc2fb,1921170120
0x2a65aca4d5fc5b5c859090a6c34d164135398226,809092568
0xd4383232c8d1dbe0e03bdfab849871fa17e61807,694727117
0x4a071eee72bc8664c81b62836932ed0d246da82b,630462983
0xcc16e3c00dbbe76603fa833ec20a48f786dfe610,446528697`).sort((a, b)=> b.sum_gas - a.sum_gas);

miners = miners.map((item, i) => {  const prevGas = () => {if(i === 0) {return 0}else{return i-1}};
                                    const newObj = {miner: item.miner,
                                    sum_gas: (+item.sum_gas),
                                    maxGas: (+item.sum_gas),
                                     prevGas: (+item.sum_gas),
                                     labelGas: `${item.sum_gas} gas`,
                                     labelMax: `${Math.ceil((+item.sum_gas) / (+miners[0].sum_gas) * 100)}%`,
                                     labelPrev: `${Math.ceil((+item.sum_gas)/(+miners[prevGas()].sum_gas)*100)}%`
                                    }
                                    return newObj})

this.setState({dataMiners: miners});
console.log(miners)

  
  

  

  }
  onePieAnim() {                    //one animated pie whithout legend
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

  lineGraph() {                     // lineGrapf whithout animation axis and legend                          
    console.log(this.state.data[1].x)

    const csvData = d3.csvParse(`count,daym
5034,30
6186,29
6049,28
6074,27
6117,26
6108,25
6071,24
6069,23
6091,22
6033,21
6036,20
6097,19
5996,18
6041,17
5830,16`)

    const dataSortX = csvData.map((item)=>{let elem = item.count; return elem});
    const dataSortY = csvData.map((item)=>{let elem = item.daym; return elem});

    const xScale = d3.scaleLinear()
    .domain([0, d3.max(dataSortX, (d)=>{return d})])
    .range([0, 300])
    const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataSortY, (d)=>{return d})])
    .range([0, 500]);

    console.log(xScale(15))

    const line = d3.line()
    .x((d)=>{return xScale(d.count)})
    .y((d)=>{return yScale(d.daym)});

 

    const svg = d3.select(".d3-elem").append('svg');
    
    console.log(dataSortX)
    console.log(d3.max(dataSortX, (d)=>{return d}))

    svg.attr('height', 500)
      .attr('width', 700);

 

    svg.append('path').attr('d', line(csvData));



  }

  firstPie() {                      // first and secods pies are parts of twopies
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
        .data([this.state.innerData])                   
        .append("g")                
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
  twoPies() {                       // two animated pies whith legend
    
    // functions, vars and scales

    let counterTextLeg = 0;
    let counterRectLeg = 0;
    let counterTextLeg2 = 0;
    let counterRectLeg2 = 0;
    const svgH = () => document.getElementsByTagName('svg')[0].getBoundingClientRect().height; // useless functions for adaptiv svg
    const svgW = () => document.getElementsByTagName('svg')[0].getBoundingClientRect().width;
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
            return counterRectLeg },
          calcLegendText2 = (x) => {
            counterTextLeg2 = counterTextLeg2 + x
            return counterTextLeg2 },
          calcLegendRect2 = (x) => {
            counterRectLeg2 = counterRectLeg2 + x
            return counterRectLeg2 }  
    console.log(w)
    console.log(h)
    console.log(r2)

// this is d3 code it is compilation from one and two pie

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
    .outerRadius(r + 10)
    .innerRadius(r / 2 + 10)
    .padAngle(0.02)


const arc2 = d3.arc()
    .outerRadius(r2)
    .innerRadius(30);
const newArc2 = d3.arc()
    .outerRadius(r2 + 3)
    .innerRadius(30 + 3)
    .padAngle(0.05);



const pie = d3.pie()
    .value((d)=> d.value)

     

const arcs = vis.selectAll('g.slice')
    .data(pie)
    .enter()
    .append('svg:g')
    .attr('class', 'slice')
    .on('mouseover', () => 
    {console.log(d3.selectAll('.slice').filter((d, i)=>{if(d !== d3.event.target) return d;}))
       })

const arcs2 = vis2.selectAll('g.slice')
    .data(pie)
    .enter()
    .append('svg:g')
    .attr('class', 'slice');

const paths = arcs.append('path')
    .attr('fill', (d, i)=> color(i))
    .attr('d', arc)
    .style('opacity', 0)
    
    
    
const paths2 = arcs2.append('path')
    .attr('fill', (d, i)=> color2(i))
    .attr('d', arc2)
    .style('opacity', 0)
    
    
const text1 = arcs.append("svg:text")
    .attr('class', 'arc')                                    
    .attr("transform", function(d) {                   
    
    d.innerRadius = 0;
    d.outerRadius = r;
    return "translate(" + arc.centroid(d) + ")";        
    })
    .attr("text-anchor", "middle")
    .style('opacity', 0)                         
    // .text((d, i) =>this.state.data[i].label); 



const text2 = arcs2.append("svg:text")   
  .attr('class', 'arc')                                 
  .attr("transform", function(d) {                   
    
  d.innerRadius = 0;
  d.outerRadius = r2;
  return "translate(" + arc2.centroid(d) + ")";        
  })
  .attr("text-anchor", "middle")
  .style('opacity', 0)                         
  // .text((d, i) =>this.state.innerData[i].label);
  paths.transition()
      .duration(3000)
      .style('opacity', 1)
  
  paths2.transition()
      .duration(3000)
      .style('opacity', 1)


// funcs for animation
// const t = d3.transition().delay(500).duration(1000).ease(d3.easeLinear)

const animPathOver = ()=> {
  paths
    .transition()
    .delay(200)
    .duration(1000)
    .style('opacity', 1)
    .attr('d', newArc)

  text1.transition()
    .delay(200)
    .duration(1000)
    .style('opacity', 1)
    .attr("transform", function(d) {                   
        
    d.innerRadius = 0;
    d.outerRadius = r;
    return "translate(" + newArc.centroid(d) + ")";        
    }).text((d, i) =>d.value+'%')
    .style('opacity', 1)

    paths2
    .transition()
    .delay(200)
    .duration(1000)
    .style('opacity', 1)
    .attr('d', newArc2)

    text2.transition()
    .delay(200)
    .duration(1000)
    .attr("transform", function(d) {                   
      
    d.innerRadius = 0;
    d.outerRadius = r;
    return "translate(" + newArc2.centroid(d) + ")";        
    }).text((d, i) =>d.value+'%')
    .style('opacity', 1)

}

const animPathOut = ()=> {
  paths
    .transition()
    .delay(500)
    .duration(500)
    .attr('d', arc)
    .style('opacity', 1)

  text1.transition()
    .delay(500)
    .duration(500)
    .attr("transform", function(d) {                   
      
    d.innerRadius = 0;
    d.outerRadius = r;
    return "translate(" + arc.centroid(d) + ")";        
    }).text((d, i) =>this.state.data[i].value+'%')
    .style('opacity', 0)

  paths2
    .transition()
    .delay(500)
    .duration(500)
    .attr('d', arc2)
    .style('opacity', 1)

  text2.transition()
    .delay(500)
    .duration(500)
    .attr("transform", function(d) {                   
  
    d.innerRadius = 0;
    d.outerRadius = r;
    return "translate(" + arc2.centroid(d) + ")";        
    }).text((d, i) =>this.state.innerData[i].value+'%')
    .style('opacity', 0)

  }


console.log(document.getElementsByTagName('svg')[0].getBoundingClientRect());


d3.selectAll('.all')// .transition().style("color","grey").duration(5000)
    .on('mouseover', animPathOver)
    .on('mouseout', animPathOut)
    

// this is attemt of legend realisation



const legNew = d3.select('svg')
    .append('g')
    .attr('class', 'newLeg')

const newElems = legNew.selectAll('.rects')
    .data(this.state.data)
    .enter()
    .append('rect')
    .attr('class','rects')
    .attr('height', 20)
    .attr('width', 0)
    .attr('y', 435)
    .attr('x', (d)=>calcLegendRect(100))
    .attr('fill', (d, i)=> color(i))

const newText = legNew.selectAll('text')
    .data(this.state.data)
    .enter()
    .append('text')
    .text((d)=> d.label)
    .style('fill', 'white')
    .attr('y', 450)
    .attr('x', (d)=>calcLegendText(105)+10)
    .style('opacity', 0)
    
    newText.transition()
    .duration(3000)
    .style('opacity', 1)
    newElems.transition()
    .duration(3000)
    .attr('width', 100)

    const legNew2 = d3.select('svg')
    .append('g')
    .attr('class', 'newLeg2')

const newElems2 = legNew2.selectAll('.rects2')
    .data(this.state.innerData)
    .enter()
    .append('rect')
    .attr('class','rects2')
    .attr('height', 20)
    .attr('width', 0)
    .attr('y', 470)
    .attr('x', (d)=>calcLegendRect2(71))
    .attr('fill', (d, i)=> color2(i))
const newText2 = legNew2.selectAll('text')
    .data(this.state.innerData)
    .enter()
    .append('text')
    .text((d)=> d.label)
    .style('fill', 'white')
    .attr('y', 485)
    .attr('x', (d)=>calcLegendText2(75)+10)
    .style('opacity', 0)
    
    newText2.transition()
    .duration(3000)
    .style('opacity', 1)
    newElems2.transition()
    .duration(3000)
    .attr('width', 71)

  

  }
  render() {

    return (
      <div className="App">

      <ResponsiveContainer width={1000} height={500} >
      <BarChart layout='vertical' data={this.state.dataMiners}
        margin={{top: 30, bottom: 100, left: 400}} >
            <XAxis  hide dataKey="sum_gas" type = 'number' domain = {['dataMin', this.state.dataMiners[0].sum_gas*2]}/>
            <YAxis type = 'category' dataKey='miner' fontSize={12} fill="#2B2B2B"/>
            <Tooltip/>
            
            <Bar name='gas' dataKey="sum_gas" stackId = 'a' fill="#FF1F72" margin={{bottom: 100}} opacity={0.7}>
                <LabelList dataKey="labelGas" position='right' fontSize={12} fill="#2B2B2B" opacity={0.7}/>
            </Bar>
            <Bar name='% from max' opacity={0} dataKey="labelMax" stackId = 'a' fill="#2B2B2B" margin={{bottom: 100}}>
               
            </Bar>
            <Bar name='% from prev' opacity={0} dataKey="labelPrev" stackId = 'a' fill="#2B2B2B" margin={{bottom: 100}}>

            </Bar>

      </BarChart>
      </ResponsiveContainer>

      <LineChart width={600} height={300} data={this.state.dataLine}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="daym"/>
        <YAxis  type="number" domain={['dataMin' , 'dataMax']}/>
        <Tooltip/>
        <Legend />
        <Line type="monotone" opacity={0.7} dataKey="count" stroke="#FF1F72" strokeWidth={4} activeDot={{r: 3, fill: '#2B2B2B', opacity: '0.7'}}
        dot={{ stroke: '#2B2B2B', strokeWidth: 2 , opacity: '0.7'}}/>
      </LineChart>
      
      <div className='d3-elem'>

      <iframe src="https://app.redash.io/eth_analytics/embed/query/136742/visualization/234119?api_key=FnkIbCnjK2r2JzVjIzizZNso6lQRrqwTzOwmu6Yu" width="720" height="391"></iframe>


          

        </div>
        <h1>123123</h1>
      </div>
    );
  }
}

export default App;
