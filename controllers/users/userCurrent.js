const userCurrent = (req, res) => {
    const { name, email } = req.user;
    if (req.user.avatarURL) {
        res.status(200).json({ name, email, avatarURL: req.user.avatarURL });
    } else {
        res.status(200).json({ name, email });
    }
}

module.exports = userCurrent;