$(function(){
		/**
		 * 点击下拉按钮显示/隐藏笔记操作项(移动至...&分享&删除)-->删除功能
		 * @param {Object} this
		 */			
		$("#second_side_right a button").click(function(){
				//获取当前note的下拉键
				var note_menu=$(this).parent().next();
				//获取当前note
				var noteid=$(this).parent().parent();
				note_menu.toggle();
				//获取删除按钮
				var notedel=note_menu.find("#delete");

				//点击删除按钮逻辑删除笔记
				notedel.click(function(){
					//alert("------"); 
					$("#can").load("alert/alert_delete_note.html");
					$("#can").show();
					$('.opacity_bg').show();				
					});
					
				//绑定确定删除对话框1.X号按钮
				$(document).on("click",".close",function(){
					$("#can").hide();
					$('.opacity_bg').hide()}
				);
				//2.取消按钮
				$(document).on("click","#btn_cancle",function(){
					$("#can").hide();
					$('.opacity_bg').hide()}
				);		
				//3.删除按钮
				$(document).on("click","#btn_sure",function(){
					var delnote_id=noteid.attr("id");
					//alert(delnote_id);
					$.ajax({
							url:project_base+"/delete/note/"+delnote_id,
							type:"delete",
							dataType:"json",
							success:function(result){
						      		  if(result.status==0){
						        		//消除此笔记的显示效果
										noteid.remove();
										$("#can").hide();
										$('.opacity_bg').hide()
								      }else if(result.status==1){
								         $("#name_span").text(result.error);
								      }else if(result.status==2){
								         $("#pwd_span").text(result.error);
								      }
								},
							error:function(){
									alert("请求失败");	
								}
					});				
				}
			);			
		});				
	});