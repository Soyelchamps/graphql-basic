const express = require("express");
const app = express();

const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const { courses } = require("./data.json");
//todo el Schema es un string
const schema = buildSchema(`
    type Query {
        getWelcome:String
        getName (name: String, age: Int): String
        getCourses : [Course]
    }
    type Course {
        id: Int
        title: String
        description: String
    }
`);

const getWelcome = () => {
  return "Hola mundo";
};

const getName = (args) => {
  return "Hello " + args.name + " " + args.age;
};
const getCourses = () => {
  return courses;
};
const root = {
  // properties (Schema ) == funtions
  getWelcome: getWelcome,
  getName: getName,
  getCourses: getCourses,
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(3000, () => {
  console.log("server is runnig");
});
