//  Register User
//  POST /api/auth/register
//  Public Route
const registerUser = async (req, res, next) => {
    const { username, email, password } = req.body;

    if(!username || !email || !password){
        console.log('invalid body fields')
        //  ERROR MESSAGE FROM APIERROR
        return;
    }
    res.status(200).send({'Registered': email})
};

module.exports = {
    registerUser
}