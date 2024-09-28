import mongoose, { Schema } from "mongoose";


const companySchema = new Schema({
  name: { type: String, required: true },
  requirements: { type: String, required: true },
  avatar: {
    type: String,
  },
});

const CompanyModel = mongoose.model("Company", companySchema);
export { CompanyModel };
	
