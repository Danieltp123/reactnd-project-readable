import React,{ Component } from 'react'
import { 
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core/'
import DeleteIcon from '@material-ui/icons/Delete'
import {  handleDeletePost } from '../../actions/posts'
import { handleDeleteComment } from '../../actions/comments'
import { connect } from 'react-redux'

class DeleteAlert extends Component{
    state ={
        open: false,
    }
    
    handleOpen = (e) => {
        e.preventDefault()
        this.setState({open:true});
    };
    
    handleClose = (e) => {
        e.preventDefault()
        this.setState({open:false});
    };

    handleDelete = (e,id)=>{
        e.preventDefault()
        const { dispatch, type} = this.props
        if(type === 'Post')
            dispatch(handleDeletePost(id))
        if(type === 'Comment')
            dispatch(handleDeleteComment(id))
        this.handleClose(e)
    }

    render(){
        const { id, type } = this.props
        let { open } = this.state
        return (
            <div>
                <DeleteIcon className="icon-delete text-gray" onClick={this.handleOpen} />
                <Dialog
                open={open}
                onClose={this.handleClose}
                onClick={(e)=>e.preventDefault()}
                aria-labelledby="dialog-title">
                    <DialogTitle id="dialog-title">Delete {type}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        Are you sure you want to delete this {type.toLowerCase()}?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                        Cancel
                        </Button>
                        <Button onClick={(e)=>this.handleDelete(e,id)} autoFocus>
                        Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}


export default connect() (DeleteAlert);