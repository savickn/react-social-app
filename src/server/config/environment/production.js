
const path = require('path');

// Production specific configuration
// =================================
module.exports = {
  // Server IP ??
  ip:       process.env.IP ||
            undefined,

  // Server port
  port:     process.env.PORT ||
            8080,

  // references directory that contains 'server.bundle.js'
  root:     path.normalize(__dirname),

  // MongoDB connection options
  mongo: {
    uri:    process.env.M_ATLAS_URI ||
            `mongodb+srv://nadmin:${process.env.M_ATLAS_PWORD}@savick-meetup.ktdsvft.mongodb.net/?retryWrites=true&w=majority`
  }
};