let mapObject = {
    "type": "Feature",
    "geometry": {
        "type": "Point",
        "coordinates": [38.750461476129146, 8.992733721332002]
    },
    "properties": {
        "title": "Mapbox DC",
        "icon": "monument"
    }
};

let array = [];

async function loadMap() {

    $.ajax({
        url: "http://10.6.222.41:8080/api/facility",
        type: 'GET',
        dataType: 'json', // added data type
        success: function (res) {
            for (let i = 0; i < res.length; i++) {
                array.push(
                    mapObject
                );
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
    Object.entries(array);
    return array;
}

