---
layout: post
title: Controls for Personalization of Autonomous driving system in CARLA Simulator
date: 2019-01-31 13:32:20 +0300
description: Our goal is to develop a driver-in-the-loop framework to enable studying and testing of the personalized assisted driving systems.
img:  argoverse.png # Add image post (optional)
tags: [Motion Planning, Controls, Python]
---

<p align="center">
    <img src="{{site.baseurl}}/assets/img/personalization.png">
</p>

Advanced  driver-assistance  systems  (ADAS)  are  be-ing  deployed  in  modern  vehicles  to  automate,  adaptand  enhance  vehicle  system  for  safer  and  better  driv-ing  experience.  Safety  features  are  designed  to  avoidcollisions  and  accidents  either  by  alerting  the  driver(Passive ADAS) or by taking the control over the vehicle(Active  ADAS).  These  adaptive  features  may  provideadaptive  cruise  control  (ACC),  lane  departure  warning,forward  collision  avoidance,  Lane  keeping  assist  andother forms of driving assistance. However, the genericADAS  system  might  not  be  suitable  for  all  drivers.Hence, personalization of ADAS is being adopted to notonly improve safety but also to adapt the technology tothe user’s driving style. For example, some drivers valueefficiency and time, and feel comfortable being closer toother vehicles. On the other hand, some prefer defensivedriving style where they value safety and maintain largerdistances  from  the  leading  vehicle  (as  depicted in the figure). Our goal is to personalize an assistive driving systemthat  can  learn  and  adapt  to  the  driver’s  style  and  meethis/her needs.

We  aim  to  develop  a  driver-in-the-loop  frameworkfor   studying   and   improving   driver   assisted   systems. The  project  involves  development  of  software  (assisteddriving and personalization) to simulate the driving tasksin  CARLA  simulator  and  the  hardware  to  enable  theinteractive user study. Our planned experiments includetesting the framework to different assisted driving tasks (ACC,  lane  keeping  and  lane  changing)  while  learningand  modifying  the  system  online  to  mimic  the  userdriving behaviour.

In this project, I was responsible for implementing and testing various controller schemes for autonomous driving. Thus, Lateral and Longitudinal PID controller, Stanley Controller and Model Predictive Controller (MPC) are compared. Results show excellent waypoints tracking using the MPC.  

<p align="center">
    <img src="{{site.baseurl}}/assets/img/mpc_carla.gif">
</p>
