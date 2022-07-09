const {User} = require("../../models/user");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) =>{
    const {path: tempUpload, originalname} = req.file;
    const {_id: id} = req.user;
    const userPersonAvatar = `${id}_${originalname}`;
    try {
        const resultUpload = path.join(avatarsDir, userPersonAvatar);
        await fs.rename(tempUpload, resultUpload);
        const minimizationAvatar = await Jimp.read(resultUpload);
        const resizeAvatar = await minimizationAvatar.resize(250, 250);
        await resizeAvatar.write(resultUpload)
        const avatarURL = path.join("public", "avatars", userPersonAvatar);
        await User.findByIdAndUpdate(req.user._id, {avatarURL}, {new: true});
        console.log(req.user._id);
        res.json({avatarURL})
    } catch (error) {
        await fs.unlink(tempUpload);
        throw error;
    }

}

module.exports = updateAvatar;