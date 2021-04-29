const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const router = new express.Router()
const jwt = require('jsonwebtoken')

//Sign Up
router.post('/users',async(req, res)=>{
    const user= new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.json({ user,status: 'ok', data: token })
    } catch(e) {
        res.json({ status: 'error', error: 'Please provide valid email or password' })
    }
})


//Login
router.post('/users/login', async(req,res)=> {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken()
        res.json({ user,status: 'ok', token })
    } catch(e) {
        res.json({ status: 'error', error: 'Invalid email or password' })
        res.status(400).send();
    }
})

 
//Display all users
router.get('/users/all',async(req,res)=>{
    User.find({}).then((users)=>{
        res.json({ users,status: 'ok'})
    }).catch((e)=>{
        res.status(500).send()
    })
})


//Delete users according to id
router.delete('/users', async(req, res)=>{
    try {
        const user = await User.findByIdAndDelete(req.body.id);

        if(!user) {
            return res.status(404).send()
        }
        res.json({ user,status: 'ok'})
        res.status(200).send(req.user)
    } catch(e) { 
        res.json({ status: 'error', error: 'Please provide valid id' })
        res.status(500).send(e);
    }
})

//Update password
router.patch('/users/update-password',async(req,res)=>{
    const { token, newpassword } = req.body

	if (!newpassword || typeof newpassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (newpassword.length < 7) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
    }
    
    if(newpassword === 'password') {
        return res.json({
            status: 'error',
            error: 'Password cannot be used'
        })
    }

	try {
		const decoded = jwt.verify(token, 'thisismynewcourse')
		const id = decoded._id
		const password = await bcrypt.hash(newpassword, 8)
        await User.findByIdAndUpdate({_id:id}, {"password":password})
		res.json({ status: 'ok' })
	} catch (error) {
		res.json({ status: 'error', error: 'Something went wrong...' })
	}
})


module.exports = router
