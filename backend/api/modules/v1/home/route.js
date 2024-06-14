var express = require('express');
var router = express.Router();
var home_model = require("./home_model");
var common = require("../../../config/common");
const middleware = require('../../../middleware/validators');
const { t } = require('localizify');


//APIs

//listing category
router.post("/listing-category",function(req,res){
    var request = req.body
    home_model.listingCategory(request,function(code,message,data){
        common.response(req, res, code, message, data);
    })
});

//listing sub-category
router.post("/listing-sub-category/:category_id",function(req,res){
    var request = req.body
    request.category_id = req.params.category_id

    home_model.listingSubCategory(request,function(code,message,data){
        common.response(req, res, code, message, data);
    })
});

//listing category and sub-category
router.get("/listing-sub-and-category",function(req,res){
    var request = req.body
    home_model.listingBoth(request,function(code,message,data){
        common.response(req, res, code, message, data);
    })
});

//listing product
router.post("/listing-product/:sub_category_id",function(req,res){
    var request = req.body
    request.sub_category_id = req.params.sub_category_id
    home_model.listingProduct(request,function(code,message,data){
        common.response(req, res, code, message, data);
    })
});

//listing product details
router.post("/listing-product-details/:product_id",function(req,res){
    var request = req.body
    request.product_id = req.params.product_id
    home_model.listingProductDetails(request,function(code,message,data){
        common.response(req, res, code, message, data);
    })
});

//listing multiple category to sub category
router.post("/multi-sub-category", function (req, res) {
    request = req.body

    home_model.multiCate(request, function (code, message, data) {
        common.response(req, res, code, message, data);
    })

});

//listing multiple category to sub category
router.post("/filter", function (req, res) {
    request = req.body

    home_model.filterProduct(request, function (code, message, data) {
        common.response(req, res, code, message, data);
    })

});

// //job preview
// router.post("/job-preview",function(req,res){
//     request = req.body

//     var rules = {
//         job_id : "required"
//     }

//     var message = {
//         required : t('required'),
//     }

//     request.user_id = req.user_id
//     if(middleware.checkValidationRules(res,request,rules,message)){
//         home_model.jobPreview(request,function(code,message,data){
//             common.response(req, res, code, message, data);
//         })
//     }

// });

// //job apply
// router.post("/job-apply",function(req,res){
//     request = req.body

//     var rules = {
//         job_id : "required"
//     }

//     var message = {
//         required : t('required'),
//     }

//     request.user_id = req.user_id
//     if(middleware.checkValidationRules(res,request,rules,message)){
//         home_model.applyJob(request,function(code,message,data){
//             common.response(req, res, code, message, data);
//         })
//     }

// });

// //job feedback
// router.post("/feedback",function(req,res){
//     request = req.body

//     var rules = {
//         job_id : "required",
//         reason : "required"
//     }

//     var message = {
//         required : t('required'),
//     }

//     request.user_id = req.user_id
//     if(middleware.checkValidationRules(res,request,rules,message)){
//         home_model.feedback(request,function(code,message,data){
//             common.response(req, res, code, message, data);
//         })
//     }

// });

// //job recruiter profile
// router.post("/recruiter-profile",function(req,res){
//     request = req.body

//     var rules = {
//         recruiter_id : "required",
//     }

//     var message = {
//         required : t('required'),
//     }

//     request.user_id = req.user_id
//     if(middleware.checkValidationRules(res,request,rules,message)){
//         home_model.recruiterProfile(request,function(code,message,data){
//             common.response(req, res, code, message, data);
//         })
//     }

// });

// //working in progress
// router.get("/work-in-progress",function(req,res){
//     request = req.body
    
//     request.user_id = req.user_id
//     home_model.workInProgress(request,function(code,message,data){
//         common.response(req, res, code, message, data);
//     })
// });

// //job apply filter
// router.post("/filter-job-apply",function(req,res){
//     request = req.body

//     var rules = {
//         filter : "required",
//     }

//     var message = {
//         required : t('required'),
//     }

//     request.user_id = req.user_id
//     if(middleware.checkValidationRules(res,request,rules,message)){
//         home_model.filterJobApply(request,function(code,message,data){
//             common.response(req, res, code, message, data);
//         })
//     }

// });

// //listing interview available date slot
// router.post("/listing-interview-date",function(req,res){
//     request = req.body

//     var rules = {
//         job_id : "required",
//     }

//     var message = {
//         required : t('required'),
//     }

//     request.user_id = req.user_id
//     if(middleware.checkValidationRules(res,request,rules,message)){
//         home_model.listingInterviewDate(request,function(code,message,data){
//             common.response(req, res, code, message, data);
//         })
//     }

// });

// //listing interview available  time slot
// router.post("/listing-interview-time",function(req,res){
//     request = req.body

//     var rules = {
//         job_id : "required",
//         date : "required"
//     }

//     var message = {
//         required : t('required'),
//     }

//     request.user_id = req.user_id
//     if(middleware.checkValidationRules(res,request,rules,message)){
//         home_model.listingInterviewTime(request,function(code,message,data){
//             common.response(req, res, code, message, data);
//         })
//     }

// });

// //request interview
// router.post("/request-interview",function(req,res){
//     request = req.body

//     var rules = {
//         job_id : "required",
//         date_id : "required",
//         time_id : "required",
//         address : "required",
//         latitude : "required",
//         longitude : "required"
//     }

//     var message = {
//         required : t('required'),
//     }

//     request.user_id = req.user_id
//     if(middleware.checkValidationRules(res,request,rules,message)){
//         home_model.requestInterview(request,function(code,message,data){
//             common.response(req, res, code, message, data);
//         })
//     }

// });

// //re-schedule interview
// router.post("/reschedule-interview",function(req,res){
//     request = req.body

//     var rules = {
//         job_id : "required",
//         date_id : "required",
//         time_id : "required",
//         address : "required",
//         latitude : "required",
//         longitude : "required"
//     }

//     var message = {
//         required : t('required'),
//     }

//     request.user_id = req.user_id
//     if(middleware.checkValidationRules(res,request,rules,message)){
//         home_model.rescheduleInterview(request,function(code,message,data){
//             common.response(req, res, code, message, data);
//         })
//     }

// });

// //recruiter feedback
// router.post("/recruiter-feedback",function(req,res){
//     request = req.body

//     var rules = {
//         job_id : "required",
//     }

//     var message = {
//         required : t('required'),
//     }

//     request.user_id = req.user_id
//     if(middleware.checkValidationRules(res,request,rules,message)){
//         home_model.recruiterFeedback(request,function(code,message,data){
//             common.response(req, res, code, message, data);
//         })
//     }

// });

// //listing calender
// router.post("/listing-calender",function(req,res){
//     request = req.body

//     var rules = {
//         date : "required",
//     }

//     var message = {
//         required : t('required'),
//     }

//     request.user_id = req.user_id
//     if(middleware.checkValidationRules(res,request,rules,message)){
//         home_model.listingCalender(request,function(code,message,data){
//             common.response(req, res, code, message, data);
//         })
//     }

// });

// //listing connections
// router.post("/listing-connections",function(req,res){
//     request = req.body

//     var rules = {
//         connection_filter : "required",
//     }

//     var message = {
//         required : t('required'),
//     }

//     request.user_id = req.user_id
//     if(middleware.checkValidationRules(res,request,rules,message)){
//         home_model.listingConnection(request,function(code,message,data){
//             common.response(req, res, code, message, data);
//         })
//     }

// });

module.exports = router