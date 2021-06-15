import React from "react";
import { useCookies } from "react-cookie";
import { ICommentWithIdAndAuthor } from "./commentsInterfaces";
import { Comment, Divider, Header } from "semantic-ui-react";
import config from "../../config/config";
import {
  createStyles,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { State } from "../../app/stateInterfaces";
import { ILostDogWithPictureAndComments } from "../dogInterfaces";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainForm: {
      width: "91vw",
      borderRadius: "10px",
      //marginTop: "0.009%",
    },
    commentForm: {
      marginLeft: "2vw",
      marginRight: "2vw",
      width: "96vw",
      //marginTop: "0.009%",
    },
    headerForm: {
      width: "91vw",
      marginLeft: "2vw",
      marginRight: "2vw",
    },
  })
);

export default function CommentsList(props: any) {
  const dog = useSelector(
    (state: State) => state.editedDog as ILostDogWithPictureAndComments
  );// eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();
  const redirectToCommentEdit = (comment: ICommentWithIdAndAuthor)=>{
      props.redirectToCommentEdit(comment);
      window.scrollTo(window.innerWidth,window.innerHeight + 5);
  }
  const redirectToComment = (id: number) => {
    props.redirectToComment(id);
  };
  const styleLink = document.createElement("link");
  styleLink.rel = "stylesheet";
  styleLink.href =
    "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
  document.head.appendChild(styleLink);
  const classes = useStyles();
  return (
    <Comment.Group className={classes.commentForm}>
      <Header as="h3" dividing className={classes.headerForm}>
        Comments
      </Header>
      {dog.comments.map((comment: ICommentWithIdAndAuthor) =>
        <Comment key={comment.id} className={classes.mainForm}>
          <Grid container direction="row" spacing={3} alignContent="space-between" style={{ marginBottom: "1%" }}>
            <Grid item xs={1}>
              <Comment.Avatar style={{ height: "inherit", width: "inherit" }} src={`https://semantic-ui.com/images/avatar2/small/${comment.id % 2 ? "elyse" : "kristy"}.png`} /></Grid>
            <Grid item xs={7}>
              <Comment.Content>
                <Comment.Author as="a" style={{color:comment.authorId ===   cookies[config.cookies.userId]?"black":"darkgray", fontWeight:comment.authorId ===   cookies[config.cookies.userId]?"bolder":"bold" }}>{comment.author.name}</Comment.Author>
                <Comment.Metadata>
                  <div>{"from " + comment.location.city}</div>
                </Comment.Metadata>
                <Comment.Text>{comment.text}</Comment.Text>
                <Comment.Text>
                  {"The dog is waiting for you in " +
                    comment.location.city +
                    ", " +
                    comment.location.district +
                    "."}
                </Comment.Text>
                <Comment.Actions>
                  <Comment.Action active={comment.authorId ===   cookies[config.cookies.userId]} onClick={() => {
                    if (comment.authorId ===   cookies[config.cookies.userId]) {redirectToComment(comment.id as number);}
                  }}>Delete</Comment.Action>
                  <Comment.Action active={comment.authorId ===   cookies[config.cookies.userId]} onClick={() => {
                    if (comment.authorId ===   cookies[config.cookies.userId]){redirectToCommentEdit(comment as ICommentWithIdAndAuthor);}
                  }}>Edit</Comment.Action>
                  <Comment.Action active={true} onClick={() => {
                    window.scrollTo(window.innerWidth,window.innerHeight + 5);
                    props.cancelComment();
                  }}>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Grid>
            <Grid container item xs={4}>
              {comment.picture && comment.picture.data && (
                <img
                  style={{
                    width: "inherit",
                    height: "auto",
                    maxHeight: "400px",
                  }}
                  src={`data:${comment.picture.fileType};base64,${
                    comment.picture.data as ArrayBuffer
                  }`}
                  alt={comment.picture.fileName}
                />
              )}
            </Grid>
          </Grid>
          <Divider className={classes.mainForm} />
        </Comment>
      )}
    </Comment.Group>
  );
}
