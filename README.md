\*I originally built this app for another project which is an online store so the source code appears bundled together. If you want to check out the frontend codes for the chat app only, look for folders with "Chat" in their name or follow this link https://github.com/cuongthach137/yahee/tree/master/client/src/components/Chat.

The store is incomplete so i deployed the chat app first for now

# YAHEEEE!

Have a look @ https://yahee.vercel.app

Test account:
test123@gmail.com
anhem!23
Or create one your own

Chat 1vs1 - Users can:

1. Exchange text messages, media (sending voice recordings is pretty much for show only as I don't know where I should store them efficiently yet)
2. Pin, reply, hide, recall, copy, forward or react to messages, click and hold send button to send a default emoji of different sizes aligned with how long the button is pressed (similar behavior to what you have on facebook messenger)
3. Set nicknames, conversation theme
4. Buzz other end (their chat window will shake) when sending a default emoji or when the sent text contains certain words.
5. Engage in a video call (within a local network only, for now)
6. Block the other end
   ![OneOne](https://res.cloudinary.com/jamessimonsd/image/upload/v1640915129/456_j4g1ft.png)

Group chat

1. Most of the above
2. Set theme and name for the conversation.
3. Add more members
4. Become an admin of the conversation (conversation creator is the admin by default).
   As an admin, you can:
   4.1 Make another (member) admin
   4.2 Remove another or yourself as admin
   4.3 Remove a member from the group
   4.4 Remove and block a member (Once done you and others shouldn't be able to add him back EVER)

- In the event the conversation doesn't have an admin, all members are given the option to claim themself as the admin

5. Leave the conversation

![Group](https://res.cloudinary.com/jamessimonsd/image/upload/v1640914800/123_lvlekv.png)

Users can also

1. Upload their own profile photo, turn off notification sounds, set chat window theme, search for contacts
2. Send a new message to a person or several people (a new conversation will be created if there isn't one in place)

Miscellaneous:

1. Messages go through several stages: uploading (sending to the server), sent (saved to database, but recipients have gone offline), delivered (the message is delivered but has yet to be seen by recipients), seen (message is seen by recipients), failed (the message is not saved to database)

Issues to fix when I have the time:

1. Unwanted behavior when users open several tabs => This might be because I only use userIds to manage a user's session => Integrate redis to better manage online users? (FIXED)
2. Janky scroll especially when messages contain attachments => rebuild an infinite scrolling component or just use a library
3. Removed messages might still be visible on sidebar as latest message => update on backend side
4. Incorrect announcements in group chat when a user leaves the conversation and is later added back => make tweaks to announcement text. Include their name in the text instead of their ID
5. Broken layout on login page
6. Accessing the site on IOS devices shows a blank page @@
7. Weird bug when sending a new message from a Mac in which the very last word of the message duplicates into a new message (Ex: "hey yo" "yo") (WTF??)
8. Incorrect user activity status => Redis might be of use in this case. I will actively learn it and see
9. Blocked users can still forward messages to you because I only validate on frontend :D => Check block status on backend side
10. Bad ux when switching conversations (Blank page while retrieving message list)

... feel free to notify me if you find more bugs or have any suggestions regarding how to resolve the above issues

Bugs...features to add:

1. Conversation tags
2. Video call that actually works
   ...
