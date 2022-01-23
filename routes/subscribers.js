import express from "express"
import Subscriber from '../models/subscriber.js'
const router=express.Router()



//get all
router.get('/',async(req,res)=>{
    try{
        const subscribers=await Subscriber.find()
        res.json(subscribers)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

//make one 
router.post('/',async(req,res)=>{
    const subscriber= new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })
    try{
        const newSubscriber=await subscriber.save()
        res.status(201).json(newSubscriber)
    }catch(err){
        res.status(400).json({message: err.message})
    }

})

//get one 
router.get('/:id',getSubscriber,(req,res)=>{
    res.status(202).json(res.subscriber)

})

//update
router.patch('/:id',getSubscriber,async (req,res)=>{
    if(req.body.name != null){
        res.subscriber.name=req.body.name
    }
    if(req.body.subscribedToChannel != null){
        res.subscriber.name = req.body.subscribedToChannel
    }
    try{
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    }catch (err){
        res.status(400).json({message: err.message})
    }
})

//delete
router.delete('/:id',getSubscriber,async (req,res)=>{
    try{
        var id = res.subscriber.id
        await res.subscriber.remove()
        res.json({message: 'deleted sub ' + id })
    }catch(err){
        res.status(500).json({message1: err.message})
    }

})

async function getSubscriber(req,res,next){
    let subscriber
    try{
        subscriber=await Subscriber.findById(req.params.id)
        if (subscriber===null){
            return res.status(404).json({message: 'Cannot find subscriber'})
        }
    }catch(err){
        return res.status(500).json({message1: err.message})
    }

    res.subscriber=subscriber 
    next()
}

export default router