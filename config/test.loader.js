module.exports = function(content) {
  console.log('test loader', content);

  return `// laoluo \n ${content}`
}