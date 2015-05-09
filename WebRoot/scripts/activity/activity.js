$(function(){
	
	$(".profile-username").text(getUser());
	
	var color = ["#6699cc","#ff6600","#6600cc","#ffcc00"];
	
	//近期活动的信息
	$.ajax(
		{
			url:project_base+"/activity/toShow",
				type:"get",
				dataType:"json",
				async:"false",
				success:function(result){
			
					if(result.status == 0){
						
						var parent = $("#activity");
						
						for(var i =0; i < result.data.length;i++){

							var titleColor = color[i%4];
							
							var item = result.data[i];
						
							var div = $("<div>");
						
							div.attr("class","col-sm-4").attr("id","col_" + i);
							
							var title = $("<p>").css("border","2px solid");
							
							title.text(item.cn_activity_title).css("background-color",titleColor);
							
							var content = $("<p>");
							
							content.text(item.cn_activity_body);
							
							var endTime = $("<p>");
							
							endTime.text(item.cn_activity_end_time).css("color","red");
							
							var activityId = $("<input>");
							
							activityId.attr("type","hidden").val(item.cn_activity_id);
							
							activityId.attr("id","input_" + i);
							
							div.append(title).append(content).append(endTime).append(activityId);
						
							parent.append(div);
						}
					}
					
				}
		}
	);
	
	//通过近期活动查看相关活动的详细信息
	$(document).on("click",".col-sm-4",function(){
		
		var activityId = $(this).children("input").val();
		
		addCookie("activityId",activityId,24);
		
		window.location.href="activity_detail.html";
	});
	
});
