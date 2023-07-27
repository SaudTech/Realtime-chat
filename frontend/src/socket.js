import io from 'socket.io-client';
let userDetails = localStorage.getItem('user') || '{}';
userDetails = JSON.parse(userDetails);

let connected = false;
let socket;

const main = () => {


  if (!connected) {
    console.log('Connecting to socket.io server');
    socket = io('http://localhost:3000/', {
      query: userDetails,
    });
  } else console.log('Already connected to socket.io server')

  socket.on('connect', () => {
    console.log('Connected to socket.io server');
    connected = true;
  });

  return socket;
};
main();
export default main;
