import {
    Component
} from "react";
import './home.css'
import firebase from '../../firebase';


class Home extends Component {
    state = {
        posts: []
    };

    componentDidMount() {
        firebase.app.ref('posts').once('value', (snapshot) => {
            let state = this.state;
            state.posts = [];
            snapshot.forEach((childItem) => {
                state.posts.push({
                    key: childItem.key,
                    autor: childItem.val().autor,
                    descricao: childItem.val().descricao,
                    image: childItem.val().image,
                    titulo: childItem.val().titulo,

                })
            });
            this.setState(state);
        })
    }
    render() {
        return (<section id="post"> {
            this.state.posts.map((post) => {
                return (
                    <article key={post.key}>
                        <header>
                            <div className="title">
                                <strong>{post.titulo}</strong>
                                <span>Autor: {post.autor}</span>
                            </div>
                        </header>
                        <img src={post.image} alt="Capa do post"/>
                        <footer>
                            <p>{post.descricao}</p>
                            </footer> 
                    </article>
                );
            })}
        </section>
        );
    }
}

export default Home;