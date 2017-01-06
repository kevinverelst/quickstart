import {Component, OnChanges, Input} from "@angular/core";
import {CommentService} from "../Services/comment.service";
import {Comment} from '../model/comment'
import {EmitterService} from "../../emitter.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'comment-form',
  template: `<form (ngSubmit)="submitComment()">
            <div class="form-group">
                <div class="input-group">
                    <span class="input-group-addon" id="basic-addon1"><span class="glyphicon glyphicon-user"></span></span>
                    <input type="text" class="form-control" placeholder="Author" [(ngModel)]="model.author" name="author">
                </div>
                <br />
                <textarea class="form-control" rows="3" placeholder="Text" [(ngModel)]="model.text" name="text"></textarea>
                <br />
                <button *ngIf="!editing" type="submit" class="btn btn-primary btn-block">Add</button>
                <button *ngIf="editing" type="submit" class="btn btn-warning btn-block">Update</button>
            </div>
        </form>`
})

export class CommentFormComponent implements OnChanges {
  constructor(private commentsService: CommentService) {
  }

  private model: Comment = this.emptyModel();
  private editing: boolean = false;

  @Input() listId: string;
  @Input() editId: string;

  submitComment() {
    let commentOperation: Observable<Comment[]>;
    if (!this.editing) {
      commentOperation = this.commentsService.addComment(this.model);
    } else {
      commentOperation = this.commentsService.updateComment(this.model);
    }

    commentOperation.subscribe(
      comments => {
        EmitterService.get(this.listId).emit(comments);
        this.model = this.emptyModel();
        if (this.editing) {
          this.editing = !this.editing;
        }
      }
    )
  }

  ngOnChanges() {
    EmitterService.get(this.editId).subscribe((comment: Comment) => {
      this.model = comment;
      this.editing = true;
    })
  }

  emptyModel(): Comment {
    return new Comment(new Date, '', '');
  }
}
