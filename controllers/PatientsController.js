const {MongoClient,ObjectId} = require('mongodb')
const client = new MongoClient(process.env.URL)

const getPatients = async (req,res) => {
	try{
		await client.connect()
		const data = client.db('doctor').collection('patients').find()
		data.toArray((err,result) => {
			if(result){
				client.close()
				return res.status(200).json(result)
			}
			client.close()
			res.status(400).json({success:false})
		})
	}catch(err){
		res.status(400).json({success:false})
		console.log(err)
	}
}

const addPatient = async (req,res) => {
	try{
		if(req.body.name && req.body.phone){
			await client.connect()

			const {time, date} = req.body

			const candidate = await client.db('doctor').collection('patients').findOne({time})
			const candidate2 = await client.db('doctor').collection('patients').findOne({date})

			if(candidate && candidate2){
				client.close()
				return res.status(400).json({message:"Оберіть інший час! ",success:false})
			}

			const newPatient = {_id: new ObjectId(),...req.body}
			
			const isSuccess = await client.db('doctor').collection('patients').insertOne(newPatient)
			if(isSuccess.acknowledged){
				res.status(200).json({message:"Ви успішно записалися на прийом! ", success:true})
			}
			client.close()
		}
	}catch(error){
		res.status(400).json({success:false})
		client.close()
		console.log(error)
	}
}

const removePatient = async (req,res) => {
	try{
		const id = req.params.id
		if(id){
			await client.connect()
			client.db('doctor').collection('patients').deleteOne({_id: new ObjectId(id)},(err,result) => {
				if(result.acknowledged){
					res.status(200).json({success:true})
					client.close()
				}else{
					res.status(400).json({success:false})
					client.close()
				}
			})
			
		}

	}catch(err){
		console.log(err)
		res.status(400).json({success:false})
	}
}

module.exports = {getPatients, addPatient, removePatient}