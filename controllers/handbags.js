var Handbags = require('../models/handbags')
// List of all Handbags
exports.handbags_list = async function (req, res) {
    // List of all Handbags
    res.send('NOT IMPLEMENTED: Handbags list');
};
exports.handbags_list = async function(req, res) {
    try{
    theHandbags = await Handbags.find();
    res.send(theHandbags);
    }
    catch(err){
    res.error(500,`{"error": ${err}}`);
    res.status(500);
    }
    };
// for a specific handbags.
exports.handbags_detail = async function(req, res) {
    console.log("detail"  + req.params.id)
    try {
        result = await Handbags.findById( req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};

// Handle Handbag create on POST.
exports.handbags_create_post = async function (req, res) {
    console.log(req.body)
    let document = new Handbags();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"Dimensions":"Stylish", "Color":"Violet", "Price":1500}
    document.Dimensions = req.body.Dimensions;
    document.Color = req.body.Color;
    document.Price = req.body.Price;
    try{
        let result = await document.save();
        res.send(result);
        }
        catch(err){
            console.log(err)
            res.send({"name":err.name,"message":err.message})
            res.send(err)
            res.status(500);
        //res.error(500,`{"error": ${err}}`);
        }
    };
// Handle handbags delete on DELETE.
exports.handbags_delete = async function(req, res) {
    console.log("delete "  + req.params.id)
    try {
        result = await Handbags.findByIdAndDelete( req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }
};

// Handle Handbags update form on PUT.
//Handle handbags update form on PUT.
exports.handbags_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await Handbags.findById( req.params.id)
        // Do updates of properties
        if(req.body.Dimensions) toUpdate.Dimensions = req.body.Dimensions;
        if(req.body.Color) toUpdate.Color = req.body.Color;
        if(req.body.Price) toUpdate.Price = req.body.Price;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
    }
};

// VIEWS
// Handle a show all view
exports.handbags_view_all_Page = async function(req, res) {
    try{
    theHandbags = await Handbags.find();
    res.render('handbags', { title: 'Handbag Search Results', results: theHandbags });
    }
    catch(err){
    res.error(500,`{"error": ${err}}`);
    res.status(500);
    }
    };
// Handle a show one view with id specified by query
exports.handbags_view_one_Page = async function(req, res) {
    console.log("single view for id "  + req.query.id)
    try{
        result = await Handbags.findById( req.query.id)
        res.render('handbagsdetail', 
{ title: 'Handbags Details', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};
 // Handle building the view for creating a handbags.
// No body, no in path parameter, no query.
// Does not need to be async
exports.handbags_create_Page =  function(req, res) {
    console.log("create view")
    try{
        res.render('handbagscreate', { title: 'handbags Create'});
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};
// Handle building the view for updating a handbags.
// query provides the id
exports.handbags_update_Page =  async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
        let result = await Handbags.findById(req.query.id)
        res.render('handbagsupdate', { title: 'Updated Handbags', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};
// Handle a delete one view with id from query
exports.handbags_delete_Page = async function(req, res) {
    console.log("Delete view for id "  + req.query.id)
    try{
        result = await Handbags.findById(req.query.id)
        res.render('handbagsdelete', { title: 'Deleted handbags', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};


