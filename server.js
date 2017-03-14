
var app      =  require('express')();
var request  = require("request");



app.get('/api/imagesearch/:id', (req, res) => {
  var id= req.params.id;
  var offset=req.query.offset;
  
  
  if (offset==undefined) {
  var myurl = "https://api.cognitive.microsoft.com/bing/v5.0/images/search?count=10&safeSearch&q="+id;
  } else {
    myurl = "https://api.cognitive.microsoft.com/bing/v5.0/images/search?count=10&safeSearch&q="+id+"&offset="+offset;
  }
   request.get(
                    {
                        url : myurl,
                        headers : {
                            'content-type' : 'multipart/form-data',
                            "Ocp-Apim-Subscription-Key" : "0b3b471995964f828cac899d52d15ab9",
                        },
                        
                    },
                    function (errors, response, body) {
                      if (errors){ console.log(errors);
                        
                      }
                      else
                      if ( response.statusCode == 200){
                      
                              body=JSON.parse(body);
                              var data =[ ];
                            
                              for (var i=0;i<body.value.length;i++) {
                                var myobj = {
                                  "url" : body.value[i].contentUrl,
                                  "snippet" :body.value[i].name,
                                  "thumbnail":body.value[i].thumbnailUrl,
                                  "context" :body.value[i].hostPageUrl
                                }
                                data.push(myobj);
                              }
                              
                              res.json(data);
                      }  
                    
                      
                    });
 
})

app.get('/api/latest/imagesearch', (req, res) => {
  
 request.get(
                    {
                        url : "https://api.cognitive.microsoft.com/bing/v5.0/images/trending",
                        headers : {
                            'content-type' : 'multipart/form-data',
                            "Ocp-Apim-Subscription-Key" : "0b3b471995964f828cac899d52d15ab9",
                            
                          
                        },
                        
                    },
                    function (errors, response, body) {
                      if (errors){ console.log(errors);
                        
                      }
                      else
                      if ( response.statusCode == 200){
                      
                              body=JSON.parse(body);
                              var data =[ ];
                              
                              var data =[ ];
                              
                               for (var j=0;j<body.categories.length;j++) {
                        
                            
                              for (var i=0;i<body.categories[j].tiles.length;i++) {
                             var myobj = body.categories[j].tiles[i].query
                                data.push(myobj);
                              }
                               }
                              res.json(data);
                              
                     }});
 
    
})




app.get('/', (req, res) => {
  
  res.redirect("/api/imagesearch/");
 
    
})

app.get('*', (req, res) => {
  
  res.send ("Page not Found");
  
    
})


app.listen(process.env.PORT, function () {
  console.log('Server is up and running!')
})