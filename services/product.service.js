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
    async find(body){
        return await Product.find(body)
    }
    async findById(body){
        return await Product.findById(body)
    }
    async findAndUpdateId(body){
        return await Product.findByIdAndUpdate(body)
    }
}

module.exports = ProductServices



//services formate use large project same content change to the one time