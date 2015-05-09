$(function(){

	$(".profile-username").text(getUser());
	
	var activityId = Base64.encode(getCookie("activityId"));
	
	$("#default").css("display","none");
	
	//获取当前用户下所有的笔记
	var noteOfMine;
	
	$.ajax({
		
		url:project_base+"/noteActivity/getNoteOfMine/" + getCookie("userId"),
		type:"get",
		dataType:"json",
		async:false,
		success:function(result){
		
			noteOfMine = result.data;
			
		},
		error:function(){
			alert("失败");
		}
	
	});
	
	//展示所有的参加活动的笔记
	function showLi(result){
		
		if(result.status==0){
			
			var activiyies = result.data;
			
			for(var i = 0 ; i < activiyies.length;i++){
				
				var activity = activiyies[i];
				
				var li = $("<li>");
				
				li.addClass("online").attr("id",i);

				var a = $("<a>");
				
				var i_01 = $("<i>");
				
				i_01.attr({"class" : "fa fa-file-text-o" ,"title":"online" ,"rel" : "tooltip-bottom"});
				
				var span =$("<span>");
				
				span.text(activity.cn_note_activity_title);
				
				var input_content = $("<input>").attr({"type":"hidden","value":activity.cn_note_activity_body});
				
				var input_id = $("<input>").attr({"type":"hidden","value":activity.cn_note_activity_id});
				
				var button_up = $("<button>");
				
				button_up.attr({"class":"btn btn-default btn-xs btn_position_3 btn_up"});
				
				var i_02 = $("<i>");
				
				i_02.attr({"class" : "fa fa-thumbs-o-up"});
				
				button_up.append(i_02);
				
				var button_down = $("<button>");
				
				button_down.attr({"class":"btn btn-default btn-xs btn_position_2 btn_down"});
				
				var i_03 = $("<i>");
				
				i_03.attr({"class" : "fa fa-thumbs-o-down"});
				
				button_down.append(i_03);
				
				a.append(i_01).append(span).append(input_content).append(input_id)/*.append(button_up).append(button_down)*/;
				
				if(noteOfMine.indexOf(activity.cn_note_id) == -1){
					
					var button_like = $("<button>").attr({"class":"btn btn-default btn-xs btn_position btn_like"});
				
					var i_04 = $("<i>");
				
					i_04.attr({"class" : "fa fa-star-o"});
					
					var value = $("<span>").text(activity.cn_note_activity_title + "###" + activity.cn_note_activity_body ).css("display","none");
				
					i_04.append(value);
					
					button_like.append(i_04);
					
					
					a.append(button_like);
				
					
				}
				
				li.append(a);
				
				$("#default").before(li);
				
			}
			
		}else if(result.status==0){
			
			alert("失败");
		}
	}
	/**收藏*/
	$(document).on("click",
			"#first_action ul li button",
				function () {
					var note = $(this).children().text();
					
//					console.log($(this).children().html());
					
					console.log(note);
					//console.log($(this).children().html());
							//给页面添加收藏点击事件
									console.log("进入like") ;
//									$("#can").hide();
//									$('.opacity_bg').hide();
									var userId =  getCookie("userId"); 
								
									//console.log("cn_share_id= "+cn_share_id+" userId: "+userId);
									
								$.ajax({
									url:project_base+"/like/addLike",
									type:"post",
									data: {"cn_share_id":"","userId":userId,"note":note},
									success:function (result){
										if(result.status==0){
											alert("收藏成功")
											console.log("收藏成功");
										}else{
											alert("曾经收藏过收藏")
											console.log("曾经收藏过收藏");
										}
											//alert(result)
										},
									error :function () {
										alert("请求失败");	

									}
									
								});	
		
					
				});
	
	
	
	
	
	
	var param = {"activityId":activityId,"start":1,"end":5};
	
	$.ajax({
		
		url:project_base+"/noteActivity/activity_detail",
		type:"post",
		data:param,
		success:function(result){
		
			showLi(result);
			
		},
		error:function(){
			alert("失败");
		}
	
	});
	
	//通过更多获取接下来的2条数据
	$("#more_activity_note").click(function(event){
		
		event.stopPropagation();
		
		var liSize = $("#first_action ul li").length;
		
		var pageInfor = {"activityId":activityId,"start":liSize,"end":2};
		
		$.ajax({
			
			url:project_base+"/noteActivity/activity_detail",
			type:"post",
			data:pageInfor,
			success:function(result){
			
				showLi(result);
			
			},
			error:function(){
				alert("失败");
			}
		
		});
	});
	
	//单击活动笔记预览笔记的相关信息
	$(document).on("click",$("#first_action ul li"),function(event){
		
		event.stopPropagation();
		
		var $target = $(event.target);
		
		if($target.is("span")) {

			$("#content_body").children().remove();
			
			$("#content_body").text("");

			$("#content_body").append(
					"<h4><strong>笔记标题: </strong>" + $target.text()
							+ "</h4>" + $target.next().attr("value"));
		}
	});
	
	//选取自己的笔记本中的笔记参加活动
	$("#join_action").click(function(event){
		
		event.stopPropagation();
		
		$("#can").load("alert/alert_activity_add.html");
		$("#can").show();
		$(".opacity_bg").show();
		
		$("#topList1 ").css("display","none");
		
		$.ajax({
			url:project_base+"/noteBook/note",
			type:"get",
			dataType:"json",
			success:function(result){
				var noteBooks = result.data;
				for(var i=0; i<noteBooks.length;i++)
					$("#first_side_right ul")
									.append(
											'<li class="online"><input type="hidden" value="'
													+ noteBooks[i].cn_notebook_id
													+ '"/><a><i class="fa fa-book" title="笔记本"  rel="tooltip-bottom"></i> '
													+ noteBooks[i].cn_notebook_name
													+ '</a></li>');
			},
			error:function(){
					alert("请求失败");	
			}
		});
		
	});
	
	//关闭参加活动选择笔记的窗口
	$(document).on("click",
			"#cancel_btn1,#cancel_btn2",
			function(){
		
		console.log($(this).attr("id"));
					$("#can").hide();
					$('.opacity_bg').hide();}
	);

	//获取参加活动笔记本
	$(document).on("click","#first_side_right ul li",function(event){
		
		event.stopPropagation();
		
		$("#activeLi ").siblings().remove();
		var cn_notebook_id = $(event.target).prev().val();
		$.ajax({url:project_base+"/note/findByNoteId/"+cn_notebook_id,
				type:"get",
				dataType:"json",
				success:function(result){
				var notes = result.data;
				
				for(var i=0; i<notes.length;i++){
					
					if(notes[i].cn_note_type_id == '3'){
						
						continue;
					}
					
					$("#activeLi").after(
								'<li class="online" ><input type="hidden" value="'
								+ notes[i].cn_note_id
								+ '"/>'
								+ '<input type="hidden" value="'
								+ notes[i].cn_note_body
								+ '"/><a class="">'
								+ '<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i>'
								+ notes[i].cn_note_title
								+ '</a>'
								+ "</li>");
				}},
				error:function(){
						alert("请求失败");	
				}
			});
		
		
	});
	
	var noteLi = $("#select_note .online");

	var noteIdToActivity;
	
	var noteBody;
	
	var noteTitle;
	
	//获取参加活动笔记本中的笔记
	$(document).on("click",noteLi,function(event){
		
		event.stopPropagation();
		
		var $this = $(event.target)
		
		if($this.attr("class") == "check"){
			
			$this.removeClass("check");
			
			noteIdToActivity = "";
			
			noteBody = "";
			
			noteTitle = "";
		}else if($this.attr("class") == ""){
			
			$this.addClass("check");
			
			noteIdToActivity = $this.prev().prev().attr("value");
			
			noteBody = $this.prev().attr("value");
				
			noteTitle = $this.text();
			
			console.log("标题" + noteTitle);
			
			console.log("内容" + noteBody);
			
			console.log("活动Id:" + noteIdToActivity);
			
		}
		
	});
	
	//确定参加活动
	$(document).on("click","#join",function(event){
		
		event.stopPropagation();
		
		var saveData = {"cn_activity_id":activityId,
				"cn_note_id":noteIdToActivity,
				"cn_note_activity_title":noteTitle,
				"cn_note_activity_body":noteBody};
		
		$.ajax({
			
			url:project_base+"/noteActivity/activity_save",
			type:"post",
			data:saveData,
			success:function(result){
			
				$("#can").hide();
				$('.opacity_bg').hide();
			},
			error:function(){
				alert("失败");
			}
		
		});
		
	});
	
	
	
	//退出操作
	$("#logout").click(function(){
		
		delCookie("user");
		
		delCookie("userId");
	});
	
	
});