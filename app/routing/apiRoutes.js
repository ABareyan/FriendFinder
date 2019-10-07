var friends = require("../data/friends");

module.exports = function(app) {

    app.get("/api/friend", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friend", function(req, res) {
        var totalDifference = 0;
        var bestChoise = {
            name: "",
            photo: "",
            difference: 100
        };

        var friendData = req.body;
        var friendName = friendData.name;
        var friendScore = friendData.scores;

        var num = friendScore.map(function(item) {
            return parseInt(item);
        });
        friendData = {
            name: req.body.name,
            photo: req.body.photo,
            scores: num
        };

        // log User name and sc ore
        console.log("Name: " + friendName);
        console.log("Score: " + friendScore);
        console.log("=============================================");


        var sum = num.reduce((a, b) => a + b);

        console.log("Friend score: " + sum);
        console.log("Best choise: " + bestChoise.difference);
        console.log("=============================================");



        for (var i = 0; i < friends.length; i++) {
            //log Friends name
            console.log("Friend name: " + friends[i].name);

            totalDifference = 0;
            console.log("Tottal diff: " + totalDifference);
            console.log("Best choise: " + bestChoise.difference);


            var bestScore = friends[i].scores.reduce((a, b) => a + b);

            console.log("Friend total score: " + bestScore);

            totalDifference += Math.abs(sum - bestScore);

            console.log(totalDifference + ' total difference');

            if (totalDifference <= bestChoise.difference) {
                bestChoise.name = friends[i].name;
                bestChoise.photo = friends[i].photo;
                bestChoise.difference = totalDifference;
            }

            console.log(totalDifference + ' total difference');
            console.log("=======================================");

        }
        console.log(bestChoise);
        friends.push(friendData);
        console.log("New friend added");
        console.log(friendData);
        res.json(bestChoise);

    });



};