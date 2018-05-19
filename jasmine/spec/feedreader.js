/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

$(function() {
    

    /* RSS Test Suite
     * This suite is all about the RSS feeds definitions, 
     * the allFeeds variable in our application. 
     */
    describe('RSS Feeds', () => {

        /* Test 1: Is the object "allFeed" defined and contains items, otherwise app will not run  */
        it('-> are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test 2: Simple "allFeeds" structure check */
        it('-> is an object', () => {
            expect(typeof allFeeds).toBe('object');
        });


        const regexUrl = /^(http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/; 
        // helperfunction - check if all the "allFeeds" items have an URL structure - uses regexp as a simple check
        const url = (array, property) => array.every(element => regexUrl.test(element[property]) === true);

        /* Test 3: Every feed has an URL defined and the URL is not empty  */
        it('-> it has a URL defined and URL is not empty', () => {
            expect(url(allFeeds,'url')).toBe(true);
        });

        
        // helperfunctions - check if every array element is defined and has a length > 0
        const isDefined = (array, property) => array.every(element => element[property] !== undefined);
        const hasLength = (array, property) => array.every(element => element[property].length > 0);

        /* Test 4: Every feed has a name property defined with reasonable characters and is not empty */
        it('-> it has a name defined and name is not empty', () => {
            expect(isDefined(allFeeds,'name')).toBe(true);
            expect(hasLength(allFeeds, 'name')).toBe(true);
        });

    });


    /* The Menu Test Suite
     * is the menu working correctly when clicked? 
     */
    describe('The Menu', () => {

        // select the body tag 
        const menu =  $('body'); 

        /* Test 1: Does the body tag has the class ".menu-hidden" after initial page load? */
        it('-> should be hidden by default', () => {
            expect(menu.hasClass('menu-hidden')).toBe(true);
        }); 


         /* Test 2: Does the toggeling work? First click shows the menu, second click hides the menu? */
        const menuIcon = $('.menu-icon-link');

        it('-> toggle menu when menu icon is clicked', () => {
            //first click
            menuIcon.click();
            expect(menu.hasClass('menu-hidden')).toBe(false);

            //second click    
            menuIcon.click();
            expect(menu.hasClass('menu-hidden')).toBe(true);    
        });

    });      


    /* Initial Entries Test Suite
     * when the loadFeed function is called and completes its work, 
     * there is at least a single .entry element within the .feed container. 
     */
    describe('Initial Entries', () => {

        /* Start loadFeed before the following tests */ 
        beforeEach(done => {
              loadFeed(0, function () {
                done();
            });
         });


        /* Test 1: is there at least one Feed Entry after the loadFeed request? */
        it('-> Feed container contains at least one feed entry', (done) => {
            // const "containerElements" needs to be inside the "it-function" in order to be declared at the right time
            const containerElements = $('.feed .entry-link');

            expect(containerElements.length).toBeGreaterThan(0); // length can't be smaller then 0
            done();
        });

    });


    /* New Feed Selection Test Suite
     * when a new feed is loaded by the loadFeed function, 
     * the content actually changes. 
     */
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
        it('-> loadFeed function actually changes feed content', () => {
            const check = tempBefore.localeCompare(tempAfter) ;
            /* Strings should differ, e.g., not be 0, the validation does not rely on possible output -1 or 1 or other pos. or neg. values*/  
            expect(check).not.toBe(0);  
        });  
    });


}());
