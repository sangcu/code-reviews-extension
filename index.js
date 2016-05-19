$(function() {
    function Review() {

        var vendors = [];
        this.addVendor = function(vendor) {
            if (!vendor || !vendor.domain || !vendor.engine) throw new Error('Vendor must have domain and a vendor engine.');
            vendors.push(vendor);
        }
        this.start = function() {
            let domain = window.location.host;

            if (!domain) return;

            let vendor = vendors.filter(function(vendor) {
                if (vendor.domain === domain) return true;
                return false;
            })[0];

            if (!vendor) return;

            let fileKey = vendor.engine.getFileKey();
            if (!fileKey) return;

            let db = new Firebase('https://flickering-fire-9918.firebaseio.com/' + fileKey);

            db.on("child_added", function(snapshot) {
                let data = snapshot.val();
                let comment = {
                    id: snapshot.key(),
                    line: data.line,
                    comment: data.comment
                };
                vendor.engine.renderComments(comment);
            });
            db.on("child_removed", function(snapshot) {
                vendor.engine.removeComment(snapshot.key());
            });

            vendor.engine.renderMenu($('body'), [{
                name: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACEUlEQVQ4T2NkoBAwYtNvcKrA4B8jUwADI4Maw7+//xmYGW/9Y/i//orxxEvo6lEMMD5TLPLr75+FjMxMXlgd9v//pr+/GROvWvW/g8nDDQBp/v3/1zkGRhZZfL76y/D/ARMbh9FlvY73IHVwA3RO5BxkYmG1Q9ZcLxbK8Pf/P4aW12tRzPz/79/uy2YT3eAGGJ0oNv7D8u8Mus11QsFgA1rfr8dw1H8GBr3LJv2XwS7QOZyznImTNYIkA379XnjZakoC2ADto7k3mdlZ1EDsBolwuDmabFJg9vVfz+BiDS9Wgtn/f/6+etl6ig7EBUeyHzJxsMmB2FW8/nDFegJKDP///2O4/PEBXKzt80Yw+8+P3/eu2UxRhrjgYOY5Zm4OQxD737ffCNukIxj+/v/L0PxsNVyMiYsVzP775depqw5TzcEGaO5Ma2EV5q4mJQx+v/pac91rVivYAI11ccLMwjwvmbnZmZENwRULvz///P39wzexB4ELPsDTgfqmlGo2Ua4WRlaEGX8//QCnFGZeDri5/3/9Zfj9+lvJDf85vfB0AAlWBkb1TQnTWAS5M5i52DDiHezvr78Y/r7/PvmG/7x8BkaG/6gGQLVorI8PZmRh6WTkYlVmZGFiYGRgZPj3+y/D76+/bzP9/Vd6M2g+JBqgAGtuBLlGY32cKgMTkzrDP8b/jP/+37wevOAOzFZkAwC6SNIRfsQqxQAAAABJRU5ErkJggg=="/>',
                handler: function(e) {
                    vendor.engine.showCommentDialog();
                }
            }]);
            vendor.engine.on('add', function(e, data) {
                db.push(data);
            });
            vendor.engine.on('delete', function(data) {
                var node = db.child(data.id);
                node && node.remove();
            });
            vendor.engine.start();
        }
    }

    var rv = new Review();
    rv.addVendor({
        domain: 'github.com',
        engine: new GithubVendor()
    });
    rv.start();
});
