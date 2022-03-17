const { headers } = require("./const");

function errorHandle(res) {
  res.writeHead(404, headers);
  res.write(
    JSON.stringify({
      status: "false",
      message: "欄位未填寫正確，或無此 todo id",
    })
  );
  res.end();
}

function successHandle(res, todos) {
  res.writeHead(200, headers);
  if (todos) {
    res.write(
      JSON.stringify({
        status: "success",
        data: todos,
      })
    );
  }
  res.end();
}

module.exports = { errorHandle, successHandle };
