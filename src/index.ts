import "dotenv/config"
import express from "express"
import {PrismaClient} from "./generated/prisma/client.js"
import {PrismaPg} from "@prisma/adapter-pg"
import pg from "pg"

const app=express()
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prismaClient=new PrismaClient({ adapter });
 
app.get("/",async (req,res)=>{
    const data=await prismaClient.user.findMany();
    res.json({
        data
    })
})

app.post("/",async (req,res)=>{
    await prismaClient.user.create({
        data:{
            name:Math.random().toString(),
            password:Math.random().toString()
        }
    })
    res.json({
        "message":"post endpoint"
    })
})

app.listen(3000);
