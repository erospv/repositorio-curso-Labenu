import knex from "knex";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import moment from "moment"
import { AddressInfo } from "net";
import { REPLCommand } from "repl";
import { connect } from "http2";
import { promises } from "fs";

/**************************************************************/

dotenv.config();

/**************************************************************/

const connection = knex({
    client: "mysql",
    connection: {
        host: process.env.DB_HOST,
        port: 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    }
})

/**************************************************************/

const app = express();

app.use(express.json());

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});


/**************************************************************/

function idGenerator(): string {
    return String(Date.now() + Math.random())
}

// 1. Criar usuário

const createUser = async (name: string, nickname: string, email: string): Promise<void> => {
    if( name.replace(/\s/g, "") && nickname.replace(/\s/g, "") && email.replace(/\s/g, "") ) {
        await connection.raw(`
            INSERT INTO UsersList VALUES (
                ${idGenerator()},
                "${name}",
                "${nickname}",
                "${email}"
            )
        `)
    } else {
        throw { message: "Preencha todos os campos" }
    }
}

app.put("/user", async (req: Request, res: Response) => {
    try {
        await createUser(req.body.name, req.body.nickname, req.body.email)
        res.status(200).send({
            message: "Usuário criado com sucesso"
        })
    } catch (error) {
        res.status(400)
           .send(error)
    }
})

/**************************************************************/

// 2. Pegar usuário pelo id

const getUserById = async (id: string): Promise<any> => {
    if(id.replace(/\s/g, "")) {
        const result = await connection.raw(`
            SELECT id, nickname FROM UsersList WHERE id = "${id}"
        `)
        return result[0][0]
    } else {
        throw { message: "Id não informado"}
    }
}

app.get("/user/:id", async (req: Request, res: Response) => {
    try {
        const response = await getUserById(req.params.id)
        if(response === undefined) {
            res.status(400).send({ message: "Usuário não encontrado"})
        } else {
            res.status(200).send(response)
        }
    } catch (error) {
        res.status(400)
           .send(error)
    }
})

/**************************************************************/

// 3. Editar usuário

const editUser = async (id: string, name: string, nickname: string): Promise<void> => {
    const user = await connection.raw(`
        SELECT * FROM UsersList
        WHERE id = "${id}"
    `)

    if (user[0][0] === undefined) {
        throw { messageNotFound: "Usuário não encontrado"}
    }

    if(name.replace(/\s/g, "") && nickname.replace(/\s/g, "")) {
        await connection.raw(`
        UPDATE UsersList
        SET name = "${name}", nickname = "${nickname}"
        WHERE id = "${id}"
        `)
    } else {
        throw { message: "Preencha todos os campos" }
    }
}

app.post("/user/edit/:id", async (req: Request, res: Response) => {
    try {
        await editUser(req.params.id, req.body.name, req.body.nickname)
        res.status(200).send({
            message: "Usuário editado com sucesso"
        })
    } catch (error) {
        res.status(400).send(error.messageNotFound ? {message: error.messageNotFound} : error )
    }
})

/**************************************************************/

// 4. Criar tarefa

const createTask = async (title: string, description: string, limitDate: string, creatorUserId: string): Promise<void> => {
    if (title.replace(/\s/g, "") && description.replace(/\s/g, "") && limitDate && creatorUserId.replace(/\s/g, "")) {
        await connection.raw(`
            INSERT INTO Tasks (id, title, description, limit_date, creator_user_id) 
            VALUES (
                "${idGenerator()}",
                "${title}",
                "${description}",
                "${limitDate.split("/").reverse().join("-")}",
                "${creatorUserId}"
            )
        `)
        
    } else {
        throw { message: "Preencha todos os campos" }
    }
}

app.put("/task", async (req:Request, res: Response) => {
    try {
        await createTask(
            req.body.title,
            req.body.description,
            req.body.limitDate,
            req.body.creatorUserId
        )
        res.status(200).send({
            message: "Tarefa criada"
        })
    } catch (error) {
        res.status(400).send(error.sqlMessage ? {message: error.sqlMessage} : error)
    }
})

/**************************************************************/

// 5. Pegar tarefa pelo id

const getTaskById = async (id: string): Promise<any> => {
    const task = await connection.raw(`
        SELECT * FROM Tasks
        WHERE id = "${id}"
    `)

    if (task[0][0] !== undefined) {
        return task[0][0]
    } else {
        throw { messageNotFound: "Tarefa não encontrada"}
    }
}

app.get("/task/:id", async (req: Request, res: Response) => {
    try {
        const response = await getTaskById(req.params.id)

        res.status(200).send({
            title: response.title,
	        description: response.description,
	        limitDate: moment(response.limit_date).format("DD/MM/YYYY"),
	        creatorUserId: response.creator_user_id
        })
    } catch (error) {
        res.status(400).send(
            error.messageNotFound ? { message: error.messageNotFound } : error
        )
    }
})

/**************************************************************/

/*******     DESAFIOS     *******/

// 6. Pegar todos os usuários

const getAllUsers = async (): Promise<any> => {
    const response = await connection.raw(`
        SELECT id, nickname FROM UsersList
    `)
    
    return response[0] 
}

app.get("/users/all", async (req: Request, res: Response) => {
    try {
        const response = await getAllUsers()
        res.status(200).send({users: response})
    } catch (error) {
        res.status(400).send({
            users: []
        })   
    }
})

/**************************************************************/

// 7. Pegar tarefas criadas por um usuário

const getTasksByUserId = async (id: string): Promise<any> => {
    if (id) {
        const response = await connection.raw(`
            SELECT t.id AS taskId, t.title, t.description, t.limit_date AS limitDate, t.creator_user_id AS creatorUserId, t.status, ul.nickname AS creatorUserNickname
            FROM Tasks t JOIN UsersList ul ON t.creator_user_id = ul.id
            WHERE "${id}" = ul.id
        `)
        return response[0]   
    } else {
        throw { message: "Informe o id" }
    }
}

app.get("/task", async (req: Request, res: Response) => {
    try {
        const response = await getTasksByUserId(req.query.creatorUserId as string)
        for (let task of response) {
            task.limitDate = moment(response.limitDate).format("DD/MM/YYYY")
        }
        
        res.status(200).send({ tasks: response })
    } catch (error) {
        res.status(400).send(error)
    }
})

