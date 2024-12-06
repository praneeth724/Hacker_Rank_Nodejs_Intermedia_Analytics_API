const Analytic = require('../models/analytics')
const { Op } = require('sequelize')
const {subtractSecondsFromCurrentTime} = require('../utils');
// Function subtractSecondsFromCurrentTime is a utility function which accepts the seconds to subtract from thee current time and
// returns the javascript date object

class Controller {
    static async getAllAnalytics(req,res){
        try{
            const data = await Analytic.findAll()
            res.status(200).json(data)
        }catch(err){
            throw new Error(err)
        }
    }

    static async createAnalytic(req, res) {
        try{
            let {body} = req;
            body = body.map((el) => {
                const obj = {
                    ...el,
                    date: new Date()
                }
                return obj
            })
            let result = []
            for (const item of body) {
                let diff = 0;
                if(item.eventType === "click") {
                    diff = 3000
                } else if (item.eventType === "pageView") {
                    diff = 5000
                }
                const time = new Date(item.date.getTime() - diff)
                const query = await Analytic.findOne({
                    where: {
                        user: item.user,
                        eventType: item.eventType,
                        date: {
                            [Op.gt]: time
                        }
                    }
                })
                if(!query){
                    const data = await Analytic.create(item)
                    result.push(data)
                }
            }
            res.status(201).json({ingested: result.length})
        }catch(err){
            throw new Error(err)
        }

    }
    static async notAllowed(req,res){
        res.status(405).json({message: "Not Allowed"})
    }
}

module.exports = Controller;