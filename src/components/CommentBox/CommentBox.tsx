import { useEffect, useState } from "react";
import style from "./commentbox.module.css";
import { BACKEND_URL } from "../../env";
import { useUser } from "../../contexts/UserContext/UserContext";
type CommentBoxProps = {
  idproductinfo: string;
};

export type CommentType = {
  fullname: string;
  datecreated: string;
  comment: string;
};

function CommentBox({ idproductinfo }: CommentBoxProps) {
  const [user, setUser] = useUser();
  const [comments, setComments] = useState([] as CommentType[]);
  const [userComment, setUserComment] = useState("");
  const [toggle, setToggle] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isAccepted, setIsAccepted] = useState(true);
  const [isEmptyComment, setIsEmptyComment] = useState(false);
  useEffect(() => {
    fetch(BACKEND_URL + "/comments/product/" + idproductinfo, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [toggle]);
  useEffect(() => {
    const box = document.getElementById(style["comment-box"]);
    if (box) {
      box.oninput = () => {
        box.style.height = "auto";
        box.style.height = box.scrollHeight + "px";
      };
    }
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
                    <h6>{comment.fullname} </h6>
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
                    {comment.datecreated.substring(0, 10)}
                  </small>
                </div>
                <div className="mb-2">{comment.comment}</div>
              </div>
            );
          })}
        </div>
        {user && (
          <div className="">
            <label htmlFor="comment" className="form-label">
              Leave your thoughts here.
            </label>
            <div className="mb-3 form-control position-relative d-flex gap-2">
              <textarea
                value={userComment}
                onChange={(e) => {
                  setUserComment(e.target.value);
                  setIsEmptyComment(false);
                }}
                className="form-control "
                id={style["comment-box"]}
                name="comment"
              ></textarea>
              <span
                onClick={(e) => {
                  fetch(BACKEND_URL + "/comments/product/" + idproductinfo, {
                    method: "POST",
                    body: JSON.stringify({
                      username: user.username,
                      comment: userComment,
                    }),
                  })
                    .then(async (data) => {
                      if (data.status == 304) {
                        // user comment it second time
                        setIsAccepted(false);
                      } else if (data.status == 406) {
                        // user does't type anything.
                        setIsEmptyComment(true);
                      } else {
                        setUserComment("");
                        setToggle(!toggle);
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
                className={style["comment-button"]}
              >
                {isSending ? (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-send-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                  </svg>
                )}
              </span>
            </div>
            {isEmptyComment && (
              <div>
                <span className="text-danger">
                  Give us your thoughts, don't leave it blank!
                </span>
              </div>
            )}
            {!isAccepted && (
              <div>
                <span className="text-danger">
                  You had already commented to this product before.
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentBox;
