const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');

const { Server } = require("socket.io");
const bodyParser = require('body-parser');


app.use(cors());
app.use(bodyParser.json());
// app.use('/users', usersRouter);



const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

let connections = [];
let users = [
  {
    username: 'Saud',
    password: '123',
  },
  {
    username: 'Nash',
    password: '123',
  },
  {
    username: 'Ahmed',
    password: '123',
  },
];
let messages = [
  {
    "from": "Saud",
    "to": "Nash",
    "content": "Hello Nash, how are you?",
    "timestamp": "27/07/2023, 10:00:00"
  },
  {
    "from": "Nash",
    "to": "Saud",
    "content": "Hi Saud, I'm good. How about you?",
    "timestamp": "27/07/2023, 10:05:00"
  },
  {
    "from": "Saud",
    "to": "Nash",
    "content": "I'm doing well, thanks! How's work going?",
    "timestamp": "27/07/2023, 10:10:00"
  },
  {
    "from": "Nash",
    "to": "Saud",
    "content": "Work is busy as usual. We're working on a new project.",
    "timestamp": "27/07/2023, 10:15:00"
  },
  {
    "from": "Saud",
    "to": "Nash",
    "content": "That sounds interesting. What's the project about?",
    "timestamp": "27/07/2023, 10:20:00"
  },
  {
    "from": "Nash",
    "to": "Saud",
    "content": "It's a new software tool for data analysis. I'm excited about it.",
    "timestamp": "27/07/2023, 10:25:00"
  },
  {
    "from": "Saud",
    "to": "Nash",
    "content": "That's great. I'm sure you'll do well. By the way, are you planning any vacations soon?",
    "timestamp": "27/07/2023, 10:30:00"
  },
  {
    "from": "Nash",
    "to": "Saud",
    "content": "Yes, I'm planning to visit Europe next month. I'm really looking forward to it.",
    "timestamp": "27/07/2023, 10:35:00"
  },
  {
    "from": "Saud",
    "to": "Nash",
    "content": "That's awesome. Europe is beautiful. Do you have any future plans you'd like to share?",
    "timestamp": "27/07/2023, 10:40:00"
  },
  {
    "from": "Nash",
    "to": "Saud",
    "content": "Well, I'm thinking about starting my own business in the future. It's a big step, but I'm excited about it.",
    "timestamp": "27/07/2023, 10:45:00"
  },
  {
    "from": "Saud",
    "to": "Nash",
    "content": "That's a great idea, Nash. I'm sure you'll be successful. How's your family doing?",
    "timestamp": "27/07/2023, 10:50:00"
  },
  {
    "from": "Nash",
    "to": "Saud",
    "content": "They're doing well, thanks for asking. My daughter just started school this year.",
    "timestamp": "27/07/2023, 10:55:00"
  },
  {
    "from": "Saud",
    "to": "Ahmed",
    "content": "Hey Ahmed, how's your new job going?",
    "timestamp": "27/07/2023, 11:00:00"
  },
  {
    "from": "Ahmed",
    "to": "Saud",
    "content": "Hi Saud, it's going well. I'm learning a lot of new things.",
    "timestamp": "27/07/2023, 11:05:00"
  },
  {
    "from": "Saud",
    "to": "Ahmed",
    "content": "That's great to hear. Are you planning any vacations soon?",
    "timestamp": "27/07/2023, 11:10:00"
  },
  {
    "from": "Ahmed",
    "to": "Saud",
    "content": "Yes, I'm thinking about a trip to the mountains. I love hiking.",
    "timestamp": "27/07/2023, 11:15:00"
  },
  {
    "from": "Saud",
    "to": "Ahmed",
    "content": "That sounds like a lot of fun. Do you have any future plans you'd like to share?",
    "timestamp": "27/07/2023, 11:20:00"
  },
  {
    "from": "Ahmed",
    "to": "Saud",
    "content": "I'm considering going back to school for a master's degree. I think it could open up some new opportunities for me.",
    "timestamp": "27/07/2023, 11:25:00"
  },
  {
    "from": "Saud",
    "to": "Ahmed",
    "content": "That's a great idea, Ahmed. Education is always a good investment. How's your family doing?",
    "timestamp": "27/07/2023, 11:30:00"
  },
  {
    "from": "Ahmed",
    "to": "Saud",
    "content": "They're doing well, thanks. My son just started playing soccer this year.",
    "timestamp": "27/07/2023, 11:35:00"
  },

  {
    "from": "Nash",
    "to": "Ahmed",
    "content": "Hi Ahmed, how's your new project coming along?",
    "timestamp": "27/07/2023, 11:40:00"
  },
  {
    "from": "Ahmed",
    "to": "Nash",
    "content": "Hello Nash, it's progressing well. We're on track to meet our deadline.",
    "timestamp": "27/07/2023, 11:45:00"
  },
  {
    "from": "Nash",
    "to": "Ahmed",
    "content": "That's great to hear. Are you planning any vacations soon?",
    "timestamp": "27/07/2023, 11:50:00"
  },
  {
    "from": "Ahmed",
    "to": "Nash",
    "content": "I'm hoping to take a beach vacation soon. I could use some relaxation.",
    "timestamp": "27/07/2023, 11:55:00"
  },
  {
    "from": "Nash",
    "to": "Ahmed",
    "content": "That sounds perfect. Do you have any future plans you'd like to share?",
    "timestamp": "27/07/2023, 12:00:00"
  },
  {
    "from": "Ahmed",
    "to": "Nash",
    "content": "I'm thinking about starting a side business. I've always wanted to be an entrepreneur.",
    "timestamp": "27/07/2023, 12:05:00"
  },
  {
    "from": "Nash",
    "to": "Ahmed",
    "content": "That's exciting, Ahmed. I'm sure you'll do great. How's your family doing?",
    "timestamp": "27/07/2023, 12:10:00"
  },
  {
    "from": "Ahmed",
    "to": "Nash",
    "content": "They're doing well, thanks. My daughter just started kindergarten.",
    "timestamp": "27/07/2023, 12:15:00"
  }
]

app.post('/authenticate', (req, res) => {
  const { username, password } = req.body;
  console.log('Trying to authenticate: ', username, password);
  if (!username || !password) {
    res.status(400).json({ error: 'Invalid Request' });
    return;
  }
  const user = users.find((v) => v.username === username && v.password === password);
  if (!user) {
    res.status(401).json({ error: 'Invalid Credentials' });
    return;
  }
  res.json({ username: user.username });
});

io.on('connection', (socket) => {
  console.log('User connected: ', socket.id);
  const query = socket.handshake.query;

  connections = connections.filter((v) => v.username !== query.username);
  connections.push({
    socketId: socket.id,
    username: query.username,
  });

  console.log("User connected " + query.username)


  if (!query.username) {
    console.log('User disconnected: ', socket.id);
    socket.disconnect();
    return;
  }


  socket.on('send-message', (messageObj) => {
    const messageObject = {
      from: query.username,
      to: messageObj.to,
      content: messageObj.content,
      timestamp: messageObj.timestamp || Date.now(),
    };
    messages.push(messageObject);
    const toSocket = connections.find((v) => v.username === messageObj.to);
    if (toSocket) {
      socket.to(toSocket.socketId).emit('receive-message', messageObject);
    } else {
      console.log(`User ${messageObj.to} not found; message not sent`);
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });

});









app.get("/getMessagesBetweenTwoParties", (req, res) => {
  const { partyUsername, currentusername } = req.query;
  const userMessages = messages.filter(message => (message.from === partyUsername && message.to === currentusername) || (message.from === currentusername && message.to === partyUsername));
  console.log(userMessages);
  res.json(userMessages);
});


app.get('/users', (req, res) => {
  res.json(users.filter((v) => v.username !== req.query.username));
});

app.get('/messages', (req, res) => {
  res.json(messages);
});
app.get('/messagesD', (req, res) => {
  messages = [];
  res.json({ r: "ok" });
});
app.get('/connections', (req, res) => {
  res.json(connections);
});

app.get('/messages/:username', (req, res) => {
  const username = req.params.username;
  const userMessages = messages.filter(message => message.username === username);
  res.json(userMessages);
});

server.listen(3000, () => {
  console.log('listening on port 3000');
});
