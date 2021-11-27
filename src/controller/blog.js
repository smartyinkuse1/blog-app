const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Blog = require('../model/Blog');
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

//@desc  Get All Users
//@route GET /api/v1/user/
//@access Private/Admin

const getBlogs = asyncHandler(async(req,res,next)=> {
    res.status(200).json(res.advancedResults)
})

//@desc  Get Single User
//@route GET /api/v1/user/:id
//@access Private/Admin

const getBlog = asyncHandler(async(req,res,next)=> {
    const blog = await Blog.findOne({slug: req.params.slug})
    if (!blog) {
        return next( new ErrorResponse('blog not found', 404))
    }
    res.status(200).json({
        success: true,
        data:blog
    })
})

//@desc  Create User
//@route POST /api/v1/user/
//@access Private/Admin

const createBlog = asyncHandler(async(req,res,next)=> {
    const { backgroundImage, subImage } = req.files;
    if(!backgroundImage) {
        return next(new ErrorResponse("backgroundImage", 400));
    }
    console.log(backgroundImage)
    let newFile = await cloudinary.uploader.upload(backgroundImage.tempFilePath)
    let subFile = await cloudinary.uploader.upload(subImage.tempFilePath)
    console.log(newFile, backgroundImage, "Image")
    const blog = await blog.create({
        ...req.body,
        backgroundImage: newFile.url,
        subImage: subFile.url
    })
    res.status(200).json({
        success: true,
        data:blog
    })
})

//@desc  Update User
//@route GET /api/v1/user/:id
//@access Private/Admin

const updateBlog = asyncHandler(async(req,res,next)=> {
    let value = req.body;
    if (req.files) {
        const { backgroundImage, subImage } = req.files;
        if (backgroundImage) {
            let newFile = await cloudinary.uploader.upload(backgroundImage.tempFilePath)
            let subFile = await cloudinary.uploader.upload(subImage.tempFilePath)
            value = {
                ...req.body,
                backgroundImage: newFile.url,
                subImage: subFile.url
            }
        }
        const blog = await Blog.findOneAndUpdate({slug: req.params.slug},value,{
            new: true,
            runValidators: true
        })
        if (!blog) {
            return next( new ErrorResponse('blog not found', 404))
        }
        res.status(200).json({
            success: true,
            data:blog
        })
    } else {
        const blog = await Blog.findOneAndUpdate({slug: req.params.slug},value,{
            new: true,
            runValidators: true
        })
        if (!blog) {
            return next( new ErrorResponse('blog not found', 404))
        }
        res.status(200).json({
            success: true,
            data:blog
        })
    }
})

//@desc  Delete User
//@route DELETE /api/v1/user/:id
//@access Private/Admin

const deleteBlog = asyncHandler(async(req,res,next)=> {
    await Blog.findOneAndRemove({slug: req.params.slug})
    res.status(200).json({
        success: true,
        data: {}
    })
})

module.exports = { getBlogs, getBlog, createBlog, updateBlog, deleteBlog}