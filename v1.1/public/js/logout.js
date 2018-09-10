window.onload = function() {
    var is_in_admin = /admin/m
    var btn_logout = document.getElementById('btn-logout');
    if (btn_logout !== null) {
        btn_logout.onclick = function() {
            if (is_in_admin.test(location.href)) {
                alert('退出管理后台才可以登出')
            } else {
                ajax({
                    url: '/admin/logout',
                    type: 'post',
                    data: {'logout': 'logout'},
                    success: function(str) {
                        let the_str = JSON.parse(str);
                        if (the_str.ok) {
                            location.reload();
                        } else {
                            alert(the_str.message);
                        }
                    },
                    error: function() {
                        alert('通信失败')
                    }
                })
            }
        };
    }
    return false
}