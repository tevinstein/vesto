//get datas
function getAllDatas() {
    $.ajax({
        url: "http://localhost:3000/api/tasks",
        type: "GET",
        dataType: 'json',
        success: function(datas) {
            $('#task-list').empty()
            for (let i in datas) {
                $('#task-list').append(`
                    <div class="col-md-3 col-sm-4 task" data-id="${datas[i]._id}" style="padding: 15px;">
                        <div class="row">
                            <div class="col-sm-6" style="padding:3px;">
                                <div class="circle-avatar" style="background-image:url(${datas[i].menu.image})"></div>   
                            </div>
                            <div class="col-sm-6" style="padding:3px;">
                                <div class="circle-avatar" style="background-image:url(${datas[i].chef.image})"></div>
                            </div>
                        </div>
                        <h4 class="text-capitalize">${datas[i].menu.name}</h4>
                        <p>${datas[i].description}</p>
                        <p>${datas[i].taskDate} @${datas[i].deadline}</p>
                        <p class="text-capitalize" style="background:grey;">${datas[i].status}</p>
                        <button data-id="${datas[i]._id}" class="btn btn-sm btn-default" data-toggle="modal" data-target="#myModal" onclick="showEditData(this)"><span class="fa fa-pencil"></span></button>
                        <button data-id="${datas[i]._id}" class="btn btn-sm btn-default" onclick="deleteData(this,event)"><span class="fa fa-trash"></span></button>
                    </div>
                `)
            }
        }
    })
}

//show customers list in customers dropdown
function showCustomers() {
    $.ajax({
        url: "http://localhost:3000/api/chefs",
        type: "GET",
        dataType: 'json',
        success: function(datas) {
            for (let i in datas) {
                $('select[name=chef-id]').append('\
                    <option data-id="' + datas[i]._id + '">' + datas[i].name + '</option>\
                ')
            }
        }
    })
}

function showDishes() {
    $.ajax({
        url: "http://localhost:3000/api/menus",
        type: "GET",
        dataType: 'json',
        success: function(datas) {
            for (let i in datas) {
                $('select[name=dish-id]').append('\
                    <option data-id="' + datas[i]._id + '">' + datas[i].name + '</option>\
                ')
            }
        }
    })
}

//post data
function addData() {
    $('#add-task-form').submit(function(e) {
        e.preventDefault()

        var data = {
            chef_id: $("#add-task-form select[name=chef-id]").find(":selected").attr('data-id'),
            menu_id: $("#add-task-form select[name=dish-id]").find(":selected").attr('data-id'),
            status: $("#add-task-form select[name=status]").find(":selected").val(),
            description: $("#add-task-form input[name=description]").val(),
            taskDate: $("#add-task-form input[name=task-date]").val(),
            deadline: $("#add-task-form input[name=deadline]").val()
        }
        console.log(data)

        $.ajax({
                url: "http://localhost:3000/api/tasks",
                type: "POST",
                dataType: "json",
                data: data
            })
            .done(function() {
                $('#add-task-form').each(function() {
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
    })
}

//delete data
function deleteData(pointer, e) {
    e.preventDefault()

    var id = $(pointer).attr('data-id')

    $.ajax({
            url: `http://localhost:3000/api/tasks/${id}`,
            type: "DELETE"
        })
        .done(function(data) {
            $(pointer).closest('.task[data-id=' + id + ']').remove()
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
    $("#process-edit-task").attr('data-id', '')
    var id = $(pointer).attr('data-id')
    $("#process-edit-task").attr('data-id', id)

    $.ajax({
            url: `http://localhost:3000/api/tasks/${id}`,
            type: "GET",
            dataType: "json"
        })
        .done(function(data) {
            $("#edit-task-form select[name=chef-id]").val(data.chef.name),
            $("#edit-task-form select[name=dish-id]").val(data.menu.name),
            $("#edit-task-form select[name=status]").val(data.status),
            $("#edit-task-form input[name=description]").val(data.description),
            $("#edit-task-form input[name=task-date]").val(data.taskDate),
            $("#edit-task-form input[name=deadline]").val(data.deadline)
        })
}

//edit data
function processEditData(pointer, e) {
    e.preventDefault()
    var id = $(pointer).attr('data-id')

    var data = {
        chef_id: $("#edit-task-form select[name=chef-id]").find(":selected").attr('data-id'),
        menu_id: $("#edit-task-form select[name=dish-id]").find(":selected").attr('data-id'),
        status: $("#edit-task-form select[name=status]").find(":selected").val(),
        description: $("#edit-task-form input[name=description]").val(),
        taskDate: $("#edit-task-form input[name=task-date]").val(),
        deadline: $("#edit-task-form input[name=deadline]").val()
    }

    $.ajax({
            url: `http://localhost:3000/api/tasks/${id}`,
            type: "PUT",
            dataType: "json",
            data: data
        })
        .done(function() {
            $('#edit-task-form').each(function() {
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
    $("#date, #date2").datepicker({
        dateFormat: "yy-mm-dd"
    });

    $('#timepicker, #timepicker2').timepicker();
    getAllDatas();
    showCustomers();
    showDishes();
    addData();
})
