/** @format */

const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

require("dotenv").config();
const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API_KEY,
    api_secret: CLOUD_API_SECRET,
    secure: true,
});

const { requestErrorHandler } = require("../helpers");

const tempDir = path.join(__dirname, "../", "tempDir");

class ImgUploader {
    static upload(name, userId) {

        const multerConfig = multer.diskStorage({
            destination: tempDir,
            filename: function (req, file, cb) {
                cb(null, file.fieldname + "-" + `${userId}` + '.jpeg');
            },
        });
        const multerFilter = (req, file, cb) => {
            if (!file) {
                return requestErrorHandler(404, "Please, upload an image");
            }
            if (file.mimetype.startsWith("image/")) {
                cb(null, true);
            } else {
                return requestErrorHandler(400, "Only images can be upload");
            }

        };

        return multer({
            storage: multerConfig,
            fileFilter: multerFilter,
            limits: {
                fileSize: 5 * 1024 * 1024,
            },
        }).single(name);
    }

    static save(req, res, next) {
        const { path } = req.file;

        const uploadImage = async (imagePath = path) => {
            const options = {
                use_filename: true,
                unique_filename: true,
                overwrite: false,
            };

            try {
                const result = await cloudinary.uploader.upload(imagePath, options);
                req.body.avatarID = result.public_id;
                fs.unlinkSync(path);
                next();

            } catch (error) {
                next(requestErrorHandler(500, 'Something went wrong'))
            }
        };
        uploadImage();
    };

    static createImageTag(publicId) {
        const imageTag = cloudinary.image(publicId, {
            transformation: [
                { width: 225, height: 225, gravity: 'faces', crop: 'thumb' },
            ],
        });

        return imageTag;
    };
}

module.exports = ImgUploader; 

