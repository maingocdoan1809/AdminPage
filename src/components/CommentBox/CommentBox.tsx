import { useEffect, useState } from "react";
import style from "./commentbox.module.css";
type CommentBoxProps = {
  idproductinfo: string;
};

type CommentType = {
  username: string;
  commentDate: string;
  content: string;
};

function CommentBox({ idproductinfo }: CommentBoxProps) {
  const [comments, setComments] = useState([] as CommentType[]);
  useEffect(() => {
    console.log("Load comment for id: " + idproductinfo);
    setComments([
      {
        commentDate: "2023/10/12",
        username: "Mai Ngoc Doan",
        content: "Áo rất đẹp nha",
      },
      {
        commentDate: "2023/10/12",
        username: "Mai Ngoc Doan",
        content: "Áo rất đẹp nha",
      },
      {
        commentDate: "2023/10/12",
        username: "Mai Ngoc Doan",
        content: "Áo rất đẹp nha",
      },
      {
        commentDate: "2023/10/12",
        username: "Mai Ngoc Doan",
        content: "Áo rất đẹp nha",
      },
      {
        commentDate: "2023/10/12",
        username: "Mai Ngoc Doan",
        content: "Áo rất đẹp nha",
      },
      {
        commentDate: "2023/10/12",
        username: "Mai Ngoc Doan",
        content: "Áo rất đẹp nha",
      },
      {
        commentDate: "2023/10/12",
        username: "Mai Ngoc Doan",
        content: "Áo rất đẹp nha",
      },
      {
        commentDate: "2023/10/12",
        username: "Mai Ngoc Doan",
        content: "Áo rất đẹp nha",
      },
      {
        commentDate: "2023/10/12",
        username: "Mai Ngoc Doan",
        content: "Áo rất đẹp nha",
      },
    ]);
  }, []);
  return (
    <div className="">
      <a
        className={`${style["expand-btn"]}`}
        data-bs-toggle="collapse"
        href="#collapsecomment"
        role="button"
        aria-expanded="false"
        aria-controls="collapsecomment"
      >
        <h2 className="mb-3">
          Review{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-double-down"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            />
            <path
              fillRule="evenodd"
              d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            />
          </svg>{" "}
          {[0, 0, 0, 0, 0].map((e, index) => (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              key={index}
              height="16"
              fill="#FFD95A"
              className="bi bi-star-fill m-2"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
          ))}
        </h2>
      </a>

      <hr />
      <div>{comments.length} comment(s) </div>
      <hr />
      <div className="collapse" id="collapsecomment">
        <div className="modal-dialog modal-dialog-scrollable">
          {comments.map((comment, index) => {
            return (
              <div key={index} className="border-bottom mb-3 col-12 ">
                <div className="d-flex justify-content-between mb-3">
                  <h6>{comment.username}</h6>
                  <small className="text-secondary">
                    {comment.commentDate}
                  </small>
                </div>
                <div className="mb-2">{comment.content}</div>
              </div>
            );
          })}
        </div>
        <div>
          <button className="btn btn-success w-100 btn-sm">
            Load more comments
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentBox;
