function GithubVendor() {
    var self = this;
    Vendor.call(this);
    this.selectors = {
        lineNum: '.blob-code-inner',
        lineData: '.blob-code.blob-code-inner'
    };

    this.components = {
        comment: function(comment) {
            return `<div class="ci-comment-item"><div class="ci-comment-delete"></div>${comment}</div>`;
        },
        commentDialog: '<div class="ci-comment-dialog"><textarea class="ci-comment-textarea" row=5></textarea><button type="button">Add</button> <button type="button">Cancel</button></div>'
    };

    this.components.commentDialog = (function() {
        var dialog = $(self.components.commentDialog);
        dialog.find('button').on('click', function(e) {
            var target = e.currentTarget;
            self.emit((e.target && e.target.textContent || '').toLowerCase(), e, {
                line: self.$menu.parent().prev().data().lineNumber,
                comment: dialog.find('textarea').val()
            });
            self.components.commentDialog.hide().find('textarea').val('');
        });
        return dialog;
    })();

}

GithubVendor.prototype = Vendor.prototype;

GithubVendor.prototype.start = function() {
    $('.ci-comment-item').remove();
    $('.blob-wrapper').on('click','.ci-comment-delete',(e)=>{
      this.emit('delete',$(e.target && e.target.parentNode).data());
    });
}

GithubVendor.prototype.attachActionMenu = function() {
    $(this.selectors.lineNum).hover((e)=> {
        this.hoverMenu.call(this, e);
    }, (e)=> {
        this.blurMenu.call(this, e);
    });
}

GithubVendor.prototype.showCommentDialog = function() {
    this.$menu.parent().append(this.components.commentDialog);
    this.components.commentDialog.show();
    this.components.commentDialog.find('textarea').focus();
}


GithubVendor.prototype.renderComments = function(comments) {
    if (!comments) return;

    if (!Array.isArray(comments)) {
        comments = [comments];
    }

    comments.forEach((value, id) =>{
        var $line = $('#L' + value.line);
        $line.addClass('ci-comments');
        $line.next(self.selectors.lineData).append($(this.components.comment(value.comment)).attr('ci-id',value.id).data(value));
    });
}
GithubVendor.prototype.removeComment = function(id) {
    if(!id) return;
    $('[ci-id='+id+']').remove();
}
