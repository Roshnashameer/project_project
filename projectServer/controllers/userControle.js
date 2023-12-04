const projects = require("../models/projectModel");
const users = require("../models/userModel");
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        const existingUser = await users.findOne({ email });

        if (existingUser) {
            return res.status(400).json("User already exists. Please log in.");
        } else {
            const newUser = new users({
                userName, email, password, gitHub: "", linkedIn: "", profile: ""
            });

            await newUser.save();
            return res.status(200).json(newUser);
        }
    } catch (err) {
        return res.status(500).json(`Register API failed: ${err}`);
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existUser = await users.findOne({ email, password });

        if (existUser) {
            const token = jwt.sign({ _id: existUser._id }, "supersecretkey123");
            console.log(token);

            return res.status(200).json({
                user: existUser,
                token
            });
        } else {
            return res.status(404).json("Incorrect email and password");
        }
    } catch (err) {
        return res.status(500).json(`Login API failed: ${err}`);
    }
};

exports.editProfile = async (req, res) => {
    const { userName, gitHub, linkedIn,profile } = req.body;
    const { _id } = req.params;
    const profile1=req.file?req.file.filename:profile

    try {
        const selectedUser = await users.findOne({ _id });

        if (selectedUser) {
            selectedUser.userName = userName;
            selectedUser.gitHub = gitHub;
            selectedUser.linkedIn = linkedIn;
            selectedUser.profile = profile1;

            await selectedUser.save();
            return res.status(200).json(selectedUser);
        } else {
            return res.status(404).json(`${userName} not found`);
        }
    } catch (err) {
        return res.status(500).json(`Edit Profile API failed: ${err}`);
    }
};
exports.addProject=async(req,res)=>{
    const {title,languages,overView,gitHub,website}=req.body
    // image-from multer
    const projectImage=req.file.filename
    // useId
    const userId=req.payload
    try{
        const existingProject= await projects.findOne({gitHub})
        if(existingProject){
            res.status(400).json(`${existingProject.title} is already exist !`)
        }
        else{
            const newProject=new projects({
                title,languages,overView,gitHub,website,projectImage,userId

            })
            await newProject.save()
            res.status(200).json(newProject)
        }


    }
    catch(err) {
        return res.status(401).json(`Add project API failed: ${err}`);
    }
}
exports.getUserProjects=async(req,res)=>{
    const {id}=req.params


}



// exports.getProfile=async (req,res)=>{
//     const { _id } = req.params;

//     try {
//         const userData=await users.findOne({_id})
//         if(userData){
//             res.status(200).json(userData)
//         }
//         else{
//             res.status(404).json("user not found")
//         }
//     }
//     catch(err){
//         res.status(401).json(`Get Api Failed ${err}`)
//     }

// }