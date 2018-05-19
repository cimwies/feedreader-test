/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

$(function() {
    

    /* RSS Test Suite - This suite is all about the RSS feeds definitions, the allFeeds variable in our application. */
    describe('RSS Feeds', () => {

        /* Test 1: Is the object "allFeed" defined and contains items, otherwise app will not run  */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test 2: Simple "allFeeds" structure check */
        it('is an object', () => {
            expect(typeof allFeeds).toBe('object');
        });


        const regexUrl = /^(http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/; 
        // helperfunction - check if the "allFeeds" items have URL structure
        const url = (array, property) => array.every(element => regexUrl.test(element[property]) === true);

        /* Test 3: Every feed has an URL defined and is not empty */
        it('it has a URL defined and URL is not empty', () => {
            expect(url(allFeeds,'url')).toBe(true);
        });

      
        const regexName = /^\w+( +\w+)*$/;
        // helperfunction - simple check if the name contains only "reasonable characters", e.g. no eMail address
        const name = (array, property) => array.every(element => regexName.test(element[property]) === true);
        // helperfunctions - check if every array element is defined and has a length > 0
        const isDefined = (array, property) => array.every(element => element[property] !== undefined);
        const hasLength = (array, property) => array.every(element => element[property].length > 0);

        /* Test 4: every feed has a name property defined with reasonable characters and is not empty */
        it('it has a name defined and name is not empty', () => {
            expect(name(allFeeds,'name')).toBe(true);
            expect(isDefined(allFeeds,'name')).toBe(true);
            expect(hasLength(allFeeds, 'name')).toBe(true);
        });

    });



    /* The Menu Test Suite - is the menu working correctly when clicked? */
    describe('The menu', () => {

        // select the body tag 
        const menu =  $('body'); 

        /* Test 1: Does the body tag has the class ".menu-hidden" after initial page load? */
        it('should be hidden by default', () => {
            expect(menu.hasClass('menu-hidden')).toBe(true);
        }); 


         /* Test 2: Does the toggeling work? First click shows the menu, second click hides the menu? */
        const menuIcon = $('.menu-icon-link');

        it('toggle menu when menu icon is clicked', () => {
            //first click
            menuIcon.click();
            expect(menu.hasClass('menu-hidden')).toBe(false);

            //second click    
            menuIcon.click();
            expect(menu.hasClass('menu-hidden')).toBe(true);    
        });

    });      


    /* Initial Entries Test Suite - when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container. */
    describe('Initial Entries', () => {

        /* Start loadFeed before the following tests */ 
        beforeEach(done => {
              loadFeed(0, function () {
                done();
            });
         });


        /* Test 1: is there at least one Feed Entry after the loadFeed request? */
        it('Feed Container contains at least one Feed Entry', (done) => {
            // const "containerElements" needs to be inside the "it-function" in order to be declared at the right time
            const containerElements = $('.feed .entry-link');

            expect(containerElements.length).toBeGreaterThan(0); // length can't be smaller then 0
            done();
        });

    });


    /* New Feed Selection Test Suite - when a new feed is loaded by the loadFeed function the content actually changes. */
    describe('New Feed Selection', (done) => {
    
        let tempBefore = "";
        let tempAfter = "";

        /* load the 2 loadFeed functions before our tests, "temBefore" first and then "tempAfter" */
        beforeEach(done => {
              loadFeed(0, function () {
                tempBefore = $('.feed h2').text();

                loadFeed(1, function() {
                    tempAfter = $('.feed h2').text();
                    done();
                });
            });
        });


        /* Test 1: If both strings are the same, no real loadFeed took place */
        it('load Feed function actually changes feed content', () => {
            const check = tempBefore.localeCompare(tempAfter) ;
            /* Strings should differ, e.g., not be 0 */  
            expect(check).not.toBe(0);  
        });  
    });


}());
