// Authentication
// Should not be able to view non login/signup pages without being signed in
// Should be able to make an account
// should be able to sign in
// Should be able to logout

//needed requires


describe('Front-end Authentication', function(){
  var server, setupStub, JSONresponse;

  before(function () {
    //make fake server
    //make fake xhr
    //make fake database
  });
  
  after(function () {
    //restore fake server
    //restor xhr
    //restore fake DB
  });

  it('Should not be able to view non login/signup pages without being signed in', function () {
    //without being signed in
      //set path to /#/loading, expect go to login page
      //set path to /#/chats, expect go to login page
    //
  });

  it('Should be able to send new user to server', function () {
    //call $scope signup function
    //simulate getting 201 back
    //verify that path is at /#/loading
    //verify that local storage has user
  });

  it('Should be able to signin user', function () {
    //call $scope signin function
    //simulate getting 200 back
    //verify that path is at /#/loading
    //verify that local storage has user
  });

  it('Should be able to logout', function () {
    //call $scope signin function
    //simulate getting 200 back
    //verify that path is at /#/loading
    //verify that local storgage user is destroyed
  });
});