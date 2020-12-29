// Imports
const express = require("express");
const pug = require("pug");

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
        this.lastUpdatedCounter = 10;
    }

    updateLocation(long, lati) {
        this.hasMoved = this.calcDistance(this.long, this.lati, long, lati) >= 1;
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
        registerdList[index].hasMoved = true;
        registerdList[index].lastUpdatedCounter = 10;
    }
}

const updateCarsDetail = () => {
    var newTime = new Date();
    for (let index = 0; index < registerdList.length; index++) {
        registerdList[index].lastUpdatedCounter -= 2;
        if (registerdList[index].lastUpdatedCounter <= 0 ){
            registerdList[index].hasMoved = false;
        }
    }
}


// ========= api calls ===========
app.get("/", (req, res, next) => {
    updateCarsDetail();
    return res.render("car_location.pug", {
        "listData": registerdList,
    });
});

/*
request format
{
    "car_id": "car_21",
    "lon": 11,
    "lat": 11
}
*/
app.post('/registerCar', (req, res, next) => {
    car_id = req.body.car_id;
    lon = Number(req.body.lon);
    lat = Number(req.body.lat);
    registerNewCar(car_id, lon, lat);
    return res.json({
        "status": "success"
    })
});

/*
request format
{
    "car_id": "car_21",
    "lon": 11,
    "lat": 11
}
*/
app.post('/updateLocation', (req, res, next) => {
    car_id = req.body.car_id;
    lon = Number(req.body.lon);
    lat = Number(req.body.lat);
    updateCarLocation(car_id, lon, lat);
    return res.json({
        "status": "success"
    })
});


// ====== listen port ======
app.listen(3000, console.log("Server started at port 3000..."));

