let imageData = {};
let imageId = 1194 //Enter the id from the fetched image here

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

const likeURL = `https://randopic.herokuapp.com/likes/`

const commentsURL = `https://randopic.herokuapp.com/comments/`

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')



  fetch(imageURL)
    .then(response => response.json())
      .then (data =>
      {
        console.log(data);
        imageData = data;
        let image = document.getElementById('image');
        image.src = data['url'];
        let nameTag = document.getElementById('name');
        nameTag.innerText = data['name'];
        let likes = document.getElementById('likes');
        likes.innerText = data['like_count'];
        document.getElementById('like_button').addEventListener('click', likeThisImage);

        displayComments(data['comments']);

      });
  document.getElementById('commentBtn').addEventListener('click', addCommentBtnListener);
});

function displayComments(comments)
{
  let ul = document.getElementById('comments');
  let li = document.createElement('li');
  comments.forEach(comment =>
    {
      let li = document.createElement('li');
      li.innerText = comment['content'];
      ul.appendChild(li);
    })
}

function likeThisImage()
{
  let btn = event.currentTarget;
  imageData['like_count']++;
  console.log(imageData['like_count']);
  let likes = document.getElementById('likes');
  likes.innerText = imageData['like_count'];
  updateLikesToDatabase();
}

function updateLikesToDatabase()
{
  fetch('https://randopic.herokuapp.com/likes',
    {
      method: 'POST',
      headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
      body: JSON.stringify({
              image_id: imageId
            })
    })
      .then(response => response.json())
        .then(data => console.log(data))
}

function addCommentBtnListener()
{
  event.preventDefault();
  console.log('i clicked on the comment button');
  let ul = document.getElementById('comments');
  let li = document.createElement('li');
  let commentInput = document.getElementById('comment_input');
  li.innerText = commentInput.value;
  ul.appendChild(li);
  updateCommentsToDatabase(commentInput.value);
  commentInput.placeholder = "Add Comment";
  document.getElementById('comment_form').reset();
}

function updateCommentsToDatabase(comment)
{
  fetch('https://randopic.herokuapp.com/comments',
    {
      method: 'POST',
      headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
      body: JSON.stringify({
        image_id: imageId,
        content: comment
      })
    })
      .then(response => response.json())
        .then(data => console.log(data));
}
