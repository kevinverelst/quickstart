import { Component} from '@angular/core';
import {CommentService} from "../Services/comment.service";

@Component({
  selector: 'comment-widget',
  providers: [CommentService],
  template: `
        <div>
            <comment-form [listId]="listId" [editId]="editId"></comment-form>
            <comment-list [listId]="listId" [editId]="editId"></comment-list>
        </div>
    `,
})
export class CommentComponent {
  // Event tracking properties
  private listId = 'COMMENT_COMPONENT_LIST';
  private editId = 'COMMENT_COMPONENT_EDIT';
}
