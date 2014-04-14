"use strict";

module.exports = {
    mongo: {
        dbUrl: 'mongodb://192.168.1.192:27017/smoke'
    },
    google: {
      apiKey: 'AIzaSyBp9omPlUlLcD0i1c8tsDtPjZFY9IRZDtk'
    },
    server: {
        staticFolder: __dirname+ '/../../client/dist'
    }
};