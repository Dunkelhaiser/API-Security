import { db } from "@/lib/db";
import Comments from "./Comments";
import CreateCommentForm from "./CreateCommentForm";
import { comments as commentsTable } from "@/lib/db/schema";

const XSS = async () => {
    const comments = await db.select().from(commentsTable);

    return (
        <>
            <Comments />
            <CreateCommentForm />
            {comments.map((comment) => (
                <div className="hidden" key={comment.id} dangerouslySetInnerHTML={{ __html: comment.comment }} />
            ))}
        </>
    );
};
export default XSS;
