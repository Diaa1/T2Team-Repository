var projectCollection;
var Project;
var Projects;

var userCollection;
var User;
var users;

var pronnectorURL = "http://localhost/crowd/landingpage/";

var initUsers = function initUsers(){
    User = Backbone.Model.extend({
        initialize: function(){
            console.log("New user was created");
        }
    });
    
    Users = Backbone.Collection.extend({
        // call original Backbone.Model#fetch with `dataType` equal `text` for $.ajax
        fetch: function(options){
            options = _.extend(options || {}, {
              dataType: 'json'
            });
            this.constructor.__super__.fetch.call(this, options);
        },

        // store response in content attribute
        parse: function(response){
            return response;
        },
        
        model: User
    });
    
    userCollection = new Users();
    
    userCollection.fetch({
        async: false,
        reset: true,
        url: "json/users.json",
        success: function(){
            console.log(JSON.stringify(userCollection)); // => content of users.json
        }
    });
}

var initProjects = function initProjects(){
    Project = Backbone.Model.extend({
        initialize: function(){
            console.log("New project was created");
        }
    });

    Projects = Backbone.Collection.extend({
        path: pronnectorURL+"json/project.json",

        // call original Backbone.Model#fetch with `dataType` equal `text` for $.ajax
        fetch: function(options){
            options = _.extend(options || {}, {
              dataType: 'json'
            });
            this.constructor.__super__.fetch.call(this, options);
        },

        // store response in content attribute
        parse: function(response){
            return response;
        },
        
        model: Project
    });

    projectCollection = new Projects();

    projectCollection.fetch({
        cache: false,
        async: false,
        reset: true,
        url: "json/project.json",
        success: function(){
            console.log(JSON.stringify(projectCollection)); // => content of project.json
        }
    });
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

