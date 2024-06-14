var conn = require("../../../config/database");
var common = require("../../../config/common");
var constant = require("../../../config/constant");
// var md5 = require('md5');
var asyncLoop = require('node-async-loop');
// const { request } = require("../api_document");
// const { result, forEach } = require("lodash");
// const { query } = require("express");

var home_model = {

    //Listing category
    listingCategory: function (request, callback) {
        var category = `select id,name,image from tbl_category where parent_id IS NULL and is_active = 1 and is_deleted = 0`

        conn.query(category, function (error, result) {

            if (error) {
                callback('0', { keyword: 'sql_error', content: { error: "listing category" } }, error);
            } else {
                if (result.length > 0) {
                    callback('1', { keyword: 'data_found', content: {} }, result);
                } else {
                    callback('1', { keyword: 'data_not_found', content: {} }, result);
                }
            }
        })
    },

    //Listing sub-category
    listingSubCategory: function (request, callback) {
        var sub_category = `select id,parent_id,name,image from tbl_category where parent_id = ${request.category_id} and is_active = 1 and is_deleted = 0`

        conn.query(sub_category, function (error, result) {
            if (error) {
                callback('0', { keyword: 'sql_error', content: { error: "listing sub-category" } }, error);
            } else {
                if (result.length > 0) {
                    callback('1', { keyword: 'data_found', content: {} }, result);
                } else {
                    callback('1', { keyword: 'data_not_found', content: {} }, result);
                }
            }
        })
    },

    //Listing multi sub-category
    multiCate: function (request, callback) {

        var catData = (request.category_id == undefined || request.category_id == null || request.category_id.length == 0) ? [{ "value": 0 }] : request.category_id
        var sub_category = `select id,parent_id,name,image from tbl_category where parent_id IN (${catData
            .map((data) => `'${data.value}'`)
            .join(",")}) and is_active = 1 and is_deleted = 0`

        conn.query(sub_category, function (error, result) {
            if (error) {
                callback('0', { keyword: 'sql_error', content: { error: "listing sub-category" } }, error);
            } else {
                if (result.length > 0) {
                    callback('1', { keyword: 'data_found', content: {} }, result);
                } else {
                    callback('1', { keyword: 'data_not_found', content: {} }, result);
                }
            }
        })
    },

    //Listing sub-category
    listingBoth: function (request, callback) {
        var both = `select id,name,image from tbl_category where parent_id IS NULL and is_active = 1 and is_deleted = 0;`

        conn.query(both, function (error, result) {

            if (error) {
                callback('0', { keyword: 'sql_error', content: { error: "listing category and sub category" } }, error);
            } else {

                if (result.length > 0) {
                    asyncLoop(
                        result,
                        function (item, next) {
                            const subCategory = `SELECT id, parent_id, name, image FROM tbl_category WHERE parent_id = '${item.id}' AND is_active = 1 AND is_deleted = 0;`;

                            conn.query(subCategory, function (error, subcategories) {
                                if (!error && subcategories.length > 0) {
                                    item.subcategories = subcategories;
                                    next();
                                } else if (!error) {
                                    next();
                                } else {
                                    next(error);
                                }
                            });
                        },
                        function (error) {
                            if (error) {
                                callback("0", { keyword: "sql_error", content: { error: "fetching the categories" }, }, null);
                            } else {
                                callback("1", { keyword: "list_success", content: "" }, result);
                            }
                        }
                    );
                } else {
                    callback('1', { keyword: 'data_not_found', content: {} }, result);
                }


                // if (result.length > 0) {
                //     callback('1', { keyword: 'data_found', content: {} }, result);
                // } else {
                //     callback('1', { keyword: 'data_not_found', content: {} }, result);
                // } 
            }
        })
    },

    //Listing product
    listingProduct: function (request, callback) {

        var sub_id = ``;
        if (request.sub_category_id > 0) {
            sub_id = `category_id = ${request.sub_category_id} and `
        }

        var both = `select id,category_id,name,price,image from tbl_product where ${sub_id} is_active = 1 and is_deleted = 0;`

        conn.query(both, function (error, result) {

            if (error) {
                callback('0', { keyword: 'sql_error', content: { error: "listing product" } }, error);
            } else {

                if (result.length > 0) {
                    callback('1', { keyword: 'data_found', content: {} }, result);
                } else {
                    callback('1', { keyword: 'data_not_found', content: {} }, result);
                }
            }
        })
    },

    //filter
    filterProduct: function (request, callback) {


        if (request.category_id == undefined || request.category_id == null || request.category_id.length == 0) {
            var cat_id = ``
        } else {
            var cat_id = `c.parent_id IN (${request.category_id
                .map((data) => `'${data.value}'`)
                .join(",")}) and`
        }

        if (request.sub_id == undefined || request.sub_id == null || request.sub_id.length == 0) {
            var sub_cat_id = ``
        } else {
            var sub_cat_id = `p.category_id IN (${request.sub_id
                .map((data) => `'${data.value}'`)
                .join(",")}) and`
        }


        var both = `select p.id,p.category_id,p.name,p.price,p.image from tbl_product p join tbl_category c on p.category_id = c.id where ${cat_id} ${sub_cat_id} p.is_active = 1 and p.is_deleted = 0;`

        conn.query(both, function (error, result) {

            if (error) {
                callback('0', { keyword: 'sql_error', content: { error: "filtering product" } }, error);
            } else {

                if (result.length > 0) {
                    callback('1', { keyword: 'data_found', content: {} }, result);
                } else {
                    callback('1', { keyword: 'data_not_found', content: {} }, result);
                }
            }
        })
    },

    //Listing product
    listingProductDetails: function (request, callback) {
        var both = `select id,category_id,name,price,description,image from tbl_product where id = ${request.product_id} and is_active = 1 and is_deleted = 0;
        `

        conn.query(both, function (error, result) {

            if (error) {
                callback('0', { keyword: 'sql_error', content: { error: "listing product details" } }, error);
            } else {

                if (result.length > 0) {
                    callback('1', { keyword: 'data_found', content: {} }, result);
                } else {
                    callback('1', { keyword: 'data_not_found', content: {} }, result);
                }
            }
        })
    },



}

module.exports = home_model