const http = require('http');
const { v4: uuidv4 } = require('uuid');
const { errorHandle, successHandle } = require('./resHandle');

const todos = []; // temp db

const baseUrl = '/todos';

const method = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
  OPTIONS: 'OPTIONS',
};

const requestListener = (req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  // get all todos
  if (req.url === baseUrl && req.method === method.GET) {
    successHandle(res, todos);
    return;
  }

  // add new todo
  if (req.url === baseUrl && req.method === method.POST) {
    req.on('end', () => {
      console.log(body);
      try {
        const newTitle = JSON.parse(body).title;
        if (newTitle) {
          const newTodo = {
            title: newTitle,
            id: uuidv4(),
          };
          todos.push(newTodo);

          successHandle(res, todos);
          return;
        }

        errorHandle();
      } catch {
        errorHandle();
      }
    });
    return;
  }

  // delete all todos
  if (req.url === baseUrl && req.method === method.DELETE) {
    todos.length = 0;
    successHandle(res, todos);
    return;
  }

  // delete one todo
  if (req.url.startsWith(`${baseUrl}/`) && req.method === method.DELETE) {
    const splits = req.url.split('/');
    if (splits.length != 3) {
      errorHandle(res);
      return;
    }

    const id = splits.pop();
    const index = todos.findIndex((t) => t.id === id);
    if (index < 0) {
      errorHandle(res);
    } else {
      todos.splice(index, 1);
      successHandle(res, todos);
    }
    return;
  }

  // edit one todo
  if (req.url.startsWith(`${baseUrl}/`) && req.method === method.PATCH) {
    req.on('end', () => {
      console.log(body);
      try {
        const title = JSON.parse(body).title;
        const splits = req.url.split('/');
        if (splits.length != 3) {
          errorHandle(res);
          return;
        }
        const id = splits.pop();
        const index = todos.findIndex((t) => t.id === id);

        if (title && !(index < 0)) {
          todos[index].title = title;
          successHandle(res, todos);
        } else {
          errorHandle(res);
        }
      } catch {
        errorHandle(res);
      }
    });
    return;
  }
  if (req.method === method.OPTIONS) {
    // preflight 請求，在不同路由下，如果網站試著請求前，會先發一次 preflight 給後端驗證
    successHandle(res, nul);
    return;
  }
  errorHandle(res);
};

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 3005);
