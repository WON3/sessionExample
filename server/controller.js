module.exports = {
    login: (req, res, next)=>{
        const db = req.app.get('db');
        db.user_table_2.findOne({email:req.body.email})
        .then((user)=>{
            if(user){
                delete user.password
                req.session.user = user;
                res.send({isSuccesful: true});
            }else{
                return db.user_table_2.insert({email:req.body.email, password: req.body.password})
            }
        })
        .then((response)=>{
            if(response){
                res.send({isSuccesful: false})
            }
        })       
    }
}