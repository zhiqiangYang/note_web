$(function(){
	$(document).on("click",
			"#cancel_btn3",
			function(){
					$("#can").hide();
					$('.opacity_bg').hide()}
	);
	$(document).on("click",
			"#cancel_btn4",
			function(event){
		
		event.stopPropagation();
			  
		var cn_notebook_name = $("#input_notebook_rename").val();
		var cn_notebook_id = $("#first_side_right ul li").children("input").val();
		console.log(cn_notebook_name+cn_notebook_id);
		var base64_msg = Base64.encode(cn_notebook_name+":"+cn_notebook_id);
		$.ajax({
			url:project_base+"/noteBook/renameNoteBook",
			type:"put",
			dataType:"json",
			beforeSend:function(xhr){
			xhr.setRequestHeader("Authorization","Basic "+base64_msg);
		},
			success:function(result){
		      if(result.status==0){
		    	  $("#can").hide();
				  $('.opacity_bg').hide();
				  $("#first_side_right .contacts-list").empty();
				  updateNoteBook();
				  
		      }
			},
			error:function(){
					alert("请求失败");	
			}
			
		});
					
	});
	$(document).on("dblclick","#list",function(){
			$("#can").load("alert/alert_rename.html");
			$("#can").show();
			$('.opacity_bg').show();
		
	});
	
})
//更新笔记本
function updateNoteBook(){
	$.ajax({
		url:project_base+"/noteBook/note",
		type:"get",
		dataType:"json",
		success:function(result){
	      	var noteBooks = result.data;
	      	for(var i=0; i<noteBooks.length;i++)
	      		 $("#first_side_right ul").append('<li class="online" id="list"><input type="hidden" value="'+noteBooks[i].cn_notebook_id+'"/><a><i class="fa fa-book" title="笔记本"  rel="tooltip-bottom"></i> '+noteBooks[i].cn_notebook_name+'<button type="button" class="btn btn-default btn-xs btn_position btn_delete"><i class="fa fa-times"></i></button></a></li>');
		},
		error:function(){
				alert("请求失败");	
		}
	});
	
}
