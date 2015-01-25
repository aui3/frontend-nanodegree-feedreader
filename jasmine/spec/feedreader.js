/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('are URL defined and not empty',function(){
            for (entry in allFeeds){
                expect(allFeeds[entry].url).toBeDefined();
                expect(allFeeds[entry].url.length).not.toBe(0);   
            }
            
         });
        

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('are names defined and not empty',function(){
            for (entry in allFeeds){
                expect(allFeeds[entry].name).toBeDefined();
                expect(allFeeds[entry].name.length).not.toBe(0);   
            }
            
         });
    });

    /**
    *   The Menu test suite to ensure correct behaviour of the menu. Hides/Dsiplays approprietly.
    */
        
    describe('The menu', function(){

        /* Test that ensures the menu element is
         * hidden by default. Check if it has the class menu-hidden. If so, it will be invisible. 
         */

        it('is hidden by default',function(){
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });
         

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        var menuButton;
       
        it('does change visibility',function(){
            menuButton=$('.menu-icon-link');
            /**
            *  Trigger menu click event to show menu,
            *  body should not have the menu-hidden class
            */
            menuButton.click(); 
            expect($('body').hasClass('menu-hidden')).toEqual(false);   

            /**
            *  Trigger menu click event again to hide menu,
            *  body should have the menu-hidden class
            */
            menuButton.click();
            expect($('body').hasClass('menu-hidden')).toEqual(true);                

        });  

    });
    /* Initial Entries tes suite */
    describe('Initial Enteries',function(){
        
        /* 
        * Test that ensures when the loadFeed function is called and completes its work, there is at least
        * a single .entry element within the .feed container.
        */
        
        /*
        * Before the test, load the feed with loadFeed(...)
        * Pass done() as the callback function for load, it will be called when loadFeed() finishes running, asynchronoulsy */
        beforeEach(function(done){
            google.load('feeds', '1');
            loadFeed(0,done);
        });
        /*
        * Class .feed contains all the entries in a feed inside the .entry class. Check to see if it's length is greater than 0
        */
        it('has been loaded',function(){
            expect($('.feed').has('.entry').length).toBeGreaterThan(0);
        });

    });

    /* "New Feed Selection: Test Suite"*/

        
    describe('New Feed Selection', function(){
        
        /* Test that ensures when a new feed is loaded by the loadFeed function that the content actually changes.
         * Compare the current values of the headings (titles in a particular new feed) with the new values of heading in the feed
         * after calling loadFeed(...)
         */

        var headingsBefore;
        beforeEach(function(done){     
            headingsBefore=$('.entry-link').find('h2');
            /* Load a new feed*/
            loadFeed(1,done);

         });
        it ('has new feed loaded',function(){
           var headingsAfter=$('.entry-link').find('h2');
           expect(headingsBefore).not.toEqual(headingsAfter);     

        });
        afterEach(function(done){
            /*load back old feed*/
            loadFeed(0,done);

        });
    });

}());
