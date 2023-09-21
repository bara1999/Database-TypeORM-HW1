import  express  from 'express';
import { User } from '../db/entity/user.js';
import Users from '../types/user.js';
import Profiles from '../types/profile.js';
import { Profile } from '../db/entity/Profile.js';
import { Role } from '../db/entity/Role.js';
import { In } from 'typeorm';
import jwt from 'jsonwebtoken';
import { authorize } from '../middlewares/authraization.js';

import { Permission } from '../db/entity/Permission.js';

const router = express.Router();


router.get('/', async(req, res) => {


try{
    const items=await User.find();
    res.send((items))}
catch{
res.status(404).send("error")    
}



});

router.get('/:id',async (req, res) => {
    const id = req.params.id;
    const task= await User.findOneBy({id});
if(task) {
    res.status(200).send(task);
}
else{
    res.status(404).send("not found");
}
});
router.put('/:id/assign',async (req, res) => {
    const id = req.params.id;
    const user= await User.findOneBy({id});
    if(!req.body?.length) {
        res.status(404).send("roles req");
        return;
    }

if(user) {
    const rolesIds = req.body
    // const role = new Role();
    const newRoles = await Role.findBy({
      id: In(rolesIds) //[1, 5555]
    });
    user.roles=[...user.roles, ...newRoles];
    await user.save();
    res.status(200).send(user);
}
else{
    res.status(404).send("not found");
}
});

router.post('/permisiion', authorize,async (req, res) => {
    
    if(!req.body.name) {
        res.status(404).send("name is req");
        return;
    }
    
    const newPermission = new Permission;
    newPermission.name=req.body.name;
     newPermission.save().then((response) => {
    res.status(201).send('permission created')
    }).catch(err => {console.log(err);
        res.status(400).send("error")
    });
   
});

router.post('/role', authorize,async (req, res) => {
    if(!req.body.name || !req.body.permission) {
        res.status(404).send("name is req");
        return;
    }
   

    const newRole = new Role();
    newRole.name =req.body.name;
    newRole.permissions = await Permission.findBy({
      id: In(req.body.permission) //[1, 5555]
    });

    newRole.save().then((response) => {
    res.status(201).send('Role created')
    }).catch(err => {console.log(err);
        res.status(400).send("error")
    });
   
});


router.post('/register', async (req:Users.Request, res:Users.Response) => {
  
    if(!req.body.name || !req.body.password || !req.body.email) {
        res.status(404).send("name, email and passward req");
        return;
    }
  

    const newUser=new User();
    newUser.name = req.body.name;
    newUser.password = req.body.password;
    newUser.email = req.body.email;
    
    await newUser.save().then((response) => {
        // res.status(201).send('user created')
    }).catch(err => {console.log(err);
        res.status(400).send("error")
    })
if (req.body.profile){
    if(!req.body.profile?.firstName || !req.body.profile?.lastName || !req.body.profile?.dateOfBirth) {
        res.status(404).send("firstName, lastName and dateOfBirth req");
        return;
    }
    const newProfile = new Profile()
    newProfile.firstName = req.body.profile.firstName
    newProfile.lastName = req.body.profile.lastName
    newProfile.dateOfBirth = new Date(req.body.profile.dateOfBirth)
    newProfile.user = newUser
    console.log("00000000000010000000000000000", newProfile)
    await newProfile.save()
}
res.status(201).send('user created')
    
});

router.post('/login', (req, res) => {

    const login = async (email: string, password: string) => {
        try {
          const user = await User.findOneBy({
            email
          });
          if (user &&(password===user?.password)) {
    
            console.log("00000000000000");
    
            const token = jwt.sign(
              {
                email: user.email,
                name: user.name,
              },
              process.env.SECRET_KEY || '',
              {
                expiresIn: "14d"
              }
            );
            console.log(token);
      
            return token;
          } else {
            throw ("Invalid Username or password!");
          }
        } catch (error) {
          throw ("Invalid Username or password!");
        }
      }
    
    const email = req.body.email;
    const password = req.body.password;
  
    login(email, password)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(401).send(err);
      })
  });

export default router;