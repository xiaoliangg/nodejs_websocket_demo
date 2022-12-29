const ws = require('nodejs-websocket');//引入websocket
const prot = 8082;
 
const server = ws.createServer(connection => {
    connection.on("text", function (str) {
        // connection.sendText(str);//   !返回给客户端的数据!
        server.connections.forEach(function (conn) {
            console.log(JSON.parse(str)) //接收到前端传来的数据，可以使用Parse转回对象。
            var myVar = setInterval(()=> {
                conn.sendText(str+'服务器返回')//返回给所有客户端的数据(相当于公告、通知)
            },3000)
            setTimeout(() => {
                clearInterval(myVar);//推送停止
            },10000)
        })
    })
    //监听关闭
    connection.on("close", function (code, reason) {
        console.log("服务关闭")
    })
    //监听异常
    connection.on("error",(e) => {
        console.log(e,'服务异常断开...')
    })
}).listen(prot)