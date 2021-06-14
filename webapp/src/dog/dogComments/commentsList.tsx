
import React from "react";
import { useCookies } from "react-cookie";
import { ICommentWithIdAndAuthor } from "./commentsInterfaces";
import { Comment, Divider, Header } from "semantic-ui-react";
import config from "../../config/config";
import { createStyles, Grid, IconButton, makeStyles, Theme } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainForm: {
      width: "91vw",
      borderRadius: "10px"
      //marginTop: "0.009%",
    },
    commentForm: {
      marginLeft: "2vw",
      marginRight: "2vw",
      width: "96vw"
      //marginTop: "0.009%",
    },
    headerForm: {
      width: "91vw",
      marginLeft: "2vw",
      marginRight: "2vw",
    }
  })
);

export default function CommentsList(props: any) {
  const comments = props.comments as ICommentWithIdAndAuthor[]; // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();
  const redirectToCommentEdit = (comment: ICommentWithIdAndAuthor)=>{
    if (props.edit){
      props.redirectToCommentEdit(comment);
    }
  }
  const redirectToComment = (id: number) => {
    props.redirectToComment(id);
  };
  const styleLink = document.createElement("link");
  styleLink.rel = "stylesheet";
  styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
  document.head.appendChild(styleLink);
  const classes = useStyles();
  return (
    <Comment.Group className={classes.commentForm}>
      <Header as="h3" dividing className={classes.headerForm}>
        Comments
      </Header>
      {comments.map((comment: ICommentWithIdAndAuthor) =>
        <Comment key={comment.id} class="ui comments" className={classes.mainForm}>

          {/*<Comment.Avatar src={comment.picture ? `data:${comment.picture.fileType};base64,${
                  comment.picture.data as ArrayBuffer}
                }`: "https://react.semantic-ui.com/images/avatar/small/matt.jpg"} />*/
          }
          <Grid container direction="row" spacing={3} alignContent="space-between" style={{ marginBottom: "1%" }}>
            <Grid item xs={1}>
              <Comment.Avatar style={{ height: "inherit", width: "inherit" }} src={`https://semantic-ui.com/images/avatar2/small/${comment.id % 2 ? "elyse" : "kristy"}.png`} /></Grid>
            <Grid item xs={7} direction="column">
              <Comment.Content>
                <Comment.Author as="a">{comment.author.name}</Comment.Author>
                <Comment.Metadata>
                  <div>{"from " + comment.location.city}</div>
                </Comment.Metadata>
                <Comment.Text>{comment.text}</Comment.Text>
                <Comment.Text>{"The dog is waiting for you in " + comment.location.city + ", " + comment.location.district + "."}</Comment.Text>
                <Comment.Actions>
                  {props.delete && <Comment.Action active={props.delete} onClick={() => {
                    redirectToComment(comment.id as number);
                  }}>Delete</Comment.Action>}
                  {props.edit && <Comment.Action active={props.delete} onClick={() => {
                    redirectToCommentEdit(comment as ICommentWithIdAndAuthor);
                  }}>Edit</Comment.Action>}
                  {!props.delete && <Comment.Action active={!props.delete} onClick={() => {
                    window.scrollTo(100000,100000);
                  }}>Reply</Comment.Action>}
                </Comment.Actions>
              </Comment.Content>
            </Grid>
            <Grid container item xs={4}>
              {comment.picture && comment.picture.data && (<img style={{ width: "inherit", height: "auto", maxHeight: "400px" }}
                src={`data:${comment.picture.fileType};base64,${comment.picture.data as ArrayBuffer
                  }`}
                alt={comment.picture.fileName}
              />)}
            </Grid>
          </Grid>
          <Divider className={classes.mainForm} />
        </Comment>
      )}
    </Comment.Group>
  );
}