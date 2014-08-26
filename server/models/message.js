var async = require('async');
var db = require('../lib/db').getConnection();

module.exports = {

    findOne: function(selector, callback) {
        async.waterfall([
            function(callback) {
                db.connection('message', callback);
            },
            function(col, callback) {
                col.findOne(selector, callback);
            }
        ], callback);
    },

    find: function(selector, options, callback) {
        async.waterfall([
            function(callback) {
                db.connection('message', callback);
            },
            function(col, callback) {
                col.find(selector, options).toArray(callback);
            }
        ], callback);
    },

    insert: function(message, callback) {
        async.waterfall([
            function(callback) {
                db.connection('message', callback);
            },
            function(col, callback) {
                db.insert(message, callback);
            }
        ], function(err, items) {
            callback(err, items && items[0]);
        });
    },

    update: function(selector, updater, callback) {
        async([
            function(callback) {
                db.connection('message', callback);
            },
            function(col, callback) {
                col.update(selector, updater, callback);
            } 
        ], callback);
    },

    remove: function(selector, callback) {
        async.waterfall([
            function(callback) {
                db.connection('message', callback);
            },
            function(col, callback) {
                col.remove(selector, callback);
            }
        ], callback);
    }

};
