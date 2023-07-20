const { City } = require("../../models/cities");

const getInfo = async (req, res) => {
    console.log(req.body)

    await City.create({...req.body})
    res.status(200).json({message: 'lviv'})
}

module.exports = getInfo;