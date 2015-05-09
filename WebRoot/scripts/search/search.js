/**
 * 这个方法用来搜索share并且遍历到页面
 * 以及收藏共享笔记
 * @param {Object} "#search_note"
 */
$(function () {
	//显示下拉箭头
		var favorite =null ;
		var cn_share_id = null ;
		$(document).on("click","#favorite",function (event ) {
					cn_share_id = $(this).parents("a").attr("id") ;
					 //addCookie("noteId",noteId,5); 
					//$("#self").data(noteId);
					console.log("cn_share_id"+cn_share_id);
					
					//收藏按钮 打开连接
							//alert(favorite);
							//收藏分享笔记 	
							$("#can").load("alert/alert_like.html");
							$("#can").show();
							$('.opacity_bg').show();
						//阻止事件冒泡
						 event.stopPropagation();
					
					
				
				});
	
				
		//给页面按钮追加事件--给未来元素绑定事件
		//取消点击事件 关掉收藏弹窗
		$(document).on("click",
							"#cancel_btn_like",
							function(){
									console.log("进入取消") ;
									$("#can").hide();
									$('.opacity_bg').hide();
									//alert("**");
					});
					
		//增加鼠标进入a中显示按钮 事件
		$(document).on("mouseover","#notes li a",function (){
			$(this).children("#favorite").css("display","show");
		})
		
		//增加鼠标进入a中显示按钮 事件
		$(document).on("mouseout","#notes li a",function (){
			$(this).children("#favorite").css("display","none");
		})
					
		//给页面添加收藏点击事件
		$(document).on("click",
							"#like",
							function(){
									console.log("进入like") ;
									$("#can").hide();
									$('.opacity_bg').hide();
									var userId =  getCookie("userId"); 
									
									console.log("cn_share_id= "+cn_share_id+" userId: "+userId);
									
								$.ajax({
									url:project_base+"/like/addLike",
									type:"post",
									data: {"cn_share_id":cn_share_id,"userId":userId},
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
	
	//查询按钮 查询share note 第一次查询查7个
	var shares ;
	$("#search_note").keyup(function (e) {
		var input ={"title":$("#search_note").val(),"begin":'0',"when":'1'} ;
		//if(e.keyCode==13){
			$.ajax({
			url:project_base+"/share/selectShare" ,
			type:"post" ,
			dataType:"json",
			data:input,
			success:function (result) {
				$(".col-xs-3").hide() ;
				$("#pc_part_6").show() ;
				if(result.status==0){
					shares = result.data ;
					$("#notes li").remove() ;
					var favorite = " " ;
					for (var i=0;i<shares.length;i++){
						if(shares[i].userId!=getCookie("userId")){
							favorite = "<button id='favorite' type='button' class='btn btn-default btn-xs btn_position btn_like' style='display:none'><i class='fa fa-star-o'></i></button>" ;
						}else {
							favorite = "" ;
						}
					//alert(shares[i].cn_share_id);
					$("#notes").append(
								"<li class='online'>"+
										"<a  id="+shares[i].cn_share_id+">"+
											"<i class='fa fa-file-text-o' title='online' rel='tooltip-bottom' ></i>"+shares[i].cn_share_title+
											favorite+
										"</a>"+"<div id='"+shares[i].cn_share_body+"'>"+"</div>"+
									"</li>");
						
					}
				}
					
				
			},
			error: function(){
				alert("请求失败");
			}
		});
		//}
	});
	
	//点击更多分页查询 一次查三个
	$(document).on("click","#more_note",function (){
		var begin = $("#notes li").size();
		console.log(begin);
		var input ={"title":$("#search_note").val(),"begin":begin,"when":''} ;
			$.ajax({
			url:project_base+"/share/selectShare" ,
			type:"post" ,
			dataType:"json",
			data:input,
			success:function (result) {
				$(".col-xs-3").hide() ;
				$("#pc_part_6").show() ;
				if(result.status==0){
					shares = result.data ;
					//$("#notes li").remove() ;
					var favorite = " " ;
					for (var i=0;i<shares.length;i++){
						if(shares[i].userId!=getCookie("userId")){
							favorite = "<button id='favorite' type='button' class='btn btn-default btn-xs btn_position btn_like' style='display:none'><i class='fa fa-star-o'></i></button>" ;
						}else {
							favorite = "" ;
						}
					//alert(shares[i].cn_share_id);
					$("#notes").append(
								"<li class='online'>"+
										"<a  id="+shares[i].cn_share_id+">"+
											"<i class='fa fa-file-text-o' title='online' rel='tooltip-bottom' ></i>"+shares[i].cn_share_title+
											favorite+
										"</a>"+"<div id='"+shares[i].cn_share_body+"'>"+"</div>"+
									"</li>");
						
					}
				}
					
				
			},
			error: function(){
				alert("请求失败");
			}
		});
	});
		
	
	//预览分享笔记
	$(document).on("dblclick", "#notes li a" , function (event) {
		//console.log($(this).text()) ;
		$('#notes li a').removeClass();
		$(this).attr("class","checked");
		var title = $(this).text() ;
		var data = $(this).next().attr("id");
		$("#pc_part_3").hide () ;
		$("#pc_part_5").show () ;
		//console.log("双击事件"+data.cn_share_id);
		$("#noput_note_title").text (title) ;
		$("#noput_note_title").next("p").html(data) ;
		//阻止事件冒泡
		//event.stopPropagation();
	})
	

	
})


