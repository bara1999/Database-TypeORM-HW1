import  express  from 'express';
import { User } from '../db/entity/user.js';
import Users from '../types/user.js';
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

router.post('/register', (req:Users.Request, res:Users.Response) => {
  
    if(!req.body.name || !req.body.password) {
        res.status(404).send("name and passward req");
        return;
    }
  

    const newUser=new User();
    newUser.name = req.body.name;
    newUser.password = req.body.password;
    
    newUser.save().then((response) => {
        res.status(201).send('user created')
    }).catch(err => {console.log(err);
    
    res.status(400).send("error")
    })

    
});


export default router;