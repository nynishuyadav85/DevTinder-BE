const mongoose = require('mongoose')

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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

connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Cannot send connection request to yourself")
    }
    next();
})

const ConnectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema)

module.exports = ConnectionRequestModel
