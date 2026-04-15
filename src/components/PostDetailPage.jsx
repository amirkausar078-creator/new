import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../assets/style/style.css';

const PostDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        if (id) {
            // Скриншотыңа сәйкес 'post' емес, 'category' деп өзгерттік
            fetch(`https://c2c2b82ee72f2264.mokky.dev/category`)
                .then(res => {
                    if (!res.ok) throw new Error("Серверден қате келді");
                    return res.json();
                })
                .then(data => {
                    // Тізімнің ішінен керекті ID-ді табамыз
                    const foundPost = data.find(item => String(item.id) === String(id));
                    
                    if (foundPost) {
                        setPost(foundPost);
                        if (foundPost.comments) setComments(foundPost.comments);
                    } else {
                        setError(true);
                    }
                })
                .catch(err => {
                    console.error("Fetch қатесі:", err);
                    setError(true);
                });
        }
    }, [id]);

    const handleAddComment = (e) => {
        e.preventDefault();
        if (newComment.trim() === "") return;

        const commentObj = {
            id: Date.now(),
            user: "Қолданушы", 
            text: newComment,
            date: new Date().toLocaleDateString()
        };

        setComments([commentObj, ...comments]);
        setNewComment("");
    };

    if (error) return (
        <div className="container" style={{textAlign: 'center', marginTop: '50px'}}>
            <h2>Кешіріңіз, жаңалық табылмады.</h2>
            <button className="back-btn" onClick={() => navigate('/')}>Басты бетке қайту</button>
        </div>
    );

    if (!post) return <h2 className="loading-text" style={{textAlign: 'center', marginTop: '50px'}}>Жүктелуде...</h2>;

    return (
        <div className="post-detail-wrapper" style={{background: 'white', minHeight: '100vh', paddingBottom: '50px'}}>
            <div className="container">
                <button className="back-btn" onClick={() => navigate(-1)} style={{marginBottom: '20px'}}>← Артқа</button>
                
                <article className="post-article" style={{color: 'black'}}>
                    <span className="detail-category" style={{color: '#1bbc9b', fontWeight: 'bold'}}>{post.category}</span>
                    <h1 className="detail-title" style={{color: 'black', fontSize: '30px', margin: '10px 0'}}>{post.title}</h1>
                    <p className="detail-date" style={{color: '#888', marginBottom: '20px'}}>{post.date}</p>

                    <div className="detail-img-wrapper" style={{width: '100%', marginBottom: '25px'}}>
                        <img src={post.img} alt={post.title} style={{width: '100%', borderRadius: '15px', objectFit: 'cover'}} />
                    </div>

                    <div className="detail-content" style={{fontSize: '18px', lineHeight: '1.6', color: '#333'}}>
                        <p className="description-lead"><strong>{post.description}</strong></p>
                        {post.full_text && <div className="full-text" style={{marginTop: '15px'}}>{post.full_text}</div>}
                    </div>

                    <section className="comments-section" style={{marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '20px'}}>
                        <h3>Пікірлер ({comments.length})</h3>
                        
                        <form className="comment-form" onSubmit={handleAddComment} style={{marginTop: '15px'}}>
                            <textarea 
                                placeholder="Пікіріңізді жазыңыз..." 
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                style={{width: '100%', minHeight: '100px', padding: '12px', borderRadius: '10px', border: '1px solid #ddd'}}
                            ></textarea>
                            <button type="submit" className="send-comment-btn" style={{marginTop: '10px', padding: '10px 25px', background: '#1bbc9b', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>
                                Жіберу
                            </button>
                        </form>

                        <div className="comments-list" style={{marginTop: '30px'}}>
                            {comments.map(comment => (
                                <div key={comment.id} className="comment-item" style={{background: '#f9f9f9', padding: '15px', borderRadius: '10px', marginBottom: '10px'}}>
                                    <div className="comment-header" style={{marginBottom: '5px'}}>
                                        <strong style={{marginRight: '10px'}}>{comment.user}</strong>
                                        <small style={{color: '#999'}}>{comment.date}</small>
                                    </div>
                                    <p style={{margin: '0'}}>{comment.text}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </article>
            </div>
        </div>
    );
};

export default PostDetailPage;