let http=require('http')

let fs=require('fs')

let template=require('art-template')

var url = require('url');

let comments=[
  {
    name:'张三',
    comment:'这是一个阳光明媚的一天',
    detaTime:'2011-1-1'
  },
  {
    name:'张三',
    comment:'这是一个阳光明媚的一天',
    detaTime:'2011-1-1'
  },
  {
    name:'张三',
    comment:'这是一个阳光明媚的一天',
    detaTime:'2011-1-1'
  },
  {
    name:'张三',
    comment:'这是一个阳光明媚的一天',
    detaTime:'2011-1-1'
  },
  {
    name:'张三',
    comment:'这是一个阳光明媚的一天',
    detaTime:'2011-1-1'
  },
  {
    name:'张三',
    comment:'这是一个阳光明媚的一天',
    detaTime:'2011-1-1'
  }
]

http
.createServer(function(req,res){
  let parseObj=url.parse(req.url,true)
  let pathname=parseObj.pathname
  if(pathname === '/'){
    fs.readFile('./views/index.html',function(err,data){
      if(err){
        return res.end("404")
      }
      let str= template.render(data.toString(),{
        comments:comments
      })
      res.end(str)
    })
  }else if(pathname === '/post'){
    fs.readFile('./views/post.html',function(err,data){
      if(err){
        return res.end("404")
      }
      let str= template.render(data.toString(),{
        comments:comments
      })
      res.end(str)
    })
  }else if(pathname.indexOf('/public/') === 0){
    fs.readFile('.'+pathname,function(err,data){
      if(err){
        return res.end("404")
      }
      res.end(data)
    })
  }else if(pathname === '/formput'){
    let comment = parseObj.query
    comment.detaTime = "2011-1-1"
    comments.push(comment)
    res.statusCode = 302
    res.setHeader('Location','/')
    res.end()
  }
}).listen(3000,function(){
  console.log("loading")
})
  