document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('register').querySelector('form');
    console.log(form);
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var data = formToJSON(this);
        console.log(data);
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(function(res) {
            return res.json();
        })  

        });
    });
