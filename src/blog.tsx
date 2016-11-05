/// <reference path="index.d.ts" />

//let React = require('react');

//import * as React from "react";

//import React = __React;
//import ReactDOM = React.__DOM;

function BlogPost(props) {
    return (
        <div>
            <h1>
                {props.post.title}
            </h1>
            <div id="post">
                {props.post.text}
            </div>
        </div>
    );
}

function BlogPostList(props) {
    if (!props.posts) {
        return null;
    }
    let postNodes = props.posts.map(function(post){
        return (<BlogPost key={post.id.toString()} post={post} />);
    });
    return (
        <div className="blogList">
            {postNodes}
        </div>
    );
}

interface state {
    id: number;
    text: string;
    title: string;
}

interface BlogPostBoxProps { }
class BlogPostBoxState {
    posts: Array<state>;
    constructor(){
        this.posts = new Array<state>();
    }
}

class BlogPostBox extends React.Component<BlogPostBoxProps, BlogPostBoxState> {
    constructor(){
        super();
        this.state = new BlogPostBoxState()
        //this.state.posts.push({text: "loading...", title: "loading..."});
    }
    loadCommentsFromServer() {
        $.ajax({
          url: "http://127.0.0.1:5000/",
          dataType: 'json',
          cache: false,
          success: function(data) {
              const texts = this.state.posts.splice();
              for (let i = 0; i<data.length; i++){
                  texts.push({id: data[i].id, text: data[i].text, title: data[i].title});
              }
              this.setState({posts:texts});
          }.bind(this),
          error: function(xhr, status, err) {   
            console.error(status, err.toString());
          }.bind(this)
        });
    }
    componentDidMount() {
        this.loadCommentsFromServer();
    }
    renderBlogList(){
        //return null;
        return <BlogPostList posts={this.state.posts} />;
    }
    render(){
        return (
            <div className="blogbox">
                <h1>Blogs</h1>
                {this.renderBlogList()}
            </div>
        );
    }
}

document.addEventListener("DOMContentLoaded", function(){
    ReactDOM.render(
        <BlogPostBox />, 
        document.getElementById("content")
    );
})
