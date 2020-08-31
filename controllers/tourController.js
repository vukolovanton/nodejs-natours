const fs = require('fs');
const { nextTick } = require('process');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.checkId = (req, res, next, val) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'FAILED',
            message: 'INVALID ID',
        })
    }
    next();
};

exports.checkBody = (req, res, next) => {
    if (req.body.name && req.body.price) {
        return next();
    };
    
    return res.status(500).json({
        status: 'FAILED',
        message: 'BAD BODY'
    });
};


//Get All Tours
exports.getAllTours = (req, res) => {
    console.log('asd')
    res.status(200).json({
        status: 'SUCCESS',
        results: tours.length,
        data: {
            tours
        }
    });
};

// Get Singlie Tour
exports.getTour = (req, res) => {
    const tour = tours.find(t => t.id === parseInt(req.params.id));
    res.status(200).json({
        status: 'SUCCESS',
        data: {
            tour
        }
    });
};

//Create Tour
exports.createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'SUCCESS',
            data: {
                tour: newTour
            }
        })
    });
};

// Update Tour
exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'SUCCESS',
    })
}

// Delete tour
exports.deleteTour = (req, res) => {
    res.status(200).json({
        status: 'SUCCESS',
    })
};

