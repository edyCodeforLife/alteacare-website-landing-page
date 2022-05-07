import moment from 'moment';

class Comment {
  constructor({id, userID, name, createdDate, content, replies, isOpen, totalReplies} = {}) {
    this.id = id;
    this.userID = userID;
    this.name = name;
    this.createdDate = moment(createdDate, 'DD/MM/YYYY HH:mm');
    this.content = content;
    this.replies = replies;
    this.totalReplies = totalReplies;
    this.isOpen = isOpen;
  }
}

export default Comment;
