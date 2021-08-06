function upload_avatar(req, res, next) {
    let avatar;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        req.body.avatar = `Error : No files were uploaded.`;
        return next();
    }

    // The name of the input field (i.e. "avatar") is used to retrieve the uploaded file
    avatar = req.files.avatar;
    uploadPath = __dirname + `/../public/images/avatars/${new Date().getTime()}_${avatar.name}`;
    let url = `/images/avatars/${new Date().getTime()}_${avatar.name}`;

    console.log(avatar.mimetype)
    if (!avatar.mimetype.includes("image/")) {
        req.body.avatar = `Error : This file is not an image.`;
        return next();
    }

    if (avatar.size > 5000000) {
        req.body.avatar = `Error : This image is larger than 5 Mb.`;
        return next();
    }

    // Use the mv() method to place the file somewhere on your server
    avatar.mv(uploadPath, function(err) {
        if (err) {
            return res.status(500).send(err);
        } else {
            req.body.avatar = url;
            next();
        }

    });
}

module.exports = upload_avatar;