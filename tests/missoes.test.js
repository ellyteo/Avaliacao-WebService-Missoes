import request from "supertest"
import app from '../app.js'

test("POST /missoes cria uma nova missão", async () => {
    const resposta = await request(app).post("/missoes").send({
        nome: "Apollo 12",
        agencia: "NASA",
        ano: 1969,
        status: "Concluída"
    })
    expect(resposta.status).toBe(201)
    expect(resposta.body.nome).toBe("Apollo 12")
})

test("POST /missoes retorna erro ao não informar o nome", async () => {
    const resposta = await request(app).post("/missoes").send({
        agencia: "NASA",
        ano: 1969,
        status: "Concluída"
    })
    expect(resposta.status).toBe(400)
    expect(resposta.body.erro).toBe("Nome é obrigatório!")
})

test("POST /missoes retorna erro ao não informar a agencia", async () => {
    const resposta = await request(app).post("/missoes").send({
        nome: "Apollo 12",
        ano: 1969,
        status: "Concluída"
    })
    expect(resposta.status).toBe(400)
    expect(resposta.body.erro).toBe("Agencia é obrigatório!")
})

test("POST /missoes retorna erro ao não informar o ano", async () => {
    const resposta = await request(app).post("/missoes").send({
        nome: "Apollo 12",
        agencia: "NASA",
        status: "Concluída"
    })
    expect(resposta.status).toBe(400)
    expect(resposta.body.erro).toBe("Ano é obrigatório!")
})

test("POST /missoes retorna erro ao não informar o status", async () => {
    const resposta = await request(app).post("/missoes").send({
        nome: "Apollo 12",
        agencia: "NASA",
        ano: 1969
    })
    expect(resposta.status).toBe(400)
    expect(resposta.body.erro).toBe("Status é obrigatório!")
})


test("GET /missoes retorna todos as missoes", async () => {

    const missoes = [
        {
            id: 1,
            nome: "Apollo 12",
            agencia: "NASA",
            ano: 1969,
            status: "Concluída"
        },
        {
            id: 1,
            nome: "Mars",
            agencia: "NASA",
            ano: 1998,
            status: "Em andamento"
        }
    ]

    const resposta = await request(app).get("/missoes").send()
    expect(resposta.status).toBe(200)
    expect(resposta.body[0]).toEqual(missoes[0])
    expect(resposta.body[1]).toEqual(missoes[1])
})


test("GET /missoes/:id retorna uma missão", async () => {
    const resposta = await request(app).get("/missoes/1").send()
    expect(resposta.status).toBe(200)
    expect(resposta.body.nome).toBe("Apollo 12")
})

test("GET /missoes/:id retorna erro ao não encontrar uma missao", async () => {
    const resposta = await request(app).get("/missoes/999").send()
    expect(resposta.status).toBe(404)
    expect(resposta.body.erro).toBe("Missão não encontrada!")
})

test("PUT /missoes/:id altera uma missão", async () => {
    const resposta = await request(app).put("/missoes/3").send({
        nome: "Apollo 12",
        agencia: "NASA",
        ano: 1969,
        status: "Concluída"
    })
    expect(resposta.status).toBe(200)
    expect(resposta.body.nome).toBe("Apollo 12")
})

test("PUT /missoes/:id erro ao alterar uma missão", async () => {
    const resposta = await request(app).put("/missoes/999").send({ nome: "Sla" })
    expect(resposta.status).toBe(404)
    expect(resposta.body.erro).toBe("Missão não encontrada!")
})

test("DELETE /missoes/:id deleta uma missão", async () => {
    const resposta = await request(app).delete("/missoes/1")
    expect(resposta.status).toBe(204)
    expect(resposta.body).toEqual({})
})

test("DELETE /missoes/:id erro ao deletar uma missão", async () => {
    const resposta = await request(app).delete("/missoes/999")
    expect(resposta.status).toBe(404)
    expect(resposta.body.erro).toBe("Missão não encontrada!")
})