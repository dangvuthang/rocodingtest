const mongoose = require("mongoose"), Schema = mongoose.Schema

const imageSchema = new mongoose.Schema({
    _id : Schema.Types.ObjectId,
    recordId : { type: Schema.Types.ObjectId, ref: 'Record' },
    takenDate: Date,
    photoUrl : String,
});

module.exports = mongoose.model("Image", imageSchema);