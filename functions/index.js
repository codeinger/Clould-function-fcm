'use strict';


const functions = require('firebase-functions');

const admin = require('firebase-admin');

admin.initializeApp();


exports.send = functions.database.ref('/Notification/{userId}/CloudFuncation/{pushId}')
                     .onCreate((snapshot,context)=>{

                             console.log("mylog", "title : "+snapshot.val().title+
                                                "description : "+snapshot.val().description+
                                                  "riciver id  : "+snapshot.val().id+
                                                  "sender id : "+context.params.userId
                                );


                                return admin.database().ref('/User/'+snapshot.val().id)
                                               .once('value').then(function(snap){

                                                       const payload = {

                                                         notification: {
                                                            "title": snapshot.val().title,
                                                            "body" : snapshot.val().description,
                                                            "image" : "https://image.shutterstock.com/image-photo/kiev-ukraine-may-14-2016-260nw-420838831.jpg",
                                                            "click_action" : "my_click"
                                                          },

                                                          data : {

                                                            "title": snapshot.val().title,
                                                            "body" : snapshot.val().description,
                                                            "image" : "https://cdn.spacetelescope.org/archives/images/wallpaper2/heic2007a.jpg",
                                                            "click_action" : "my_click",
                                                            "text":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in",

                                                             "key1" : "value 1",
                                                             "key2" : "value 2"

                                                        }


                                                       }

                                                       return admin.messaging().sendToDevice(snap.val().token,payload)
                                                         .then(result=> {

                                                                return console.log("mylog","Notification sent.");

                                                         });






                                               });

                     });
