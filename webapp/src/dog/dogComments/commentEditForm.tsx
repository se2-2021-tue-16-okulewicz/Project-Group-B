
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { ICommentWithIdAndAuthor } from "./commentsInterfaces";
import { Button, Comment, Divider, Form, Header, } from "semantic-ui-react";
import config from "../../config/config";
import { createStyles, Grid, IconButton, Input, InputLabel, makeStyles, Theme, } from "@material-ui/core";
import { initComment, initCommentandAuthor, initPicture } from "./commentsClasses";
import { IPicture } from "../dogInterfaces";
import * as Actions from "../../app/actions";
import { store } from "../../app/store";
import { common } from "@material-ui/core/colors";
const types = ["image/jpg", "image/jpeg", "image/png"];

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

/*Actions.fetchSheltersThunk({
            filters: {
              ...filters,
              page: filters.page,
            },
            cookies: cookies,
          }) */

export default function CommentEditForm(props: any) {
  const [comment, setComment] = useState(props.comment?props.comment as ICommentWithIdAndAuthor:initCommentandAuthor);
  const [picture, setPicture] = useState(props.picture?props.picture:initPicture);
  const [file, setFile] = useState(null);
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();
  const editComment = () => {
    if (props.dogId){
      if(picture.fileType != ""){
      store.dispatch(
      Actions.editCommentThunk({
        comment:{...comment,
        authorId:cookies[config.cookies.userId],
        dogId:props.dogId, picture:picture,},
        cookies: cookies,
      })
    );}
    else{
      store.dispatch(
        Actions.editCommentThunk({
          comment:{...comment,
          authorId:cookies[config.cookies.userId],
          dogId:props.dogId},
          cookies: cookies,
        })
      );
    }
    props.cancelComment();
    }
  };

  const cancelComment = () => {
    props.cancelComment();
  };

  const uploadImage = (event: any) => {
    if (event) {
      if (types.includes(event.target.files[0].type)) {
        (event.target.files[0] as File).arrayBuffer().then((fileBuffer) => {
          setFile(event.target.files[0]);
          setPicture({
            id: 0,
            fileName: event.target.files[0].name, //event.name,
            fileType: event.target.files[0].type,
            data: fileBuffer,
          } as IPicture);
        })
      }
    }
  };

  const inputsHandler = (e: { target: { name: any; value: any } }) => {
    let newField = { ...comment, [e.target.name]: e.target.value };
    setComment(newField);
  };

  const inputArrayHandler = (e: { target: { name: any; value: any } }) => {
    let newField = {
      ...comment,
      location: { ...comment.location, [e.target.name]: e.target.value },
    };
    setComment(newField);
  };

  const styleLink = document.createElement("link");
  styleLink.rel = "stylesheet";
  styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
  document.head.appendChild(styleLink);
  const classes = useStyles();
  return (
    <Comment.Group className={classes.commentForm}>
      <Header as="h3" dividing className={classes.headerForm}>
        Edit Comment
      </Header>
      <Comment class="ui comments" className={classes.mainForm}>
        <Grid container direction="row" spacing={3} alignContent="space-between">
          <Grid item xs={8}>
            <Form reply>
              <Form.TextArea value={comment.text} name="text" onChange={inputsHandler}/>
              <Comment.Text>{"City:"}</Comment.Text>
              <Form.Input value={comment.location.city} name="city" onChange={inputArrayHandler}/>
              <Comment.Text>{"District:"}</Comment.Text>
              <Form.Input value={comment.location.district} name="district" onChange={inputArrayHandler}/>
              <Button as="label" htmlFor="file" primary type="button" icon="upload" content='Upload Image' size="medium" style={{width:"170px"}}>
              </Button>
              <input accept=".jpg, .jpeg, .png" type="file" id="file" style={{ display: "none" }} onChange={(
                      file: React.ChangeEvent<{ value: unknown }>
                    ) =>uploadImage(file)} />
              <Button
                content='Edit Comment'
                labelPosition='left'
                icon='edit'
                primary
                onClick={() => { editComment() }}
                size="medium"
                style={{width:"170px"}}/>
                 <Button
                content='Cancel'
                labelPosition='left'
                icon='cancel'
                primary
                onClick={() => { cancelComment() }}
                size="medium"
                style={{width:"170px"}}/>
            </Form>
          </Grid>
          <Grid container item xs={4}>
          {comment.picture && comment.picture.data && !file && (<img style={{ width: "inherit", marginTop:"4%", height: "auto", maxHeight: "400px" }}
                src={`data:${comment.picture.fileType};base64,${comment.picture.data as ArrayBuffer
                  }`}
                alt={comment.picture.fileName}
              />)}
            { file && (<img style={{ width: "inherit", marginTop:"4%", height: "auto", maxHeight: "400px" }}
              src={URL.createObjectURL(file)} alt=""
            />)}
          </Grid>
        </Grid>
        <Divider className={classes.mainForm} />
      </Comment>
    </Comment.Group>
  );
}