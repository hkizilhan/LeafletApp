import express from 'express'
import cors from 'cors'

import { JsonStorage } from './lib/storage.js'

const app = express()
const port = 3000

const storage = new JsonStorage()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))


app.get('/api', (req, res) => {
    
    res.json(storage.getAllLatlangsFromJson())

})


app.post('/api', (req, res) => {
    
    const newLatlang = req.body.latlang
    
    res.json(storage.addNewLatlangToJson(newLatlang))
})


app.delete('/api/:id', (req, res) => {
    
    const id = parseInt(req.params.id)
    
    res.json(storage.removeLatlangFromJson(id))
})

app.get('/api/download', (req, res) => {
    
    res.set('Content-Disposition', 'attachment; filename=db.json')
    
    const latlangs = storage.getAllLatlangsFromJson()
    latlangs.map((latlang) => {
        latlang.lat = String(latlang.lat)
        latlang.lng = String(latlang.lng)
        return latlang
    })
    
    res.send(JSON.stringify(latlangs, null, "  "))

})


app.get('*', (req, res) => {
    console.error("Unknown request: ", req.path)
    res.sendStatus(400)
})

app.listen(port, () => {
    console.log(`Leaflet app listening on port http://localhost:${port}`)
})




