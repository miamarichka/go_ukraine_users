const { catchAsyncWrapper } = require('../../helpers');
const getInfo = require('./getInfo');
const getHotels = require('./getHotels');
const getRestaurants = require('./getRestaurants');
const getRoute = require('./getRoute');
const getEntertm = require('./getEntertm');

module.exports = {
    getInfo: catchAsyncWrapper(getInfo),
    getRoute: catchAsyncWrapper(getRoute),
    getHotels: catchAsyncWrapper(getHotels),
    getRestaurants: catchAsyncWrapper(getRestaurants),
    getEntertm: catchAsyncWrapper(getEntertm),
}