/* GET the 'about' page */
const about = (req, res) => {
    res.render('about', {title: 'About Loc8r'});
}

module.exports = {
    about
};