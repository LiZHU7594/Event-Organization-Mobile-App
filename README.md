# Event Organization Android App

#### This project built an Android APP by Python Flask and React Native, where users can create and join in events.

**Steps to run this project:**
1. Deploy and run backend
```shell
$ cd event
$ py -m venv env
$ source env/bin/activate    # For Mac/Linux...
$ source env/Scripts/activate    # For Windows
(env)$ pip install -r requirements.txt
(env)$ cd back-end
(env)$ py app.py
```
2. Deploy and run frontend(open another terminal)
```shell
$ cd front-end
$ yarn android
```

**Six pages(main functions):**
1. Login page, where user can log in with existing account.(Unlogged state)
2. Register page, where user can register a new account.(Unlogged state)
3. Event page, where user can see all available events and details, join in them or quit.(Logged state)
4. Creation page, where user can see their creations(containing expired creations), participators and close available events.(Logged state)
5. Participation page , where user can see their participations, join or quit them. If some of them were closed by the creator, they would be listed as unavailale.(Logged state)
6. Logout page, where user can logout.(Logged state)

> Here is search bar in Event page, Creation page and Participation page, which can help users search avaivale events, their creation and participations.

> Here is create button in Event page and Creation page, which can help users create events.

> Every event has a detail attribute. Users can see or close it.

> If the user tries to go back to Login Page with the back button on Android phone from Tab page, the App will redirect to a message page which tells the user it is logged-in state.



**Manual Test Cases:**
- [x] Go to Register Page by clicking Register Button in Login page.
- [x] Enter unexisting account in Login Page, "Check your username or password" warning appear.
- [x] Enter wrong password in Login Page, "Check your username or password" warning appear.
- [x] Enter existing account in Login Page. The browser redirects to event page.
- [x] Register a new account in register page with existing name, "Repeated name." warning appear.
- [x] Register a new account in register page. After sucessfully register, the browser redirects to Event page.
- [x] Logout. After logging out, the browser redirects to Login page.
- [x] Search event by keyword, time, category and place in Event page, Participation page and Creation page. Correctly show events and the number of events. Specifically, unavailable events disappear in Participation Page after search.
- [x] Create a new event with necessary information in Event page or Creation page and show correct available events after submitting.
- [x] Join in an event in Event page. After joining in, the button becomes "quit" and the user can see the event in participation page. The creator of this event can see this participator in Creation page.
- [x] Quit an event in Event page. After quiting, the button becomes "join in" and the event disappears in participation page. The creator of this event can see this participator disappears in Creation page.
- [x] Click More button on each event and show detail information. After sucessfully showing detail information, the button becomes Less. After clicking Less button, detail information was hidden.
- [x] If the creator closes an event in creation page, this information about unavailable event will show in participator's Participation page. And this event disappears in Event page.
- [x] If the creator activates an event in creation page, this unavailable event becomes available in participators' Participation page. And this event appears in Event page.
- [x] In Creation page, creator can see expired event and participators of his creations.

> Here are three existing users: Joyce(password:joyce), David(password:david), James(password:james). You can create new account or use existing users to test by your self.
