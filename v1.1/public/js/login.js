window.onload = function () {
    var btn_submit = document.getElementById('btn-submit');
    var input_username = document.getElementById('input-username');
    var input_password = document.getElementById('input-password');
    btn_submit.onclick = function () {
        submit();
    };
    input_password.onkeydown = function (event) {
        var the_event = event || window.event;
        if (the_event.keyCode === 13) {
            submit();
        }
    };
    function submit() {
        var username = input_username.value.trim();
        var password = input_password.value.trim();
        if (username.trim() === '' || password.trim() === '') {
            alert('用户名或密码不能为空');
        } else {
            ajax({
                url: '/admin/login',
                type: 'post',
                data: {
                    'username': username,
                    'password': password
                },
                success: function (str) {
                    var the_str = JSON.parse(str);
                    if (the_str.ok) {
                        window.location.href = document.referrer;
                    } else {
                        alert('登陆失败: '+the_str.message);
                    }
                },
                error: function () {
                    alert('通信失败');
                }
            })
        }
    }
}