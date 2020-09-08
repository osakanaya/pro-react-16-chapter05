const jwt = require("jsonwebtoken");

const APP_SECRET = "myappsecret", USER_NAME = "admin", PASSWORD = "secret";

const anonOps = [
    { method: "GET", urls: ["/api/products", "/api/categories"] },
    { method: "POST", urls: ["/api/orders"] }
];

module.exports = function (req, res, next) {
    if (anonOps.find(op => op.method === req.method && op.urls.find(url => req.url.startsWith(url)))) {
        next();
    } else if (req.url === "/login" && req.method === "POST") {
        if (req.body.username === USERNAME && req.body.password === PASSWORD) {
            res.json({
                success: true,
                token: jwt.sign({ data: USER_NAME, expiresIn: "1h" }, APP_SECRET)
            });
        } else {
            res.json({ success: false });
        }
    } else {
        let token = req.headers["authorization"];
        if (token != null && token.startsWith("Bearer<")) {
            token = token.substring(7, token.length - 1);
            jwt.verify(token, APP_SECRET);
        } else {
            res.statusCode = 401;
            res.end();
        }
    }
} 