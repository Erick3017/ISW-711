const Course = require("../models/courseModel");

/**
 * Creates a course
 *
 * @param {*} req
 * @param {*} res
 */
const coursePost = async (req, res) => {
  let course = new Course(req.body);
  await course.save()
    .then(course => {
      res.status(201); // CREATED
      res.header({
        'location': `/api/courses/?id=${course.id}`
      });
      res.json(course);
    })
    .catch(err => {
      res.status(422);
      console.log('error while saving the course', err);
      res.json({
        error: 'There was an error saving the course'
      });
    });
    const handleInputSearch = () => {
      axios.get(`http://localhost:3001/api/courses/?name=${courseName}`)
        .then(res => {
          console.log(res.data);
          setCourses(res.data)
  
        })
        .catch(err => {
          alert(err.message)
        })
    }
    const handleButtonSearch = (order) => {
      axios.get(`http://localhost:3001/api/courses/?sort=${order}`)
        .then(res => {
          setCourses(res.data)
  
        })
        .catch(err => {
          alert(err.message)
        })
    }
};

/**
 * Get all courses or one
 *
 * @param {*} req
 * @param {*} res
 */
const courseGet = (req, res) => {
  // if an specific Course is required
  if (req.query && req.query.id) {
    Course.findById(req.query.id)
      .then((course) => {
        res.json(course);
      })
      .catch(err => {
        res.status(404);
        console.log('error while queryting the course', err)
        res.json({ error: "Course doesnt exist" })
      });
  } else {
    // get all Courses
    Course.find()
      .then(courses => {
        res.json(courses);
      })
      .catch(err => {
        res.status(422);
        res.json({ "error": err });
      });
  }
};

const coursePatch = (req, res) => {
  // get Course by id
  if (req.query && req.query.id) {
    Course.findById(req.query.id, function (err, Course) {
      if (err) {
        res.status(404);
        console.log('error while queryting the Course', err)
        res.json({ error: "Course doesnt exist" })
      }

      // update the Course object (patch)
      Course.title = req.body.title ? req.body.title : Course.title;
      Course.detail = req.body.detail ? req.body.detail : Course.detail;
      // update the Course object (put)
      // Course.title = req.body.title
      // Course.detail = req.body.detail

      Course.save(function (err) {
        if (err) {
          res.status(422);
          console.log('error while saving the Course', err)
          res.json({
            error: 'There was an error saving the Course'
          });
        }
        res.status(200); // OK
        res.json(Course);
      });
    });
  } else {
    res.status(404);
    res.json({ error: "Course doesnt exist" })
  }
};

const courseDelete = (req, res) => {
  // get Course by id
  if (req.query && req.query.id) {
    Course.findById(req.query.id, function (err, Course) {
      if (err) {
        res.status(404);
        console.log('error while queryting the Course', err)
        res.json({ error: "Course doesnt exist" })
      }

      Course.deleteOne(function (err) {
        if (err) {
          res.status(422);
          console.log('error while deleting the Course', err)
          res.json({
            error: 'There was an error deleting the Course'
          });
        }
        res.status(204); //No content
        res.json({});
      });
    });
  } else {
    res.status(404);
    res.json({ error: "Course doesnt exist" })
  }
};

module.exports = {
  coursePost,
  courseGet,
  coursePatch,
  courseDelete
}