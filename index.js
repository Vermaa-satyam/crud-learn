const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
const port = 5000;

app.use(express.urlencoded({ extended: false }));

app.get("/users", (req, res) => {
  return res.json(users);
});
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id); // id ko lene ke liye
  const user = users.find((user) => user.id === id);
  return res.json(user);
});

app.post("/user", (req, res) => {
  const body = req.body;
  console.log(body);
  users.push({
    id: users.length + 1,
    first_name: body.first_name,
    email: body.email,
    gender: body.gender,
  });
  res.send("working");
});


app.patch("/user/:id" , (req , res) => {
  const newid = Number(req.params.id);
  const user = users.find((p)=> p.id ===newid)
  user.id=newid;

  for(let key in req.body){
    user[key] = req.body[key]
  }

res.send({messege : "user updated sucessfully" , user})
}
)

app.delete("/user/:id" , (req , res) => {
  const id = Number(req.params.id)
  const user = users.filter((p)=>p.id === id)
  res.send({messege: "user deleted sucssfully" , user})

}
) 
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
