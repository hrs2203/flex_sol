// Imports
const express = require("express");
const pug = require("pug");

const htmlFxn = require('./scrpt.js');

// Static Definations
const app = express();

app.use(express.json());
app.use(express.static('.'));
app.set('view engine', 'pug');
app.set('views', '.');

class Car {
    constructor(carId, long, lati) {
        this.carId = carId;
        this.long = long;
        this.lati = lati;
        this.hasMoved = true;
    }

    updateLocation(long, lati) {
        this.hasMoved = this.calcDistance(this.long, this.lati, long, lati) >= 1 ? true : false;
        this.long = long;
        this.lati = lati;
    }

    calcDistance(x1, y1, x2, y2) {
        return Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
    }

}


// ======= cache data =========
var tempCounter = 0;
var registerdList = [
    new Car("car1", 0, 0),
    new Car("car2", 1, 0),
    new Car("car3", 0, 4),
    new Car("car4", 4, 6),
];

// ======= update fxn ========
const checkPresence = (car_id) => {
    for (let index = 0; index < registerdList.length; index++) {
        if (registerdList[index].carId == car_id) {
            return index;
        }
    }
    return -1;
}

const registerNewCar = (car_id, lon, lat) => {
    if (checkPresence(car_id) == -1) {
        registerdList.push(new Car(car_id, lon, lat));
    }

}

const updateCarLocation = (car_id, lon, lat) => {
    index = checkPresence(car_id);
    if (index != -1) {
        registerdList[index].long = lon;
        registerdList[index].lati = lat;
    }
}


// ========= api calls ===========
app.get("/", (req, res, next) => {

    setInterval(() => {
        tempCounter += 1;
        console.log(tempCounter);
        htmlFxn(registerdList);
    }, 1000);

    return res.render("car_location.pug", {
        "listData": registerdList
    });

});

app.post('/registerCar', (req, res, next) => {
    car_id = req.body.car_id;
    lon = Number(req.body.lon);
    lat = Number(req.body.lat);
    registerNewCar(car_id, lon, lat);
    return res.json({
        "status" : "success"
    })
});

app.post('/updateLocation', (req, res, next) => {
    car_id = req.body.car_id;
    lon = Number(req.body.lon);
    lat = Number(req.body.lat);
    updateCarLocation(car_id, lon, lat);
    return res.json({
        "status" : "success"
    })
});


// ====== listen port ======
app.listen(3000, console.log("Server started at port 3000..."));

