FORMAT *issue* -> *how i found it* -> *brief explanation* -> *what should be done* 
issues are listed from most important to least important 
I used the included project since I havent finished phase 2 yet. 

1 resources can be created wihtout logging in -> navigated to /resources without logging in ->sending a post request to /resources without session id creates the resource. You can also just navigate to /resources and do it manually there. -> Add authentication when creating resources + make sure the user is an admin 

2 The add a new resource function is available to non admin users -> created non admin account -> the field is still visible and works. 

3 booking can be done without logging in -> resent a reservation request and changed the resourceId + removed the session token -> if you know a users email(their username) and a resourceID(they can be found by navigating to /resourcesList) you can book a resource by sending a post request to /reservation  -> add authentication to when we're actually recieving the request 

4 resourceId is exposed when visiting /resourcesList -> navigated to /resourcesList -> the way the application currently works lets us create bookings if we know a resourceId, this wouldn't be a huge issue if the previous exploit didnt work -> dont show the resource id unless the user is an admin 

5 duplicate resources can be created -> zap created multiple of the same resource -> make sure a resource doesn't already exist when creating resources.  

6 resourceId's are incremented by 1 each time -> not really that important but relates to the previous exploits, you could book every resource by just sending requests and incrementing the resource id. 
