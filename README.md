![](kanap\front\images\logo.png)
# Openclassrooms Web developper training: project n°5: Kanap

 ### Build a commercial site with JS

## languages and tools

#### HTML5 / CSS3 / JS

## Scenario and requirements

You've been working for a web development agency for a few weeks now.   
After successfully integrating a few websites (HTML/CSS), you are given a new mission.  

Your client is Kanap, a sofa brand that sells its products exclusively from its store.   
Today, they would like to have an web platform in addition to their physical store to sell their products on the Internet.  

As part of this mission, you work with a team made up of:  

     Corinne, the CTO of the agency;  
     Frank, the front-end developer who was responsible for integrating the static model of the site;  
     Bilal, the back-end developer who implements the API to which the front-end is connected.  

Corinne sends you an e-mail to brief you on the mission:
 
--------------------------------------------------------------------------
     From: Corinne
     To: you
     Subject: Kanap  website

     Hello !

     As we discussed yesterday, here is the information so that you can start implementing the Kanap site dynamically.  

     Here are the different tasks you will have to carry out:  

         Unify the work already done by the team by dynamically integrating API elements into the different web pages with JavaScript.  
         Front-end and API code is available on this [repo](https://github.com/OpenClassrooms-Student-Center/P5-Dev-Web-Kanap).
         Set up an acceptance test plan from [this template](/kanap/DW+P5+-+Modele+plan+tests+acceptation.xlsx) that we usually use.  

     For more details, here are [the technical and functional specifications](/kanap/DW%2BP5%2B-%2BSpecifications%2Bfonctionnelles.pdf) of the project.    
     You can find all the details of it, the expectations for each page of the website and the details of the API.  

     Don't hesitate to come and see me if you have any questions, my door is always open.  

     Good day,  

     Corinne  
-----------------------------------------------------------------------------------------------------------

A little later, Frank sends you an e-mail to give you some additional details about his work:

--------------------------------------------------------------------------------------------------------------
     

From: Frank  
To: you  
Object: Static models of the Kanap site  

     Hi,  

     Obviously it's time for you to join the project!   
     So I come to give you some information on the part that I was able to achieve, to help you during your development.   

     4 pages have been set up: home page, Product page, Shopping cart page and the Confirmation page.   
     On all the pages, all the static parts are in place, so they are ready to receive the dynamic content.   

     Also, on each page, an example of the dynamic part is systematically given;   
     this way, you don't have to worry about setting up the HTML structure or CSS styling, everything is already done.   
     All you have to do is integrate these elements dynamically using JS and the API.   

     Finally, in the HTML code I have integrated "id" in different tags, this should help you to integrate the dynamic elements.    
     With all this, normally you will not need to touch the HTML / CSS code.    

     Good development!   

     Frank  

-------------------------------------------------------------------------------------------------------------

That's it, you have all the information to start your project. Good luck !    
### Scpécifications

[the technical and functional specifications](/kanap/DW%2BP5%2B-%2BSpecifications%2Bfonctionnelles.pdf)


## What I learned

Create a test plan for an application
Validate data from external sources
Interact with a web service with JavaScript
Handle JavaScript events 



===========================================================

### Back end Prerequisites ###

You will need to have Node and `npm` installed locally on your machine.

### Back end Installation ###

Clone this repo. From the "back" folder of the project, run `npm install`. You 
can then run the server with `node server`. 
The server should run on `localhost` with default port `3000`. If the
server runs on another port for any reason, this is printed to the
console when the server starts, e.g. `Listening on port 3001`.
