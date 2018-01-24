var gulp = require("gulp");
var webserver = require("gulp-webserver");
var connect = require("gulp-connect");
var fs = require("fs");
var path = require("path");
var url = require("url");

var pathname = JSON.parse(fs.readFileSync(__dirname + "/App/data/data.json").toString())

gulp.task("connect", function() {
    connect.server({
        port: 8080,
        livereload: true
    })
})
gulp.task("webserver", function() {
    gulp.src("./")
        .pipe(webserver({
            host: "localhost",
            port: 3006,
            livereload: true,
            middleware: function(req, res, next) {
                if (req.url === "/favicon.ico") {
                    return;
                }
                res.setHeader("Access-Control-Allow-Origin", "*");

                var obj = url.parse(req.url);
                var ids = obj.pathname.split("/")[1];
                console.log(obj);
                if (req.url == "/data") {
                    res.end(JSON.stringify(pathname))
                }
                pathname.map(function(data) {
                    if (data.id == ids) {
                        res.end(JSON.stringify(data));
                    }
                })



            }
        }))
})
gulp.task("default", ["connect", "webserver"])