# Better Sleep
A fun project to track time spent asleep and calculate a score based on user input.

# Project setup
To keep versions under control I've added a `.nvmrc` & `.ruby-version` as well as a gem file to help with
installing pods by way of Bundler. I am also using Yarn but NPM should also probably work

1. To start run `nvm use && rvm use` (if you don't have these versions installed you can either install them with NVM/RVM or manually switch the versions.)
2. Next install your packages with `yarn install`
3. Then `cd ios/ && bundle install` to get all of your gems installed such as Cocoapods
4. Now that you have bundler ready run `bundle exec pod install`
5. finally `cd ../ && run yarn ios`

# API info
You can view the calls posted at a test endpoint [here](https://beeceptor.com/console/higbealth)

## Notes
1. You can't select a Duration Asleep longer than your Duration in Bed, perhaps you're sleeping more elsewhere however we're not accounting for that at this time.
2. The select modal must be closed by the close button rather than clicking out of the modal. With more time this would be much more polished on the FE.
3. I've also added a few tests. One is a component test as well as a function util test. Normally I'd break all of my components out into more abstract components with more tests however I didn't want to go over time.
4. Enjoy!
