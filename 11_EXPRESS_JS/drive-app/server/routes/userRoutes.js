import express from "express";
import { writeFile } from "fs/promises";
import directoriesData from '../directoriesDB.json' with {type: "json"}
import usersData from '../usersDB.json' with {type: "json"}

const router = express.Router();


router.post('/register', async (req, res, next) => {
  const {name, email, password} = req.body

  const foundUser = usersData.find((user) => user.email === email)
  console.log(foundUser);
  if(foundUser) {
    return res.status(409).json({
      error: "User already exists",
      message: "A user with this email address already exists. Please try logging in or use a different email."
    })
  }

  const dirId = crypto.randomUUID()
  const userId = crypto.randomUUID()

  directoriesData.push({
    id: dirId,
    name: `root-${email}`,
    userId,
    parentDirId: null,
    files: [],
    directories: []
  })

  usersData.push({
    id: userId,
    name,
    email,
    password,
    rootDirId: dirId
  })

  try {
    await writeFile('./directoriesDB.json', JSON.stringify(directoriesData))
    await writeFile('./usersDB.json', JSON.stringify(usersData))
    res.status(201).json({message: "User Registered"})
  } catch(err) {
    next(err)
  }

})


router.post("/login", async (req, res, next) => {
  
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({
      message: "All field must be fill"
    })
  }

  const existUser = usersData.find((user) => user.email === email)
  console.log(existUser)

  if (!existUser) {
    return res.status(404).json({
      error: "User not found"
    })
  }

  const valid = (existUser.email === email && existUser.password === password)


  if (!valid) {
    return res.status(400).json({
      error: "Invalid credentials"
    })
  }

  res.cookie("uid", `${existUser.id}`, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000
  })

  res.json("Login successfull")

})  


export default router;
