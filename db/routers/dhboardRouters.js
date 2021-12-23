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

const delFactoryData = async (req,res)=>{
    let {tableName} = req.body;
    let id = req.body.id;
    try {
        await client.query(`DELETE FROM ${tableName} WHERE id = ${id}`);
        res.status(200).json(id);
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ error, message: `could not delete row from ${tableName}` });
      }
}



const getAll = async (req,res) =>{
    let tableName = req.query.tablename;
    let responseData = {
      columns: [],
      rows: [],
    };
    try {
      let result = await client.query(
        `SELECT a.attname, pg_catalog.format_type(a.atttypid, a.atttypmod) FROM pg_catalog.pg_attribute a WHERE a.attnum > 0 AND NOT a.attisdropped AND a.attrelid = ( SELECT c.oid FROM pg_catalog.pg_class c LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace WHERE c.relname ~ '^(${tableName})$' AND pg_catalog.pg_table_is_visible(c.oid) );`
      );
      responseData.columns = JSON.parse(JSON.stringify(result.rows));
    } catch (error) {
      console.error(error);
      res.status(500).json({ error, message: `could not get 1 ${tableName}` });
    }
    try {
      let result = await client.query(`SELECT * FROM ${tableName} columns`);
      responseData.rows = JSON.parse(JSON.stringify(result.rows));
    } catch (error) {
      console.error(error);
      res.status(500).json({ error, message: `could not get ${tableName} rows` });
    }
    res.status(200).json(responseData);
}

const addNewRow = async (req,res) => {
    let tableName = req.body.tableName;
    let keys = Object.keys(req.body.row);
    let values = Object.values(req.body.row);
  
    let queryKeys = '';
    for (let index = 0; index < keys.length; index++) {
      if (index == keys.length - 1) {
        queryKeys += `$${index + 1}`;
      } else {
        queryKeys += `$${index + 1}, `;
      }
    }
  
    try {
      let result = await client.query(
        `INSERT INTO ${tableName} (${keys.join(
          ', '
        )}) VALUES(${queryKeys}) RETURNING *`,
        values
      );
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error, message: `could not add row to ${tableName}` });
    }
}

const deleteRow = async (req,res) =>{
    let tableName = req.body.tableName;
    let id = req.body.id;
    try {
      await client.query(`DELETE FROM ${tableName} WHERE id = ${id}`);
      res.status(200).json(id);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error, message: `could not delete row from ${tableName}` });
    }
}

const updateRow = async (req,res) =>{
    let tableName = req.body.tableName;
    let keys = Object.keys(req.body.row);
    let values = Object.values(req.body.row);
    let query = '';
  
    for (let i = 0; i < keys.length; i++) {
      if (i == keys.length - 1) {
        query += `${keys[i]}=$${i + 1}`;
      } else {
        query += `${keys[i]}=$${i + 1}, `;
      }
    }
  
    try {
      let result = await client.query(
        `UPDATE ${tableName} SET ${query} WHERE id=$1 RETURNING *`,
        values
      );
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error, message: `could not update row from ${tableName}` });
    }
}

const addNewColumn = async(req,res)=>{
    let tableName = req.body.tableName;
    let column = req.body.column;
    let query = `ALTER TABLE ${tableName} ADD COLUMN ${column.name} ${column.type}`;
    try {
      let result = await client.query(query);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error, message: `could not add column to ${tableName}` });
    }
}

const deleteColumn = async(req,res)=>{
    let tableName = req.body.tableName;
    let column = req.body.column;
    let query = `ALTER TABLE ${tableName} DROP COLUMN ${column}`;
    try {
      let result = await client.query(query);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error, message: `could not add column to ${tableName}` });
    }
}







module.exports = {
    getFactoryData,
    getFactoryList,
    createFactoryList,
    createFactoryData,
    updateFactoryList,
    updateFactoryData,
    delFactoryList,
    delFactoryData,
    getAll,
    addNewRow,
    deleteRow,
    updateRow,
    addNewColumn,
    deleteColumn,
}