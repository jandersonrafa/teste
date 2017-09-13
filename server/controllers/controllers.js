
module.exports = function (app) {
    require('./homeController.js')(app);

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendfile('./client/index/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};