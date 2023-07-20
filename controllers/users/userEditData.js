const bcrypt = require('bcrypt');

const { User } = require("../../models/user");

const userEditData = async (req, res) => {
    const { name, email, newPassword } = req.body;
    const { _id } = req.user;
    console.log(req.body)

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(_id, {
        name, email, password: hashedPassword
    });

    res.status(200).json({
        name, email
    })
};

module.exports = userEditData;