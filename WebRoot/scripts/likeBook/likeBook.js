/**
 * 该方法用来展示收藏笔记本中的笔记
 */
$(function () {
	var note_a = null ;
	var menu = null ;
	var cn_note_id=null;
	//显示删除按钮
	$(document).on("mouseover","#seventh_side_right a",function (){
		console.log("在a上移动");
		$(this).children("button").css("display","show");
	});
	//鼠标移出时hide按钮
	$(document).on("mouseout",'#seventh_side_right a',function(){
		$(this).children("button").css("display","none") ;
	});
	
	//点击删除按钮
	$(document).on("click" , "#seventh_side_right a button" , function () {
		cn_note_id = $(this).parents("a").attr("id") ;
		console.log(cn_note_id);
		menu = $(this).parents("a").nextAll(".note_menu") ;
		note_a = $(this).parents("a") ;
		//弹出是否解除收藏窗口
		$("#can").load("alert/alert_delete_like.html");
		$("#can").show();
		$('.opacity_bg').show();

	});
	
	//给页面按钮追加事件--给未来元素绑定事件
		//取消点击事件 关掉收藏弹窗
		$(document).on("click","#cancel_btn_delete_like",
								function(){
									console.log("进入取消");
									$("#can").hide();
									$('.opacity_bg').hide();
								//alert("**");
								});
		$(document).on("click","#ok_btn_delete_like",function (){
			//cn_note_id 
			console.log("进入解除收藏");
			$.ajax({
			url:project_base+"/delete/tnote/"+cn_note_id,
			type:"delete",
			success:function (result) {
				if(result.status==0){
					console.log("已经解除收藏") ;
					$("#can").hide();
					$('.opacity_bg').hide();
					note_a.hide() ;
				}else {
					$("#can").hide();
					$('.opacity_bg').hide();
				console.log("删除失败");
				}
			} ,
			error:function(){
				alert("请求失败");
			}
				
			})
		});	


	
	var userId = null ;
	$(document).on("click" , "#like_button" , function (){
		var cn_user_id = getCookie("userId")
		//console.log(userId) ;
		
		$.ajax({
			url: project_base+"/like/likeNoteBook/"+cn_user_id,
			type: "get" ,
			dataType : "json" ,
			success: function  (result) {
				
				console.log("**");
				if(result.status==0){
					//成功得到收藏笔记的list
					var notes = result.data ;
					$("#seventh_side_right ul li").remove() ;
					//console.log(notes) ;
					for(var i=0 ;i<notes.length ;i++){
						$(".col-xs-3").hide() ;
						$("#pc_part_7").show() ;
						$("#seventh_side_right ul").append('<li class="online"  >'+
												"<a  id="+notes[i].cn_note_id+">"+
												'<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i>'+
												notes[i].cn_note_title+'<button type="button" class="btn btn-default btn-xs btn_position btn_delete" style="display:none"><i class="fa fa-times"></i></button>'+
												'</a>'+"<div id='"+notes[i].cn_note_body+"'>"+"</div>"+
										"</li>");
					}
					
					
					
				}
			},
			error : function (){
				alert ("请求失败");
			}
		});
		
		$("#pc_part_7").css("display","block");
		
		$("#pc_part_8").css("display","none");
		
		$("#pc_part_2").css("display","none");
		
		//预览笔记
		$("#pc_part_5").css("display","block");
		//编辑笔记
		$("#pc_part_3").css("display","none");
		
	});
	

	
	
	
	
})




