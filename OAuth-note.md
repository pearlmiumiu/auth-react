OAuth, standing for open authentication, is the standard protocol by which a developer application ("consumer"), a client, and an external authority they both trust ("provider") coordinate a contract in which the user authenticates with the consumer via the provider. Such a contract will also specify particular user data the provider will expose to the consumer, we will focus on a basic scope.

Consider our OAuth diagram below. As OAuth consumers, we will need to consider only steps 1-4 and 9-12 as we figure out what we need to program. In truth rendering the login page will only involve minor edits, so steps 1-2 are negligible.



the outline

When: the client requests OAuth login

Server should: redirect to OAuth provider - sending along callback url, scope and our public ID (similar to a username)

When: the client pings the callback url - passing along the temporary code from the provider

Server should:

Use the temporary code from the client / provider talk, our public ID (username) and our private key (similar to a password) to also authenticate with the provider and determine if the client truly authenticated
Once we are authenticated, we need to store the access token and / or other received user information (the extent of which determined by the scope requested by us and approved by the client)
Finally we should respond to the client with a login success landing page