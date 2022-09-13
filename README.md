# Lovevery Automation Task

### Project Description

- This project contains only one spec file that tests UI elements on the profile page, and then tests the editing features available on the profile-info and account settings. Besides the spec file, there are 3 other files to be aware of and which have purpose: the cypress.config.js(root directory), cypress.env.json(root directory), and commands.js(root/cypress/support directory).
    - The cypress.config.js file is defaulted to every cypress project and it contains the Lovevery URL as the project's baseURL, and an option to use a new special 'sessions' method that cypress has recently made available, and which will restore cookies and session information before each test block is run. It's an experimental feature though and I decided last minute to remove all my session methods to make the spec more readable.
    - The cypress.env.json file contains login credentials and is where I normally store all my data to run tests locally. I usually never push this file to any repo, as it contains private info, except in this case. 
    - The commands.js file has my helper functions, and currently has one for logging into the app. This file isn't intended to run any assertions in, but I did add a couple to make sure the input elements were visible before using them, and because I don't have a spec file testing the login functionality specifically.

- The structure of my spec file(profile-page.spec.cy.js) is a describe block that contains a beforeEach hook, and 4 different test(it) blocks. 
    - The beforeEach hook runs two functions before each test block is kicked off: the first one bypasses an uncaught exception in the code base and completelyunrelated to my tests, which also revealed the first bug I found in the project. The second function is for login functionality, which visits the Lovevery site and uses the sign-in page to log the user in. I use this function in the beforeEach hook to set up login state before each test, since each test requires it. The login function uses the UI to set the login state, but in a real-world scenario I would not do it through the UI, because it makes testing much slower and requires the app to fully load. Ideally, I would make an API call(s) to set the login state programatically, and then just visit the profile-info page after making that request. However, I don't have access to the login API or its payload info to do that, and it was concealed from the front-end logs while using the UI to login.
    - The first test block validates the side-menu elements and that they are visible and not disabled. This wasn't asked in the homework assignment, but I felt it important since these elements are necessary to complete the required testing.
    - The second test block accesses the profile info, and edits the user's contact details. It then edits the contact details again to return them to their original state. It also validates that the input fields exists and are editable.
    - The third test block access the profile info, edits the child details, and then edits them once more to return them to their original state. It also validates that the input fields exists and are editable.
    - The fourth and final test block accesses the account settings, edits all the existing fields, saves them, and then edits all the existing fields again to return them to their original state. It also validates that each input field and dropdown field exists and are editable.

- A note about the selectors in use: In an ideal scenario, I'd want to target elements by selecting test attributes of an element(such as data-cy), but they don't currently exist in the Lovevery site(that I was testing at least), so I had to use a less-preferred strategy. My first option was to locate elements by their text, as long as the text was unique from all other element text on the page. This is because it's less likely to change and isn't coupled to event listeners. My second option was to use specifice element id's, in the cases that element text was duplicated on the UI. Using IDs for this project works, but can sometimes lead to brittle tests since they're quite often coupled to styling or listeners.


### Setup

- git clone 

- npm install (in root project folder)

- Normally I would git ignore all the packages and the cypress.env.json file for security purposes


### Usage/Commands

- npm test
    - Use this command while in your root directory, which will allow you to open any spec file with the runner

- ./node_modules/.bin/cypress open
    - Also allows you to open any spec file with the runner

- npm run spec
    - Use this command to run the tests headlessly

- ./node_modules/.bin/cypress run cypress/e2e/profile-page.spec.cy.js
    - Use this command to run the tests headlessly



###  Defect Report

- There are currently 4 issues that I've logged as defects. It's possible that some of them are features, but which I thought caused strange usability none-the-less.

- Defect #1

    - Uncaught Exception Error: Locksmith is not defined

    - Description: This is not a UI bug, but rather a reference error that exists within the code base. On the page load event, "Locksmith" is being referenced in the code without it being defined yet. This could be a race condition that exists within the code, a scoping issue, or that 'Locksmith' is never actually declared.

    - Environment: (Production) www.lovevery.com

    - Users Affected: Users aren't directly impacted to my knowledge 

    - Frequency: Always

    - Expected Result: Use of correct scope/variable declarations

    - Steps to Reproduce:
        1. In the beforeEach hook on the profile-page.spec.cy.js, comment out the following code: Cypress.on('uncaught:exception', (err, runnable) => {
        return false
        })
        2. Open cypress and run the spec file with the runner

    - Severity: S4

    - Reporter: Mike Dickmann


- Defect #2

    - Clicking 'save' does not exit out of the editing feature (only cancel does)

    - Description: While users attempt to edit their profile info or account settings, clicking 'Save' does not return to the normal UI state. This occurs whil editing the Contact Details and Child Details within the Profile Info, as well as the Address Book in the Account Settings. The Cancel button is required to exit from edit mode. It is worth noting though that the Save button does still save the user's changed info. 

    - Environment: (Production) www.lovevery.com

    - Users Affected: All users 

    - Frequency: Always

    - Expected Result: After clicking 'Save', users should exit the editing state instead of still being displayed the save and cancel buttons

    - Steps to Reproduce:
        1. Log into the production site with test user
        2. On the side menu, under My Account, click Profile Info
        3. Click the edit button for either Contact Details, or Child Details
        4. Alter some input fields and click Save
        5. Click 'Cancel' to exit edit mode
        6. Go to Account Settings on side menu, and repeat steps 3, 4, and 5 for the Address Book 

    - Severity: S3

    - Reporter: Mike Dickmann


- Defect #3

    - Editing and saving the Contact Details name doesn't immediately update profile-info page UI

    - Description: When users edit their Contact Details within the Profile Info and save a different name, the account name on the upper right nav-bar of the profile-info page does not update until user log out and logs back in, or refreshes the page.

    - Environment: (Production) www.lovevery.com

    - Users Affected: All users 

    - Frequency: Always

    - Expected Result: After saving a new name under Contact Details, user should see their change reflect immediately on the UI

    - Steps to Reproduce:
        1. Log into the production site with test user
        2. On the side menu, under My Account, click Profile Info
        3. Click the edit button for either Contact Details, and change the First Name and Last Name fields
        4. Click Save
        5. Click 'Cancel' to exit edit mode
        6. Check home page/navbar UI

    - Severity: S4

    - Reporter: Mike Dickmann


- Defect #4

    - Input fields are not truncated

    - Description: When users edit any input field within the Profile Info or Account Settings, users are allowed to enter unlimited characters. If too many characters are used, and the user tries saving, then a 'Too Long' message is displayed, but users are not given the exact character limit.

    - Environment: (Production) www.lovevery.com

    - Users Affected: All users 

    - Frequency: Always

    - Expected Result: Truncate the input fields or display a more detailed/useful message to the user regarding character limits

    - Steps to Reproduce:
        1. Log into the production site with test user
        2. On the side menu, under My Account, click Profile Info
        3. Click the edit button for either Contact Details, and change any input field using at least 100 characters
        4. Click Save
        5. User is flashed non-descriptive message

    - Severity: S4

    - Reporter: Mike Dickmann