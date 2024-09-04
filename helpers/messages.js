class MESSAGES {
    //product
    ADD_NEW_PRODUCT = 'Add new Product'
    ALREADY_EXIST_PRODUCT = 'Already Product Exist'
    PRODUCT_NOT_FOUND = 'product not found'
    PRODUCT_UPDATE_SUCCESSFULLY = 'product update successfully'
    PRODUCT_DELETE_SUCCESSFULLY = 'product delete successfully'


    //user
    USER_ALREADY_EXIST = 'User Already exsit...'
    REGISTER_SUCCESSFULLY = ' Register successfully'
    LOGIN_SUCCESSFULLY = 'Login Successfully'
    USER_NOT_FOUND = 'user not found'
    EMAIL_PASSWORD_NOT_MATCHED = 'Email or password does not matched...'
    USER_PROFILE_UPDATE = "User profile update...."
    USER_DELETE_SUCCESFULLY = 'User delete successfully...'
    PLEASE_ENTER_VALID_PASSWORD = "Please enter valid password"
    OLD_AND_NEW_PASSWORD_NOT_MATCH = "Old password and new password both are the same , Please enter valid password"
    NEW_AND_CONFIRM_PASSWORD_NOT_MATCH = "New password and confirm password do not match"
    PASSWORD_UPDATE_SUCCESSFULLY = "Password updated successfully!"

    // order 
    ORDER_PLACES = 'Order Places'
    NO_CART_FOUND = 'No cart Found...'

    //Cart
    ALREADY_EXIST_CART = 'Already cart Exist'
    CART_ADDEDD = "Cart Addedd..."
    CART_UPDATE_SUCCESSFULLY = "Cart updated SuccessFully"
    CART_DELETE_SUCCESSFULLY = "cart delete successfully..."
    CART_NOT_FOUND = "cart not found"

    INTERNAL_SERVER_ERROR = 'Internal server error'
}

module.exports = new MESSAGES()