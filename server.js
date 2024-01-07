import server from './index.js'

server.listen(3006, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log('Server started on port 3000');
    }
});
