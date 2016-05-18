# Code Reviews Tool
This is a chrome extension to help people comment directly on github file and share to friends

#How it work?
![How it work!](https://raw.githubusercontent.com/sangcu/code-reviews-extension/master/screenshots/demo.gif)

#Firebase Support
Currently, this project keeping all data in firebase store with an limited concurrent to 100 connection for free account. Firebase support pubsub pattern so you can get real-time comments.  

There is no authentication for default firebase account so anyone can add/remove comment. But I BELIEVED, there so many good guys who wouldn't delete valuable comments.

#Vendors
This original support for Github. If you want to support into Gitlab, Bitbucket then write your own a UI vendor that inherit from `Vendor.prototype`  

#Contributions
All pull requests are welcome.

#Licenses
This project used to be released under MIT, but I you can do whatever you want.

