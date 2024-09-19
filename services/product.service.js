const Product = require('../model/product.model')

class ProductServices {
    async getProduct(body) {
        try {
            return await Product.findOne(body)
        }
        catch (err) {
            console.log(err);
            return err
        }
    }
    async addNewProduct(body) {
        return await Product.create(body)
    }
    async find(body) {
        try {
            // Pagination
            let pageNo = Number(query.pageNo) || 1;
            let perPage = Number(query.perPage) || 20;
            let skip = (pageNo - 1) * perPage;

            // sorting
            let sortCondition = {
                title: 1
            }
            if (query.sortBy) {
                sortCondition = {}
                sortCondition[query.sortBy] = query.sortOrder === "desc" ? -1 : 1;
            }

            // Searching
            let search = query.search
                ? [
                    {
                        $match: {
                            $or: [
                                {
                                    title: {
                                        $regex: query.search.trim().replace(/\s+/g, " "),
                                        $options: "i",
                                    },
                                },
                                {
                                    description: {
                                        $regex: query.search.trim().replace(/\s+/g, " "),
                                        $options: "i",
                                    },
                                },
                                {
                                    price: Number(query.search),
                                },
                            ],
                        },
                    },
                ]
                : [];

            let find = [
                {
                    $match: { isDelete: false },
                },
                ...search,

                {
                    $sort: sortCondition
                }
            ];

            let count = await Product.aggregate(find);
            let result = await Product.aggregate([
                ...find,
                {
                    $skip: skip,
                },
                {
                    $limit: perPage,
                },
            ]);

            let totalPage = Math.ceil(count.length / perPage);
            return {
                totalCount: count.length,
                totalPage,
                currentPage: pageNo,
                result,
            };
        } catch (err) {
            console.log(err);
            return err;
        }
    }
    async findById(body) {
        return await Product.findById(body)
    }
    async findAndUpdateId(body) {
        return await Product.findByIdAndUpdate(body)
    }
}

module.exports = ProductServices



//services formate use large project same content change to the one time