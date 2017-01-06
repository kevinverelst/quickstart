import {Component, OnInit, OnChanges, Input} from "@angular/core";
import {CommentService} from "../Services/comment.service";
import {EmitterService} from "../../emitter.service";
import {Comment} from '../model/comment'

@Component({
  selector: 'comment-list',
  providers: [CommentService],
  template: `<comment-box
              [editId]="editId"
              [listId]="listId"
              *ngFor="let comment of comments"
              [comment]="comment">
  </comment-box>`,
})

export class CommentListComponent implements OnInit, OnChanges {
  comments: Comment[];
  @Input() listId: string;
  @Input() editId: string;

  constructor(private commentService: CommentService) {
  }

  ngOnInit() {
    this.loadComments();
  }


  loadComments() {
    this.commentService.getComments()
      .subscribe(
        comments => this.comments = comments,
        err => {
          console.log(err);
        }
      )
  }

  ngOnChanges(changes: any){
    EmitterService.get(this.listId).subscribe((comments:Comment[]) => {
      this.loadComments()
    })
  }
}
