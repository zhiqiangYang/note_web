/**
 * 这个方法用户在全部笔记中显示笔记
 * 显示笔记本 以及其中的功能
 * @param {Object} "#add_notebook"
 */
$(function(){
	
	var cn_note_id = null;
	var movenotebookid="";
	var cn_notebook_id = "";
	//笔记所在的li块
	var note_li = "";
	var menu ;
	//展示全部笔记本
	$.ajax({
		url:project_base+"/noteBook/note",
		type:"get",
		dataType:"json",
		success:function(result){
		var noteBooks = result.data;
		for(var i=0;  i<noteBooks.length;i++)
		$("#first_side_right ul").append('<li class="online" id="list"><input type="hidden" value="'+noteBooks[i].cn_notebook_id+'"/><a><i class="fa fa-book" title="笔记本"  rel="tooltip-bottom"></i> '+noteBooks[i].cn_notebook_name+'<button type="button" class="btn btn-default btn-xs btn_position btn_delete"><i class="fa fa-times"></i></button></a></li>');
		},
		error:function(){
			alert("请求失败");	
		}
	});
	
	
	//点击笔记本显示所有笔记
	$(document).on("click","#first_side_right ul li",function(){
		event.stopPropagation();
		console.log($(event.target));
		//点击选中笔记本颜色会加深
		$("#first_side_right ul li ").find('a').removeClass();
		
		$(this).find('a').addClass("checked");  		
		$("#topList1 ").siblings().remove();
		cn_notebook_id = $(this).children("input").val();
		$.ajax({url:project_base+"/noteItems/findByNoteId/"+cn_notebook_id,
		type:"get",
		dataType:"json",
		success:function(result){
		var notes = result.data;
		console.log(notes.length );
		var shareButten = "" ;
		for(var i=0; i<notes.length;i++){
			//判断是否分享过 来决定是否有分享按钮
			if(notes[i].cn_note_type_id==4){
				shareButten = ""
			}else {
				shareButten = '<dt><button type="button" class="btn btn-default btn-xs btn_share" '+"title='分享' id='share' display='none'>"+'<i class="fa fa-sitemap" ></i></button></dt>' ;
			}
			$(".col-xs-3").hide() ;
			$("#pc_part_2").show() ;
			$("#second_side_right ul").append('<li class="online">'+
									"<a id="+notes[i].cn_note_id+">"+
									'<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i>'+notes[i].cn_note_title+
									'<button type="button" class="btn btn-default btn-xs btn_position btn_slide_down">'+
									'<i class="fa fa-chevron-down"></i></button>'+
									'</a>'+"<div id='"+notes[i].cn_note_body+"'>"+"</div>"+'<div class=note_menu'+" tabindex='-1'>"+
									"<dl> "+
										'<dt><button type="button" class="btn btn-default btn-xs btn_move" '+"title='移动至...' id='move'>"+'<i class="fa fa-random"></i></button></dt>'+
										shareButten+
										'<dt><button type="button" class="btn btn-default btn-xs btn_delete" '+"title='删除' id='delete'>"+'<i class="fa fa-times"></i></button></dt>'+
									"</dl> "+
								"</div>"+
							"</li>");

						      	}},
							error:function(){
									alert("请求失败");	
							}
						});
	});
					//单击编辑note
				var cn_note_id ;
				$(document).on("click" , "#pc_part_2 ul li a" , function (event) {
					event.stopPropagation();
					$("#pc_part_2 ul li ").find('a').removeClass();
					$(this).addClass("checked");  
					var div = $("#pc_part_3 div div .col-xs-3");
					div.removeAttr("style");
					console.log("aaa");
						 cn_note_id = $(this).attr("id") ;
						var title = $(this).text() ;
						var body = $(this).next().attr("id");
					
						edit(title,body,cn_note_id);
						
						$("#pc_part_4").css("display","none");
						
						$("#pc_part_5").css("display","none");
						
						$("#pc_part_7").css("display","none");
						
				});
				

	//单击收藏笔记编辑note
	$(document).on("click" , "#seventh_side_right ul li a" , function () {
			$("#seventh_side_right ul li a").attr("class","");
			$(this).attr("class",'checked');
			cn_note_id = $(this).attr("id") ;
			var title = $(this).text() ;
			var body = $(this).next().attr("id");
			cn_note_id = $(this).attr("id") ;
			console.log(cn_note_id);
			var div = $("#pc_part_3 div div .col-xs-3");
			div.removeAttr("style");
			//console.log (title) ;
			//调用edit函数用来显示数据
			$("#pc_part_5").hide () ;
			$("#pc_part_3").show ();
//			$("#pc_part_4").css("display","none");
//			$("#pc_part_7").css("display","none");
			edit(title,body,cn_note_id);
			
	});

				
				//保存修改笔记
				
				$(document).on("click","#save_note",function(event){	
					event.stopPropagation();
					var form_data = {"cn_note_id":cn_note_id,
							         "cn_note_title":$("#input_note_title").val(),
							         "cn_note_body":um.$body.html()};

					$.ajax({
						url:project_base+"/noteItems/updateNote",
						type:"put",
						data:JSON.stringify(form_data),
						contentType:"application/json",
						dataType:"json",
						success:function(result){
						console.log("sss");
						console.log(result.status);
						if(result.status==0){
							alert(result.data);
							// $("#topList1").siblings().empty();
							 //updateNoteList();
						}
					},
						error:function(){
								alert("请求失败");	
						}
					});
				});
				
				//重新遍历页面
				function updateNoteList(id){
					console.log("收藏笔记本id="+id);
					console.log("其他笔记本cn_notebook_id ="+cn_notebook_id);
					alert(cn_notebook_id);
						$.ajax({url:project_base+"/noteItems/findByNoteId/"+cn_notebook_id,
								type:"get",
								dataType:"json",
								success:function(result){
							      	var notes = result.data;
							      	for(var i=0; i<notes.length;i++){
										$(".col-xs-3").hide() ;
										$("#pc_part_2").show() ;
							      		 $("#second_side_right ul").append('<li class="online" >'+
													"<a id="+notes[i].cn_note_id+">"+
													'<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i>'+notes[i].cn_note_title+
													'<button type="button" class="btn btn-default btn-xs btn_position btn_slide_down">'+
													'<i class="fa fa-chevron-down"></i></button>'+
													'</a>'+"<div id='"+notes[i].cn_note_body+"'>"+'<div class=note_menu'+" tabindex='-1'>"+
													"<dl> "+
														'<dt><button type="button" class="btn btn-default btn-xs btn_move" '+"title='移动至...'>"+'<i class="fa fa-random"></i></button></dt> '+
														'<dt><button type="button" class="btn btn-default btn-xs btn_share" '+"title='分享' id='share'>"+'<i class="fa fa-sitemap"></i></button></dt> '+
														'<dt><button type="button" class="btn btn-default btn-xs btn_delete" '+"title='删除'>"+'<i class="fa fa-times"></i></button></dt> '+
													"</dl> "+
												"</div>"+
											"</li>");

							      	}},
								error:function(){
										alert("请求失败");	
								}
							});
						
				}
	
	//显示下拉箭头
	$(document).on("click" , "#second_side_right a button",function (event) {
					note_li = $(this).parents("li");
					cn_note_id = $(this).parents("a").attr("id") ;
					console.log(cn_note_id);
					var menu = $(this).parents("a").nextAll(".note_menu") ;
					//alert("sssss"+menu);
					
					$("#second_side_right a").siblings().hide();
					menu.show() ;
//					share = menu.find("#share");
					//var dl = menu.next();
					menu.mouseleave(function(event){
					//alert("***");
			
					menu.hide();
					event.stopPropagation();
				});
			});
			
			//新建笔记本
			$("#add_notebook").click(function(){
				$("#can").load("alert/alert_notebook.html");
				$("#can").show();
				$('.opacity_bg').show();
			});
			//给页面按钮追加事件--给未来元素绑定事件
			$(document).on("click",
						"#cancel_btn1",
						function(){
								$("#can").hide();
								$('.opacity_bg').hide()}
			 );

			$(document).on("click",
					"#cancel_btn2",
					function(event){ 
				
						event.stopPropagation();
							var cn_notebook_name = $("#input_notebook").val();
							var base64_cn_notebook_name = Base64.encode(cn_notebook_name);
							$.ajax({
								url:project_base+"/noteBook/saveNoteBook",
								type:"post",
								dataType:"json",
								beforeSend:function(xhr){
								xhr.setRequestHeader("Authorization","Basic "+base64_cn_notebook_name);
							},
								success:function(result){
							      if(result.status==0){
							    	  var noteBook=result.data;
									  $("#first_side_right ul li").find('a').removeClass();
				                        $("#first_side_right ul li:first").after(
				                        		'<li class="online" id="list"><input type="hidden" value="'+noteBook.cn_notebook_id+'"/><a class="checked"><i class="fa fa-book" title="笔记本" '+
				                        		'rel="tooltip-bottom"></i> '+noteBook.cn_notebook_name+'<button type="button"class="btn '+
				                        		'btn-default btn-xs btn_position btn_delete"><i class="fa fa-times">'+
				                        		'</i></button></a></li>');
							    	  $("#can").hide();
									  $('.opacity_bg').hide()
							      }else if(result.status==1){
							    	  console.log("sss");
							    	  $("#input_notebook").text(result.data)
							      }
							     
								},
								error:function(){
										alert("请求失败");	
								}
								
							});
							}
			);
			$(document).on("click",
					".close",
					function(){
							$("#can").hide();
							$('.opacity_bg').hide()}
			);		

				
			//活动
			$("#action_button").click(function(event){
				event.stopPropagation();
				
				findNoteBycondition($("#eighth_side_right ul"),0,3);
				
				// 回收站
				$("#pc_part_4").css("display","none");
				
				$("#pc_part_7").css("display","none");
				
				$("#noput_note_title").text ("") ;
				$("#noput_note_title").next("p").html("");
				
				var pc_part_8 = $("#pc_part_8");
				//这里有问题:点击一次活动按钮，显示的活动li先显示再消失
				pc_part_8.show();
				
//				$("#pc_part_8").show();
				$("#pc_part_2").css("display","none");
					//预览笔记
				$("#pc_part_5").css("display","block");
					//编辑笔记
				$("#pc_part_3").css("display","none");
		
			});
			
			$(document).on("click",$("#eighth_side_right ul"),function(event){
				
				event.stopPropagation();
				
				if($(event.target).attr("class") == "item"){
					
					viewNote($(event.target),$("#content_body"));
				}
				
			});
			
				//新建笔记功能
				$("#add_note").click(function(){
					$("#can").load("alert/alert_note.html");
					$("#can").show();
					$('.opacity_bg').show();
				});
				
				//绑定取消按钮
				$(document).on("click",
						"#cancel_btn5",
						function(){
								$("#can").hide();
								$('.opacity_bg').hide();
				});
				
				//绑定新建笔记按钮
				$(document).on("click",
						"#cancel_btn6",
						function(event){ 
					
							event.stopPropagation();
								var cn_note_title = $("#input_note").val();
								//var cn_notebook_id = $("#first_side_right ul li").children("input").val();
								console.log(cn_note_title+":"+cn_notebook_id);
								var base64_msg = Base64.encode(cn_note_title+":"+cn_notebook_id);

								$.ajax({
									url:project_base+"/noteItems/saveNote",
									type:"post",
									dataType:"json",
									beforeSend:function(xhr){
									xhr.setRequestHeader("Authorization","Basic "+base64_msg);
								},
									success:function(result){
								      if(result.status==0){
										  $("#second_side_right ul li").find('a').removeClass();
								    	  $("#second_side_right ul li:first").after('<li class="online" >'+
													"<a  class='checked'>"+
													'<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i>'+cn_note_title+'<button type="button" class="btn btn-default btn-xs btn_position btn_slide_down"><i class="fa fa-chevron-down"></i></button>'+
													'</a><div class="note_menu'+" tabindex='-1'>"+
													"<dl>"+
														'<dt><button type="button" class="btn btn-default btn-xs btn_move" '+"title='移动至...'>"+'<i class="fa fa-random"></i></button></dt>'+
														'<dt><button type="button" class="btn btn-default btn-xs btn_share" '+"title='分享'>"+'<i class="fa fa-sitemap"></i></button></dt>'+
														'<dt><button type="button" class="btn btn-default btn-xs btn_delete" '+"title='删除'>"+'<i class="fa fa-times"></i></button></dt>'+
													"</dl>"+
												"</div>"+
											"</li>");

								    	  $("#can").hide();
										  $('.opacity_bg').hide()
								      }
									},
									error:function(){
											alert("请求失败");	
									}
									
								});
							}
				);
				
				//点击移动笔记到特定笔记本 
				$(document).on("click","#move",function(){
					//遍历当前user_id(session里)下拥有的笔记本显示在select下
					//********************
				
					$("#can").load("alert/alert_move.html");
					$("#can").show();
					$('.opacity_bg').show();
						$.ajax({					
							url:project_base+"/noteBook/note/",
							type:"get",
							dataType:"json",
							success:function(result){
							if(result.status==0){
								alert("+++++++++++++++");
								for(var i=0;i<result.data.length;i++){
									//判断如果笔记本id对应当前笔记的id，则写为默认笔记本
									//alert(result.data[i].cn_notebook_name);
										if(cn_notebook_id==result.data[i].cn_notebook_id){
											alert("默认项无id");
											continue;												
										}else{
											//遍历除当前note所在notebook的所有其他笔记本名称
											$("#moveSelect").append("<option id='"+result.data[i].cn_notebook_id+"'>"+result.data[i].cn_notebook_name+"</option>");
											//alert(result.data[i].cn_notebook_id);
										}
									}
													        
								}
							},
							error:function(){
								alert("请求失败");	
							}
						});
						
				
				});
				
				$(document).on("click","#move_btn_cancle",function(){
					$("#can").hide();
					$('.opacity_bg').hide();
				});
				
				//对于select下被点击的option的获取
				$(document).on("change","#moveSelect",function(){
					movenotebookid=$(this).find("option:selected").attr("id");
					alert(movenotebookid);
				});					
				
				//点击移动按钮
				$(document).on("click","#move_btn_sure",function(){
					var move_to={"cn_note_id":cn_note_id,"cn_notebook_id":movenotebookid};
					$.ajax({
						url:project_base+"/noteItems/movenote/",
							type:"post",
							data:JSON.stringify(move_to),
							contentType:"application/json",
							dataType:"json",
							success: function(result){
								if (result.status == 0) {
									$("#can").hide();
									$('.opacity_bg').hide();
									note_li.remove();
								}
								
								
							},
							error:function(){
								alert("请求失败");	
							}
					});
				
					
					
					
				});
				
	
				//点击分享按钮ajxa传递userId执行分享操作
				$(document).on("click","#share",function (){
						console.log("进入share");
						console.log("cn_note_id="+cn_note_id);
				
						$.ajax({
							url:project_base + "/share/addShare/" +cn_note_id,
							type:"get" ,
							dataType:"json",
							sucess: function (result) {
								if(result.status==0){
									console.log("分享成功");
									
								}
						
							},
					
							error:function(){
								alert("请求失败");	
							}
						});
				});
				
				//点击删除按钮ajax传递uerId执行逻辑删除
				$(document).on("click","#delete",function (){
					$("#can").load("alert/alert_delete_note.html");
					$("#can").show();
					$('.opacity_bg').show();
				});
				
				
				//绑定确定删除对话框1.X号按钮 2.取消按钮
				$(document).on("click","#del_btn_cancle",function(){
					$("#can").hide();
					$('.opacity_bg').hide()}
				);		
				//3.删除按钮
				$(document).on("click","#del_btn_sure",function(){
					//alert(cn_note_id);
					$.ajax({
							url:project_base+"/delete/note/"+cn_note_id,
							type:"delete",
							dataType:"json",
							success: function(result){
						      		  if(result.status==0){
						        		//消除此笔记的显示效果
										note_li.remove();
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
			

				//退出操作
				$("#logout").click(function(){
					
					delCookie("user");
					
					delCookie("userId");
				});
				
});