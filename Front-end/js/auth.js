function login(email, pass){
    initUsers();
    var userEmail = $("#user_email_login").val();
    var userPass = $("#user_password_login").val();
    if($.session.get('userLoggedID') == undefined){
        var userExist = false;
        userCollection.every(function(model, index, list){
            var auxUser = list[index];
            if(String(auxUser.get("email")) == userEmail && auxUser.get("password") == userPass){
                console.log(auxUser);
                alert("Welcome "+auxUser.get("fullName")+"!");
                $.session.set('userLoggedID', auxUser.get("id"));
                window.location.replace("profile.html?userID="+auxUser.get("id"));
                userExist = true;
                return false;
            }else{
                userExist = false;
                return true;
            }
        });
        if(!userExist){
            alert("Wrong username or password, please try again.");
        }
    }
}

function checkIfUserIsOnline(){
    initUsers();
    var userLoggedID = $.session.get('userLoggedID');
    if(userLoggedID != undefined){
        var auxUser = userCollection.get(userLoggedID);
        $("#header_online").css("display","inline");
        $("#header_offline").css("display","none");
        $("#profile_button").attr({href: "profile.html?userID="+auxUser.get("id")});
    }
}

function logout(){
    $.session.clear();
    alert("Bye, see you soon!");
    window.location.replace("index.html");
}

function registerUser(){
    initUsers();
    var currentUserID = _.size(userCollection);
    var newUserID = currentUserID + 1;
    var newUser = new User({
        "id": newUserID,
        "fullName": $("#user_full_name").val(),
        "email": $("#user_email").val(),
        "password": $("#user_password").val(),
        "location": "Germany, DE",
        "bio": "",
        "profileURL": $("#user_full_name").val().replace(" ", "").toLowerCase(),
        "personalURL": "",
        "image": "images/no-avatar.png",
        "url":"profile.html?userID="+newUserID
    });

    userCollection.push(newUser);

    $.ajax({
        type: "POST",
        dataType : 'json',
        async: false,
        cache: false,
        url: 'ajax/save_users_json_file.php',
        data: { data: JSON.stringify(userCollection) },
        success: function () {
            alert("Thanks for register to Pronnector :)!");
            //window.location.replace("profile.html?userID="+newUserID);
            window.location.replace("index.html");
        },
        failure: function() {alert("Oh! something went wrong, but don't worry it is not your fault :).");}
    });
}