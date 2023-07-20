const mongoose = require('mongoose');
const {mongooseErrorHandler} = require('../../helpers/index');

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'City can`t be without name'],
    },
    info: {
        title: String,
        description: String,
        images: [
            {
                original: String,
                thumbnail: String
            },
        ]
    },
    routes:
    {
        transportation1: String,
        transportation1Img: String,
        transportation2: String,
        transportation2Img: String,
    },
    hotels: [
        {
            name: String,
            image: String,
            price: String,
            description: String,
            deal: String,
            rating: Number,
            category: {
                type: String,
                default: 'hotels',
            },
        },
    ],
    restaurants: [
        {
            name: String,
            description: String,
            image: String,
            category: {
                type: String,
                default: 'restaurants',
            },
            cuisine: {
                type: String,
                default: 'Ukrainian cuisine',
            },
        },
    ],
    entertainment: {
        videoID: String,
    },
}, { versionKey: false, timestamps: true });

citySchema.post('save', mongooseErrorHandler);

const City = mongoose.model('city', citySchema);

module.exports = {City}

