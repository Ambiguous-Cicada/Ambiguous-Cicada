// Authentication
// Should not be able to view non login/signup pages without being signed in
// Should be able to make an account
// should be able to sign in
// Should be able to logout

//needed requires

describe('Front-end Authentication', function(){
  var $rootScope, $location, $window, $httpBackend, Users, $scope;

  beforeEach(module('kwiki'));
  beforeEach(inject(function ($injector){


    $rootScope = $injector.get('$rootScope');
    $location = $injector.get('$location');
    $window = $injector.get('$window');
    $httpBackend = $injector.get('$httpBackend');
    Users = $injector.get('Users');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('userControl', {
        $scope: $scope,
        $window: $window,
        $location: $location,
        Users: Users
      })
    }

   createController();

  }));

  
  after(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
    $window.localStorage.removeItem('com.kwiki');
    //restore fake server
    //restor xhr
    //restore fake DB
  });

  it('should have a signup method', function () {
    expect($scope.addUser).to.be.a('function');
  })

  xit('Should not be able to view non login/signup pages without being signed in', function () {
    //without being signed in
      $location.path('/signup');
      expect($location.path()).to.equal('/signup');
      $location.path('/loading');
      // $rootScope.$apply();
      expect($location.path()).to.equal('/login');
      //set path to /#/loading, expect go to login page
      //set path to /#/chats, expect go to login page
    //
  });

  it('Should be able to send new user to server, and store their info in local storage', function () {


    var user = {name: 'JT', id: 'as08df70as98f'};

    //call $scope signup function
    //simulate getting 201 back
    $httpBackend.expectPOST('/signup').respond(201);
    $httpBackend.expectPOST('/login').respond(user);
    $scope.addUser('JT', 'password');
    $httpBackend.flush();
    //verify that local storage has user
    expect($window.localStorage.getItem('com.kwiki')).to.equal(JSON.stringify(user));
    
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