const express = require('express')
const app = express()
const db = require('./config/db')
const morgan = require('morgan')
const { urlencoded } = require('express')

db()

if (app.get('env') === 'development') {
    app.use(morgan('tiny'))
    console.log('Morgan enabled...');
}
app.use(urlencoded({ extended: true }))
app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port: ${PORT}...`))