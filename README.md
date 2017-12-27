# auther

After cloning or downloading, don't forget to install with `npm install`

Once you've ensured that `postgres` is running (e.g. by trying to start a `psql` shell), you can execute `npm run seed` to seed the database with fake data.

Finally, fire it up with `npm run start:dev` and go to http://127.0.0.1:1337/.


Fork and clone if you have not already
Make sure PostgreSQL is running
Run npm install (or yarn - an alternative to the npm package manager)
Run npm run seed and wait for confirmation that seeding was successful
Run npm run start:dev and head over to your browser to see the application!


Background

Authentication refers to the process of checking that an entity is who they claim to be, i.e. a login process. This is different from authorization, which is more about controlling what resources a client should and should not have access to.

We'll be exploring how to implement local authentication, which refers to authenticating a logged-in user with a username (or email address) and password previously registered to that application. We'll need to consider how to start keeping such data secure from would-be attackers!

Local as a term is contrasted with foreign strategies (or provider strategies) that come from third-party applications like Facebook and Twitter. Simply put, a user can decide to set up an account "directly", by providing a username and password, or "indirectly", through some other web application that both of you trust.


