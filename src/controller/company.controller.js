import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { CompanyModel } from "../models/company.model.js";
import { Api_Response } from "../utils/api_Response.js";

const registerCompany = (async (req, res) => {
const avatarLocalPath = req.files?.avatar[0]?.path;

	
	const { name, requirements } = req.body;
 if (!avatarLocalPath) {
	throw new ApiError(400, "Avatar File is Required");
}
const avatar = await uploadOnCloudinary(avatarLocalPath);

if (!avatar) {
	throw new ApiError(400, "Avatar File is Required");
}
	
	const company = await CompanyModel.create({
		name,
		requirements,
		avatar: avatar.url,
	});

	return res
		.status(201)
		.json(new Api_Response(200, company, "Compnay Registered"));

});


const getAllCompnies = (async (req, res) => {
	try {
		const allCompnies = await CompanyModel.find();
		if (allCompnies) {
			res
				.status(200)
				.json(
					new Api_Response(
						200,
						allCompnies,
						"Interview experinces recieved successfully"
					)
				);
		}
	} catch (error) {
		console.log("Error while fetching all experinces", error);
		res
			.status(500)
			.json(
				new Api_Response(500, null, "Not able to fetch all experiences", error)
			);
	}
});

export const getCompanyById = async (req, res) => {
	try {
	  const companyId = req.params.id;
	  const company = await CompanyModel.findById(companyId);

		if (company) {
			res
				.status(200)
				.json(
					new Api_Response(
						200,
						company,
						"Interview experinces recieved successfully"
					)
				);
		}
	} catch (error) {
		console.log("Error while fetching all experinces", error);
		res
			.status(500)
			.json(
				new Api_Response(500, null, "Not able to fetch all experiences", error)
			);
	}
  };
  

export { registerCompany, getAllCompnies };