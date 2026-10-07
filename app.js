import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './swagger.js'
import cors from 'cors'

const app = express()

app.use(cors())

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use(express.json())

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


/**
 * @openapi
 * /missoes:
 *   post:
 *     summary: Cria uma missão
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - agencia
 *               - ano
 *               - status
 *             properties:
 *               nome:
 *                 type: string
 *               agencia:
 *                 type: string
 *               ano:
 *                 type: integer
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Missão criada
 *       400:
 *         description: Dados inválidos
 */
app.post('/missoes', (req, res) => {
    const nome = req?.body?.nome || null
    const agencia = req?.body?.agencia || null
    const ano = req?.body?.ano || null
    const status = req?.body?.status || null

    if (!nome) {
        res.status(400).json({ erro: 'Nome é obrigatório!' })
    }

    if (!agencia) {
        res.status(400).json({ erro: 'Agencia é obrigatório!' })
    }

    if (!ano) {
        res.status(400).json({ erro: 'Ano é obrigatório!' })
    }

    if (!status) {
        res.status(400).json({ erro: 'Status é obrigatório!' })
    }

    const novaMissao = { id: missoes.length + 1, nome: nome, agencia: agencia, ano: ano, status: status }

    missoes.push(novaMissao)
    res.status(201).json(novaMissao)
})


/**
 * @openapi
 * /missoes/{id}:
 *   get:
 *     summary: Busca uma missão pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Missão encontrada
 *       404:
 *         description: Missão não encontrada
 */
app.get('/missoes/:id', (req, res) => {
    const missao = missoes.find(p => p.id === Number(req.params.id))

    if (!missao) {
        return res.status(404).json({ erro: 'Missão não encontrada!' })
    }

    res.status(200).json(missao)
})


app.get('/missoes', (req, res) => {
    const { nome, agencia, ano, status } = req.query

    if (nome || agencia || ano || status) {
        const missoesFiltradas = missoes.filter(item => item.nome.toLowerCase().includes(nome.toLowerCase()) || item.agencia.toLowerCase().includes(agencia.toLowerCase()) || item.ano.toLowerCase().includes(ano.toLowerCase()) || item.status.toLowerCase().includes(status.toLowerCase()))
        res.status(200).json(missoesFiltradas)
    } else {
        res.status(200).json(missoes)
    }
})

/**
 * @openapi
 * /missoes/{id}:
 *   put:
 *     summary: Atualiza uma missão pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               agencia:
 *                 type: string
 *               ano:
 *                 type: integer
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Missão atualizada
 *       404:
 *         description: Missão não encontrada
 */
app.put('/missoes/:id', (req, res) => {
    const missao = missoes.find(p => p.id === Number(req.params.id))

    if (!missao) {
        return res.status(404).json({ erro: 'Missão não encontrada!' })
    }

    if (req?.body?.nome && req.body.nome != "") {
        missao.nome = req.body.nome
    }

    if (req.body.agencia && req.body.agencia != "") {
        missao.agencia = req.body.agencia
    }

    if (req.body.ano && req.body.ano != "") {
        missao.ano = req.body.ano
    }

    if (req.body.status && req.body.status != "") {
        missao.status = req.body.status
    }


    /**
     * @openapi
     * /missoes/{id}:
     *   delete:
     *     summary: Exclui uma missão pelo id
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       204:
     *         description: Missão excluida com sucesso
     *       404:
     *         description: Missão não encontrada
     */
    app.delete('/missoes/:id', (req, res) => {
        const indice = missoes.findIndex(p => p.id === Number(req.params.id))

        if (indice === -1) {
            return res.status(404).json({ erro: 'Missão não encontrada!' })
        }

        missoes.splice(indice, 1)
        res.status(204).send()
    })

    res.status(200).json(missao)
})

app.get('/apod', async (req, res) => {
    const { date } = req.query
    const url = `https://science.nasa.gov/planetary/apo?api_key=${process.env.NASA_API_KEY}`

    if (!date) {
        url += `&date=${date}`
    }

    try {
        const resposta = await fetch(url)
        const dados = await resposta.json()
        const dados_para_retornar = {
            date: dados.date,
            title: dados.title,
            explanation: dados.explanation,
            media_type: dados.media_type,
            url: dados.url
        }
        res.status(200).json(dados_para_retornar)
    } catch (error) {
        res.status(502).json({ erro: 'Falha ao consultar registro dessa data' })
    }

})
export default app