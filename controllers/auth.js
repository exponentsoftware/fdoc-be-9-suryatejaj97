const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// @desc      POST register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = (req, res) => {
    //Validate request
    if(!req.body){
        res.status(400).send({
            message : "Content cannot be empty"
        })
        return;
    }
  
    // Create a user
    const user = {
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      role: req.body.role
    };
  
    // Save user in the database
    User.create(user)
      .then(data => {
        sendTokenResponse(data,200,res)
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the task."
        });
      });
  };

// @desc      POST login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = (req,res) => {
    const { email,password} = req.body
    //validate request
    if(!email || !password){
        res.status(400).json({success : false ,message : "Add email and password"})
    }

    //find user
    User.findOne({ 
        where : { email : email}
    }).then(user => {
        if(!user){
            res.status(404).json({success: false ,message : "user not found"})
        }
                
        const isMatch = bcrypt.compareSync(password,user.password)
        
        if(!isMatch){
            res.status(400).json({success: false ,message : "enter correct password"})
        }

       sendTokenResponse(user,200,res)
    }).catch(err => {
        res.status(500).json({message : "server error"})
    })
}
  

const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
      });
  
    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };
  
    res
      .status(statusCode)
      .cookie('token', token, options)
      .json({
        success: true,
        token
      });
  };