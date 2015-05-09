$(function(){
		$("#regist_username").text("");
		$("#nickname").text("");
		$("#regist_password").text("");
	
		$("#regist_button").click(function(){
			var regist_username = $("#regist_username").val();
			var nickname = $("#nickname").val();
			var regist_password = $("#regist_password").val();
			
			var form_data = {"cn_user_name":regist_username,
					  "cn_user_password":regist_password,
					  "cn_user_desc":nickname};
			$.ajax({
				url:project_base+"/user/regist ",
				type:"post",
				data:JSON.stringify(form_data),
				contentType:"application/json",
				dataType:"json",
				success:function(result){
						if(result.status==1){
							 $("#warning_1").show();
						}else if(result.status==0){
							$("#back").click();//触发单击
						}
					},
				error:function(){
						alert("失败");
					}
				
			});

		});
		
	});