//Dependencies
var friends = require('../data/friends.js');

module.exports = function(app) {

    //Tables API route
    app.get("/api/friends", function(req, res) {
        return res.json(friends);
    });

    //Create new friend
    app.post("/api/friends", function(req, res) {

        //Empty array to push matched friend
        var besty = {
            name: "",
            photo: "",
            friendDiff: 1000
        };

        var userData = req.body;
        var userScores = userData.scores;
        var totalDiff = 0;

        //Loop through friends object and compare
        for (var i = 0; i < friends.length; i++) {

            totalDiff = 0;

            //Loop through the scores of each friend
            for (var j = 0; j < friends[i].scores[j]; j++) {
                //calculating the difference between each score and sum them into totalDifference
                totalDiff += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

                //Find best friend match
                if (totalDiff <= besty.friendDiff) {

                    besty.name = friends[i].name;
                    besty.photo = friends[i].photo;
                    besty.friendDiff = totalDiff;

                }
            }
        }

        //Pushing new friend to friends API
        friends.push(userData);

        res.json(besty);
    });

}