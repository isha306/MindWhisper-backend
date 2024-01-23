const Form = require("../models/Form")

exports.addForm = async (req, res,next) => {
    try {
        const _form = new Form(req.body);
        await _form.save()
        req.subject="user registered"
        req.text="you have succesfully signed up"
        next()
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "error occured" })
    }
}