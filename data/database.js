/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

// Model for each piece of denim
class Denim {}

// Class for list of denims that contains all pieces of denims
class DenimList {}

// Our small denim database with 3 fields:
// Brand, Model, Minimum Size
var denimDb = [
    ['Acne Studios', 'Ace', 28],
    ['Nudie', 'Tube Tom', 27],
    ['Levi\'s', '501', 28],
];

// Create a Denim instance for each piece of denim
var denims = denimDb.map((denimArr, i) => {
  var denim = new Denim();
  denim.brand = denimArr[0];
  denim.model = denimArr[1];
  denim.size = denimArr[2];
  denim.id = `${i}`;
  return denim;
});

// Create our Denim list with arbitrary id
var denimList = new DenimList();
denimList.id = 1;

// Make this database methods available to enable external code to
// interact with your database
module.exports = {
  getDenims: () => denims,
  getDenimList: () => denimList,
  Denim,
  DenimList,
};
