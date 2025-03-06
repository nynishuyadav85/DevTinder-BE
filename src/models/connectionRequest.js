const mongoose = require('mongoose')

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored", "intrested", "rejected", "accepted"],
            message: `{VALUE} is incorrect type `
        }
    }
}, {
    timestamps: true
}
);

const ConnectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema)

module.exports = ConnectionRequestModel
