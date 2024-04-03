import fs from 'node:fs'

const mockData = [

    {
        "id": 1,
        "lat": 40.89534867453229,
        "lng": 29.23049926757813,
        "datetime": "2024-04-03T00:06:49.578Z"
        
    },
    {
        "id": 2,
        "lat": 40.89534867453229,
        "lng": 29.247322082519535,
        "datetime": "2024-04-03T00:06:51.015Z"
        
    },
    {
        "id": 3,
        "lat": 40.89015807207556,
        "lng": 29.258308410644535,
        "datetime": "2024-04-03T00:06:52.199Z"
        
    }
]


export class JsonStorage {

    JSON_FILE = './db/db.json'

    // db autoincrement emulation
    autoincrementId = 0

    constructor() {
        if (!fs.existsSync(this.JSON_FILE)) {

            try {
                fs.writeFileSync(this.JSON_FILE, JSON.stringify(mockData, null, "  "))
                console.log(`Json file created...`)
            } catch (err) {
                console.error(err)
                process.exit(1)
            }

        }

        // prepare autoincrementId
        try {

            const latlangs = this.getAllLatlangsFromJson()

            latlangs.forEach((latlang) => {
                if (latlang.id > this.autoincrementId)
                    this.autoincrementId = latlang.id
            })

        } catch (err) {
            console.error(err)
        }


    }


    getAllLatlangsFromJson() {

        const jsonData = fs.readFileSync(this.JSON_FILE, 'utf8')

        return JSON.parse(jsonData)

    }

    addNewLatlangToJson(newLatlang) {
        const latlangs = this.getAllLatlangsFromJson()

        this.autoincrementId++
        newLatlang.id = this.autoincrementId

        newLatlang.datetime = new Date(Date.now()).toISOString()

        latlangs.push(newLatlang)

        this.writeAllLatlangsToJson(latlangs)

        return newLatlang

    }

    removeLatlangFromJson(id) {
        const latlangs = this.getAllLatlangsFromJson()

        const newLatlangs = latlangs.filter(latlang => latlang.id !== id)

        this.writeAllLatlangsToJson(newLatlangs)
        
        return(newLatlangs)


    }

    writeAllLatlangsToJson(latlangArray) {
        try {

            fs.writeFileSync(this.JSON_FILE, JSON.stringify(latlangArray, null, "  "))

        } catch (err) {

            console.error(err);

        }
    }

}