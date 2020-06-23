/* GET the 'main' page  */
const mainpage = (req, res) => {
    res.render('index', {
        title: 'Loc8r main page'
    });
};

/* GET the 'home' page  */
const homelist = (req, res) => {
    res.render('location-list', {
        title: 'Loc8r - find places to work with wifi for free',
        pageHeader: {
            title: 'Loc8r',
            strapline: 'Locate a place to work with wifi near you! Give it a try today!'
        },
        sidebar: `Looking for wifi and a seat? Loc8r helps you find places
                   to work when out and about. Perhaps with coffee, cake or a pint?
                   Let Loc8r help you find the place you're looking for.`,
        locations: [{
            name: 'Starcups',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 3,
            facilities: ['Hot drinks', 'Food', 'Gaming'],
            distance: '100m'
            },{
            name: 'Cafe Hero',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 4,
            facilities: ['Hot drinks', 'Food', 'Premium wifi'],
            distance: '200m'
            },{
            name: 'Burger Queen',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 2,
            facilities: ['Food', 'Premium wifi'],
            distance: '250m'
            },{
            name: 'Chips Take Away',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 5,
            facilities: ['Food', 'Premium wifi', 'Music'],
            distance: '300m'
        }]
    });
};
/* GET the 'Location info' page */
const locationsInfo = (req, res) => {
    res.render('location-info', {title: 'Location info'});
};

/* GET the 'Add review' page */
const addReview= (req, res) => {
    res.render('location-review-form', {title: 'Add review'});
};

module.exports = {
    mainpage,
    homelist,
    locationsInfo,
    addReview
};