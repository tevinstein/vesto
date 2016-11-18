//get datas
function getAllDatas() {
    $.ajax({
        url: "http://localhost:3000/api/chefs",
        type: "GET",
        dataType: "json",
        success: function(datas) {
            $('#chef-list').empty()
            for (let j in datas) {
                $('#chef-list').append('\
					<div data-id="' + datas[j]._id + '" class="col-md-3 col-sm-4 col-xs-6" style="padding: 15px;">\
		                <div class="circle-avatar chef-image" style="background-image:url(' + datas[j].image + ')"></div>\
		                <h3 class="chef-name text-capitalize">' + datas[j].name + '</h3>\
		                <p class="chef-position">' + datas[j].position + '</p>\
		                <button type="submit" class="btn btn-sm btn-default" data-toggle="modal" data-target="#myModal" data-id="' + datas[j]._id + '" onclick="showEditData(this)"><span class="fa fa-pencil"></span></button>\
		                <button type="submit" class="btn btn-sm btn-default" data-id="' + datas[j]._id + '" onclick="deleteData(this)"><span class="fa fa-trash"></span></button>\
		            </div>\
				')
            }
        }
    })
}

//post data
function addData() {
    $('#add-chef-form').submit(function(e) {
        var data = {
            name: $("#add-chef-form input[name=name]").val(),
            position: $("#add-chef-form select[name=position]").val(),
            image: $("#add-chef-form input[name=image]").val()
        }

        $.ajax({
                url: "http://localhost:3000/api/chefs",
                type: "POST",
                dataType: "json",
                data: data
            })
            .done(function() {
                $('#add-chef-form').each(function() {
                    this.reset()
                })
                getAllDatas()
                $('#alert-message').empty()
                $('#alert-message').append('\
					<div class="alert alert-success">\
                		Data is added.\
            		</div>\
        		')
                window.scrollTo(0, 0);
            })

        e.preventDefault()
    })
}

//delete data
function deleteData(pointer) {
    var id = $(pointer).attr('data-id')

    $.ajax({
            url: `http://localhost:3000/api/chefs/${id}`,
            type: "DELETE"
        })
        .done(function(data) {
            getAllDatas()
            $('#alert-message').empty()
            $('#alert-message').append('\
			<div class="alert alert-danger">\
                Data is deleted.\
            </div>\
        ')
            window.scrollTo(0, 0);
        })
}

//show edit data form
function showEditData(pointer) {
    $("#process-edit-chef").attr('data-id', '')
    var id = $(pointer).attr('data-id')

    $.ajax({
            url: `http://localhost:3000/api/chefs/${id}`,
            type: "GET",
            dataType: "json"
        })
        .done(function(data) {
            $("#edit-chef-form input[name=name]").attr('value', data.name)
            $("#edit-chef-form select[name=position]").val(data.position)
            $("#edit-chef-form input[name=image]").attr('value', data.image)
            $("#process-edit-chef").attr('data-id', data._id)
        })
}

//edit data
function processEditData(pointer,e) {
	e.preventDefault()
    var id = $(pointer).attr('data-id')

    var data = {
        name: $("#edit-chef-form input[name=name]").val(),
        position: $("#edit-chef-form select[name=position]").val(),
        image: $("#edit-chef-form input[name=image]").val()
    }

    $.ajax({
            url: `http://localhost:3000/api/chefs/${id}`,
            type: "PUT",
            dataType: "json",
            data: data
        })
        .done(function() {
            $('#edit-chef-form').each(function() {
                this.reset()
            })
            $('#myModal').modal('toggle')
            getAllDatas()
            $('#alert-message').empty()
            $('#alert-message').append('\
					<div class="alert alert-warning">\
                		Data is edited.\
            		</div>\
        		')
            window.scrollTo(0, 0);
        })
}

$(function() {
    getAllDatas()
    addData()
})
