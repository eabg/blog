const express = require('express')
const errorhandler = require('errorhandler')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes')

let store = {
    posts: [{
        name: 'This little guy is cute!',
        imageURL: 'https://thumbs.gfycat.com/HappyWaryBobolink-max-1mb.gif',
        text: '',
        comments: [{
                text: 'So many assumptions are being made about what we already know?! This is overwhelming!'
            }, {
                text: 'This is great! At the end of this unit, we\'re going to be able to make our own API.'
            }, {
                text: 'How do we make this live? On a real server?!!'
        }]
      },
        {
          name: 'Stuff about Faries',
          imageURL:'http://78.media.tumblr.com/6a34b57dab6362168532f9a32ad80c95/tumblr_o96gljvD1W1saru64o1_500.gif',
          text: 'Fairy, in folklore, one of a variety of supernatural beings endowed with the powers of magic and enchantment. Belief in fairies has existed from earliest times, and literatures all over the world have tales of fairies and their relations with humans. Some Christians have said that fairies were the ancestors of the ancient pagan gods, who, having been replaced by newer deities, were therefore hostile. Others thought that fairies were nature deities, similar to the Greek nymphs. Still others identified fairies with the souls of the dead, particularly the unbaptized, or with fallen angels. Among their many guises, fairies have been described as tiny, wizen-faced old men, like the Irish leprechaun; as beautiful enchantresses who wooed men to their deaths, like Morgan le Fay and the Lorelei; and as hideous, man-eating giants, like the ogre.',
      },

        {
          name: 'Everyone has to love dragons!',
          imageURL:'http://78.media.tumblr.com/f60774dde5c41734c8a9280d5f77f2e4/tumblr_muzmp6SJBG1r1kblco1_500.gif',
          text: '',
          }]
  }



let app = express()

// Middleware: Does stuff to the request and response objects
// before routing:
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())
app.use(cors())
app.use((req, res, next) => {
    req.store = store
    next()
})

app.get('/posts', routes.posts.getPosts)
app.get('/posts/:postId', routes.posts.getPost)
app.post('/posts', routes.posts.addPost)
app.put('/posts/:postId', routes.posts.updatePost)
app.delete('/posts/:postId', routes.posts.removePost)

/*
// NOTE: We will worry about comments next week:
app.get('/posts/:postId/comments', routes.comments.getComments)
app.post('/posts/:postId/comments', routes.comments.addComment)
app.put('/posts/:postId/comments/:commentId', routes.comments.updateComment)
app.delete('/posts/:postId/comments/:commentId', routes.comments.removeComment)
*/

app.listen(3000)
