
import React from "react";
import { useCookies } from "react-cookie";
import { ICommentWithId } from "./commentsInterfaces";
import { Comment, Header } from "semantic-ui-react";
import config from "../../config/config";
import { IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

export default function CommentsList(props: any) {
  const comments = props.comments as ICommentWithId[]; // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();
  const redirectToComment = (id: number) => {
    /*store.dispatch(
      fetchOneShelter({
        id: id as number,
        cookies: cookies,
      })
    );*/
    props.redirectToComment(id);
  };
  /*
      <GridList
      cols={3}
      spacing={20}
      style={{ margin: "0", width: "100%", display: "flex" }}
    >
      {shelters.map(
        (shelter: IShelter) =>
          shelter.id && (
              {/*
<div class="ui comments">
  <div class="comment">
    <a class="avatar">
      <img src="/images/avatar/small/joe.jpg">
    </a>
    <div class="content">
      <a class="author">Tom Lukic</a>
      <div class="text">
        This will be great for business reports. I will definitely download this.
      </div>
      <div class="actions">
        <a class="reply">Reply</a>
        <a class="save">Save</a>
        <a class="hide">Hide</a>
        <a>
          <i class="expand icon"></i>
          Full-screen
        </a>
      </div>
    </div>
  </div>
</div>}
  */
 
  return (
    <Comment.Group>
        <Header as="h3" dividing>
        Comments
        </Header>
        {comments.map((comment: ICommentWithId)=>
            <Comment>
                <Comment.Content>
                <Comment.Author as="a">{"User"+comment.authorId}</Comment.Author>
                <Comment.Text>{comment.text}</Comment.Text>
                <Comment.Text>{"Found in "+comment.location.city+", "+comment.location.district}</Comment.Text>
                <Comment.Avatar src={comment.picture ? `data:${comment.picture.fileType};base64,${
                  comment.picture.data as ArrayBuffer}
                }`: "https://react.semantic-ui.com/images/avatar/small/matt.jpg"} />
                <Comment.Actions>
                    <Comment.Action active={comment.authorId == cookies[config.cookies.userId]} children={<IconButton
                    style={{ color: "rgba(255, 255, 255, 0.54)" }}
                    onClick={() => {
                      redirectToComment(comment.id as number);
                    }}
                  >
                    <Delete/>
                  </IconButton>}></Comment.Action>
                </Comment.Actions>
                </Comment.Content>
                </Comment>)}
    </Comment.Group>
);
}