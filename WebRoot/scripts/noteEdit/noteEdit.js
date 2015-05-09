var um ;
$(function () {
	//实例化Ueditor编辑器
	um = UM.getEditor('myEditor');
})
/**
 * 将title和body内容传入 显示在编辑器中
 * @param {Object} title
 * @param {Object} body
 */
function edit (title , body , cn_note_id ){
	
			//实例化Ueditor编辑器
			//var um = UM.getEditor('myEditor');
			//$("#pc_part_5").hide () ;
			$("#pc_part_3").show () ;
			
			$("#input_note_title").val(title) ;
			
			um.$body.html(body);
			
			console.log(cn_note_id) ;
}

//$(function () {
//	edit('123',"328");
//})



