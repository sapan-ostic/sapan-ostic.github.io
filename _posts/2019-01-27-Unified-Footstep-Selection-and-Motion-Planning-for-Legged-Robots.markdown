---
layout: post
title: Unified Footstep Selection and Motion Planning for Legged Robots 
date: 2019-01-27 13:32:20 +0300
description: To address the problem of dynamic footstep planning for legged robots, we developed an iterative optimization method that plans in real-time over a receding horizon.  # Add post description (optional)
img: flyped.gif # Add image post (optional)
fig-caption: # Add figcaption (optional)
tags: [Legged Robots, Motion Planning, Model Predictive Control, MATLAB]
---
To address the problem of dynamic footstep planning for legged robots, we developed an iterative optimization method that plans in real-time over a receding horizon. We provided analytical solution to linearization of event-based discrete hybrid dynamics, allowing superior accuracy with lower computation and time complexity compared to numerical differentiation. Besides this, we established new method to incorporate terrain as soft-state constraint into the iLQR formulation.

<p align="center">
    <img src="{{site.baseurl}}/assets/img/pic_walker_plot.png">
     <figcaption> Foothold optimization conforming to terrain cost map using gradientdescent of local polynomials. </figcaption>
</p>

>Unified Foothold Section and Motion Planning for Legged Systems in Real-Time C. Steven, *Sapan Agrawal*, Matthew Travers, IEEE-RAS International Conference on Humanoid Robots, 2019. 

<p align="center">
    <img src="{{site.baseurl}}/assets/img/flyped.gif">
     <figcaption> Hardware implementation done by Abhimanyu and Steven    </figcaption>
</p>
