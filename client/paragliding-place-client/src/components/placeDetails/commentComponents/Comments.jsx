import { Link } from "react-router-dom"

import { useCommentContext } from "../../../contexts/CommentContext";
import { isOwner } from "../../../validators/validators";
import { CommentModal } from "./../commentComponents/CreateCommentModal";
import { DeleteCommentModal } from "./../commentComponents/DeleteCommentModal";
import { EditCommentModal } from "./../commentComponents/EditCommentModal";

import { LoginModal } from "../../login/LoginModal";

import styles from "../commentComponents/comment.module.css";

export const Comments = ({
    place,
    placeId,
    userId,
    userName,
    isAuthenticated,
}) => {
    const { comments, onCreateCommentSubmit, onCommentEditSubmit, removeComment, errors } = useCommentContext()
    const haveComments = () => {
        let haveComment = []

        comments && comments.map(x => (
            // place.comments && place.comments.map(x => (
            Number(x.place_comment) === place.id ?
                haveComment.push(x)
                :
                null
        ))
        return haveComment
    }

    const onCommentSubmit = (values) => {
        onCreateCommentSubmit(values.text, placeId, userId, userName)
    };

    const onCommentEdit = (values) => {
        onCommentEditSubmit(values)
    }

    const onCommentDelete = (values) => {
        removeComment(values)
    }

    const navigatePath = `place-details/${placeId}/comments`

    return (
        <div>
            <div className={styles.comments}>
                <div className="details-comments">
                    <h2>Comments:</h2>
                    {errors &&
                        <p className={styles.showErrors} style={{ color: "red" }}>{errors}</p>
                    }

                    <div>{haveComments().map(x => (
                        <div key={x.id}> <Link to={`/profile/${x.user_id}`}>{x.owner}</Link>: {x.text}
                            {isOwner(x.user_id, userId) &&
                                <div className={styles.buttonDeleteEditComments}>
                                    <DeleteCommentModal commentId={x.id} onCommentDelete={onCommentDelete} />
                                    <EditCommentModal onCommentEdit={onCommentEdit} data={x} />
                                </div>
                            }
                        </div>
                    ))}</div>

                    {haveComments().length === 0 &&
                        <p className="no-comment">No comments yet.</p>
                    }
                </div>
            </div>

            <div className={styles.logoutComment}>
                {isAuthenticated ?
                    <CommentModal onCommentSubmit={onCommentSubmit} />
                    :
                    <div className={styles.logoutComment}>If you want to left comment <span className={styles.spanComment}><LoginModal navigatePath={navigatePath} /></span> </div>
                }
            </div>
        </div>
    )
} 