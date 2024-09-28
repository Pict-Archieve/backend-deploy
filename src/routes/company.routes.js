import { Router } from "express";

import { upload } from "../middleware/multer.middleware.js";
import { registerCompany, getAllCompnies,getCompanyById } from "../controller/company.controller.js"
const router = Router();

router.route("/register").post(
	upload.fields([
		{
			name: "avatar",
			maxCount: 1,
		},
	]),
	registerCompany
	
);

router.route('/allCompanies').get(
	getAllCompnies
);

router.route('/:id').get(
	getCompanyById
  );


//secured routes

export default router;