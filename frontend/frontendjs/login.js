document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('login').querySelector('form');
    console.log(form);
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var data = formToJSON(this);
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(function (res) {
                return res.json();

            })
            .then(function (res) {
                if (res.success) {
                    if (window.localStorage.getItem('token') === "null" || window.localStorage.getItem('token') === null)
                        window.localStorage.setItem('token', res.token);
                }
                location.reload();
            });
    });
});