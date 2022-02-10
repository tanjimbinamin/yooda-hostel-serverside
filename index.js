const express =require("express")
const app=express()
const cors=require("cors")
const {MongoClient}=require("mongodb")
const port = process.env.PORT|| 5000;

require('dotenv').config()
const ObjectId=require("mongodb").ObjectId;

app.use(cors())
app.use(express.json())


app.get("/",(req,res)=>{
    res.send("server is working")
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.iz4fi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


client.connect(err => {
    const food = client.db("Yooda").collection("food_items");
    const student = client.db("Yooda").collection("student_list");


    // myorders
//     app.get("/myOrders/:email",async (req,res)=>{
        
//         const result=await usersCollection.find({
//             mail:req.params.email,
//         }).toArray();
//         res.send(result)
//     })

//     // addreview
        // addlearner 
        app.post('/addFood',async(req,res)=>{
        
            const result=await food.insertOne(req.body)

            console.log(result);
            res.send(result)
        })
        // add student

        app.post('/addStudent',async(req,res)=>{
        
            const result=await student.insertOne(req.body)

            console.log(result);
            res.send(result)
        })

        // get food
        app.get("/foodItems",async (req,res)=>{
            const result = await food.find({}).toArray()
            console.log(result)
            res.send(result)
        })
        
        
//     // addrider
        // app.post("/rider",async(req,res)=>{
        
        //     const result=await rider.insertOne(req.body)
        
        //     res.send(result)
        // })

//     // delete service
     app.delete("/deleteFood/:id",async(req,res)=>{
       
        const result= await food.deleteOne({
            _id:ObjectId(req.params.id),
        })
        res.send(result)
    })
//     // delete orders


        app.get("/students",async (req,res)=>{

            const result = await student.find({}).toArray()
            console.log(result)
            res.send(result)

        })

        app.delete("/deleteStudents/:id",async (req,res)=>{
            const result = await student.deleteOne({
                _id:ObjectId(req.params.id),
            })
            res.send(result)
        })
//     app.delete("/deleteOrders/:id",async(req,res)=>{
       
//         const result= await usersCollection.deleteOne({
//             _id:ObjectId(req.params.id),
//         })
//         res.send(result)
//     })
//     // getreview
//     app.get('/getReview',async(req,res)=>{
       
//         const result=await reviewCollection.find({}).toArray()
//         res.send(result)
        
//     })


//     // allservice
//     app.get("/allOrders",async(req,res)=>{
      
//         const result= await usersCollection.find({}).toArray();
//         res.send(result)
      
//     })
//     // getAllOrders

//     app.get("/allServices",async(req,res)=>{
      
//         const result= await orderCollection.find({}).toArray();
//         res.send(result)
        
//     })
//     // add orders
//     app.post('/addOrders',async(req,res)=>{
       
//         const result =await orderCollection.insertOne(req.body)
       
//         res.send(result)
//     })
//     // getservice
//     app.get("/service/:id",async (req, res) => {
        
//         await orderCollection
//           .find({ _id: ObjectId(req.params.id) })
//           .toArray((err, results) => {
//             res.send(results[0]);
//           });
//     });

//     // adduser

//     app.post('/registerInfo',async(req,res)=>{
//         console.log(req.body)
//         const result=await adminCollection.insertOne(req.body)
//         res.send(result)
//         console.log(result)
//     })

//     app.put("/makeAdmin", async (req, res) => {
//     const filter = {email: req.body.email };
//     const result = await adminCollection.find(filter).toArray();
    
//     if (result) {
//       const documents = await adminCollection.updateOne(filter, {
//         $set: {role: "admin"},
        
//       });
//       console.log(documents);
//       res.send(documents)
//     }
//     else {
//       const role = "admin";
//       const result3 = await adminCollection.insertOne(req.body.email, {
//         role: role,
//       });
     
//     }
//    })

//     //   checkadmin
//     app.get("/checkAdmin/:mail", async (req, res) => {

//             const result = await adminCollection.find({ email: req.params.mail }).toArray();
//             res.send(result);
//         });

    // perform actions on the collection object
    // client.close();
  });

app.listen(port,()=>{
    console.log('hello',port)
})