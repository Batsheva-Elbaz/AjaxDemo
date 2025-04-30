$(() => {

    const addModal = new bootstrap.Modal($('#add-modal')[0]);
    const editModal = new bootstrap.Modal($('#edit-modal')[0]);

    let editPersonId = null;

    const refreshPeople = (cb) => {
        $("tbody tr:gt(0)").remove();
        $("#spinner-row").show();
        $.get('/home/getpeople', function (people) {
            $("#spinner-row").hide();
            people.forEach(person => {
                $("tbody").append(`<tr>
                <td>${person.firstName}</td>
                <td>${person.lastName}</td>
                <td>${person.age}</td>
                 <th><button class="btn btn-warning" onclick="edit(${person.id}, '${person.firstName}', '${person.lastName}', ${person.age})">Edit</button></th>
                 <th><button class="btn btn-danger" onclick="deletePerson(${person.id})">Delete</button></th>

                </tr>`);
            })
            if (cb) {
                cb();
            }
        });

    }

    $("#show-add").on('click', function () {
        $("#firstName").val('');
        $("#lastName").val('');
        $("#age").val('');
        addModal.show();
    })

    $("#save-person").on('click', function () {
        const firstName = $("#firstName").val();
        const lastName = $("#lastName").val();
        const age = $("#age").val();

        $.post('/home/addperson', {
            firstName: firstName,
            lastName: lastName,
            age: age
        }, function () {
            refreshPeople();
            addModal.hide();

        });

    })


    window.edit = function (id, firstName, lastName, age) {
        $("#first").val(firstName);
        $("#last").val(lastName);
        $("#editAge").val(age);
        editPersonId = id;
        editModal.show();
    }



    $("#save").on('click', function () {
        const firstName = $("#first").val();
        const lastName = $("#last").val();
        const age = $("#editAge").val();

        $.post('/home/update', {
            id: editPersonId,
            firstName: firstName,
            lastName: lastName,
            age: age
        }, function () {
            refreshPeople();
            editModal.hide();

        });

    })
        ;
    window.deletePerson = function (id) {
        $.post('/home/delete', { id: id }, function () {
            refreshPeople();
        });
    }

    refreshPeople()
});