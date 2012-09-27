
/*
 * GET home page.
 */

exports.index = function(req, res){
  //res.render('index', { title: 'Express' });
  res.render("index.html");
  //res.sendfile(__dirname + "/../public/index.html");
};