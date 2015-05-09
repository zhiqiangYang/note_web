$(function(){
	/**
	 * 回收站相关按钮
	 */
		//全局变量
		//恢复到指定notebook的id
		var replaynotebookid="";
		//当前note的id
		var currentnote_id="";
		//当前note所属的notebook的id
		var notebookid="";
		//当前note块(<li>块)
		var currentnote_li="";
		//当前用户的id
		var cn_user_id = getCookie("userId");
		//获取note条
		var note_click="";
		
		//点击回收站按钮，查看回收站内的文件并可进行操作
		$("#rollback_button").click(function(){
			
			var ul_list = $("#four_side_right ul");
			//避免多次点击回收站按钮出现数据叠加
			ul_list.children().remove();
			$.ajax({
				url: project_base + "/recycle/find/" + cn_user_id,
				type: "get",
				dataType: "json",
				success: function(result){
					if(result.status == 0) {						
						//将返回的回收站内笔记放入ul下显示
						for (var i = 0; i < result.data.length; i++) {
							//alert(result.data[i].cn_note_body);						
							ul_list.append("<li class='disable' id='" + result.data[i].cn_note_id + "' ><a class='item'><i class='fa fa-file-text-o' title='online' rel='tooltip-bottom'></i>" +
							result.data[i].cn_note_title +"<input type='hidden' value='"+result.data[i].cn_note_body+"'>"+
							"<button type='button' class='btn btn-default btn-xs btn_position btn_delete'><i class='fa fa-times'></i></button>" +
							"<button type='button' class='btn btn-default btn-xs btn_position_2 btn_replay'><i class='fa fa-reply'></i></button></a></li>");							
						}
					}
						else if (result.status == 1) {
							$("#name_span").text(result.error);
						}
						else if (result.status == 2) {
							$("#pwd_span").text(result.error);
						}
				},
				error: function(){
					alert("请求失败");
				}
				
			});
			//点击回收站，笔记块hide，回收站块show
			$("#pc_part_2").toggle();
			$("#pc_part_4").toggle();
			
			//点击note条预览笔记
				$(document).on("click","#four_side_right a",function(){
					$("#pc_part_3").hide();
					$("#pc_part_5").show();
					//ajax通过cn_note_id查找并返回cn_note_title,cn_note_body
				});
			
			
			
			
			//绑定当前笔记的按钮 1.彻底删除按钮
			//选择a下的第2个子元素
			$(document).on("click","#four_side_right a button:nth-child(3)",function(){
				currentnote_li=$(this).parent().parent();
				$("#can").load("alert/alert_delete_rollback.html");
				$("#can").show();
				$('.opacity_bg').show();
			
			//绑定弹出彻底删除对话框按钮 (1).X
			$(document).on("click",".close",function(){
				$("#can").hide();
				$(".opacity_bg").hide();
			});
			//(2).取消
			$(document).on("click","#btn_cancle",function(){
				$("#can").hide();
				$(".opacity_bg").hide();
			});
			$(document).on("click","#btn_sure",function(){
			//(3)永久性删除
				currentnote_id=currentnote_li.attr("id");
				$.ajax({
					url:project_base+"/delete/tnote/"+currentnote_id,
					type:"delete",
					
					success:function(result){
						if(result.status==0){
															        
						}else if(result.status==1){
							$("#name_span").text(result.error);
						}else if(result.status==2){
							 $("#pwd_span").text(result.error);
						}},
					error:function(){
						alert("请求失败");	
					}
				});
				$("#can").hide();
				$(".opacity_bg").hide();
				currentnote_li.remove();
			});
		});
		
			//按钮2.恢复笔记到默认/指定笔记本 	
			$(document).on("click","#four_side_right a button:nth-child(4)",function(){
				currentnote_li=$(this).parent().parent()
				currentnote_id=currentnote_li.attr("id");
				$("#can").load("alert/alert_replay.html");
				$("#can").show();
				$('.opacity_bg').show();
				/*
				 * 获取当前默认option，获取不到？？
				 * var dft_option=$("#replaySelect");
				alert(dft_option.val());
				 */

				//alert(cn_note_id);
				//点击恢复图标，根据笔记id找到笔记本id
				$.ajax({
					url:project_base+"/note/findNoteBook/"+currentnote_id,
					type:"get",
					dataType:"json",
					success:function(result){
						if(result.status==0){
							notebookid=result.data;
							alert(notebookid);
//??????
							$.ajax({					
								url:project_base+"/noteBook/note/",
								type:"get",
								dataType:"json",
								success:function(result){
									if(result.status==0){
										//alert("+++++++++++++++");
										for(var i=0;i<result.data.length;i++){
											//判断如果笔记本id对应当前笔记的id，则写为默认笔记本
											//alert(result.data[i].cn_notebook_name);
											if(notebookid==result.data[i].cn_notebook_id){
												alert("默认项无id");
												continue;												
											}else{
												//遍历除当前note所在notebook的所有其他笔记本名称
												$("#replaySelect").append("<option id='"+result.data[i].cn_notebook_id+"'>"+result.data[i].cn_notebook_name+"</option>");
												//alert(result.data[i].cn_notebook_id);
											}
										}
													        
									}else if(result.status==1){							
										$("#name_span").text(result.error);
									}else if(result.status==2){
										 $("#pwd_span").text(result.error);
									}},
								error:function(){
									alert("请求失败");	
								}
							});
						}else if(result.status==1){
							$("#name_span").text(result.error);
						}else if(result.status==2){
							 $("#pwd_span").text(result.error);
						}						
					},
					error:function(){
						alert("找到id失败");	
					}
				});
					
			
				//绑定恢复对话框的三个按钮(1).X
				$(document).on("click",".close",function(){
					$("#can").hide();
					$('.opacity_bg').hide();
					
				});
				
				//(2).取消
				$(document).on("click","#btn_cancle",function(){
					$("#can").hide();
					$('.opacity_bg').hide();
					
				});
				
				//笔记本下拉菜单的选择
				$(document).on("change","select",function(){
					
				//重点！！！对于select下被点击的option的获取
					replaynotebookid=$(this).find("option:selected").attr("id");
					alert(replaynotebookid);
				});	
					
				//(3).恢复按钮
				$(document).on("click","#btn_sure",function(){
					
					//若为默认笔记本，则取到默认笔记本id
					if(replaynotebookid==""){
						//这里notebookid(当前note所属的notebook在操作note的恢复图标时取到)
						replaynotebookid=notebookid;
						//alert("默认笔记本id:"+replaynotebookid+"当前笔记id:"+currentnote_id);					
					}
					
					//将当前被操作note_id和要恢复的notebook_id放入json
					var form_data={"cn_note_id":currentnote_id,"cn_notebook_id":replaynotebookid};
					$.ajax({
						url:project_base+"/noteItems/replayToNoteBook/",
						type:"post",
						data:JSON.stringify(form_data),
						contentType:"application/json",
						success:function(result){
						if(result.status==0){
															        
						}else if(result.status==1){
							$("#name_span").text(result.error);
						}else if(result.status==2){
							 $("#pwd_span").text(result.error);
						}},
					error:function(){
						alert("请求失败");	
					}
				});
				$("#can").hide();
				$('.opacity_bg').hide()
				//当前note图像消失
				currentnote_li.remove();					
			});
		
		});
	});
});