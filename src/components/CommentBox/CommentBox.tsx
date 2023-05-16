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
                  <div className="d-flex gap-2">
                    <h6>{comment.username}</h6>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-chat-dots"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                      <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z" />
                    </svg>
                  </div>
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
