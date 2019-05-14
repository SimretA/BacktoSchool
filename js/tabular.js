var globalData;
var globalIndex;
var globalDesc;
var globalName;
function getAllQuery(){
    $.ajax({
        url: "http://192.168.137.188:8080/api/facility",
        type: 'GET',
        dataType: 'json', // added data type
        success: function(res) {
            globalData = res;
            $("#removableLoaderRow").remove();
            for(var i=0; i<res.length; i++){
                tabularize(res[i]);
            }

            var table = $('#example');
            table.DataTable( {
                "order": [[ 0, "asc" ]]
            } );
        },
        error: function (e) {
            $("#removableLoaderRow").remove();
            console.log(e);
            $("#loadErrorMessage").removeClass("d-none");
        }
    });
}
var tbody = $("tbody");
function tabularize(obj) {
    tbody.append(`
            <tr>
                <input type="hidden" id="locationId" value="${obj.id}">
                <input type="hidden" id="locationDesc" value="${obj.description}">
                <input type="hidden" id="locationName" value="${obj.name}">
            <td>${obj.name}</td>
            <td>${obj.views}</td>
            <td>${obj.type}</td>
            <td>${obj.latitude} ${obj.longitude} 
                <a href="#" data-toggle="modal" data-target="#deleteModal" id="deleteBtn" onclick="logger(this);">
                    <i class="fa fa-trash text-danger float-right" aria-hidden="true"></i>                    
                </a>
                <a href="#" id="editBtn" onclick="showEditModal(this);"><i class="fa fa-pencil text-info float-right mx-4" aria-hidden="true"></i></a>
            </td>
        </tr>`);
}
$(document).ready(function () {
    getAllQuery();

    // $('#example').find('tr').click( function(){
    //     alert('You clicked row '+ ($(this).index()+1) );
    // });
    // $("table tr").click(function(){
    //     if(this.rowIndex){
    //     alert ("Show Edit Modal");
    //
    //
    // }
    // });

    //$("tbody").append(fac.tabularize());
});
var some;
function  logger(e) {
    some = $(e).parent().parent();
    globalIndex = $(some).children('#locationId').val();
    globalDesc = $(some).children('#locationDesc').val();
    globalName= $(some).children('#locationName').val();

}
function showEditModal(e) {
    logger(e);
    $("#locationNameModal").val(globalName);
    $("#locationDescription").val(globalDesc);
    $("#editModal").modal("show");



}
function deleteFun(){
    $.ajax({
        url: "http://192.168.137.196:8080/api/facility/" + globalIndex,
        type: 'DELETE',
        contentType: 'application/json',
        dataType: 'json', // added data type
        success: function(){
            some.remove();
        },
        error: function (e) {
            console.log(e);

            $('.alert').addClass( "show");
        }
    });

    $("#deleteModal").modal("hide");

}

function editFun(){
    var name = $("#locationNameModal").val();
    var description = $("#locationDescription").val();
    var reqst = JSON.stringify({name, description});
    console.log(reqst);
    $.ajax({
        url: "http://192.168.137.196:8080/api/facility/" + globalIndex+"/edit",
        type: 'PUT',
        contentType: 'application/json',
        data: reqst,
        success: function(){
            document.location.reload();
        },
        error: function (e) {
            console.log(e);
            $('.alert').addClass( "show");
            $("#editModal").modal("hide");
        }
    });

}