const expressAsyncHandler = require('express-async-handler');
const db = require('../config/database');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//Getting all Data
  const getAllUsers = expressAsyncHandler(async() =>{
    const result = await prisma.user.findMany();
    return result;

  });

  //Getting Unique data
   const getUserById = expressAsyncHandler(async(userid)=>{
    const rows = await prisma.user.findUnique({where : {id:userid}});
    return rows;
  });


//Inserting the data
  const createUser = expressAsyncHandler(async(userData) => {
    const {name , place} = userData;
    const row = prisma.user.create({
      data : {name,place}
    });
    return row;
  });

 
//updating the data
  const updateUser = expressAsyncHandler(async (id, userData) => {
    const { name, place } = userData;
    console.log(userData)
    const result = await prisma.user.update({where : {id},data :{name, place}});
    if (result.affectedRows === 0) {
        return null;
    }
    return result; 
});


//Deleting the data
const deleteUser = expressAsyncHandler(async(id) => { 
    
  const rows = await prisma.user.delete({
    where : { id}
  });
  
  return { message: 'User deleted successfully' };
});

  module.exports ={
    getAllUsers,
    getUserById,
    deleteUser,
    updateUser,
    createUser
  }