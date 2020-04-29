---
layout: post
title: Motion Forecasting for Autonomous Vehicles using Argoverse Dataset
date: 2019-01-31 13:32:20 +0300
description: Predicting socially plausible future trajectories of the target vehicles in the environment using combination of Seq2Seq Prediction and GANs.

img:  argoverse.png # Add image post (optional)
tags: [Motion Planning, Deep Learning, Python]
---

<p align="center">
    <img src="{{site.baseurl}}/assets/img/argoverse.png">
</p>

Autonomous vehicles will be soon share roads with the humans, it is essential for the technology to estimate the human driver's intention in order to make better decision, promoting safety and user experience. This process of proactively anticipating the traffic actor's future behavior (motion or trajectory) is generally termed as motion forecasting. In this work, we propose to tackle the general problem of motion forecasting where for a given prior observation of N time-steps, we predict the target vehicle's (TV) trajectory for M time-steps in future.    

A review of various deep-learning based vehicle behavior approaches has been provided by [[mozaffari2019deep]](https://arxiv.org/abs/1912.11676). Recurrent Neural Networks (RNNs) and Long-Short Term Memory (LSTM) are more commonly used neural networks to model and learn sequence to sequence mapping using the Encoder-Decoder modules [[park2018sequence]](https://arxiv.org/abs/1802.06338). In this project, we plan to use Generative Adversarial Networks (GANs) [[agrim2018socialGANs]](http://openaccess.thecvf.com/content_cvpr_2018/papers/Gupta_Social_GAN_Socially_CVPR_2018_paper.pdf) which has originally been used to predict the motion of the pedestrians interacting with each other. For training and testing purposes, we will use Argoverse Motion Forecasting dataset [[chang2019argoverse]](https://www.argoverse.org/) and compare the results from Social Ways implementation with the provided baseline methods: Social LSTM, Encoder-Decoder LSTM Architecture.