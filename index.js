const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config()
const Chat = require('./model/chat.js')

const port = process.env.PORT || 8080
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/whatapp'

app.set('views', path.join(__dirname, 'view'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

main()
.then(()=>{
    console.log("connection is set up")
})
.catch((err)=>{
     console.log(err)
});

async function main() {
  await mongoose.connect(mongoUri);
}
// list chats
app.get('/chats', async (req, res) => {
    try {
        const chats = await Chat.find();
        res.render('chats', { chat: chats });
    } catch (err) {
        console.error(err);
        res.status(500).send('Unable to load chats');
    }
});

// add new
app.get('/chats/new', (req, res) => {
    res.render('create');
});

app.post('/chats', async (req, res) => {
    const { from, to, message } = req.body;
    const chatnew = new Chat({ from, to, message });
    try {
        await chatnew.save();
        res.redirect('/chats');
    } catch (err) {
        console.error(err);
        res.render('create', { error: 'Unable to save chat. Please try again.' });
    }
});

// edit
app.get('/chats/:id/edit', async (req, res) => {
    const { id } = req.params;
    try {
        const chatItem = await Chat.findById(id);
        if (!chatItem) return res.status(404).send('Chat not found');
        res.render('edit', { chat: chatItem });
    } catch (err) {
        console.error(err);
        res.redirect('/chats');
    }
});

// update
app.post('/chats/:id', async (req, res) => {
    const { id } = req.params;
    const { from, to, message } = req.body;
    try {
        await Chat.findByIdAndUpdate(id, { from, to, message });
        res.redirect('/chats');
    } catch (err) {
        console.error(err);
        res.status(500).send('Unable to update chat');
    }
});

// delete
app.post('/chats/:id/delete', async (req, res) => {
    try {
        await Chat.findByIdAndDelete(req.params.id);
        res.redirect('/chats');
    } catch (err) {
        console.error(err);
        res.status(500).send('Unable to delete chat');
    }
});

app.listen(port,()=>{
    console.log("app listion on 8080 port")
})