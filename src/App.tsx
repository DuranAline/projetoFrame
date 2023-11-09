import { useState, useEffect } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import Carousel from './Carousel';
import Header from './Header';
import Footer from './Footer'; // Importe o componente Footer
import './App.css';

// Define a interface para a estrutura de um comentário
interface Comment {
  author: string;
  text: string;
  dateTime: string;
}

const App: React.FC = () => {
  // Estado para armazenar os comentários
  const [comments, setComments] = useState<Comment[]>([]);

  // Carregar comentários do armazenamento local quando o aplicativo é montado
  useEffect(() => {
    // Verifica se há comentários armazenados no localStorage e, se não houver, retorna um array vazio.
    const storedComments = JSON.parse(localStorage.getItem('comments') || '[]');
    setComments(storedComments); // Atualiza o estado 'comments' com os comentários armazenados.
  }, []);

  // Adicionar um novo comentário
  const addComment = (author: string, text: string) => {
    const newComment: Comment = {
      author,
      text,
      dateTime: new Date().toLocaleString(),
    };
    const updatedComments = [newComment, ...comments];
    setComments(updatedComments); // Atualiza o estado 'comments' com os novos comentários.

    // Salva os comentários no localStorage para que sejam mantidos após a recarga da página.
    localStorage.setItem('comments', JSON.stringify(updatedComments));
  };

  return (
    <div>
      <Header />
      <div className="content">
        <Carousel />

        <CommentForm onAddComment={addComment} />
        <div className="total-box">
          <p className='paragrafo'>Total de Comentários: {comments.length}</p>
        </div>
        <CommentList comments={comments} />
      </div>
      <Footer /> {/* Inclui o Footer aqui */}
    </div>
  );
};

export default App;
