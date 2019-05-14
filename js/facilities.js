class Facility {
    constructor(name, description, votes, type, location) {
        this.name = name;
        this.description = description;
        this.votes = votes;
        this.type = type;
        this.location = location
    }

    //create a row for the table
    tabularize() {
        return `<tr><td>${this.name}</td><td>${this.votes}</td><td>${this.type}</td><td>${this.location}</td></tr>`;
    }
}
var fac = new Facility('coca cola','coca colaalalalalala',24,'restaurant','right here');
