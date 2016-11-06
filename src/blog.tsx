/// <reference path="index.d.ts" />

function stringTOHTML(str: string) {
    let split = str.split('\n');
    return split.join('<br />');
}

function unrealEmail(email: string) {
    return email.replace('@', '_AT_');
}

function BlogPost(props) {
    const email = "mailto:" + unrealEmail(props.post.email);
    const text = stringTOHTML(props.post.text);
    return (
        <div className="post">
            <div className="post_title">
                {props.post.title}
            </div>
            <div className="post_text" dangerouslySetInnerHTML={{__html: text}} />
            <div className="post_footer">
                <div className="post_author">
                    <a className="post_email" href={email}>
                    {props.post.author}
                    </a>
                </div>
                <div className="post_created">
                    {props.post.created}
                </div>
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
        <div id="blogList">
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
    }
    loadCommentsFromServer() {
        $.ajax({
          url: "http://127.0.0.1:5000/",
          dataType: 'json',
          cache: false,
          success: function(data) {
              const texts = this.state.posts.splice();
              for (let i = 0; i<data.length; i++){
                  texts.push(
                        {
                            id: data[i].id, 
                            text: data[i].text, 
                            title: data[i].title,
                            author: data[i].author,
                            email: data[i].email,
                            created: data[i].created
                        });
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
        return <BlogPostList posts={this.state.posts} />;
    }
    render(){
        return (
            <div id="blogbox">
                {this.renderBlogList()}
            </div>
        );
    }
}

document.addEventListener("DOMContentLoaded", function(){
    ReactDOM.render(
        <BlogPostBox />, 
        document.getElementById("main")
    );
})
