
# Dependencies:

- [Node.js](https://nodejs.org/en/)
- [Docker](https://docs.docker.com/get-docker/)

# How to run

You can choose to run one of the three, two or even the three at the same time, to do this all you gotta do is enter the desired directory, and inside it run ```npm start```. Time to initialize may vary depending on the framework, but you will know when it finished initializing through logging.
Something like "```X API listening on port Y```" will popup on your terminal.

The APIs differs from each other based on their ports since they all run at the same host (```localhost```), they run on the following ports:
- Hapi.js:  3000
- NestJS:   3001
- Express:  3002

But you can easily change it in the .env file of each directory.

# How to stop

Once you finish your experiments I recommend you to kill the database instances, to do that all you gotta do is run ```docker compose kill```, which will kill (turn off) the database containers, if you run ```npm start``` again it will re-start the database, persisting the data that was already there from other interations.

# Next steps
 
There's a small list of future implementations possibilities worth your time, they're the following:
- Authentication / Authorization
  - JWT
  - Cookies
- Input validation
- Saving files
- Implement the same thing using another tool (framework)
  - Fastify
- Create new entities and implement relations between them to improve your skils with the ORM | ODM.
- Implement tests
  - Unit tests
  - E2E tests