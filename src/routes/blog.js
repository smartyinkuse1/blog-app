const express = require('express');
const router = express.Router();

const Blog = require('../model/Blog');
const advancedResults = require('../middleware/advancedRequest');
const { protect, authorize } = require('../middleware/auth');
const { createBlog, getBlogs, getBlog, updateBlog, deleteBlog } = require('../controller/blog');

// authorize('admin'), 
router.route("/")
    .post(createBlog)
    .get(advancedResults(Blog), getBlogs)

router.route("/:slug")
    .get(getBlog)
    .put(updateBlog)
    .delete(deleteBlog)
module.exports = router;