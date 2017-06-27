module.exports = function() {
  var greet = document.createElement('div');
  greet.textContent = "{{message}}";
  greet.href = "register.html";
  greet.id = "app"
  return greet;
};
