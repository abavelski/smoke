
function UsersDao(db) {

    this.insertUser = function (user, next) {
        db.collection('user').insert(user, next);
    };

    this.findUserById = function(id, next) {
        db.collection('user').findOne({'_id': id}, next);
    };

    this.findCalendarsByUser = function(userId, next) {
        db.collection('calendar').find({'userId': userId}).toArray(next)
    };

}

module.exports = UsersDao;