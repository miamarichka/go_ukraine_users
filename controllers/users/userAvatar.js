const { ImgUploader } = require("../../middlewares");
const { User } = require("../../models/user");

const userAvatar = async (req, res) => {
    const { _id } = req.user;
    const { avatarID } = req.body;

    const imgTag = await ImgUploader.createImageTag(avatarID);

    const srcStartIndex = imgTag.indexOf("=");
    const srcEndIndex = imgTag.lastIndexOf("'");
    const url = imgTag.slice(srcStartIndex + 2, srcEndIndex);

    await User.findByIdAndUpdate(_id, {
        avatarID,
        avatarURL: url,
    }, {
        new: true
    });

    res.status(200).json({ avatarURL: url })
}

module.exports = userAvatar;