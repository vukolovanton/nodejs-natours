const Tour = require('../model/tourModel');

//Get All Tours
exports.getAllTours = async (req, res) => {
  try {
    // BUILD QUERY
    // filtering
    const queryObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    // advanced filtering
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    const query = Tour.find(JSON.parse(queryString));

    // EXECUTE QUERY
    const tours = await query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'SUCCESS',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: 'FAILED',
      data: {
        error: e,
      },
    });
  }
};

// Get Singlie Tour
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'SUCCESS',
      data: {
        tour,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: 'FAILED',
      data: {
        error: e,
      },
    });
  }
};

//Create Tour
exports.createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);

    res.status(201).json({
      status: 'SUCCESS',
      data: {
        tour,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: 'FAILED',
      data: {
        error: e,
      },
    });
  }
};

// Update Tour
exports.updateTour = async (req, res) => {
  try {
    const tour = Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'SUCCESS',
      data: {
        tour,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: 'FAILED',
      data: {
        error: e,
      },
    });
  }
};

// Delete tour
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'SUCCESS',
    });
  } catch (e) {
    res.status(400).json({
      status: 'FAILED',
      data: {
        error: e,
      },
    });
  }
};
