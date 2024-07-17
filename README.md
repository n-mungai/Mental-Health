# Mental Health Awareness Application

This is a basic website to bring awerness to mental health problems and people suffering from them, delivered through blog posts by experts and a way to communicate with them.

## Group Memebers
- Mohamed Junaid Chaudhry - 166335
- Shadrack Mungai - 152522
- Ndung’u Victor Kahindo - 150668
- Billy Kibet

## Project Structure
Each page has it's own `route` folder container their respective `jsx` and `css` files.

The website consists of four main pages:
1. Landing page - done by Shadrack Mungai
2. Blog list page - shows a list of available blogs to read, done by Junaid Chaudhry
3. Find experts page - shows a list of available experts to get in touch with, done by Billy Kibet.
4. User and upload blog page - if a user is signed in, this page shows the list of blogs they have written recently, done by Ndung’u Victor Kahindo

## How the blog posts work
When a user sign in, they can go to their profile page (via the account icon at the top right of the nav bar) and choose to write a blog.  

From here they can input the title, author, and a short description of their blog post.   

**NOTE:** the actual blog content is stored as a markdown file `.md` so that the user has the ability to style it with ease. The user must, however, upload their blog content as a markdown on the `upload/:userId` page.  

## IMPORTANT NOTES
- Thise project was create using Vite rather than create-react-app due to Vite's lightweight and more modern nature and fast setup.
- This project depends on Firebase for the blog posts and user authentication to work.
- The connection fo react to firebase was done by Mohamed Junaid Chaudhry (166335).
- Since this project uses firebase to load the blog posts, the blog paes do take a while to load up depending on your network speed.

## Running the website
Since this project is using Vite, you need to use the commands:
```bash
npm install
npm run dev  # Instead of using `npm start`
```
