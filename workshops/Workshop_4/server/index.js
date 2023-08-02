const express = require('express');
const dotenv = require('dotenv');
const mongoose = require("mongoose");
var { graphqlHTTP } = require("express-graphql")
var { buildSchema } = require("graphql")

dotenv.config();
const app = express();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
const {
  teacherPatch,
  teacherPost,
  teachersGet,
  teacherDelete
} = require("./controllers/teacherController.js");

const {
  coursePatch, coursePost, coursesGet, courseDelete
} = require("./controllers/courseController.js");

// parser for the request body (required for the POST and PUT methods)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// check for cors
const cors = require("cors");
app.use(cors({
  domains: '*',
  methods: "*"
}));


// listen to the task request
//app.get("/api/teachers", teacherGet);
app.post("/api/teachers", teacherPost);
app.patch("/api/teachers", teacherPatch);
app.put("/api/teachers", teacherPatch);
app.delete("/api/teachers", teacherDelete);

// course
app.get("/api/courses", coursesGet);
app.post("/api/courses", coursePost);
app.put("/api/courses/:id", coursePatch);
app.delete("/api/courses/:id", courseDelete);
const schema = buildSchema(`
    type teachear {
        _id: ID
        first_name: String!
        last_name: String!
        cedula: String!
        age:Int!

    }

    type course {
      _id: ID!
      name: String!
      credits: Int!
      teacher: ID!

  }
    
    type Query {
        getTeacher(_id: ID): teachear
        getTeachers: [teachear!]
        getCourses:  [course!]
        hello:String
    }

  
`)
// The root provides a resolver function for each API endpoint
const graphresolvers = {
  hello: () => {
    return "Hello world!"
  },
  getTeachers: teachersGet,
  getCourses: coursesGet,

}


app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: graphresolvers,
    graphiql: true,
  })
)
app.listen(3001, () => {
  connect();
  console.log(`Example app listening on port 3001!`)
})
