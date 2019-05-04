fs = require('fs');

var list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var getPermutations = function(list, maxLen) {
  // Copy initial values as arrays
  var perm = list.map(function(val) {
    return [val];
  });
  // Our permutation generator
  var generate = function(perm, maxLen, currLen) {
    // Reached desired length
    if (currLen === maxLen) {
      return perm;
    }
    // For each existing permutation
    for (var i = 0, len = perm.length; i < len; i++) {
      var currPerm = perm.shift();
      // Create new permutation
      for (var k = 0; k < list.length; k++) {
        perm.push(currPerm.concat(list[k]));
      }
    }
    // Recurse
    return generate(perm, maxLen, currLen + 1);
  };
  // Start with size 1 because of initial values
  return generate(perm, maxLen, 1);
};

var arr = getPermutations(list, 4);

var file = fs.createWriteStream('eng.digits.training_text');
file.on('error', function(err) {
  /* error handling */
  console.error(err);
});
arr.forEach(function(v) {
  file.write(v.join('') + '\n');
});
file.end();
