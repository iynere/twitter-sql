'use strict';

const _ = require('lodash');
const data = [];

const add = (name, text) => {
  data.push({ name: name, text: text, id: data.length });
  return _.clone(data[data.length - 1]);
}

const list = () => _.cloneDeep(data);

const find = (properties) => _.cloneDeep(_.filter(data, properties));

module.exports = { add, list, find };

const randArrayEl = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getFakeName = function() {
  const fakeFirsts = ['Nimit', 'Dave', 'Shanna', 'Ashi', 'Gabriel', 'Emily', 'Ashley', 'Kimber', 'Ani'];
  const fakeLasts = ['Hashington', 'Hopperson', 'McQueue', 'OLogn', 'Ternary', 'Claujure', 'Dunderproto', 'Binder', 'Docsreader', 'Ecma'];
  return `${randArrayEl(fakeFirsts)} ${randArrayEl(fakeLasts)}`;
};

const getFakeTweet = function() {
  const awesomeAdj = ['awesome', 'breathtaking', 'amazing', 'funny', 'sweet', 'cool', 'wonderful', 'mindblowing'];
  return `Grace Hopper Academy is ${randArrayEl(awesomeAdj)}! The instructors are just so ${randArrayEl(awesomeAdj)}. #GHAlove #codedreams`;
};

for (let i = 0; i < 10; i++) {
  module.exports.add( getFakeName(), getFakeTweet() );
}
