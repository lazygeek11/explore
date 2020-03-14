function log(message) {
    var div = document.createElement('div');
    div.textContent = message;
    document.getElementById('log').appendChild(div);
}