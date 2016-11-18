function addcommas(input){
    var text = input.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
    return text
  }

//get datas
function getAllDatas() {
    $.ajax({
        url: "http://localhost:3000/api/menus",
        type: "GET",
        dataType: "json",
        success: function(datas) {
            $('#dish-list').empty()
            for (let j in datas) {
                $('#dish-list').append('\
					<div data-id="' + datas[j]._id + '" class="col-md-3 col-sm-4 col-xs-6" style="padding: 15px;">\
		                <div class="circle-avatar dish-image" style="background-image:url(' + datas[j].image + ')"></div>\
		                <h3 class="dish-name text-capitalize">' + datas[j].name + '</h3>\
		                <p class="dish-price">Rp.' + addcommas(datas[j].price) + '</p>\
		                <p class="dish-description">' + datas[j].description + '</p>\
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
    $('#add-dish-form').submit(function(e) {
        var data = {
            name: $("#add-dish-form input[name=name]").val(),
            price: $("#add-dish-form input[name=price]").val(),
            description: $("#add-dish-form input[name=description]").val(),
            image: $("#add-dish-form input[name=image]").val()
        }

        $.ajax({
                url: "http://localhost:3000/api/menus",
                type: "POST",
                dataType: "json",
                data: data
            })
            .done(function() {
                $('#add-dish-form').each(function() {
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
            url: `http://localhost:3000/api/menus/${id}`,
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
    $("#process-edit-dish").attr('data-id', '')
    var id = $(pointer).attr('data-id')

    $.ajax({
            url: `http://localhost:3000/api/menus/${id}`,
            type: "GET",
            dataType: "json"
        })
        .done(function(data) {
            $("#edit-dish-form input[name=name]").attr('value', data.name)
            $("#edit-dish-form input[name=price]").attr('value', data.price)
            $("#edit-dish-form input[name=description]").attr('value', data.description)
            $("#edit-dish-form input[name=image]").attr('value', data.image)
            $("#process-edit-dish").attr('data-id', data._id)
        })
}

//edit data
function processEditData(pointer,e) {
	e.preventDefault()
    var id = $(pointer).attr('data-id')

    var data = {
        name: $("#edit-dish-form input[name=name]").val(),
        price: $("#edit-dish-form input[name=price]").val(),
        description: $("#edit-dish-form input[name=description]").val(),
        image: $("#edit-dish-form input[name=image]").val()
    }

    $.ajax({
            url: `http://localhost:3000/api/menus/${id}`,
            type: "PUT",
            dataType: "json",
            data: data
        })
        .done(function() {
            $('#edit-dish-form').each(function() {
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
