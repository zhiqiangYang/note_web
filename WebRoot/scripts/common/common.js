function findNoteBycondition(parent, status, type) {

    var userId = getCookie("userId");

    var param = {"userId": userId, "status": status, "type": type};

    console.log("userId:" + userId + ",status:" + status + "type:" + type);

    //避免多次点击回收站按钮出现数据叠加
    parent.children().remove();
    $.ajax({
        url: project_base + "/note/selectNoteByCondition",
        type: "post",
        async: false,
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallBack: "flightHandler",
        data: param,
        success: function (result) {
            if (result.status == 0) {

                console.log(result.data.length);

                //将返回的回收站内笔记放入ul下显示
                for (var i = 0; i < result.data.length; i++) {

                    var inner = "<li class='disable' id='" + result.data[i].cn_note_id + "'><a class='item'><i class='fa fa-file-text-o' title='online' rel='tooltip-bottom'></i>" +
                        result.data[i].cn_note_title
                        + "<input type='hidden' value='" + result.data[i].cn_note_body + "' />";

                    if (type != 3) {
                        inner = inner +
                        "<button type='button' class='btn btn-default btn-xs btn_position btn_delete'><i class='fa fa-times'></i></button>" +
                        "<button type='button' class='btn btn-default btn-xs btn_position_2 btn_replay'><i class='fa fa-reply'></i></button>";

                    }

                    parent.append(inner + "</a></li>");
                }

            }
            else if (result.status == 1) {
                $("#name_span").text(result.error);
            }
            else if (result.status == 2) {
                $("#pwd_span").text(result.error);
            }
        },
        error: function () {
            alert("请求失败");
        }
    });
    //pc_part_8.show();


    $("#pc_part_8").toggle();
    $("#pc_part_2").css("display", "none");
    //预览笔记
    $("#pc_part_5").css("display", "block");
    //编辑笔记
    $("#pc_part_3").css("display", "none");
}

function viewNote(obj, view) {

    view.children().remove();

    var title = $("<h4>").attr("id", "noput_note_title").html(obj.text());

    var content = $("<p>").text(obj.children("i").next().attr("value"));

    $("#noput_note_title").text(obj.text());
    $("#noput_note_title").next("p").text(obj.children("i").next().attr("value"));


    view.append(title).append(content);
}

//解析Cookie
function getUser() {

    var userCookie = getCookie("user");

    if (userCookie == "" || userCookie == null) {

        return;
    }

    console.log(userCookie);

    return userCookie.substr(userCookie.lastIndexOf("-") + 1);

}

function loginAndChangePassword(type) {
    var name;
    var pwd;
    if (type == "log_in") {
        //清空错误信息
        $("#name_span").text("");
        $("#pwd_span").text("");
        //获取用户名和密码
        name = $("#count").val();
        pwd = $("#password").val();
        //检测用户输入信息格式
        //发送ajax请求
        //a.将用户名和密码进行base64处理
    } else {

        name = getUser();
        pwd = $("#new_password").val();

        console.log("密码" + pwd);

        console.log(type);
    }

    var msg = name + ":" + pwd + ":" + type;
    var base64_msg = Base64.encode(msg);


    //$.jsonp({
    //    url: project_base + "/user/login",
    //    type: "get",
    //    beforeSend: function (xOptions) {
    //        xOptions.setRequestHeader("Authorization", "Basic " + base64_msg);
    //        return true;
    //    },
    //    callbackParameter: "callback",
    //    success: function (xOptions) {
    //        var result = xOptions.data.result;
    //        if (result.status == 0) {
    //
    //            if (type == "log_in") {
    //                var userId = result.data.uid;
    //                var token = result.data.token;
    //                //存入cookie中,可以采用base64加密;
    //                addCookie("user", userId + token + "-" + result.data.uName, 24);
    //                addCookie("userId", userId, 24);
    //            } else {
    //
    //                console.log("成功");
    //            }
    //            window.location.href = "edit.html";
    //        } else if (result.status == 1) {
    //            $("#name_span").text(result.error);
    //        } else if (result.status == 2) {
    //            $("#pwd_span").text(result.error);
    //        }
    //    },
    //    error: function () {
    //        alert("request error");
    //    }
    //
    //
    //});

    $.ajax({
        url: project_base + "/user/login",
        type: "get",
        async: false,
        dataType: "jsonp",
        jsonp: "callback",//传递给请求处理程序或页面的,用以获 得 jsonp 回调函数名的参数名(一般默认为:callback)
        jsonpCallback:"callback",//自定义的 jsonp 回调函 数名称,默认为 jQuery 自动生成的随机函数名,也可以写"?",jQuery 会自 动为你处理数据
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + base64_msg);
        },
        success: function (result) {
            if (result.status == 0) {

                if (type == "log_in") {
                    var userId = result.data.uid;
                    var token = result.data.token;
                    //存入cookie中,可以采用base64加密;
                    addCookie("user", userId + token + "-" + result.data.uName, 24);
                    addCookie("userId", userId, 24);
                } else {

                    console.log("成功");
                }
                window.location.href = "edit.html";
            } else if (result.status == 1) {
                $("#name_span").text(result.error);
            } else if (result.status == 2) {
                $("#pwd_span").text(result.error);
            }
        },
        error: function () {
            alert("request error");
        }
    });

}
