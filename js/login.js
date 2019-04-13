document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('login').querySelector('form');
    form.addEventListener('submit', function () {
        var data = new FormData(this);
        fetch('http://127.0.0.1:4000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(res) {
            console.log(res);
        });
    });
});