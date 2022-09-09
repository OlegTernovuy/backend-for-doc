require('dotenv').config()
const {check,validationResult} = require('express-validator')
const express = require('express')
const cors = require('cors')
const VaccinesController = require('./controllers/VaccinesController')
const PricesController = require('./controllers/PricesController')
const PatientsController = require('./controllers/PatientsController')
const AuthController = require('./controllers/AuthController')

const PORT = process.env.PORT || 5005

const app = express()

app.use(cors())
app.use(express.json())

app.get('https://doctor-study-project.herokuapp.com//vaccines',VaccinesController.getVaccines)

app.post('https://doctor-study-project.herokuapp.com//vaccines',VaccinesController.addVaccine)

app.delete('https://doctor-study-project.herokuapp.com//vaccines/:id',VaccinesController.removeVaccine)

app.put('https://doctor-study-project.herokuapp.com//vaccines/:id',VaccinesController.editVaccine)


app.get('https://doctor-study-project.herokuapp.com//prices',PricesController.getPrices)

app.post('https://doctor-study-project.herokuapp.com//prices',PricesController.addPrice)

app.delete('https://doctor-study-project.herokuapp.com//prices/:id', PricesController.removePrice)

app.put('https://doctor-study-project.herokuapp.com//prices/:id',PricesController.editPrice)


app.get('https://doctor-study-project.herokuapp.com//patients', PatientsController.getPatients)

app.post('https://doctor-study-project.herokuapp.com//patients',PatientsController.addPatient)


app.post('https://doctor-study-project.herokuapp.com//auth/registration',[
	check("username","Логін має бути не менше 3 символів").isLength({min:3,max:20}),
	check("password","Пароль має бути не менше 4 символів").isLength({min:4,max:20})
]
, AuthController.registration)

app.post('https://doctor-study-project.herokuapp.com//auth/login',AuthController.login)


app.listen(PORT,() => {
}) 
