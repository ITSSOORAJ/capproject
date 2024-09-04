const mongoose = require( "mongoose");

const managerRequestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email:{type:String, required: true, unique: true},
    phone:{type:String, required: true},
    status:{type:String, enum: ["pending", "approved", "rejected"], default: "pending"},
}, { timestamps: true });

const  ManagerRequest = mongoose.model(" ManagerRequest", managerRequestSchema);

module.exports =  ManagerRequest;