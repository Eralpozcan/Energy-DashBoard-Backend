const client = require('../pgdb')

const getFactoryData = (request,response)=>{
    client.query('SELECT * FROM public."factoryData" ORDER BY "factoryName" DESC',(err,result)=>{
        if(!err){
            response.status(200).json(result.rows)
        }else{
            console.log('get All error' + err)
        }
    })
}

const getFactoryList = (request,response)=>{
    client.query('SELECT * FROM public."factoryList" ORDER BY "factoryName" DESC',(err,result)=>{
        if(!err){
            response.status(200).json(result.rows)
        }else{
            console.log('get All error' + err)
        }
    })
}

const createFactoryData = (request,response)=>{
    const {factoryName,unitType,usedKw,usedPrice,discount} = request.body
    client.query('INSERT INTO public."factoryData" VALUES ($1,$2,$3,$4,$5)',[factoryName,unitType,usedKw,usedPrice,discount],(err,result)=>{
        if(!err){
            response.status(200).send(` ${factoryName} created`);
        }else{
            console.log('Create Factory Data' + err)
        }
    })
}

const createFactoryList = (request,response)=>{
    const {factoryName,registerDate,registerEndDate,employeeCount,specialMembers} = request.body
    client.query('INSERT INTO public."factoryList" VALUES ($1,$2,$3,$4,$5)',[factoryName,registerDate,registerEndDate,employeeCount,specialMembers],(err,result)=>{
        if(!err){
            response.status(201).send(` ${factoryName} created`);
        }else{
            console.log('get All error' + err)
        }
    })
}


const updateFactoryData = (request,response)=>{
    const {factoryName,unitType,usedKw,usedPrice,discount} = request.body
    client.query('UPDATE public."factoryData" SET "factoryName" = $1, "unitType"= $2, "usedKw"= $3, "usedPrice"= $4, "discount"= $5 WHERE "factoryName" = $1',[factoryName,unitType,usedKw,usedPrice,discount],(err,result)=>{
        if(!err){
            response.status(201).send(` ${factoryName} Data Updated`);
        }else{
            console.log('Update FactoryData' + err)
        }
    })
}



const updateFactoryList = (request,response)=>{
    const {factoryName,registerDate,registerEndDate,employeeCount,specialMembers} = request.body
    client.query('UPDATE public."factoryList" SET "factoryName" = $1, "registerDate"= $2, "registerEndDate"= $3, "employeeCount"= $4, "specialMembers"= $5 WHERE "factoryName" = $1',[factoryName,registerDate,registerEndDate,employeeCount,specialMembers],(err,result)=>{
        if(!err){
            response.status(201).send(` ${factoryName} List Updated`);
        }else{
            console.log('update factory list' + err)
        }
    })
}




const delFactoryList = (request,response)=>{
    const {factoryName} = request.body
    client.query('DELETE FROM public."factoryList" WHERE "factoryName" = $1',[factoryName],(err,result)=>{
        if(!err){
            response.status(200).send("Deleted Factory")
        }else{
            throw err
        }
    })
}

const delFactoryData = (request,response)=>{
    const {factoryName} = request.body
    client.query('DELETE FROM public."factoryData" WHERE "factoryName" = $1',[factoryName],(err,result)=>{
        if(!err){
            response.status(200).send("Deleted Factory")
        }else{
            throw err
        }
    })
}



module.exports = {
    getFactoryData,
    getFactoryList,
    createFactoryList,
    createFactoryData,
    updateFactoryList,
    updateFactoryData,
    delFactoryList,
    delFactoryData
}