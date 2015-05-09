$(function(){
	var count=0;
	var cn_notebook_id="";
	var notebook_li="";
	var button ="";
	$(document).on("click","#list",function(){
		notebook_li=$(this);
		cn_notebook_id=$(this).find("input").attr("value");
		
		button = $(this).find("button");
		
		button.click(function(){
			
			
			//alert(cn_notebook_id);
			$("#can").load("alert/alert_delete_notebook.html");
			$("#can").show();
			$('.opacity_bg').show();
			
			$.ajax({
				url:project_base+"/noteItems/findnotes/"+cn_notebook_id,
				type:"get",
				dataType:"json",
				success: function(result){
					if(result.status==0){
						count=result.data;
						console.log(count);
					}
				},
				error: function(){
					alert("请求失败");
				}
			});
		});
		
		
	});
	
		$(document).on("click","#cancle_btn",function(){
			$("#can").hide();
			$('.opacity_bg').hide();
		});
	
		$(document).on("click","#delete_btn",function(event){
			event.stopPropagation();
			$("#can").hide();
			$('.opacity_bg').hide();
			//测试笔记本下有几条笔记
			//alert(count);
			if(count==0){
				//alert("U CAN DELETE");
				//彻底删除笔记本
				$.ajax({
					url:project_base+"/noteBook/delete/"+cn_notebook_id,
					type:"delete",
					success: function(result){
					if(result.status==0){
						//alert("SUCCESS");
						notebook_li.remove();
						$("#first_side_right ul li :first").addClass("checked");
					}else if(result.status==1){
						$("#name_span").text(result.error);
					}
				},
					error: function(){
						alert("false");	
					}
				});
			}else{
				alert("不能删除！！笔记本/回收站下还存在笔记")
			}
		});
	
});