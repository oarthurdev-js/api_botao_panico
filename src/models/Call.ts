import mongoose from "mongoose";

const CallSchema = new mongoose.Schema(
   { 
        id: {type: String},
        driver: {type: mongoose.Schema.Types.ObjectId, ref: 'driver', required: true},
        time_call: {type: Date, required: true},
        latitude: {type: String, required: true},
        longitude: {type: String, required: true},
        radius: {type: String, required: true},
        cellphone_number: {type: String, required: true}
   }
)

export const calls = mongoose.model('calls', CallSchema);