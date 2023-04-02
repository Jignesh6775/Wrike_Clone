const express = require("express")
const todoRouter = express.Router()
const { TodoModel } = require("../model/todo.model")
const jwt = require("jsonwebtoken")


todoRouter.get("/", async (req, res) => {
    const token = req.headers.authorization
    let decoded = jwt.verify(token, "masai")
    try {
        const notes = await TodoModel.find({"userID":decoded.userID})
        res.status(200).send(notes)
    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }
})

todoRouter.get("/:noteID", async (req, res) => {
    const noteID = req.params.noteID
    try {
        const notes = await TodoModel.findOne({ _id: noteID })
        res.status(200).send(notes)
    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }
})



todoRouter.post("/add", async (req, res) => {
    try {
        const note = new TodoModel(req.body)
        await note.save()
        res.status(200).send({ "msg": "A New Todo has been added" })
    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }
})



todoRouter.patch("/update/:noteID", async (req, res) => {
    const payload = req.body
    const noteID = req.params.noteID
    try {
        await TodoModel.findByIdAndUpdate({ _id: noteID }, payload)
        res.status(200).send({ "msg": "A Todo has been updated" })
    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }
})


todoRouter.delete("/delete/:noteID", async (req, res) => {
    const noteID = req.params.noteID
    try {
        await TodoModel.findByIdAndDelete({ _id: noteID })
        res.status(200).send({ "msg": "A Todo has been deleted" })
    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }
})


module.exports = {
    todoRouter
}