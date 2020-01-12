---
layout: post
title: Multi Snake Transformer Robot | Undergraduate Thesis
date: 2019-01-22 13:32:20 +0300
description: This work lays foundation to the development of modular robotic system that extends the traversing versatility of snake robot to the legged locomotion.   
img:  /msmr/walker.gif # Add image post (optional)
tags: [System Design, CAD Modelling, Legged Locomotion, ROS, VRep, C++]
poster: /assets/pdf/Self-ReconfigurableTransformerRobot.pdf
---
<p align="center">
    <img src="{{site.baseurl}}/assets/img/msmr/strip.png">
</p>
Operations in search and rescue requires self-reconfigurable robotics systems to overcome unforeseen locomotion hindrances. An individual robotic system excellent in accomplishing a specific task fails to overcome operations. This work aims developing a modular self-reconfigurable robotic system which extends the traversing versatility of snake robots to legged locomotion. Each snake robot form a basic building block of the modular system. Simulation results verify the capability of the design to transform and execute legged locomotion. The robotic system can easily rearrange to various linear, bipedal and quadrupedal morphologies through magnetic connections. 


<style>
.mySlides {display:none}
.w3-left, .w3-right, .w3-badge {cursor:pointer}
.w3-badge {height:13px;width:13px;padding:0}
</style>
<body>

<div class="w3-container">
  <h2>Slideshow Indicators</h2>
  <p>An example of using buttons to indicate how many slides there are in the slideshow, and which slide the user is currently viewing.</p>
</div>

<div class="w3-content w3-display-container" style="max-width:800px">
  <img class="mySlides" src="/assets/img/msmr/design1.png" style="width:100%">
  <img class="mySlides" src="/assets/img/msmr/design2.png" style="width:100%">
  <img class="mySlides" src="/assets/img/msmr/design3.png" style="width:100%">
  <div class="w3-center w3-container w3-section w3-large w3-text-white w3-display-bottommiddle" style="width:100%">
    <div class="w3-left w3-hover-text-khaki" onclick="plusDivs(-1)">&#10094;</div>
    <div class="w3-right w3-hover-text-khaki" onclick="plusDivs(1)">&#10095;</div>
    <span class="w3-badge demo w3-border w3-transparent w3-hover-white" onclick="currentDiv(1)"></span>
    <span class="w3-badge demo w3-border w3-transparent w3-hover-white" onclick="currentDiv(2)"></span>
    <span class="w3-badge demo w3-border w3-transparent w3-hover-white" onclick="currentDiv(3)"></span>
  </div>
</div>

<script>
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" w3-white", "");
  }
  x[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " w3-white";
}
</script>

<p align="center">
    <img src="{{site.baseurl}}/assets/img/msmr/walker.gif">
    <figcaption align="center"> Quadrupedal robot formed using four snake robots.</figcaption>
</p>

## Snake Robots
<p align="center">
    <img src="{{site.baseurl}}/assets/img/msmr/rolling_good.gif">
    <figcaption align="center"> Rolling Gait of snake robot</figcaption>
</p>


## Snake Gaits
<!-- <p align="center">
    <img src="{{site.baseurl}}/assets/img/msmr/rolling_good.gif">
    <figcaption align="center"> Rolling Gait of snake robot</figcaption>
</p>

<p align="center">
    <img src="{{site.baseurl}}/assets/img/msmr/rolling_good.gif">
    <figcaption align="center"> Quadrupedal robot formed using four snake robots.</figcaption>
</p> -->

