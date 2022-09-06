import mongoose from "mongoose";

export const driverSchema = new mongoose.Schema(
    {
        id: {type: String},
        name_driver: {type: String, required: true},
        RATR: {type: String, required: true},
        cellphone_number: {type: String, required: true},
        vehicle_color: {type: String, required: true},
        description_status_move: {type: Boolean, required: true},
        license_plate_vehicle: {type: String, required: true},
        plate_state: {type: String, required: true},
        brand_vehicle: {type: String, required: true},
        model_vehicle: {type: String, required: true},
    },
    {
        versionKey: false
    }
)



export const driver = mongoose.model("driver", driverSchema);