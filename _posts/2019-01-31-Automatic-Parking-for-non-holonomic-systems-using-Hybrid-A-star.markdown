---
layout: post
title: Automatic Parking for non holonomic systems using Hybrid A star
date: 2019-01-31 13:32:20 +0300
description: Implementing Hybrid A* in Gazebo for Automatic Parking task. 

img:  astar.gif # Add image post (optional)
tags: [Motion Planning, C++]
---

<p align="center">
    <img src="{{site.baseurl}}/assets/img/astar.gif">
    <figcaption align="center"> Preliminary Results: Real-time motion planning in unknown environment using A* </figcaption>
</p>

In this project, we implement automated parking for a non-holonomic robotic system. Once a designated  parking spot is obtained, a path from the robot's current location to the desired spot is planned by taking into account the vehicle’s non-holonomic constraints and obstacles in the environment. To  create a path, we make use of the hybrid A* algorithm. Here, the coordinates and heading (x,y,θ) are discretized. The created path is optimal in terms of minimal distance to goal. It is also ensured that the path is smooth enough for a robot to manoeuvre. A simple PID controller is used to track the robot on the planned path. The algorithm is tested through simulation in Gazebo.